export default {
  // Cache directory location
  cacheDir: '.cache',
  
  // Maximum age of cache entries (in milliseconds)
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  
  // Whether caching is enabled
  enabled: true,
  
  // Cache invalidation rules
  invalidation: {
    // Invalidate cache when these files change
    watchFiles: [
      'tokens/**/*.json',
      'adapters/**/*.js',
      'scripts/**/*.js'
    ],
    
    // Invalidate cache when these environment variables change
    watchEnv: [
      'NODE_ENV',
      'BUILD_MODE'
    ]
  },
  
  // Cache groups
  groups: {
    // Token processing cache
    tokens: {
      key: 'tokens',
      files: ['tokens/**/*.json'],
      maxAge: 12 * 60 * 60 * 1000 // 12 hours
    },
    
    // MUI theme cache
    muiTheme: {
      key: 'mui-theme',
      files: [
        'tokens/**/*.json',
        'adapters/mapTokensToMuiTheme.js'
      ],
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    
    // Tailwind config cache
    tailwindConfig: {
      key: 'tailwind-config',
      files: [
        'tokens/**/*.json',
        'adapters/mapTokensToTailwindConfig.js'
      ],
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    },
    
    // V0 theme cache
    v0Theme: {
      key: 'v0-theme',
      files: [
        'tokens/**/*.json',
        'adapters/mapTokensToV0Theme.js'
      ],
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  },
  
  // Performance settings
  performance: {
    // Maximum number of cache entries
    maxEntries: 1000,
    
    // Maximum total cache size (in bytes)
    maxSize: 100 * 1024 * 1024, // 100MB
    
    // Compression settings
    compression: {
      enabled: true,
      level: 6 // 0-9, higher means better compression but slower
    }
  },
  
  // Debug settings
  debug: {
    // Enable debug logging
    enabled: false,
    
    // Log cache hits
    logHits: true,
    
    // Log cache misses
    logMisses: true,
    
    // Log cache invalidations
    logInvalidations: true
  }
}; 