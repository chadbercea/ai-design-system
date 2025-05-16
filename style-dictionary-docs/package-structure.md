https://styledictionary.com/info/package_structure/

# Style Dictionary Package Structure

## Standard Project Structure

```
project/
├── tokens/                    # Design token files
│   ├── colors.json           # Color tokens
│   ├── typography.json       # Typography tokens
│   ├── spacing.json          # Spacing tokens
│   └── components/           # Component-specific tokens
│       ├── button.json
│       └── input.json
├── config/                   # Configuration files
│   ├── config.json          # Main configuration
│   └── transforms/          # Custom transforms
│       ├── size.js
│       └── color.js
├── build/                    # Build output directory
│   ├── scss/                # SCSS output
│   ├── css/                 # CSS output
│   └── js/                  # JavaScript output
├── scripts/                  # Build scripts
│   ├── build.js
│   └── watch.js
├── package.json             # Project configuration
└── README.md               # Project documentation
```

## Token Organization

### 1. Base Tokens
```
tokens/
├── colors.json
├── typography.json
├── spacing.json
├── border.json
├── shadow.json
└── animation.json
```

### 2. Component Tokens
```
tokens/
└── components/
    ├── button.json
    ├── input.json
    ├── card.json
    └── modal.json
```

### 3. Platform-Specific Tokens
```
tokens/
└── platforms/
    ├── web.json
    ├── ios.json
    └── android.json
```

## Configuration Structure

### 1. Main Configuration
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

### 2. Transform Configuration
```javascript
// config/transforms/size.js
module.exports = {
  name: 'size/px',
  type: 'value',
  matcher: (prop) => prop.attributes.category === 'size',
  transformer: (prop) => `${prop.value}px`
};
```

## Build Scripts

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

## Package.json Configuration

```json
{
  "name": "design-system",
  "version": "1.0.0",
  "scripts": {
    "build": "node scripts/build.js",
    "watch": "node scripts/watch.js",
    "clean": "rimraf build/*"
  },
  "dependencies": {
    "style-dictionary": "^3.8.0"
  },
  "devDependencies": {
    "rimraf": "^3.0.2"
  }
}
```

## Token File Structure

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
    }
  }
}
```

### 2. Typography Tokens
```json
{
  "typography": {
    "heading": {
      "h1": {
        "$value": {
          "fontFamily": "Roboto",
          "fontSize": "32px",
          "fontWeight": "700"
        },
        "$type": "typography",
        "$description": "Heading 1 typography"
      }
    }
  }
}
```

## Build Output Structure

### 1. SCSS Output
```
build/
└── scss/
    ├── _variables.scss
    ├── _colors.scss
    └── _typography.scss
```

### 2. CSS Output
```
build/
└── css/
    ├── variables.css
    ├── colors.css
    └── typography.css
```

### 3. JavaScript Output
```
build/
└── js/
    ├── tokens.js
    ├── colors.js
    └── typography.js
```

## Best Practices

### 1. File Organization
- Group related tokens together
- Use semantic naming
- Maintain consistent structure
- Separate platform-specific tokens

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
npm run clean
```

## Resources

- [Style Dictionary Package Structure](https://styledictionary.com/info/package_structure/)
- [Example Projects](https://github.com/amzn/style-dictionary/tree/main/examples)
- [Community Examples](https://github.com/amzn/style-dictionary/tree/main/examples/community)
- [Best Practices](https://styledictionary.com/info/best-practices/)