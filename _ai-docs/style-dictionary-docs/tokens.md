# Style Dictionary Tokens Guide

## Token Structure

### 1. Basic Token

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

### 2. Token with References

```json
{
  "color": {
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

### 3. Composite Token

```json
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

## Token Types

### 1. Color Tokens

```json
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

### 2. Typography Tokens

```json
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

### 3. Spacing Tokens

```json
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

## Token Attributes

### 1. Required Attributes

```json
{
  "token": {
    "name": {
      "$value": "value",
      "$type": "type",
      "$description": "description"
    }
  }
}
```

### 2. Optional Attributes

```json
{
  "token": {
    "name": {
      "$value": "value",
      "$type": "type",
      "$description": "description",
      "$extensions": {
        "custom": "extension"
      },
      "$metadata": {
        "version": "1.0.0"
      }
    }
  }
}
```

### 3. Platform-Specific Attributes

```json
{
  "token": {
    "name": {
      "$value": {
        "web": "8px",
        "ios": "8pt",
        "android": "8dp"
      },
      "$type": "size",
      "$description": "Platform-specific size"
    }
  }
}
```

## Token Organization

### 1. By Category

```json
{
  "color": {
    "base": {},
    "semantic": {}
  },
  "typography": {
    "scale": {},
    "family": {}
  },
  "spacing": {
    "base": {},
    "scale": {}
  }
}
```

### 2. By Component

```json
{
  "component": {
    "button": {
      "primary": {
        "background": {
          "$value": "{color.base.primary}",
          "$type": "color"
        },
        "text": {
          "$value": "#FFFFFF",
          "$type": "color"
        }
      }
    }
  }
}
```

### 3. By Theme

```json
{
  "theme": {
    "light": {
      "background": {
        "$value": "#FFFFFF",
        "$type": "color"
      },
      "text": {
        "$value": "#000000",
        "$type": "color"
      }
    },
    "dark": {
      "background": {
        "$value": "#000000",
        "$type": "color"
      },
      "text": {
        "$value": "#FFFFFF",
        "$type": "color"
      }
    }
  }
}
```

## Best Practices

### 1. Naming Conventions

- Use semantic names
- Follow consistent patterns
- Group related tokens
- Document naming rules

### 2. References

- Use references for derived values
- Keep reference chains short
- Document reference relationships
- Validate reference integrity

### 3. Organization

- Group related tokens
- Use consistent structure
- Document token purposes
- Maintain clear hierarchy

## Common Patterns

### 1. Design System Tokens

```json
{
  "design": {
    "system": {
      "version": {
        "$value": "1.0.0",
        "$type": "string"
      },
      "name": {
        "$value": "My Design System",
        "$type": "string"
      }
    }
  }
}
```

### 2. Component Tokens

```json
{
  "component": {
    "button": {
      "primary": {
        "background": {
          "$value": "{color.base.primary}",
          "$type": "color"
        },
        "text": {
          "$value": "#FFFFFF",
          "$type": "color"
        }
      }
    }
  }
}
```

### 3. Animation Tokens

```json
{
  "animation": {
    "duration": {
      "fast": {
        "$value": "0.2s",
        "$type": "time"
      },
      "slow": {
        "$value": "0.4s",
        "$type": "time"
      }
    }
  }
}
```

## Resources

### Documentation
- [Style Dictionary Documentation](https://styledictionary.com)
- [Token Reference](https://styledictionary.com/info/tokens/)
- [Best Practices](https://styledictionary.com/info/best-practices/)

### Community
- [GitHub Repository](https://github.com/amzn/style-dictionary)
- [Example Projects](https://styledictionary.com/examples/)
- [Community Examples](https://github.com/amzn/style-dictionary/tree/main/examples/community)