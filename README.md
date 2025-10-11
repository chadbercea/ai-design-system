# Design Token Pipeline

A token transformation pipeline that converts design tokens from Figma into framework-specific themes using Style Dictionary.

## Architecture

```
Figma → Tokens Studio → Style Dictionary → Framework Themes
```

**Single Source of Truth**: `token-studio-sync-provider/DDS Foundations.json`

## What This Does

Transforms design tokens into consumable themes for:
- **MUI** (Material-UI) - `build/mui/mui-theme.js`
- **Shadcn/UI** - `build/shadcn/shadcn-theme.js`  
- **Tailwind CSS** - `build/tailwind/tailwind-theme.js`
- **v0 (Vercel)** - `build/v0/tailwind.config.ts` + `build/v0/globals.css`

## Getting Started

### Prerequisites
- Node.js >= 23.11.0
- npm >= 9.0.0

### Installation
```bash
npm install
```

### Build Tokens
```bash
npm run build:tokens
```

This command:
1. Runs Style Dictionary to transform tokens
2. Generates Shadcn font configurations
3. Generates Shadcn global styles
4. Validates MUI theme mappings

### Watch Mode (Development)
```bash
npm run watch:tokens
```

### Validate Theme
```bash
npm run validate:theme
```

## Project Structure

```
ai-design-system/
├── token-studio-sync-provider/  # Source tokens (DO NOT EDIT - synced from Figma)
│   └── DDS Foundations.json     # Single source of truth
├── config/
│   └── style-dictionary.config.mjs  # Transform configuration
├── build/                       # Generated outputs (gitignored or committed)
│   ├── mui/                     # MUI theme
│   ├── shadcn/                  # Shadcn theme
│   ├── tailwind/                # Tailwind config
│   └── v0/                      # v0 theme + globals
└── scripts/                     # Build scripts
```

## Using the Generated Themes

### MUI (Material-UI)

```javascript
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './build/mui/mui-theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app */}
    </ThemeProvider>
  );
}
```

### Shadcn/UI

```javascript
import { theme } from './build/shadcn/shadcn-theme';

// Use theme.colors, theme.fontSize, theme.spacing, etc.
```

### Tailwind CSS

```javascript
// tailwind.config.js
import { theme } from './build/tailwind/tailwind-theme';

export default {
  theme: {
    extend: theme
  }
};
```

### v0 (Vercel)

```typescript
// Copy build/v0/tailwind.config.ts to your project
// Import build/v0/globals.css in your app
```

## Key Principles

1. **Single Source of Truth**: All tokens originate from `token-studio-sync-provider/DDS Foundations.json`
2. **Framework Agnostic**: Each framework gets its own optimized theme
3. **No Dependencies**: Frameworks don't depend on each other
4. **ESM First**: Modern module system throughout
5. **Automated**: Token sync from Figma is automated via Tokens Studio

## Token Categories

- **Colors**: Full color scales (50-950) for all semantic colors
- **Typography**: Font families, sizes, weights, line heights, letter spacing
- **Spacing**: Spacing scale based on design system
- **Border Radius**: Shape tokens
- **Shadows**: Elevation system
- **Breakpoints**: Responsive design breakpoints

## Development Workflow

1. **Designer updates tokens in Figma** (using Tokens Studio plugin)
2. **Tokens sync to GitHub** (via Tokens Studio → `token-studio-sync-provider/`)
3. **Run build command** (`npm run build:tokens`)
4. **Use generated themes** in your applications

## Notes

- `token-studio-sync-provider/` is automatically synced from Figma - **never edit manually**
- All other files can be modified as needed
- Generated themes in `build/` can be committed or gitignored based on your workflow

## Documentation

See `_ai-docs/` for detailed documentation on:
- Architecture decisions
- Style Dictionary integration
- MUI theme structure
- Framework-specific guides

## Contributing

Contact @ChadBercea for questions or contributions.

## License

Private project.
