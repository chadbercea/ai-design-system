# Design Tokens Community Group (DTCG) Specification

## Overview
The DTCG specification provides a standardized format for design tokens, ensuring consistency and interoperability across different tools and platforms. Style Dictionary implements this specification to ensure compatibility with other design token tools.

## Token Structure

### Basic Token
```json
{
  "color": {
    "base": {
      "gray": {
        "light": {
          "$value": "#CCCCCC",
          "$type": "color",
          "$description": "Light gray color"
        }
      }
    }
  }
}
```

### Required Properties
- `$value`: The actual value of the token
- `$type`: The type of the token (e.g., color, size, typography)
- `$description`: A description of the token's purpose

### Optional Properties
- `$extensions`: Platform-specific extensions
- `$metadata`: Additional metadata about the token
- `$comment`: Developer comments

## Token Types

### Color
```json
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

### Typography
```json
{
  "typography": {
    "heading": {
      "h1": {
        "$value": {
          "fontFamily": "Roboto",
          "fontSize": "32px",
          "fontWeight": "700",
          "lineHeight": "1.2"
        },
        "$type": "typography",
        "$description": "Heading 1 typography"
      }
    }
  }
}
```

### Size
```json
{
  "size": {
    "spacing": {
      "small": {
        "$value": "8px",
        "$type": "dimension",
        "$description": "Small spacing unit"
      }
    }
  }
}
```

## Reference System

### Direct References
```json
{
  "color": {
    "base": {
      "primary": {
        "$value": "#FF0000",
        "$type": "color"
      },
      "secondary": {
        "$value": "{color.base.primary}",
        "$type": "color"
      }
    }
  }
}
```

### Computed References
```json
{
  "size": {
    "spacing": {
      "base": {
        "$value": "8px",
        "$type": "dimension"
      },
      "double": {
        "$value": "{size.spacing.base} * 2",
        "$type": "dimension"
      }
    }
  }
}
```

## Platform Extensions

### CSS Custom Properties
```json
{
  "color": {
    "base": {
      "primary": {
        "$value": "#FF0000",
        "$type": "color",
        "$extensions": {
          "css": {
            "customProperty": "--color-primary"
          }
        }
      }
    }
  }
}
```

### Platform-Specific Values
```json
{
  "typography": {
    "heading": {
      "h1": {
        "$value": {
          "fontFamily": "Roboto",
          "fontSize": "32px"
        },
        "$type": "typography",
        "$extensions": {
          "ios": {
            "fontSize": "28px"
          }
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

### 2. Value Management
- Use appropriate types
- Include descriptions
- Add metadata when needed
- Use references effectively

### 3. Platform Compatibility
- Use platform extensions
- Handle platform-specific values
- Maintain cross-platform consistency
- Document platform differences

## Implementation in Style Dictionary

### Configuration
```json
{
  "source": ["tokens/**/*.json"],
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

### Custom Transforms
```javascript
StyleDictionary.registerTransform({
  name: 'dtcg/color/hex',
  type: 'value',
  matcher: (prop) => prop.$type === 'color',
  transformer: (prop) => prop.$value
});
```

## Validation

### Schema Validation
```json
{
  "$schema": "https://design-tokens.github.io/community-group/format/",
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

### Type Checking
- Validate token types
- Check value formats
- Verify references
- Ensure platform compatibility

## Resources

- [DTCG Specification](https://design-tokens.github.io/community-group/format/)
- [Style Dictionary DTCG Support](https://styledictionary.com/info/dtcg/)
- [Example Tokens](https://design-tokens.github.io/community-group/format/examples/)
- [Validation Tools](https://design-tokens.github.io/community-group/format/tools/)