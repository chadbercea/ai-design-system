# Design System Usage Guide

## Overview
This design system uses Style Dictionary as the source of truth for design tokens, with adapters to transform these tokens into various framework-specific formats (MUI, Tailwind, and a custom v0 theme).

## Getting Started

### Installation
```bash
npm install
```

### Building Tokens
```bash
# Build tokens once
npm run build:tokens

# Watch mode for development
npm run watch:tokens
```

### Validation
```bash
# Validate tokens
npm run test:tokens

# Watch mode for validation
npm run test:tokens:watch
```

## Token Structure

### Color Tokens
Located in `tokens/color.json`:
```json
{
  "color": {
    "base": {
      "primary": {
        "$value": "#007AFF",
        "$type": "color",
        "$description": "Primary brand color"
      },
      "secondary": {
        "$value": "#5856D6",
        "$type": "color",
        "$description": "Secondary brand color"
      },
      "neutral": {
        "100": { /* Lightest neutral color */ },
        "200": { /* Light neutral color */ },
        // ... more neutral colors
      }
    }
  }
}
```

### Typography Tokens
Located in `tokens/typography.json`:
```json
{
  "typography": {
    "base": {
      "family": {
        "base": "Roboto, sans-serif",
        "heading": "Roboto, sans-serif"
      },
      "size": {
        "base": "16px"
      },
      "weight": {
        "normal": "400",
        "medium": "500",
        "semibold": "600",
        "bold": "700"
      }
    }
  }
}
```

### Spacing Tokens
Located in `tokens/spacing.json`:
```json
{
  "spacing": {
    "base": {
      "4": {
        "$value": "8px",
        "$type": "dimension",
        "$description": "Base spacing unit"
      }
    }
  }
}
```

## Framework Integration

### MUI Integration
```typescript
import { createTheme, ThemeProvider } from '@mui/material/styles';
import tokens from './build/tokens.js';
import { mapTokensToMuiTheme } from './adapters/mapTokensToMuiTheme.js';

const theme = createTheme(mapTokensToMuiTheme(tokens));

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### Tailwind Integration
```javascript
// tailwind.config.js
const tokens = require('./build/tokens.js');
const { mapTokensToTailwindConfig } = require('./adapters/mapTokensToTailwindConfig.js');

module.exports = {
  theme: mapTokensToTailwindConfig(tokens),
  // ... other Tailwind config
};
```

### Custom v0 Theme Integration
```typescript
import tokens from './build/tokens.js';
import { mapTokensToV0Theme } from './adapters/mapTokensToV0Theme.js';

const theme = mapTokensToV0Theme(tokens);
```

## Adapter Customization

### MUI Adapter
The MUI adapter (`adapters/mapTokensToMuiTheme.js`) can be customized to:
- Add custom component overrides
- Modify theme structure
- Add custom theme properties

Example customization:
```javascript
export function mapTokensToMuiTheme(tokens) {
  return {
    // ... default theme properties
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      // Add more component customizations
    },
  };
}
```

### Tailwind Adapter
The Tailwind adapter (`adapters/mapTokensToTailwindConfig.js`) can be customized to:
- Add custom color scales
- Modify spacing scales
- Add custom theme extensions

Example customization:
```javascript
export function mapTokensToTailwindConfig(tokens) {
  return {
    extend: {
      colors: {
        // Custom color mappings
      },
      spacing: {
        // Custom spacing mappings
      },
    },
  };
}
```

## Validation

### Token Validation
The token validation script (`scripts/validation/validate-tokens.js`) ensures:
- Required token properties are present
- Token values are of correct type
- Color values are valid
- Token structure follows the schema

Run validation:
```bash
npm run test:tokens
```

### Type Checking
TypeScript definitions (`src/types/tokens.d.ts`) provide:
- Type safety for token usage
- Autocomplete support
- Runtime type checking

## Best Practices

1. **Token Naming**
   - Use semantic names
   - Follow the established hierarchy
   - Include clear descriptions

2. **Token Organization**
   - Group related tokens
   - Use consistent structure
   - Document token relationships

3. **Adapter Usage**
   - Use the appropriate adapter for your framework
   - Customize adapters when needed
   - Keep customizations maintainable

4. **Validation**
   - Run validation before commits
   - Fix validation errors promptly
   - Add new token validations as needed

## Troubleshooting

### Common Issues

1. **Token Validation Failures**
   - Check token structure
   - Verify required properties
   - Ensure correct value types

2. **Adapter Issues**
   - Verify token availability
   - Check adapter mappings
   - Review framework requirements

3. **Build Problems**
   - Clear build cache
   - Check file permissions
   - Verify dependencies

## Contributing

1. **Adding New Tokens**
   - Follow existing structure
   - Add validation rules
   - Update documentation

2. **Creating New Adapters**
   - Follow adapter pattern
   - Add type definitions
   - Include documentation

3. **Improving Validation**
   - Add new validation rules
   - Update schema as needed
   - Document changes

## Support

For issues and questions:
1. Check the documentation
2. Review common issues
3. Open a GitHub issue
4. Contact the maintainers 