import StyleDictionary from 'style-dictionary';
import BuildCache from './build-cache.js';
import cacheConfig from '../config/build-cache.config.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize build cache
const buildCache = new BuildCache(cacheConfig);

// Configure Style Dictionary (use create for ESM)
const StyleDictionaryExtended = StyleDictionary.create({
  source: ['tokens/**/*.json'],
  platforms: {
    js: {
      transformGroup: 'js',
      buildPath: 'build/',
      files: [{
        destination: 'tokens.js',
        format: 'javascript/module',
        options: {
          showFileHeader: true
        }
      }]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          showFileHeader: true
        }
      }]
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/scss/',
      files: [{
        destination: '_variables.scss',
        format: 'scss/variables',
        options: {
          showFileHeader: true
        }
      }]
    }
  }
});

// Function to check if cache is valid
function isCacheValid() {
  const cacheKey = buildCache.generateCacheKey(cacheConfig.groups.tokens.files);
  const cachedResult = buildCache.get(cacheKey);
  
  if (cachedResult) {
    console.log('Using cached build result');
    return true;
  }
  
  return false;
}

// Function to save build result to cache
function saveToCache(result) {
  const cacheKey = buildCache.generateCacheKey(cacheConfig.groups.tokens.files);
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
    
    // Build tokens
    const result = await StyleDictionaryExtended.buildAllPlatforms();
    
    // Save to cache
    saveToCache(result);
    
    console.log('Build complete!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

// Watch mode
if (process.argv.includes('--watch')) {
  console.log('Watch mode enabled');
  
  // Watch token files
  StyleDictionaryExtended.watchAllPlatforms();
  
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
  build();
} 