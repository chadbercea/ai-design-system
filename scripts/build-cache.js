import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class BuildCache {
  constructor(options = {}) {
    this.cacheDir = options.cacheDir || path.join(__dirname, '../.cache');
    this.maxAge = options.maxAge || 24 * 60 * 60 * 1000; // 24 hours
    this.enabled = options.enabled !== false;
    
    // Ensure cache directory exists
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  /**
   * Generate a cache key for a file or set of files
   * @param {string|string[]} files - File path(s) to generate cache key for
   * @returns {string} Cache key
   */
  generateCacheKey(files) {
    const fileList = Array.isArray(files) ? files : [files];
    const fileContents = fileList.map(file => {
      try {
        return fs.readFileSync(file, 'utf8');
      } catch (error) {
        console.warn(`Warning: Could not read file ${file} for cache key generation`);
        return '';
      }
    }).join('');

    return crypto.createHash('md5').update(fileContents).digest('hex');
  }

  /**
   * Get cached build result
   * @param {string} key - Cache key
   * @returns {object|null} Cached result or null if not found/invalid
   */
  get(key) {
    if (!this.enabled) return null;

    const cacheFile = path.join(this.cacheDir, `${key}.json`);
    
    try {
      if (fs.existsSync(cacheFile)) {
        const cacheData = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
        
        // Check if cache is still valid
        if (Date.now() - cacheData.timestamp < this.maxAge) {
          return cacheData.data;
        }
        
        // Cache expired, remove it
        this.invalidate(key);
      }
    } catch (error) {
      console.warn(`Warning: Error reading cache for key ${key}:`, error.message);
    }
    
    return null;
  }

  /**
   * Store build result in cache
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   */
  set(key, data) {
    if (!this.enabled) return;

    const cacheFile = path.join(this.cacheDir, `${key}.json`);
    
    try {
      const cacheData = {
        timestamp: Date.now(),
        data
      };
      
      fs.writeFileSync(cacheFile, JSON.stringify(cacheData, null, 2));
    } catch (error) {
      console.warn(`Warning: Error writing cache for key ${key}:`, error.message);
    }
  }

  /**
   * Invalidate cache entry
   * @param {string} key - Cache key to invalidate
   */
  invalidate(key) {
    const cacheFile = path.join(this.cacheDir, `${key}.json`);
    
    try {
      if (fs.existsSync(cacheFile)) {
        fs.unlinkSync(cacheFile);
      }
    } catch (error) {
      console.warn(`Warning: Error invalidating cache for key ${key}:`, error.message);
    }
  }

  /**
   * Clear entire cache
   */
  clear() {
    try {
      const files = fs.readdirSync(this.cacheDir);
      files.forEach(file => {
        fs.unlinkSync(path.join(this.cacheDir, file));
      });
    } catch (error) {
      console.warn('Warning: Error clearing cache:', error.message);
    }
  }

  /**
   * Get cache statistics
   * @returns {object} Cache statistics
   */
  getStats() {
    try {
      const files = fs.readdirSync(this.cacheDir);
      const stats = {
        totalEntries: files.length,
        totalSize: 0,
        oldestEntry: null,
        newestEntry: null
      };

      files.forEach(file => {
        const filePath = path.join(this.cacheDir, file);
        const fileStats = fs.statSync(filePath);
        const cacheData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        
        stats.totalSize += fileStats.size;
        
        if (!stats.oldestEntry || cacheData.timestamp < stats.oldestEntry) {
          stats.oldestEntry = cacheData.timestamp;
        }
        
        if (!stats.newestEntry || cacheData.timestamp > stats.newestEntry) {
          stats.newestEntry = cacheData.timestamp;
        }
      });

      return stats;
    } catch (error) {
      console.warn('Warning: Error getting cache stats:', error.message);
      return null;
    }
  }
}

export default BuildCache; 