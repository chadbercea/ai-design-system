const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

// Import rules
const TYPE_RULES = require('./rules/type-rules');
const STRUCTURE_RULES = require('./rules/structure-rules');
const REFERENCE_RULES = require('./rules/reference-rules');
const ENFORCEMENT_RULES = require('./rules/enforcement-rules');

class TokenEnforcer {
  constructor() {
    this.errors = [];
    this.ajv = new Ajv({ allErrors: true });
  }

  fail(message) {
    this.errors.push(message);
    return false;
  }

  validateToken(token, path = '') {
    // Required fields check
    for (const field of TYPE_RULES.requiredFields) {
      if (!(field in token)) {
        return this.fail(`Missing required field "${field}" at ${path}`);
      }
    }

    // Type validation
    if (!TYPE_RULES.validTypes.includes(token.$type)) {
      return this.fail(`Invalid type "${token.$type}" at ${path}`);
    }

    // Unit validation
    const unitRule = TYPE_RULES.unitRules[token.$type];
    if (unitRule && !this.validateUnit(token.$value, unitRule)) {
      return this.fail(`Invalid unit for ${token.$type} at ${path}: ${token.$value}`);
    }

    // Description validation
    if (token.$description.length < 5 || /TBD|temp|TODO/i.test(token.$description)) {
      return this.fail(`Invalid description at ${path}: ${token.$description}`);
    }

    return true;
  }

  validateUnit(value, rule) {
    if (rule.type === 'number' && typeof value === 'number') return true;
    if (rule.type === 'integer' && Number.isInteger(value)) return true;
    if (rule.type === 'string' && rule.pattern) {
      return new RegExp(rule.pattern).test(value);
    }
    return false;
  }

  validateStructure(obj, currentPath = '') {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      if (value && typeof value === 'object' && ('$type' in value && '$value' in value && '$description' in value)) {
        // This is a token, validate it
        this.validateToken(value, newPath);
      } else if (value && typeof value === 'object') {
        // This is a group, recurse
        this.validateStructure(value, newPath);
      } else {
        // Not an object, skip
        continue;
      }
    }
  }

  validateReferences(content, filePath) {
    const isAllowedFile = REFERENCE_RULES.allowedInFiles.includes(path.basename(filePath));
    
    function findReferences(obj) {
      const refs = [];
      JSON.stringify(obj, (key, value) => {
        if (typeof value === 'string' && value.match(REFERENCE_RULES.format.pattern)) {
          refs.push(value);
        }
        return value;
      });
      return refs;
    }

    const references = findReferences(content);
    
    for (const ref of references) {
      if (!isAllowedFile) {
        this.fail(`References not allowed in ${filePath}`);
      }
      if (!ref.match(REFERENCE_RULES.format.pattern)) {
        this.fail(`Invalid reference format: ${ref}`);
      }
    }
  }

  validateFile(filePath) {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      // Structure validation
      this.validateStructure(content);
      
      // Reference validation
      this.validateReferences(content, filePath);
      
      // Design tool compatibility
      if (ENFORCEMENT_RULES.ci.validateDesignToolCompatibility) {
        this.validateDesignToolCompatibility(content);
      }

      if (this.errors.length > 0) {
        console.error(`Validation failed for ${filePath}:`);
        this.errors.forEach(error => console.error(`  - ${error}`));
        process.exit(1);
      }

      return true;
    } catch (error) {
      this.fail(`Failed to validate ${filePath}: ${error.message}`);
      return false;
    }
  }

  validateDesignToolCompatibility(content) {
    // Figma plugin compatibility
    const figmaSchema = {
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

    const validateFigma = this.ajv.compile(figmaSchema);
    if (!validateFigma(content)) {
      this.fail('Figma plugin compatibility validation failed');
    }

    // Tokens Studio compatibility
    const tokensStudioSchema = {
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

    const validateTokensStudio = this.ajv.compile(tokensStudioSchema);
    if (!validateTokensStudio(content)) {
      this.fail('Tokens Studio compatibility validation failed');
    }
  }
}

// Export the enforcer
module.exports = TokenEnforcer;

// Run validation if this file is called directly
if (require.main === module) {
  const enforcer = new TokenEnforcer();
  const tokenFiles = [
    'token-studio-sync-provider/core.json',
    'token-studio-sync-provider/dark.json',
    'token-studio-sync-provider/light.json',
    'token-studio-sync-provider/theme.json',
    'token-studio-sync-provider/$themes.json'
  ];

  let hasErrors = false;
  tokenFiles.forEach(file => {
    if (fs.existsSync(file)) {
      if (!enforcer.validateFile(file)) {
        hasErrors = true;
      }
    }
  });

  if (hasErrors) {
    process.exit(1);
  }
} 