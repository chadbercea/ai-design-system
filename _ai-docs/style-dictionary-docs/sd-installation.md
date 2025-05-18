# Style Dictionary Installation and Setup Guide

## Installation

### 1. Basic Installation
```bash
npm install style-dictionary --save-dev
```

### 2. Global Installation (Optional)
```bash
npm install -g style-dictionary
```

## Quick Start

### 1. Initialize Project
```bash
mkdir design-system
cd design-system
npm init -y
npm install style-dictionary --save-dev
```

### 2. Create Basic Structure
```bash
mkdir -p tokens config/transforms build scripts
```

### 3. Create Initial Token File
```json
// tokens/colors.json
{
  "color": {
    "base": {
      "primary": {
        "$value": "#FF0000",
        "$type": "color",
        "$description": "Primary brand color"
      }
    }
  }
}
```

### 4. Create Configuration
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

### 5. Add Build Scripts
```json
// package.json
{
  "scripts": {
    "build": "style-dictionary build",
    "watch": "style-dictionary build --watch"
  }
}
```

## Advanced Setup

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

### 3. Platform-Specific Configuration
```json
// config/config.json
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

## Development Workflow

### 1. Local Development
```bash
npm run watch
```

### 2. Production Build
```bash
npm run build
```

### 3. Clean Build
```bash
rm -rf build/*
```

## Integration with Design Tools

### 1. Figma Integration
- Export tokens from Figma
- Convert to Style Dictionary format
- Import into your project

### 2. Sketch Integration
- Use Sketch Tokens plugin
- Export to JSON
- Convert to Style Dictionary format

### 3. Adobe XD Integration
- Use XD Tokens plugin
- Export to JSON
- Convert to Style Dictionary format

## Common Issues and Solutions

### 1. Build Errors
- Check file paths
- Verify JSON syntax
- Ensure proper configuration

### 2. Transform Issues
- Validate transform names
- Check transform order
- Verify transform compatibility

### 3. Output Problems
- Check format availability
- Verify platform configuration
- Ensure proper file permissions

## Best Practices

### 1. Project Structure
- Use semantic naming
- Group related tokens
- Maintain consistent structure
- Document token usage

### 2. Configuration
- Keep configurations modular
- Use transform groups
- Document custom transforms
- Version control configurations

### 3. Build Process
- Use appropriate build scripts
- Implement watch mode
- Clean build directory
- Cache when possible

## Resources

### Documentation
- [Style Dictionary Documentation](https://styledictionary.com)
- [Installation Guide](https://styledictionary.com/getting-started/installation/)
- [Configuration Reference](https://styledictionary.com/reference/config/)
- [API Reference](https://styledictionary.com/reference/)

### Tools
- [Figma Tokens](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens)
- [Sketch Tokens](https://github.com/sketch-hq/sketch-tokens)
- [XD Tokens](https://github.com/adobe/xd-tokens)

### Community
- [GitHub Repository](https://github.com/amzn/style-dictionary)
- [Example Projects](https://styledictionary.com/examples/)
- [Community Examples](https://github.com/amzn/style-dictionary/tree/main/examples/community)

## Next Steps

1. **Explore Examples**
   - Review example projects
   - Study community examples
   - Understand best practices

2. **Customize Setup**
   - Add custom transforms
   - Create custom formats
   - Configure platforms

3. **Integrate with Tools**
   - Set up design tool integration
   - Configure export process
   - Automate token updates

4. **Optimize Workflow**
   - Implement watch mode
   - Set up CI/CD
   - Monitor build performance