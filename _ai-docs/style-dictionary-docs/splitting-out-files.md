# Splitting Output Files in Style Dictionary

## Basic File Splitting

### 1. By Category

```json
// config/config.json
{
  "source": ["tokens/**/*.json"],
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [
        {
          "destination": "_colors.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "category": "color"
            }
          }
        },
        {
          "destination": "_typography.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "category": "typography"
            }
          }
        }
      ]
    }
  }
}
```

### 2. By Type

```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [
        {
          "destination": "_sizes.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "type": "size"
            }
          }
        },
        {
          "destination": "_colors.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "type": "color"
            }
          }
        }
      ]
    }
  }
}
```

### 3. By Component

```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [
        {
          "destination": "_button.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "component": "button"
            }
          }
        },
        {
          "destination": "_input.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "component": "input"
            }
          }
        }
      ]
    }
  }
}
```

## Advanced File Splitting

### 1. Multiple Filters

```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [
        {
          "destination": "_button-colors.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "component": "button",
              "type": "color"
            }
          }
        }
      ]
    }
  }
}
```

### 2. Custom Filters

```javascript
// config/filters/component.js
module.exports = {
  name: 'component',
  matcher: (prop) => {
    return prop.attributes.component === 'button';
  }
};
```

```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [
        {
          "destination": "_button.scss",
          "format": "scss/variables",
          "filter": "component"
        }
      ]
    }
  }
}
```

### 3. Platform-Specific Splitting

```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [
        {
          "destination": "_web.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "platform": "web"
            }
          }
        }
      ]
    },
    "ios": {
      "transformGroup": "ios",
      "buildPath": "build/ios/",
      "files": [
        {
          "destination": "tokens.swift",
          "format": "ios/swift",
          "filter": {
            "attributes": {
              "platform": "ios"
            }
          }
        }
      ]
    }
  }
}
```

## Best Practices

### 1. File Organization

- Group related tokens
- Use semantic naming
- Maintain consistent structure
- Document file purposes

### 2. Filter Usage

- Use specific filters
- Combine filters when needed
- Create custom filters
- Document filter logic

### 3. Platform Considerations

- Consider platform needs
- Use platform-specific filters
- Test output files
- Validate platform compatibility

## Common Patterns

### 1. Design System Structure

```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/",
      "files": [
        {
          "destination": "_colors.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "category": "color"
            }
          }
        },
        {
          "destination": "_typography.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "category": "typography"
            }
          }
        },
        {
          "destination": "_spacing.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "category": "spacing"
            }
          }
        }
      ]
    }
  }
}
```

### 2. Component Structure

```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/components/",
      "files": [
        {
          "destination": "_button.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "component": "button"
            }
          }
        },
        {
          "destination": "_input.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "component": "input"
            }
          }
        }
      ]
    }
  }
}
```

### 3. Theme Structure

```json
{
  "platforms": {
    "scss": {
      "transformGroup": "scss",
      "buildPath": "build/scss/themes/",
      "files": [
        {
          "destination": "_light.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "theme": "light"
            }
          }
        },
        {
          "destination": "_dark.scss",
          "format": "scss/variables",
          "filter": {
            "attributes": {
              "theme": "dark"
            }
          }
        }
      ]
    }
  }
}
```

## Resources

### Documentation
- [Style Dictionary Documentation](https://styledictionary.com)
- [File Splitting Examples](https://styledictionary.com/examples/splitting-output-files/)
- [Filter Reference](https://styledictionary.com/reference/filters/)

### Community
- [GitHub Repository](https://github.com/amzn/style-dictionary)
- [Example Projects](https://styledictionary.com/examples/)
- [Community Examples](https://github.com/amzn/style-dictionary/tree/main/examples/community)