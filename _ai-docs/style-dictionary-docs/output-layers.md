# Style Dictionary Output Layers

## 1. Base Token Layer
```json
{
  "color": {
    "primary": {
      "main": { "value": "#1976d2" },
      "light": { "value": "#42a5f5" },
      "dark": { "value": "#1565c0" }
    }
  },
  "spacing": {
    "base": { "value": 8 }
  }
}
```

## 2. Platform-Specific Transform Layer

### MUI Theme Output
```javascript
// build/mui/theme.js
module.exports = {
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    }
  },
  spacing: 8
};
```

### Tailwind Config Output
```javascript
// build/tailwind/theme.js
module.exports = {
  theme: {
    colors: {
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0'
      }
    },
    spacing: {
      base: '8px'
    }
  }
};
```

### CSS Variables Output
```css
/* build/css/variables.css */
:root {
  --color-primary-main: #1976d2;
  --color-primary-light: #42a5f5;
  --color-primary-dark: #1565c0;
  --spacing-base: 8px;
}
```

### React Native Output
```javascript
// build/react-native/theme.js
module.exports = {
  colors: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    }
  },
  spacing: {
    base: 8
  }
};
```

## 3. Component-Specific Layer

### MUI Components
```javascript
// build/mui/components.js
module.exports = {
  MuiButton: {
    styleOverrides: {
      root: {
        padding: 'var(--spacing-base)',
        backgroundColor: 'var(--color-primary-main)'
      }
    }
  }
};
```

### Tailwind Components
```javascript
// build/tailwind/components.js
module.exports = {
  '.btn-primary': {
    padding: 'var(--spacing-base)',
    backgroundColor: 'var(--color-primary-main)'
  }
};
```

## 4. Type Definitions Layer
```typescript
// build/types/theme.d.ts
export interface Theme {
  colors: {
    primary: {
      main: string;
      light: string;
      dark: string;
    };
  };
  spacing: {
    base: number;
  };
}
```

## Configuration Strategy

1. **Base Configuration**
```javascript
// style-dictionary.config.js
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    mui: {
      transformGroup: 'js',
      buildPath: 'build/mui/',
      files: [{
        destination: 'theme.js',
        format: 'javascript/mui-theme'
      }]
    },
    tailwind: {
      transformGroup: 'js',
      buildPath: 'build/tailwind/',
      files: [{
        destination: 'theme.js',
        format: 'javascript/tailwind'
      }]
    },
    css: {
      transformGroup: 'css',
      buildPath: 'build/css/',
      files: [{
        destination: 'variables.css',
        format: 'css/variables'
      }]
    },
    reactNative: {
      transformGroup: 'js',
      buildPath: 'build/react-native/',
      files: [{
        destination: 'theme.js',
        format: 'javascript/react-native'
      }]
    }
  }
};
```

2. **Build Process**
```javascript
// scripts/build-tokens.js
const StyleDictionary = require('style-dictionary');

// Register custom formats
StyleDictionary.registerFormat({
  name: 'javascript/mui-theme',
  formatter: function(dictionary, config) {
    // Transform tokens for MUI
  }
});

StyleDictionary.registerFormat({
  name: 'javascript/tailwind',
  formatter: function(dictionary, config) {
    // Transform tokens for Tailwind
  }
});

// Build all platforms
StyleDictionary.buildAllPlatforms();
```

## Best Practices

1. **Token Organization**
   - Keep primitive tokens in base layer
   - Use consistent naming across platforms
   - Document token transformations

2. **Build Process**
   - Watch for token changes
   - Validate output formats
   - Generate type definitions

3. **Platform Integration**
   - Test each platform's output
   - Verify token usage
   - Document platform-specific requirements

4. **Maintenance**
   - Version control all layers
   - Document breaking changes
   - Maintain platform compatibility 