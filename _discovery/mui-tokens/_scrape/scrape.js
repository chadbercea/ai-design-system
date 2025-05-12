const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const walk = require('acorn-walk');

// Placeholder for blacklist (to be provided by user in future runs)
const SKIP_FOLDERS = [
  'Button', 'AppBar', 'Slider', 'Avatar', 'Badge', 'BottomNavigation', 'Breadcrumbs',
  'Card', 'Checkbox', 'Chip', 'CircularProgress', 'Collapse', 'Dialog', 'Divider',
  'Drawer', 'Fab', 'Form', 'Grid', 'Icon', 'Input', 'List', 'Menu', 'Pagination',
  'Paper', 'Popover', 'Radio', 'Select', 'Skeleton', 'Snackbar', 'Stepper', 'Switch',
  'Table', 'Tabs', 'TextField', 'ToggleButton', 'Toolbar', 'Tooltip', 'Typography',
  // Add more as needed
];

function isComponentFolder(folderName) {
  return SKIP_FOLDERS.includes(folderName);
}

function getAllJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!isComponentFolder(file)) {
        results = results.concat(getAllJsFiles(filePath));
      }
    } else if (file.endsWith('.js')) {
      results.push(filePath);
    }
  }
  return results;
}

function inferTypeFromPath(filepath) {
  const name = filepath.toLowerCase();
  if (name.includes('color')) return 'color';
  if (name.includes('shadow')) return 'shadow';
  if (name.includes('spacing')) return 'spacing';
  if (name.includes('shape') || name.includes('radius')) return 'borderRadius';
  if (name.includes('typography')) return 'typography';
  if (name.includes('zindex')) return 'zIndex';
  if (name.includes('palette')) return 'color';
  if (name.includes('breakpoint')) return 'breakpoint';
  if (name.includes('transition')) return 'transition';
  if (name.includes('opacity')) return 'opacity';
  if (name.includes('easing')) return 'easing';
  if (name.includes('grey')) return 'color';
  if (name.includes('common')) return 'color';
  if (name.includes('fontWeights')) return 'fontWeights';
  if (name.includes('fontsize')) return 'fontSize';
  return 'to-sort';
}

function isPrimitiveKey(key) {
  // Heuristic: primitives are usually numbers, color names, or palette steps
  return /^([a-z]+\.?[0-9]{1,3}|[0-9]+|[a-z]+\.[a-z0-9]+|A[0-9]{3})$/i.test(key);
}

function isSemanticKey(key) {
  // Heuristic: semantics are usually usage/context names
  return /^(primary|secondary|error|warning|info|success|background|text|divider|action|contrast|disabled|focus|hover|selected|active|inactive|default|light|dark|main|paper|appbar|surface|on|off|inverse|muted|accent|cta|brand|neutral|highlight|low|high|subtle|strong|weak|emphasis|base|body|heading|caption|subtitle|button|overline|inherit)$/i.test(key);
}

function classifyToken(key, value, fileContext) {
  if (isPrimitiveKey(key)) return 'primitive';
  if (isSemanticKey(key)) return 'semantic';
  return 'bucket';
}

function getTokenPrefix(filepath, rootDir) {
  // For colors/blue.js, returns 'blue.'
  const rel = path.relative(rootDir, filepath);
  const parts = rel.split(path.sep);
  if (parts.length >= 2 && parts[0] === 'colors') {
    return parts[1].replace(/\.js$/, '') + '.';
  }
  // For other files, no prefix
  return '';
}

function extractTokensFromFile(filepath, rootDir) {
  const src = fs.readFileSync(filepath, 'utf8');
  let ast;
  try {
    ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'module', locations: true, onComment: [] });
  } catch (e) {
    return { primitives: {}, semantics: {}, bucket: {} };
  }
  const $type = inferTypeFromPath(filepath);
  const primitives = {};
  const semantics = {};
  const bucket = {};
  const prefix = getTokenPrefix(filepath, rootDir);

  // Helper to get comments for $description
  const comments = [];
  acorn.parse(src, {
    ecmaVersion: 'latest',
    sourceType: 'module',
    onComment: comments
  });
  function findCommentBefore(node) {
    if (!node.loc) return undefined;
    const nodeLine = node.loc.start.line;
    for (let i = comments.length - 1; i >= 0; i--) {
      if (!comments[i].loc) continue;
      if (comments[i].end < node.start && comments[i].loc.end.line === nodeLine - 1) {
        return comments[i].value.trim();
      }
    }
    return undefined;
  }

  walk.simple(ast, {
    ExportDefaultDeclaration(node) {
      // export default { ... }
      if (node.declaration && node.declaration.type === 'ObjectExpression') {
        for (const prop of node.declaration.properties) {
          if (prop.type === 'Property' && (prop.key.type === 'Identifier' || prop.key.type === 'Literal')) {
            const key = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value;
            let value;
            if (prop.value.type === 'Literal') {
              value = prop.value.value;
            } else if (prop.value.type === 'TemplateLiteral' && prop.value.quasis.length === 1) {
              value = prop.value.quasis[0].value.cooked;
            } else if (prop.value.type === 'ArrayExpression') {
              value = prop.value.elements.map(e => e.value);
            } else {
              continue; // skip complex
            }
            const desc = findCommentBefore(prop) || undefined;
            const token = { $type, $value: value };
            if (desc) token.$description = desc;
            const fullKey = prefix + key;
            const bucketType = classifyToken(fullKey, value, filepath);
            if (bucketType === 'primitive') primitives[fullKey] = token;
            else if (bucketType === 'semantic') semantics[fullKey] = token;
            else bucket[fullKey] = token;
          }
        }
      }
    },
    ExportNamedDeclaration(node) {
      if (node.declaration && node.declaration.type === 'VariableDeclaration') {
        for (const decl of node.declaration.declarations) {
          if (decl.id.type === 'Identifier' && decl.init && decl.init.type === 'ObjectExpression') {
            for (const prop of decl.init.properties) {
              if (prop.type === 'Property' && (prop.key.type === 'Identifier' || prop.key.type === 'Literal')) {
                const key = prop.key.type === 'Identifier' ? prop.key.name : prop.key.value;
                let value;
                if (prop.value.type === 'Literal') {
                  value = prop.value.value;
                } else if (prop.value.type === 'TemplateLiteral' && prop.value.quasis.length === 1) {
                  value = prop.value.quasis[0].value.cooked;
                } else if (prop.value.type === 'ArrayExpression') {
                  value = prop.value.elements.map(e => e.value);
                } else {
                  continue; // skip complex
                }
                const desc = findCommentBefore(prop) || undefined;
                const token = { $type, $value: value };
                if (desc) token.$description = desc;
                const fullKey = prefix + key;
                const bucketType = classifyToken(fullKey, value, filepath);
                if (bucketType === 'primitive') primitives[fullKey] = token;
                else if (bucketType === 'semantic') semantics[fullKey] = token;
                else bucket[fullKey] = token;
              }
            }
          }
        }
      }
    }
  });
  return { primitives, semantics, bucket };
}

function main() {
  const rootDir = path.resolve(__dirname, '../../node_modules/@mui/material');
  const files = getAllJsFiles(rootDir);

  let primitives = {};
  let semantics = {};
  let bucket = {};

  for (const file of files) {
    const { primitives: p, semantics: s, bucket: b } = extractTokensFromFile(file, rootDir);
    Object.assign(primitives, p);
    Object.assign(semantics, s);
    Object.assign(bucket, b);
  }

  fs.writeFileSync(
    path.resolve(__dirname, 'primitives.json'),
    JSON.stringify({ MUI: primitives }, null, 2)
  );
  fs.writeFileSync(
    path.resolve(__dirname, 'semantics.json'),
    JSON.stringify({ MUI: semantics }, null, 2)
  );
  fs.writeFileSync(
    path.resolve(__dirname, 'bucket.json'),
    JSON.stringify({ MUI: bucket }, null, 2)
  );
}

main();
