module.exports = {
  // Token set naming rules
  naming: {
    // Allowed characters in set names
    pattern: /^[a-zA-Z0-9-_.]+$/,
    
    // Reserved set names
    reserved: ['base', 'global', 'theme', 'brand'],
    
    // Set name validation
    validate: function(name) {
      if (!this.pattern.test(name)) {
        throw new Error(`Invalid set name: ${name}. Use only letters, numbers, hyphens, dots, and underscores.`);
      }
      if (this.reserved.includes(name)) {
        throw new Error(`Reserved set name: ${name}. Choose a different name.`);
      }
      return true;
    }
  },

  // Token set organization rules
  organization: {
    // Maximum depth of nesting
    maxDepth: 2,
    
    // Allowed separators for nested sets
    separators: ['/', '.'],
    
    // Validate set structure
    validate: function(sets) {
      for (const [name, set] of Object.entries(sets)) {
        // Check nesting depth
        const depth = name.split(/[/.]/).length;
        if (depth > this.maxDepth) {
          throw new Error(`Set ${name} exceeds maximum nesting depth of ${this.maxDepth}`);
        }
        
        // Check for duplicate tokens within set
        this.validateDuplicateTokens(set);
      }
      return true;
    },
    
    // Check for duplicate tokens within a set
    validateDuplicateTokens: function(set) {
      const seen = new Set();
      for (const token of Object.keys(set)) {
        if (seen.has(token)) {
          throw new Error(`Duplicate token ${token} found in set`);
        }
        seen.add(token);
      }
    }
  },

  // Token set merging rules
  merging: {
    // Merge multiple sets into one
    merge: function(sets, options = {}) {
      const result = {};
      const order = options.order || Object.keys(sets);
      
      for (const setName of order) {
        const set = sets[setName];
        if (!set) continue;
        
        // Merge tokens, with later sets overriding earlier ones
        Object.assign(result, set);
      }
      
      return result;
    },
    
    // Split a set into multiple sets based on rules
    split: function(set, rules) {
      const result = {};
      
      for (const [name, token] of Object.entries(set)) {
        const targetSet = this.determineTargetSet(name, token, rules);
        if (!result[targetSet]) {
          result[targetSet] = {};
        }
        result[targetSet][name] = token;
      }
      
      return result;
    },
    
    // Determine which set a token belongs to
    determineTargetSet: function(name, token, rules) {
      // Default to 'other' if no rules match
      let targetSet = 'other';
      
      // Check each rule
      for (const [setName, rule] of Object.entries(rules)) {
        if (rule(name, token)) {
          targetSet = setName;
          break;
        }
      }
      
      return targetSet;
    }
  },

  // Token set validation
  validation: {
    // Validate a single set
    validateSet: function(set) {
      // Check structure
      if (typeof set !== 'object') {
        throw new Error('Set must be an object');
      }
      
      // Check each token
      for (const [name, token] of Object.entries(set)) {
        this.validateToken(name, token);
      }
      
      return true;
    },
    
    // Validate a single token
    validateToken: function(name, token) {
      // Check required fields
      if (!token.$type || !token.$value || !token.$description) {
        throw new Error(`Token ${name} is missing required fields`);
      }
      
      // Check type validity
      if (!this.isValidType(token.$type)) {
        throw new Error(`Invalid type ${token.$type} for token ${name}`);
      }
      
      return true;
    },
    
    // Check if type is valid
    isValidType: function(type) {
      const validTypes = [
        'color', 'fontSizes', 'fontWeights', 'fontFamilies',
        'lineHeight', 'letterSpacing', 'borderRadius', 'borderWidth',
        'spacing', 'sizing', 'opacity', 'boxShadow', 'typography',
        'paragraphSpacing', 'textCase', 'textDecoration', 'composition',
        'dimension', 'breakpoints', 'border', 'zIndex', 'duration',
        'assets', 'boolean', 'text', 'number', 'other'
      ];
      
      return validTypes.includes(type);
    }
  }
}; 