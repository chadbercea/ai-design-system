module.exports = {
  // Reference pattern matching
  patterns: {
    // Basic reference: {token.name}
    basic: /{([^}]+)}/,
    // Math expression: {token.name} * 2
    math: /{([^}]+)}\s*([+\-*/])\s*(\d+)/,
    // Nested reference: {token.name.subtoken}
    nested: /{([^}]+)\.([^}]+)}/
  },

  // Reference resolution rules
  resolveReference: function(reference, tokens) {
    // Handle basic references
    if (this.patterns.basic.test(reference)) {
      const tokenName = reference.match(this.patterns.basic)[1];
      return this.findToken(tokenName, tokens);
    }

    // Handle math expressions
    if (this.patterns.math.test(reference)) {
      const [_, tokenName, operator, value] = reference.match(this.patterns.math);
      const token = this.findToken(tokenName, tokens);
      return this.applyMath(token, operator, value);
    }

    // Handle nested references
    if (this.patterns.nested.test(reference)) {
      const [_, parentName, childName] = reference.match(this.patterns.nested);
      return this.findNestedToken(parentName, childName, tokens);
    }

    return null;
  },

  // Helper functions
  findToken: function(name, tokens) {
    return tokens[name] || null;
  },

  findNestedToken: function(parentName, childName, tokens) {
    const parent = tokens[parentName];
    return parent && parent[childName] ? parent[childName] : null;
  },

  applyMath: function(token, operator, value) {
    if (!token || !token.$value) return null;
    
    const numValue = parseFloat(token.$value);
    const numOperand = parseFloat(value);
    
    switch (operator) {
      case '+': return numValue + numOperand;
      case '-': return numValue - numOperand;
      case '*': return numValue * numOperand;
      case '/': return numValue / numOperand;
      default: return null;
    }
  },

  // Validation rules
  validation: {
    // Check for circular references
    hasCircularReference: function(reference, tokens, visited = new Set()) {
      if (visited.has(reference)) return true;
      visited.add(reference);

      const token = this.findToken(reference, tokens);
      if (!token || !token.$value) return false;

      const nestedRefs = token.$value.match(/{([^}]+)}/g) || [];
      return nestedRefs.some(ref => 
        this.hasCircularReference(ref.slice(1, -1), tokens, visited)
      );
    },

    // Validate reference chain
    validateReferenceChain: function(reference, tokens) {
      const visited = new Set();
      return !this.hasCircularReference(reference, tokens, visited);
    }
  }
}; 