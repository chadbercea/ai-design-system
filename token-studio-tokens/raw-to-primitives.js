const fs = require('fs');
const path = require('path');

// Canonical categories and their $type mapping from The-Design-Token-Codex.txt
const canonicalCategoryTypeMap = {
  Color: 'color',
  Sizing: 'sizing',
  Spacing: 'spacing',
  BorderRadius: 'borderRadius',
  BorderWidth: 'borderWidth',
  Border: 'border',
  Opacity: 'opacity',
  BoxShadow: 'boxShadow',
  Typography: 'typography',
  FontFamily: 'fontFamilies',
  FontWeight: 'fontWeights',
  LineHeight: 'lineHeights',
  FontSize: 'fontSizes',
  LetterSpacing: 'letterSpacing',
  ParagraphSpacing: 'paragraphSpacing',
  TextCase: 'textCase',
  TextDecoration: 'textDecoration',
  Composition: 'composition',
  Assets: 'assets',
  Dimension: 'dimension',
  Breakpoints: 'breakpoints',
  Boolean: 'boolean',
  Text: 'text',
  Number: 'number',
  ZIndex: 'zIndex',
  Duration: 'duration',
  Easing: 'easing',
  Direction: 'direction',
  MediaQuery: 'mediaQuery',
  Mixin: 'mixin'
};
const canonicalCategories = Object.keys(canonicalCategoryTypeMap);

// Known semantic/alias patterns to exclude
const semanticPatterns = [
  /^palette\./i,
  /^typography\./i,
  /^breakpoints\./i,
  /^shadows?\./i,
  /^zIndex\./i,
  /^shape\./i,
  /^direction$/i,
  /^mixins?\./i,
  /^transitions?\./i,
  /^action\./i,
  /^common\./i,
  /^background\./i,
  /^divider\./i,
  /^text\./i,
  /^primary\./i,
  /^secondary\./i,
  /^error\./i,
  /^warning\./i,
  /^info\./i,
  /^success\./i,
  /Typography[A-Z]/, // TypographyH1FontFamily, etc.
  /UnstableSxConfig/, // MUI unstable keys
  /ThemeKey$/
];

function toPascalCase(str) {
  return str
    .replace(/[-_. ]+(.)/g, (_, c) => c ? c.toUpperCase() : '')
    .replace(/^(.)/, (_, c) => c ? c.toUpperCase() : '');
}

function toColorDotCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1.$2').replace(/[-_ ]+/g, '.').toLowerCase();
}

function isReference(val) {
  return typeof val === 'string' && val.startsWith('{') && val.endsWith('}');
}

function isSemanticKey(key) {
  return semanticPatterns.some((pat) => pat.test(key));
}

function getCategoryAndType(key) {
  // Split on dot, dash, underscore, or space
  const segments = key.split(/[.\-_ ]/);
  for (const segment of segments) {
    const category = canonicalCategories.find(
      cat => cat.toLowerCase() === segment.toLowerCase()
    );
    if (category) {
      return {
        category,
        type: canonicalCategoryTypeMap[category],
        tokenName: canonicalCategoryTypeMap[category] === 'color' ? key : toPascalCase(segments[segments.length - 1])
      };
    }
  }
  return null;
}

function areCategoryAndTypeEquivalent(category, $type) {
  // Use codex mapping for equivalence
  return canonicalCategoryTypeMap[category] && canonicalCategoryTypeMap[category].toLowerCase() === $type.toLowerCase();
}

function main() {
  const raw = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-raw.json'), 'utf8'));
  const relationships = JSON.parse(fs.readFileSync(path.join(__dirname, '../mui-tokens/mui-tokens-relationships.json'), 'utf8'));
  const primitives = {};
  const skipped = [];
  const semanticFound = [];

  function addPrimitive({ category, tokenName, value, $type }) {
    // If category and $type are canonically equivalent, flat key
    if (areCategoryAndTypeEquivalent(category, $type) || (category === 'Color' && $type === 'color')) {
      primitives[tokenName] = {
        $value: value,
        $type,
        $description: `${category} ${tokenName}`
      };
      return;
    }
    // Otherwise, wrap in category object
    if (!primitives[category]) primitives[category] = {};
    primitives[category][tokenName] = {
      $value: value,
      $type,
      $description: `${category} ${tokenName}`
    };
  }

  // Only include primitives whose type is string or number and not semantic
  for (const entry of relationships) {
    if (!['color', 'number', 'string', 'boolean'].includes(entry.type)) continue;
    if (isSemanticKey(entry.token)) {
      semanticFound.push(entry.token);
      continue;
    }
    let key = entry.token;
    let value = entry.value !== undefined ? entry.value : raw.base?.[key.split('.')[0]]?.[key] || raw.base?.[key];
    if (value === undefined) continue;
    let parsed = getCategoryAndType(key);
    if (parsed && canonicalCategories.includes(parsed.category)) {
      addPrimitive({
        category: parsed.category,
        tokenName: parsed.tokenName,
        value,
        $type: parsed.type
      });
    } else {
      skipped.push({ key, value });
    }
  }

  if (semanticFound.length > 0) {
    console.warn('Semantic tokens were found and excluded:', semanticFound);
  }
  if (skipped.length > 0) {
    console.warn('Skipped tokens due to non-primitive, reference, or non-canonical category:', skipped);
  }

  const output = {
    $schema: "https://design-tokens.github.io/design-tokens/schema.json",
    Primitives: primitives
  };
  fs.writeFileSync(
    path.join(__dirname, 'primitives.json'),
    JSON.stringify(output, null, 2)
  );
  console.log('Generated codex-compliant primitives.json. Semantic tokens are strictly excluded.');
}

main();
