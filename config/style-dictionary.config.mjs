import StyleDictionary from 'style-dictionary';

// Register fontSize/number transform
StyleDictionary.registerTransform({
  name: 'fontSize/number',
  type: 'value',
  matcher: (prop) => prop.attributes.category === 'fontSizes' || prop.path.includes('fontSize'),
  transform: (prop) => {
    const value = prop.$value || prop.value;
    if (typeof value === 'string' && value.endsWith('px')) {
      return parseFloat(value);
    }
    return value;
  }
});

// Register custom format for valid JS identifiers
StyleDictionary.registerFormat({
  name: 'custom/es6-flat',
  format: function({ dictionary }) {
    function makeIdentifier(token) {
      return token.path.map((part, i) => {
        // Handle 'a' + digits (e.g., a50) for alpha colors
        if (/^a\d+$/i.test(part)) {
          return 'A' + part.slice(1);
        }
        // Just digits: use as-is (Blue50, not BlueValue50)
        if (/^\d+$/.test(part)) {
          return part;
        }
        // PascalCase everything else
        return part.charAt(0).toUpperCase() + part.slice(1);
      }).join('');
    }

    let lines = ['export default {'];
    dictionary.allTokens.forEach(token => {
      const key = makeIdentifier(token);
      const value = JSON.stringify(token.$value);
      lines.push(`  "${key}": ${value},`);
    });
    lines.push('};');
    return lines.join('\n');
  }
});

// Export Style Dictionary config
export default {
  source: ['token-studio-sync-provider/DDS Foundations.json'],
  platforms: {
    js: {
      transformGroup: 'js',
      transforms: ['attribute/cti', 'fontSize/number'],
      buildPath: 'build/',
      files: [{
        destination: 'tokens.mjs',
        format: 'custom/es6-flat',
        options: {
          outputReferences: false
        }
      }]
    }
  }
}; 