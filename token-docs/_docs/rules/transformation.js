const classification = require('./classification');
const references = require('./references');

module.exports = {
  // Transformation pipeline steps
  steps: [
    'validate',
    'classify',
    'resolveReferences',
    'normalizeUnits',
    'transform',
    'validate'
  ],

  // Transform tokens from one format to another
  transform: function(tokens, targetFormat) {
    const pipeline = this.steps;
    let result = { ...tokens };

    for (const step of pipeline) {
      result = this[step](result, targetFormat);
      if (!result) return null; // Stop if any step fails
    }

    return result;
  },

  // Validation step
  validate: function(tokens, targetFormat) {
    // Validate token structure
    for (const [name, token] of Object.entries(tokens)) {
      if (!this.isValidToken(token)) {
        throw new Error(`Invalid token structure: ${name}`);
      }
    }
    return tokens;
  },

  // Classification step
  classify: function(tokens, targetFormat) {
    const result = {};
    for (const [name, token] of Object.entries(tokens)) {
      token.classification = classification.classifyToken(token);
      result[name] = token;
    }
    return result;
  },

  // Reference resolution step
  resolveReferences: function(tokens, targetFormat) {
    const result = { ...tokens };
    for (const [name, token] of Object.entries(tokens)) {
      if (typeof token.$value === 'string' && token.$value.includes('{')) {
        token.$value = references.resolveReference(token.$value, tokens);
      }
    }
    return result;
  },

  // Unit normalization step
  normalizeUnits: function(tokens, targetFormat) {
    const result = { ...tokens };
    for (const [name, token] of Object.entries(tokens)) {
      if (this.hasUnit(token.$value)) {
        token.$value = this.normalizeUnit(token.$value, targetFormat);
      }
    }
    return result;
  },

  // Format transformation step
  transform: function(tokens, targetFormat) {
    switch (targetFormat) {
      case 'css':
        return this.toCSS(tokens);
      case 'scss':
        return this.toSCSS(tokens);
      case 'json':
        return this.toJSON(tokens);
      default:
        throw new Error(`Unsupported target format: ${targetFormat}`);
    }
  },

  // Helper functions
  isValidToken: function(token) {
    return token && 
           typeof token === 'object' &&
           token.$type &&
           token.$value !== undefined &&
           token.$description;
  },

  hasUnit: function(value) {
    return typeof value === 'string' && 
           /^\d+(px|rem|em|%|ms)$/.test(value);
  },

  normalizeUnit: function(value, targetFormat) {
    // Convert units based on target format
    const [num, unit] = value.match(/^(\d+)(\w+)$/).slice(1);
    switch (targetFormat) {
      case 'css':
        return value; // Keep original units
      case 'scss':
        return `$${num}${unit}`; // SCSS variable format
      default:
        return value;
    }
  },

  // Format-specific transformations
  toCSS: function(tokens) {
    const result = {};
    for (const [name, token] of Object.entries(tokens)) {
      result[`--${name}`] = token.$value;
    }
    return result;
  },

  toSCSS: function(tokens) {
    const result = {};
    for (const [name, token] of Object.entries(tokens)) {
      result[`$${name}`] = token.$value;
    }
    return result;
  },

  toJSON: function(tokens) {
    return tokens; // Already in JSON format
  }
}; 