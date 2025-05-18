const SDModule = await import('style-dictionary');
console.log('SDModule:', SDModule);
const StyleDictionary = SDModule.default;
console.log('StyleDictionary:', StyleDictionary);
import BuildCache from './build-cache.js';
import cacheConfig from '../config/build-cache.config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import config from '../config/style-dictionary.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize build cache
const buildCache = new BuildCache(cacheConfig);

// Function to check if cache is valid
function isCacheValid() {
  const cacheKey = buildCache.generateCacheKey(config.source);
  const cachedResult = buildCache.get(cacheKey);
  
  if (cachedResult) {
    console.log('Using cached build result');
    return true;
  }
  
  return false;
}

// Function to save build result to cache
function saveToCache(result) {
  const cacheKey = buildCache.generateCacheKey(config.source);
  buildCache.set(cacheKey, result);
}

// Main build function
async function build() {
  try {
    // Check if we can use cached result
    if (isCacheValid()) {
      return;
    }
    
    console.log('Building tokens...');
    console.log('Source files:', config.source);
    console.log('Build path:', config.platforms.js.buildPath);
    console.log('Config:', JSON.stringify(config, null, 2));
    
    // Register format BEFORE extending
    StyleDictionary.registerFormat({
      name: 'javascript/mui',
      format: function({ dictionary, file, options }) {
        return `export default ${JSON.stringify(dictionary.tokens, null, 2)}`;
      }
    });
    
    // Instantiate with config (ESM v5 requirement)
    const sd = new StyleDictionary(config);
    console.log('Style Dictionary instantiated with config');
    
    // Register only the custom CTI transform
    sd.registerTransform({
      name: 'attribute/cti',
      type: 'attribute',
      transform: (token) => {
        const [category, type, item] = token.path;
        return {
          category,
          type,
          item
        };
      }
    });

    // Use the built-in 'js' transform group in the platform definition
    // No custom transform group registration needed
    
    // Diagnostic step: Log raw tokens from the instance
    const rawTokens = sd.tokens;
    console.log('Raw tokens:', rawTokens);
    
    // Diagnostic step: Log token collisions and missing references
    const collisions = Object.entries(rawTokens).filter(([key, token]) => token.original?.collision);
    const missingRefs = Object.entries(rawTokens).filter(([key, token]) => token.original?.missingRef);
    console.log('Token collisions:', collisions.map(([key]) => key));
    console.log('Missing references:', missingRefs.map(([key]) => key));
    
    // Build AFTER instantiation
    try {
      console.log('Starting buildAllPlatforms()');
      await sd.buildAllPlatforms();
      console.log('buildAllPlatforms() completed');
    } catch (sdError) {
      console.error('Error during buildAllPlatforms:', sdError);
      throw sdError;
    }
    
    // Verify the output file exists
    const outputPath = path.join(process.cwd(), config.platforms.js.buildPath, config.platforms.js.files[0].destination);
    const fs = await import('fs/promises');
    
    try {
      await fs.access(outputPath);
      console.log('Output file created successfully:', outputPath);
    } catch (error) {
      console.error('Output file not found:', outputPath);
      process.exit(1);
    }
    
    console.log('Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    console.error('Error stack:', error.stack);
    process.exit(1);
  }
}

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('Watch mode enabled');
  
  // Use the same instance for watch mode
  const sd = new StyleDictionary(config);
  sd.watchAllPlatforms();
  
  // Watch adapter files
  const chokidar = await import('chokidar');
  const watcher = chokidar.watch(cacheConfig.invalidation.watchFiles, {
    ignored: /(^|[\/\\])\../,
    persistent: true
  });
  
  watcher.on('change', (path) => {
    console.log(`File ${path} has been changed`);
    buildCache.clear();
    build();
  });
} else {
  // One-time build
  if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
} 