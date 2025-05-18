import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Token schema definition
const tokenSchema = {
  type: 'object',
  properties: {
    color: {
      type: 'object',
      properties: {
        base: {
          type: 'object',
          required: ['primary', 'secondary', 'neutral'],
          properties: {
            primary: {
              type: 'object',
              required: ['$value', '$type', '$description'],
              properties: {
                $value: { type: 'string', format: 'color' },
                $type: { type: 'string', enum: ['color'] },
                $description: { type: 'string' }
              }
            },
            secondary: {
              type: 'object',
              required: ['$value', '$type', '$description'],
              properties: {
                $value: { type: 'string', format: 'color' },
                $type: { type: 'string', enum: ['color'] },
                $description: { type: 'string' }
              }
            },
            neutral: {
              type: 'object',
              required: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
              properties: {
                '100': { $ref: '#/definitions/colorToken' },
                '200': { $ref: '#/definitions/colorToken' },
                '300': { $ref: '#/definitions/colorToken' },
                '400': { $ref: '#/definitions/colorToken' },
                '500': { $ref: '#/definitions/colorToken' },
                '600': { $ref: '#/definitions/colorToken' },
                '700': { $ref: '#/definitions/colorToken' },
                '800': { $ref: '#/definitions/colorToken' },
                '900': { $ref: '#/definitions/colorToken' }
              }
            }
          }
        }
      }
    },
    typography: {
      type: 'object',
      properties: {
        base: {
          type: 'object',
          required: ['family', 'size', 'weight'],
          properties: {
            family: {
              type: 'object',
              required: ['base', 'heading'],
              properties: {
                base: { type: 'string' },
                heading: { type: 'string' }
              }
            },
            size: {
              type: 'object',
              required: ['base'],
              properties: {
                base: { type: 'string' }
              }
            },
            weight: {
              type: 'object',
              required: ['normal', 'medium', 'semibold', 'bold'],
              properties: {
                normal: { type: 'string' },
                medium: { type: 'string' },
                semibold: { type: 'string' },
                bold: { type: 'string' }
              }
            }
          }
        }
      }
    },
    spacing: {
      type: 'object',
      properties: {
        base: {
          type: 'object',
          required: ['4'],
          properties: {
            '4': {
              type: 'object',
              required: ['$value', '$type', '$description'],
              properties: {
                $value: { type: 'string' },
                $type: { type: 'string', enum: ['dimension'] },
                $description: { type: 'string' }
              }
            }
          }
        }
      }
    }
  },
  definitions: {
    colorToken: {
      type: 'object',
      required: ['$value', '$type', '$description'],
      properties: {
        $value: { type: 'string', format: 'color' },
        $type: { type: 'string', enum: ['color'] },
        $description: { type: 'string' }
      }
    }
  }
};

// Initialize Ajv with formats
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(tokenSchema);

// Function to validate a single token file
function validateTokenFile(filePath) {
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const valid = validate(content);
    
    if (!valid) {
      console.error(`\nValidation errors in ${filePath}:`);
      validate.errors.forEach(error => {
        console.error(`- ${error.instancePath}: ${error.message}`);
      });
      return false;
    }
    
    return true;
  } catch (error) {
    console.error(`Error validating ${filePath}:`, error.message);
    return false;
  }
}

// Function to validate all token files
function validateAllTokens() {
  const tokensDir = path.join(__dirname, '../../tokens');
  const files = fs.readdirSync(tokensDir);
  let allValid = true;
  
  console.log('Starting token validation...\n');
  
  files.forEach(file => {
    if (file.endsWith('.json')) {
      const filePath = path.join(tokensDir, file);
      console.log(`Validating ${file}...`);
      const isValid = validateTokenFile(filePath);
      if (!isValid) {
        allValid = false;
      }
    }
  });
  
  if (allValid) {
    console.log('\n✅ All tokens are valid!');
  } else {
    console.error('\n❌ Token validation failed!');
    process.exit(1);
  }
}

// Run validation
validateAllTokens(); 