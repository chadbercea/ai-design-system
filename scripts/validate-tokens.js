const Ajv = require('ajv');
const fs = require('fs');
const path = require('path');
const deepEqual = require('fast-deep-equal');
const chokidar = require('chokidar');

// Configuration
const TOKEN_FILE = path.join(__dirname, '../token-studio-sync-provider/core.json');
const SNAPSHOT_FILE = path.join(__dirname, '../token-studio-sync-provider/core.snapshot.json');
const SCHEMA_FILE = path.join(__dirname, './validation/schema.json');

// Initialize Ajv with custom keywords
const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strict: false,
  keywords: ['$description']
});

// Load schema
const schema = JSON.parse(fs.readFileSync(SCHEMA_FILE, 'utf8'));
const validate = ajv.compile(schema);

// Helper function to check for plural types
function hasPluralTypes(obj) {
  const pluralTypes = [
    'fontSizess', 'fontWeightss', 'fontFamilies', 'lineHeights',
    'letterSpacings', 'borderRadiuses', 'borderWidths', 'spacings',
    'sizings', 'opacities', 'boxShadows', 'typographies',
    'paragraphSpacings', 'textCases', 'textDecorations', 'compositions',
    'dimensions', 'breakpoints', 'borders', 'zIndexes', 'durations',
    'assets', 'booleans', 'texts', 'numbers', 'others'
  ];

  for (const key in obj) {
    if (obj[key].$type && pluralTypes.includes(obj[key].$type)) {
      return true;
    }
  }
  return false;
}

// Helper function to check for nested primitives
function hasNestedPrimitives(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (obj[key].$type && obj[key].$type === key.toLowerCase()) {
        return true;
      }
      if (hasNestedPrimitives(obj[key])) {
        return true;
      }
    }
  }
  return false;
}

// Helper function to check for missing descriptions
function hasMissingDescriptions(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      if (obj[key].$type && !obj[key].$description) {
        return true;
      }
      if (hasMissingDescriptions(obj[key])) {
        return true;
      }
    }
  }
  return false;
}

// Helper function to check color token structure
function validateColorTokens(obj) {
  if (!obj.colors) return true;
  
  for (const colorName in obj.colors) {
    const colorGroup = obj.colors[colorName];
    for (const shade in colorGroup) {
      const token = colorGroup[shade];
      if (!token.$description) {
        console.error(`Missing description for color token: ${colorName}.${shade}`);
        return false;
      }
      if (token.$type !== 'color') {
        console.error(`Invalid type for color token: ${colorName}.${shade}`);
        return false;
      }
    }
  }
  return true;
}

// Main validation function
function validateTokens() {
  try {
    // Read token file
    const tokens = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
    
    // Validate against schema
    const valid = validate(tokens);
    if (!valid) {
      console.error('Schema validation failed:');
      console.error(validate.errors);
      process.exit(1);
    }

    // Check for plural types
    if (hasPluralTypes(tokens)) {
      console.error('Error: Found plural type names in tokens');
      process.exit(1);
    }

    // Check for nested primitives
    if (hasNestedPrimitives(tokens)) {
      console.error('Error: Found nested primitives in tokens');
      process.exit(1);
    }

    // Check for missing descriptions
    if (hasMissingDescriptions(tokens)) {
      console.error('Error: Found tokens missing descriptions');
      process.exit(1);
    }

    // Validate color tokens
    if (!validateColorTokens(tokens)) {
      process.exit(1);
    }

    // Snapshot testing
    if (fs.existsSync(SNAPSHOT_FILE)) {
      const snapshot = JSON.parse(fs.readFileSync(SNAPSHOT_FILE, 'utf8'));
      if (!deepEqual(tokens, snapshot)) {
        console.error('Error: Token structure has changed from snapshot');
        process.exit(1);
      }
    } else {
      // Create initial snapshot
      fs.writeFileSync(SNAPSHOT_FILE, JSON.stringify(tokens, null, 2));
      console.log('Created initial snapshot');
    }

    console.log('Validation passed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Validation failed:', error);
    process.exit(1);
  }
}

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('Watching for changes...');
  chokidar.watch(TOKEN_FILE).on('change', () => {
    console.log('Token file changed, running validation...');
    validateTokens();
  });
} else {
  validateTokens();
} 