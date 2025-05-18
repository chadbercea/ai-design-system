# Style Dictionary Examples

## Basic Examples

### 1. Simple Color Tokens
```json
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

### 2. Typography System
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
      },
      "h2": {
        "$value": {
          "fontFamily": "Roboto",
          "fontSize": "24px",
          "fontWeight": "600",
          "lineHeight": "1.3"
        },
        "$type": "typography",
        "$description": "Heading 2 typography"
      }
    }
  }
}
```

## Advanced Examples

### 1. Component-Specific Tokens
```json
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
        },
        "padding": {
          "$value": "{size.spacing.medium}",
          "$type": "dimension",
          "$description": "Primary button padding"
        }
      }
    }
  }
}
```

### 2. Responsive Design Tokens
```json
{
  "breakpoint": {
    "mobile": {
      "$value": "320px",
      "$type": "dimension",
      "$description": "Mobile breakpoint"
    },
    "tablet": {
      "$value": "768px",
      "$type": "dimension",
      "$description": "Tablet breakpoint"
    },
    "desktop": {
      "$value": "1024px",
      "$type": "dimension",
      "$description": "Desktop breakpoint"
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
        "$value": "200ms",
        "$type": "time",
        "$description": "Fast animation duration"
      },
      "normal": {
        "$value": "300ms",
        "$type": "time",
        "$description": "Normal animation duration"
      },
      "slow": {
        "$value": "500ms",
        "$type": "time",
        "$description": "Slow animation duration"
      }
    },
    "easing": {
      "default": {
        "$value": "cubic-bezier(0.4, 0, 0.2, 1)",
        "$type": "cubicBezier",
        "$description": "Default easing curve"
      }
    }
  }
}
```

## Platform-Specific Examples

### 1. CSS Variables
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

### 2. iOS/Android Specific
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
          },
          "android": {
            "fontSize": "30px"
          }
        }
      }
    }
  }
}
```

## Build Configuration Examples

### 1. Multiple Platforms
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
    },
    "css": {
      "transformGroup": "css",
      "buildPath": "build/css/",
      "files": [{
        "destination": "variables.css",
        "format": "css/variables"
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

### 2. Custom Transforms
```javascript
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: (prop) => prop.attributes.category === 'size',
  transformer: (prop) => `${prop.value}px`
});

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: [
    'attribute/cti',
    'name/cti/kebab',
    'size/px',
    'color/hex'
  ]
});
```

## Output Examples

### 1. SCSS Variables
```scss
$color-base-primary: #FF0000;
$color-base-secondary: #00FF00;
$typography-heading-h1-font-size: 32px;
$typography-heading-h1-font-weight: 700;
```

### 2. CSS Custom Properties
```css
:root {
  --color-base-primary: #FF0000;
  --color-base-secondary: #00FF00;
  --typography-heading-h1-font-size: 32px;
  --typography-heading-h1-font-weight: 700;
}
```

### 3. JavaScript Module
```javascript
module.exports = {
  color: {
    base: {
      primary: '#FF0000',
      secondary: '#00FF00'
    }
  },
  typography: {
    heading: {
      h1: {
        fontSize: '32px',
        fontWeight: '700'
      }
    }
  }
};
```

## Best Practices Examples

### 1. Semantic Naming
```json
{
  "color": {
    "brand": {
      "primary": { "$value": "#FF0000" },
      "secondary": { "$value": "#00FF00" }
    },
    "feedback": {
      "success": { "$value": "#00FF00" },
      "error": { "$value": "#FF0000" }
    }
  }
}
```

### 2. Reference Usage
```json
{
  "color": {
    "base": {
      "primary": { "$value": "#FF0000" },
      "primary-light": { "$value": "{color.base.primary}80" }
    }
  }
}
```

### 3. Documentation
```json
{
  "color": {
    "base": {
      "primary": {
        "$value": "#FF0000",
        "$type": "color",
        "$description": "Primary brand color used for main actions and brand identity",
        "$comment": "This color should be used for primary CTAs and brand elements"
      }
    }
  }
}
```

## Resources

- [Style Dictionary Examples](https://styledictionary.com/examples/)
- [DTCG Examples](https://design-tokens.github.io/community-group/format/examples/)
- [Example Projects](https://github.com/amzn/style-dictionary/tree/main/examples)
- [Community Examples](https://github.com/amzn/style-dictionary/tree/main/examples/community)