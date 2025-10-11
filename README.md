# AI Design System

**Design Token Transformation Pipeline**

This repository transforms design tokens from Figma into framework-specific theme configurations.

## Pipeline Flow

```
Figma → Token Studio → token-studio-sync-provider/ → Style Dictionary → Framework Themes
```

## Sacred Rule

**NEVER modify `token-studio-sync-provider/`** - This directory is automatically synced from Figma via Token Studio. Any manual changes will be overwritten.

## Source of Truth

`token-studio-sync-provider/DDS Foundations.json` contains all design tokens in W3C DTCG format.

## Generated Outputs

Running `npm run build:tokens` generates tokens in multiple formats:

- **`build/css/tokens.css`** - CSS custom properties
- **`build/js/tokens.mjs`** - JavaScript/CommonJS module
- **`build/json/tokens.json`** - JSON format (for inspection/debugging)
- **`build/mui/theme.js`** - Tokens for Material-UI consumption
- **`build/tailwind/theme.js`** - Tokens for Tailwind CSS consumption

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build tokens:
   ```bash
   npm run build:tokens
   ```

3. Watch for changes (auto-rebuild):
   ```bash
   npm watch:tokens
   ```

## Token Format

Tokens follow the W3C Design Token Community Group (DTCG) specification:

```json
{
  "color": {
    "primary": {
      "$type": "color",
      "$value": "#0070f3",
      "$description": "Primary brand color"
    }
  }
}
```

## Project Structure

```
ai-design-system/
├── token-studio-sync-provider/  # Figma sync (DO NOT MODIFY)
│   └── DDS Foundations.json     # Source of truth
├── config/
│   └── style-dictionary.config.mjs  # Transformation configuration
├── build/                        # Generated outputs (gitignored)
│   ├── css/tokens.css
│   ├── js/tokens.mjs
│   ├── json/tokens.json
│   ├── mui/theme.js
│   └── tailwind/theme.js
└── docs/                         # Documentation
    ├── style-dictionary/         # Style Dictionary reference
    ├── token-studio/             # Token Studio/DTCG reference
    └── context.md                # Architecture decisions
```

## Using the Tokens

### CSS

```html
<link rel="stylesheet" href="build/css/tokens.css">
```

```css
.button {
  background-color: var(--blue-500);
  padding: var(--spacing-md);
}
```

### JavaScript

```javascript
import tokens from './build/js/tokens.mjs';

const primaryColor = tokens.blue500;
```

### MUI

```javascript
import tokens from './build/mui/theme.js';
import { createTheme } from '@mui/material/styles';

// Map tokens to MUI theme structure
const theme = createTheme({
  palette: {
    primary: {
      main: tokens.blue500,
    }
  }
});
```

### Tailwind

```javascript
// tailwind.config.js
const tokens = require('./build/tailwind/theme.js');

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: tokens.blue500,
      }
    }
  }
};
```

## Key Dependencies

- **style-dictionary** - Token transformation engine
- **@tokens-studio/sd-transforms** - Token Studio/Figma format support

## Documentation

See `docs/` directory for:
- Style Dictionary usage and configuration
- Token Studio/DTCG specification reference
- Architecture context and decisions

## Git Workflow

1. Create feature branch
2. Make changes
3. Push to GitHub
4. Create PR on GitHub
5. Merge on GitHub (NOT locally)
6. Pull main to sync

## Contributing

This is a token transformation pipeline. The only source of truth is Figma → Token Studio sync.

For questions or issues: @ChadBercea

## License

MIT
