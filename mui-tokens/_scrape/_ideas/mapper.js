const fs = require('fs');
const path = require('path');
const acorn = require('acorn');
const walk = require('acorn-walk');

const ROOT_DIR = path.resolve(__dirname, '../../node_modules/@mui/material');
const OUTPUT_FILE = path.resolve(__dirname, 'mui-map.json');

function getAllJsFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllJsFiles(filePath));
    } else if (file.endsWith('.js')) {
      results.push(filePath);
    }
  }
  return results;
}

function getTypeFromNode(node) {
  if (!node) return 'unknown';
  if (node.type === 'ObjectExpression') return 'object';
  if (node.type === 'ArrayExpression') return 'array';
  if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression') return 'function';
  if (node.type === 'ClassDeclaration' || node.type === 'ClassExpression') return 'class';
  if (node.type === 'Literal') return typeof node.value;
  return node.type;
}

function getSampleKeysFromObjectNode(node, max = 5) {
  if (!node || node.type !== 'ObjectExpression') return [];
  return node.properties.slice(0, max).map(prop =>
    prop.key.type === 'Identifier' ? prop.key.name : prop.key.value
  );
}

function getSampleValuesFromArrayNode(node, max = 5) {
  if (!node || node.type !== 'ArrayExpression') return [];
  return node.elements.slice(0, max).map(el => el.value);
}

function mapFileExports(filepath) {
  const src = fs.readFileSync(filepath, 'utf8');
  let ast;
  try {
    ast = acorn.parse(src, { ecmaVersion: 'latest', sourceType: 'module' });
  } catch (e) {
    return null;
  }
  const result = {};
  walk.simple(ast, {
    ExportDefaultDeclaration(node) {
      const type = getTypeFromNode(node.declaration);
      const entry = { type };
      if (type === 'object') {
        entry.sampleKeys = getSampleKeysFromObjectNode(node.declaration);
      } else if (type === 'array') {
        entry.sampleValues = getSampleValuesFromArrayNode(node.declaration);
      }
      result['default'] = entry;
    },
    ExportNamedDeclaration(node) {
      if (node.declaration && node.declaration.type === 'VariableDeclaration') {
        for (const decl of node.declaration.declarations) {
          if (decl.id && decl.id.name) {
            const type = getTypeFromNode(decl.init);
            const entry = { type };
            if (type === 'object') {
              entry.sampleKeys = getSampleKeysFromObjectNode(decl.init);
            } else if (type === 'array') {
              entry.sampleValues = getSampleValuesFromArrayNode(decl.init);
            }
            result[decl.id.name] = entry;
          }
        }
      } else if (node.declaration && node.declaration.type === 'FunctionDeclaration') {
        if (node.declaration.id && node.declaration.id.name) {
          result[node.declaration.id.name] = { type: 'function' };
        }
      }
    }
  });
  return result;
}

function isThemeRelated(file) {
  const themeKeywords = [
    'theme', 'createTheme', 'defaultTheme', 'palette', 'shadows', 'spacing', 'typography', 'shape', 'zIndex', 'muiTheme', 'createMuiTheme'
  ];
  return themeKeywords.some(keyword => file.toLowerCase().includes(keyword));
}

function main() {
  const files = getAllJsFiles(ROOT_DIR);
  const map = {};
  for (const file of files) {
    const relPath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
    const exports = mapFileExports(file);
    if (exports && Object.keys(exports).length > 0) {
      map[relPath] = exports;
      if (isThemeRelated(relPath)) {
        map[relPath]._themeRelated = true;
      }
    } else if (isThemeRelated(relPath)) {
      // Even if no exports detected, flag as theme related
      map[relPath] = { _themeRelated: true };
    }
  }
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(map, null, 2));
}

function isPrimitive(val) {
  return (
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'boolean' ||
    val === null
  );
}

function filterTokenCandidates(map) {
  const filtered = {};
  for (const [file, exports] of Object.entries(map)) {
    for (const [exp, info] of Object.entries(exports)) {
      if (
        (info.type === 'object' && Array.isArray(info.sampleKeys) && info.sampleKeys.length > 0) ||
        (info.type === 'array' && Array.isArray(info.sampleValues) && info.sampleValues.length > 0 && info.sampleValues.every(isPrimitive))
      ) {
        if (!filtered[file]) filtered[file] = {};
        filtered[file][exp] = info;
      }
    }
  }
  return filtered;
}

// Only run this after the main map is generated
if (require.main === module) {
  main();
  // Now filter for token candidates
  const map = JSON.parse(fs.readFileSync(OUTPUT_FILE, 'utf8'));
  const tokenMap = filterTokenCandidates(map);
  fs.writeFileSync(path.resolve(__dirname, 'mui-token-map.json'), JSON.stringify(tokenMap, null, 2));
}
