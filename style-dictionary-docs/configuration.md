# Style Dictionary Configuration Guide

## Basic Configuration

### Configuration File
Create a `config.json` in your project root:
```json
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

## Configuration Options

### Source Files
```json
{
  "source": [
    "tokens/**/*.json",
    "!tokens/**/deprecated/*.json"  // Exclude deprecated tokens
  ]
}
```

### Platform Configuration
```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables",
        "filter": "isColor",
        "options": {
          "showFileHeader": true
        }
      }]
    }
  }
}
```

## Advanced Configuration

### Multiple Platforms
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
    "javascript": {
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

### Custom Transforms
```json
{
  "platforms": {
    "scss": {
      "transforms": [
        "attribute/cti",
        "name/cti/kebab",
        "size/px",
        "color/hex"
      ]
    }
  }
}
```

### Custom Transform Groups
```json
{
  "transformGroup": {
    "custom": [
      "attribute/cti",
      "name/cti/kebab",
      "size/px",
      "color/hex"
    ]
  }
}
```

### File Headers
```json
{
  "platforms": {
    "scss": {
      "files": [{
        "destination": "_variables.scss",
        "format": "scss/variables",
        "options": {
          "showFileHeader": true,
          "fileHeader": "Custom file header"
        }
      }]
    }
  }
}
```

## Configuration Properties

### Top Level Properties
- `source`: Array of paths to token files
- `platforms`: Object containing platform configurations
- `transformGroup`: Object containing transform group definitions
- `include`: Array of paths to include
- `exclude`: Array of paths to exclude

### Platform Properties
- `transformGroup`: Name of transform group to use
- `transforms`: Array of transforms to apply
- `buildPath`: Path to output directory
- `files`: Array of file configurations
- `actions`: Array of actions to run

### File Properties
- `destination`: Output file path
- `format`: Format to use
- `filter`: Filter to apply
- `options`: Format-specific options

## Common Use Cases

### CSS Variables
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

### JavaScript Module
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

### Multiple Formats
```json
{
  "platforms": {
    "scss": {
      "files": [
        {
          "destination": "_variables.scss",
          "format": "scss/variables"
        },
        {
          "destination": "_mixins.scss",
          "format": "scss/mixins"
        }
      ]
    }
  }
}
```

## Best Practices

### 1. Organization
- Use semantic naming for platforms
- Group related configurations
- Maintain consistent structure
- Document configuration choices

### 2. Performance
- Use appropriate filters
- Optimize transform chains
- Minimize file operations
- Cache when possible

### 3. Maintenance
- Keep configurations DRY
- Use transform groups
- Document custom transforms
- Version control configurations

## Troubleshooting

### Common Issues
1. **Path Resolution**
   - Check source paths
   - Verify build paths
   - Ensure file permissions

2. **Transform Errors**
   - Validate transform names
   - Check transform order
   - Verify transform compatibility

3. **Format Issues**
   - Confirm format availability
   - Check format options
   - Verify output structure

## Resources

- [Configuration Reference](https://styledictionary.com/reference/config/)
- [Transform Reference](https://styledictionary.com/reference/transforms/)
- [Format Reference](https://styledictionary.com/reference/formats/)
- [Example Configurations](https://styledictionary.com/examples/)