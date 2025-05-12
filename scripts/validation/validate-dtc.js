const fs = require('fs');
const path = require('path');

const DTC_RULES = {
  types: [
    'color', 'fontSize', 'fontWeights', 'fontFamilies', 'lineHeight',
    'letterSpacing', 'borderRadius', 'borderWidth', 'spacing',
    'sizing', 'opacity', 'boxShadow', 'typography', 'paragraphSpacing',
    'textCase', 'textDecoration', 'composition', 'dimension',
    'breakpoints', 'border', 'zIndex', 'duration', 'assets',
    'boolean', 'text', 'number', 'other'
  ]
};

function validateToken(token, path = '') {
  const errors = [];

  // Check required properties
  if (!token.$type || !token.$value || !token.$description) {
    errors.push(`Token at ${path} missing required properties: $type, $value, or $description`);
  }

  // Check type is singular and valid
  if (token.$type && !DTC_RULES.types.includes(token.$type)) {
    errors.push(`Invalid type "${token.$type}" at ${path}`);
  }

  // Check for double nesting
  if (path.split('.').length > 2) {
    errors.push(`Double nesting detected at ${path}`);
  }

  // Check for primitive values
  if (token.$value && typeof token.$value === 'object') {
    errors.push(`Primitive token at ${path} should have direct value, not object`);
  }

  return errors;
}

function validateFile(filePath) {
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const errors = [];

  function traverse(obj, currentPath = '') {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      
      if (value.$type) {
        errors.push(...validateToken(value, newPath));
      } else if (typeof value === 'object') {
        traverse(value, newPath);
      }
    }
  }

  traverse(content);
  return errors;
}

// Validate all token files
const tokenFiles = [
  'token-studio-sync-provider/core.json',
  'token-studio-sync-provider/dark.json',
  'token-studio-sync-provider/light.json',
  'token-studio-sync-provider/theme.json'
];

let hasErrors = false;

tokenFiles.forEach(file => {
  console.log(`\nValidating ${file}...`);
  const errors = validateFile(file);
  
  if (errors.length > 0) {
    hasErrors = true;
    console.error(`Found ${errors.length} errors in ${file}:`);
    errors.forEach(error => console.error(`  - ${error}`));
  } else {
    console.log(`✓ ${file} passed validation`);
  }
});

if (hasErrors) {
  process.exit(1);
} 