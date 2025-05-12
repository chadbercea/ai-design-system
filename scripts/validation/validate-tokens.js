const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

// Load Figma plugin schema
const FIGMA_SCHEMA = {
  type: 'object',
  properties: {
    tokens: {
      type: 'object',
      patternProperties: {
        '^[a-zA-Z0-9.]+$': {
          type: 'object',
          required: ['$type', '$value'],
          properties: {
            $type: { type: 'string' },
            $value: { type: ['string', 'number'] }
          }
        }
      }
    }
  }
};

// Load Tokens Studio schema
const TOKENS_STUDIO_SCHEMA = {
  type: 'object',
  properties: {
    $metadata: {
      type: 'object',
      required: ['tokenSetOrder'],
      properties: {
        tokenSetOrder: {
          type: 'array',
          items: { type: 'string' }
        }
      }
    }
  }
};

const ajv = new Ajv({ allErrors: true });
const validateFigma = ajv.compile(FIGMA_SCHEMA);
const validateTokensStudio = ajv.compile(TOKENS_STUDIO_SCHEMA);

function validateFigmaCompatibility(content) {
  const errors = [];
  
  if (!validateFigma(content)) {
    errors.push('Figma plugin schema validation failed:');
    validateFigma.errors.forEach(err => {
      errors.push(`  - ${err.message} at ${err.instancePath}`);
    });
  }
  
  return errors;
}

function validateTokensStudioCompatibility(content) {
  const errors = [];
  
  if (!validateTokensStudio(content)) {
    errors.push('Tokens Studio schema validation failed:');
    validateTokensStudio.errors.forEach(err => {
      errors.push(`  - ${err.message} at ${err.instancePath}`);
    });
  }
  
  return errors;
}

function validateFile(filePath) {
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const errors = [];

  // Validate Figma compatibility
  errors.push(...validateFigmaCompatibility(content));

  // Validate Tokens Studio compatibility
  errors.push(...validateTokensStudioCompatibility(content));

  // Check for sync compatibility
  if (filePath.includes('core.json')) {
    // Ensure all tokens can be exported to Tokens Studio
    Object.entries(content).forEach(([key, value]) => {
      if (typeof value === 'object' && value.$type) {
        // Check for unsupported types
        if (!['color', 'fontSizes', 'fontWeights', 'fontFamilies', 'lineHeights',
              'letterSpacing', 'borderRadius', 'borderWidths', 'spacing',
              'sizing', 'opacity', 'boxShadow', 'typography'].includes(value.$type)) {
          errors.push(`Token "${key}" has unsupported type "${value.$type}" for Tokens Studio sync`);
        }
      }
    });
  }

  return errors;
}

// Validate all token files
const tokenFiles = [
  'token-studio-sync-provider/core.json',
  'token-studio-sync-provider/dark.json',
  'token-studio-sync-provider/light.json',
  'token-studio-sync-provider/theme.json',
  'token-studio-sync-provider/$themes.json',
  'token-studio-sync-provider/$metadata.json'
];

let hasErrors = false;

tokenFiles.forEach(file => {
  console.log(`\nValidating ${file} for design tool compatibility...`);
  const errors = validateFile(file);
  
  if (errors.length > 0) {
    hasErrors = true;
    console.error(`Found ${errors.length} errors in ${file}:`);
    errors.forEach(error => console.error(`  - ${error}`));
  } else {
    console.log(`✓ ${file} passed design tool validation`);
  }
});

if (hasErrors) {
  console.error('\nDesign tool compatibility validation failed. Fix errors before committing.');
  process.exit(1);
} else {
  console.log('\n✓ All files passed design tool compatibility validation');
} 