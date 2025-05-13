const path = require('path');

module.exports = {
  // Directory to watch
  watchDir: path.join(__dirname, '../../token-studio-sync-provider'),
  
  // File patterns to watch
  patterns: ['*.json', '**/*.json'],
  
  // Files to ignore
  ignore: ['node_modules/**/*'],
  
  // Validation settings
  validation: {
    // Enable/disable specific validations
    structure: true,
    references: true,
    designTools: true,
    
    // Design tool compatibility
    designTools: {
      figma: true,
      tokensStudio: true
    },
    
    // Output settings
    output: {
      verbose: true,
      colors: true,
      showWarnings: true
    }
  },
  
  // Schema settings
  schema: {
    allowUnionTypes: true, // Fix for strict mode warnings
    strictTypes: true
  }
}; 