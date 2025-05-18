const classification = require('../../rules/classification');
const references = require('../../rules/references');
const transformation = require('../../rules/transformation');
const errors = require('../../rules/errors');
const tokenSets = require('../../rules/token-sets');
const units = require('../../rules/units');

// Test data
const testTokens = {
  // Valid primitive tokens
  validPrimitives: {
    'color.primary': {
      $type: 'color',
      $value: '#ff0000',
      $description: 'Primary brand color'
    },
    'spacing.large': {
      $type: 'spacing',
      $value: '24px',
      $description: 'Large spacing value'
    }
  },

  // Valid semantic tokens
  validSemantics: {
    'button.primary': {
      $type: 'color',
      $value: '{color.primary}',
      $description: 'Primary button color'
    },
    'spacing.card': {
      $type: 'spacing',
      $value: '{spacing.large} * 2',
      $description: 'Card spacing'
    }
  },

  // Invalid tokens
  invalidTokens: {
    'invalid.type': {
      $type: 'invalid',
      $value: 'test',
      $description: 'Invalid type'
    },
    'missing.fields': {
      $type: 'color'
    },
    'circular.ref': {
      $type: 'color',
      $value: '{circular.ref}',
      $description: 'Circular reference'
    }
  }
};

// Test cases
const testCases = {
  // Classification tests
  classification: {
    'should classify primitive tokens': () => {
      const result = classification.classifyToken(testTokens.validPrimitives['color.primary']);
      return result === 'primitive';
    },
    'should classify semantic tokens': () => {
      const result = classification.classifyToken(testTokens.validSemantics['button.primary']);
      return result === 'semantic';
    }
  },

  // Reference tests
  references: {
    'should resolve basic references': () => {
      const result = references.resolveReference(
        '{color.primary}',
        testTokens.validPrimitives
      );
      return result === '#ff0000';
    },
    'should detect circular references': () => {
      const result = references.validation.validateReferenceChain(
        'circular.ref',
        testTokens.invalidTokens
      );
      return !result;
    }
  },

  // Transformation tests
  transformation: {
    'should transform to CSS': () => {
      const result = transformation.transform(
        testTokens.validPrimitives,
        'css'
      );
      return result['--color-primary'] === '#ff0000';
    },
    'should handle invalid format': () => {
      try {
        transformation.transform(testTokens.validPrimitives, 'invalid');
        return false;
      } catch (e) {
        return true;
      }
    }
  },

  // Token set tests
  tokenSets: {
    'should validate set name': () => {
      try {
        tokenSets.naming.validate('valid-name');
        return true;
      } catch (e) {
        return false;
      }
    },
    'should reject invalid set name': () => {
      try {
        tokenSets.naming.validate('invalid@name');
        return false;
      } catch (e) {
        return true;
      }
    }
  },

  // Unit tests
  units: {
    'should convert units': () => {
      const result = units.conversion.convert('16px', 'px', 'rem');
      return result === '1rem';
    },
    'should validate units': () => {
      const result = units.validation.validateUnit('16px', 'spacing');
      return result;
    }
  }
};

// Run tests
function runTests() {
  let passed = 0;
  let failed = 0;

  for (const [category, tests] of Object.entries(testCases)) {
    console.log(`\nRunning ${category} tests...`);
    
    for (const [name, test] of Object.entries(tests)) {
      try {
        const result = test();
        if (result) {
          console.log(`✓ ${name}`);
          passed++;
        } else {
          console.log(`✗ ${name}`);
          failed++;
        }
      } catch (e) {
        console.log(`✗ ${name} (Error: ${e.message})`);
        failed++;
      }
    }
  }

  console.log(`\nTest Summary: ${passed} passed, ${failed} failed`);
  return { passed, failed };
}

// Export test runner
module.exports = {
  runTests,
  testTokens,
  testCases
}; 