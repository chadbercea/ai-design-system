# Style Dictionary Configuration Guide

## Basic Configuration

### 1. Main Configuration File

```json
// config/config.json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables"
      }]
    }
  }
}
```

### 2. Source Configuration

```json
{
  "source": [
    "tokens/**/*.json",
    "!tokens/**/deprecated/*.json"
  ]
}
```

### 3. Platform Configuration

```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables"
      }]
    },
    "css": {
      "transformGroup": "css",
      "buildPath": "build/css/",
      "files": [{
        "destination": "variables.css",
        "format": "css/variables"
      }]
    }
  }
}
```

## Advanced Configuration

### 1. Custom Transforms

```javascript
// config/transforms/size.js
module.exports = {
  name: 'size/px',
  type: 'value',
  matcher: (prop) => prop.attributes.category === 'size',
  transformer: (prop) => `${prop.value}px`
};
```

### 2. Custom Formats

```javascript
// config/formats/custom.js
module.exports = {
  name: 'custom/format',
  formatter: (dictionary, config) => {
    return dictionary.allProperties
      .map(prop => `${prop.name}: ${prop.value}`)
      .join('\n');
  }
};
```

### 3. Custom Transform Groups

```javascript
// config/transformGroups/custom.js
module.exports = {
  name: 'custom',
  transforms: [
    'size/px',
    'color/hex',
    'custom/transform'
  ]
};
```

## Platform-Specific Configuration

### 1. SCSS Configuration

```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables"
      }]
    }
  }
}
```

### 2. CSS Configuration

```json
{
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "build/css/",
      "files": [{
        "destination": "variables.css",
        "format": "css/variables"
      }]
    }
  }
}
```

### 3. JavaScript Configuration

```json
{
  "platforms": {
    "js": {
      "transformGroup": "js",
      "buildPath": "build/js/",
      "files": [{
        "destination": "tokens.js",
        "format": "javascript/module"
      }]
    }
  }
}
```

## Customization Options

### 1. Token Structure

```json
{
  "token": {
    "category": {
      "type": {
        "item": {
          "$value": "value",
          "$type": "type",
          "$description": "description"
        }
      }
    }
  }
}
```

### 2. Reference Resolution

```json
{
  "color": {
    "base": {
      "primary": {
        "$value": "#FF0000",
        "$type": "color"
      }
    },
    "semantic": {
      "error": {
        "$value": "{color.base.primary}",
        "$type": "color"
      }
    }
  }
}
```

### 3. Platform-Specific Values

```json
{
  "size": {
    "spacing": {
      "small": {
        "$value": {
          "web": "8px",
          "ios": "8pt",
          "android": "8dp"
        },
        "$type": "size"
      }
    }
  }
}
```

## Build Configuration

### 1. Build Script

```javascript
// scripts/build.js
const StyleDictionary = require('style-dictionary');

StyleDictionary.extend('./config/config.json')
  .buildAllPlatforms();
```

### 2. Watch Script

```javascript
// scripts/watch.js
const StyleDictionary = require('style-dictionary');

StyleDictionary.extend('./config/config.json')
  .buildAllPlatforms()
  .watch();
```

### 3. Clean Script

```javascript
// scripts/clean.js
const rimraf = require('rimraf');

rimraf.sync('build/*');
```

## Best Practices

### 1. Configuration Organization

- Keep configurations modular
- Use transform groups
- Document custom transforms
- Version control configurations

### 2. Platform Support

- Define platform-specific values
- Use appropriate transforms
- Test output formats
- Validate platform compatibility

### 3. Build Process

- Use appropriate build scripts
- Implement watch mode
- Clean build directory
- Cache when possible

## Resources

### Documentation
- [Style Dictionary Documentation](https://styledictionary.com)
- [Configuration Reference](https://styledictionary.com/reference/config/)
- [API Reference](https://styledictionary.com/reference/)

### Community
- [GitHub Repository](https://github.com/amzn/style-dictionary)
- [Example Projects](https://styledictionary.com/examples/)
- [Community Examples](https://github.com/amzn/style-dictionary/tree/main/examples/community) 