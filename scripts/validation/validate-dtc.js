const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

// Schema version from metadata
const METADATA_PATH = 'token-studio-sync-provider/$metadata.json';
const SCHEMA_VERSION = JSON.parse(fs.readFileSync(METADATA_PATH, 'utf8')).version;

// DTC Rules
const DTC_RULES = {
  types: [
    'color', 'fontSizes', 'fontWeights', 'fontFamilies', 'lineHeights',
    'letterSpacing', 'borderRadius', 'borderWidths', 'spacing',
    'sizing', 'opacity', 'boxShadow', 'typography', 'paragraphSpacing',
    'textCase', 'textDecoration', 'composition', 'dimension',
    'breakpoints', 'border', 'zIndex', 'duration', 'assets',
    'boolean', 'text', 'number', 'other'
  ],
  categories: [
    'Color', 'FontSize', 'FontWeight', 'FontFamily', 'LineHeight',
    'LetterSpacing', 'BorderRadius', 'BorderWidth', 'Spacing',
    'Sizing', 'Opacity', 'BoxShadow', 'Typography', 'ParagraphSpacing',
    'TextCase', 'TextDecoration', 'Composition', 'Dimension',
    'Breakpoints', 'Border', 'ZIndex', 'Duration', 'Assets',
    'Boolean', 'Text', 'Number', 'Other'
  ],
  allowedWrapping: ['fontSizes', 'fontFamilies', 'fontWeights', 'lineHeights'],
  units: {
    opacity: { type: 'string', pattern: '^\\d+%$' },
    spacing: { type: 'number' },
    duration: { type: 'string', pattern: '^\\d+ms$' },
    fontSize: { type: 'string', pattern: '^\\d+px$|^\\d+rem$' },
    lineHeight: { type: 'number' },
    borderRadius: { type: 'string', pattern: '^\\d+px$|^\\d+rem$' },
    borderWidth: { type: 'string', pattern: '^\\d+px$' },
    boxShadow: { type: 'string' },
    zIndex: { type: 'integer' },
    color: { type: 'string', pattern: '^#[0-9a-f]{6}$|^rgba\\(\\d+,\\d+,\\d+,\\d+\\)$' }
  }
};

// Schema for token validation
const tokenSchema = {
  type: 'object',
  required: ['$type', '$value', '$description'],
  properties: {
    $type: { type: 'string', enum: DTC_RULES.types },
    $value: { type: ['string', 'number'] },
    $description: { 
      type: 'string',
      minLength: 5,
      not: { pattern: 'TBD|temp|TODO' }
    }
  }
};

const ajv = new Ajv({ allErrors: true });
const validateToken = ajv.compile(tokenSchema);

function validateUnit(type, value) {
  const unitRule = DTC_RULES.units[type];
  if (!unitRule) return true;
  
  if (unitRule.type === 'number' && typeof value === 'number') return true;
  if (unitRule.type === 'integer' && Number.isInteger(value)) return true;
  if (unitRule.type === 'string' && unitRule.pattern) {
    return new RegExp(unitRule.pattern).test(value);
  }
  return false;
}

function validateTokenStructure(token, path = '') {
  const errors = [];

  // Schema validation
  if (!validateToken(token)) {
    errors.push(`Schema validation failed at ${path}: ${JSON.stringify(validateToken.errors)}`);
  }

  // Check for references in primitives
  if (path.includes('core.json') && typeof token.$value === 'string' && token.$value.includes('{')) {
    errors.push(`Primitive token at ${path} contains reference: ${token.$value}`);
  }

  // Check for wrapping violations
  const parentKey = path.split('.').pop();
  if (parentKey && parentKey.toLowerCase() === token.$type.toLowerCase() && !DTC_RULES.allowedWrapping.includes(token.$type)) {
    errors.push(`Wrapping violation at ${path}: ${parentKey} matches $type`);
  }

  // Check unit normalization
  if (!validateUnit(token.$type, token.$value)) {
    errors.push(`Invalid unit for ${token.$type} at ${path}: ${token.$value}`);
  }

  return errors;
}

const allowedGroups = [
  'colors',
  'fontSizes',
  'fontWeights',
  'fontFamilies',
  'lineHeights',
  'letterSpacing',
  'borderRadius',
  'borderWidths',
  'spacing',
  'sizing',
  'opacity',
  'boxShadow',
  'typography',
  'paragraphSpacing',
  'textCase',
  'textDecoration',
  'composition',
  'dimension',
  'breakpoints',
  'border',
  'zIndex',
  'duration',
  'assets',
  'boolean',
  'text',
  'number',
  'other'
];

function validateFile(filePath) {
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const errors = [];
  const seenKeys = new Map();

  function traverse(obj, currentPath = '') {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      
      // Check for duplicate keys only at the same parent context
      if (value.$type) {
        const contextKey = `${currentPath}|${value.$type}:${key}`;
        if (seenKeys.has(contextKey)) {
          errors.push(`Duplicate key "${key}" with type "${value.$type}" at context "${currentPath}" (path: ${newPath})`);
        }
        seenKeys.set(contextKey, true);
      }

      if (value.$type) {
        errors.push(...validateTokenStructure(value, newPath));
      } else if (typeof value === 'object') {
        // Check for double nesting
        if (currentPath.split('.').length > 1) {
          errors.push(`Double nesting detected at ${newPath}`);
        }
        
        // Check if root-level object is a primitive or allowed group
        if (currentPath === '') {
          const normalizedKey = key.toLowerCase();
          const isAllowedGroup = allowedGroups.includes(normalizedKey);
          if (!isAllowedGroup) {
            errors.push(`Root-level object "${key}" is not a primitive or allowed group. All root-level objects must be primitives or explicitly allowed groups.`);
          }
        }

        // Check for nested tokens that should be at root level
        if (currentPath !== '') {
          Object.entries(value).forEach(([nestedKey, nestedValue]) => {
            if (nestedValue.$type) {
              errors.push(`Token "${nestedKey}" should be at root level, not nested under "${key}". Move it to root level.`);
            }
          });
        }

        // Check for inconsistent type naming (e.g., lineHeight vs lineHeights)
        if (value.$type) {
          const normalizedType = value.$type.toLowerCase().replace(/s$/, '');
          if (normalizedType !== value.$type.toLowerCase()) {
            errors.push(`Inconsistent type naming at ${newPath}: "${value.$type}" should be "${normalizedType}"`);
          }
        }

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
  'token-studio-sync-provider/theme.json',
  'token-studio-sync-provider/$themes.json'
];

let hasErrors = false;

// Check schema version
console.log(`Validating against schema version ${SCHEMA_VERSION}...`);

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
  console.error('\nValidation failed. Fix errors before committing.');
  process.exit(1);
} else {
  console.log('\n✓ All files passed validation');
} 