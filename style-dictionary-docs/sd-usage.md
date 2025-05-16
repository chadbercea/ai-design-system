# Style Dictionary Usage Guide

## Basic Usage

### 1. Creating Tokens

```json
// tokens/colors.json
{
  "color": {
    "base": {
      "primary": {
        "$value": "#FF0000",
        "$type": "color",
        "$description": "Primary brand color"
      },
      "secondary": {
        "$value": "#00FF00",
        "$type": "color",
        "$description": "Secondary brand color"
      }
    }
  }
}
```

### 2. Using References

```json
// tokens/typography.json
{
  "typography": {
    "heading": {
      "h1": {
        "$value": {
          "fontFamily": "{font.family.primary}",
          "fontSize": "32px",
          "fontWeight": "700",
          "color": "{color.base.primary}"
        },
        "$type": "typography",
        "$description": "Heading 1 typography"
      }
    }
  }
}
```

### 3. Platform-Specific Values

```json
// tokens/spacing.json
{
  "size": {
    "spacing": {
      "small": {
        "$value": "8px",
        "$type": "size",
        "$description": "Small spacing unit"
      },
      "medium": {
        "$value": "16px",
        "$type": "size",
        "$description": "Medium spacing unit"
      }
    }
  }
}
```

## Advanced Usage

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

### 3. Platform-Specific Output

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

## Common Use Cases

### 1. Color System

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
    },
    "semantic": {
      "error": {
        "$value": "{color.base.primary}",
        "$type": "color",
        "$description": "Error state color"
      }
    }
  }
}
```

### 2. Typography System

```json
// tokens/typography.json
{
  "typography": {
    "scale": {
      "base": {
        "$value": "16px",
        "$type": "size",
        "$description": "Base font size"
      }
    },
    "family": {
      "primary": {
        "$value": "Roboto, sans-serif",
        "$type": "fontFamily",
        "$description": "Primary font family"
      }
    }
  }
}
```

### 3. Spacing System

```json
// tokens/spacing.json
{
  "size": {
    "spacing": {
      "base": {
        "$value": "8px",
        "$type": "size",
        "$description": "Base spacing unit"
      },
      "scale": {
        "small": {
          "$value": "{size.spacing.base}",
          "$type": "size",
          "$description": "Small spacing"
        },
        "medium": {
          "$value": "calc({size.spacing.base} * 2)",
          "$type": "size",
          "$description": "Medium spacing"
        }
      }
    }
  }
}
```

## Best Practices

### 1. Token Organization

- Use semantic naming
- Group related tokens
- Maintain consistent structure
- Document token usage

### 2. References

- Use references for derived values
- Keep reference chains short
- Document reference relationships
- Validate reference integrity

### 3. Platform Support

- Define platform-specific values
- Use appropriate transforms
- Test output formats
- Validate platform compatibility

## Common Patterns

### 1. Design System Tokens

```json
// tokens/design-system.json
{
  "design": {
    "system": {
      "version": {
        "$value": "1.0.0",
        "$type": "string",
        "$description": "Design system version"
      },
      "name": {
        "$value": "My Design System",
        "$type": "string",
        "$description": "Design system name"
      }
    }
  }
}
```

### 2. Component Tokens

```json
// tokens/components/button.json
{
  "component": {
    "button": {
      "primary": {
        "background": {
          "$value": "{color.base.primary}",
          "$type": "color",
          "$description": "Primary button background"
        },
        "text": {
          "$value": "#FFFFFF",
          "$type": "color",
          "$description": "Primary button text"
        }
      }
    }
  }
}
```

### 3. Animation Tokens

```json
// tokens/animation.json
{
  "animation": {
    "duration": {
      "fast": {
        "$value": "0.2s",
        "$type": "time",
        "$description": "Fast animation duration"
      },
      "slow": {
        "$value": "0.4s",
        "$type": "time",
        "$description": "Slow animation duration"
      }
    }
  }
}
```

## Troubleshooting

### 1. Common Issues

- Reference resolution errors
- Transform compatibility
- Platform-specific issues
- Build configuration problems

### 2. Debugging

- Check token structure
- Validate references
- Test transforms
- Verify output formats

### 3. Performance

- Optimize token structure
- Minimize reference chains
- Use appropriate transforms
- Cache build results

## Resources

### Documentation
- [Style Dictionary Documentation](https://styledictionary.com)
- [Usage Guide](https://styledictionary.com/getting-started/usage/)
- [Examples](https://styledictionary.com/examples/)

### Community
- [GitHub Repository](https://github.com/amzn/style-dictionary)
- [Community Examples](https://github.com/amzn/style-dictionary/tree/main/examples/community)
- [Best Practices](https://styledictionary.com/info/best-practices/) 