module.exports = {
  // Build-time validation
  buildTime: {
    validateSchema: true,
    validateUnits: true,
    validateReferences: true,
    validateStructure: true
  },
  
  // Runtime validation
  runtime: {
    noUnitConversion: true,
    noDynamicResolution: true,
    strictTypeChecking: true
  },
  
  // CI/CD validation
  ci: {
    blockInvalidTokens: true,
    requireSnapshotMatch: true,
    validateDesignToolCompatibility: true
  }
}; 