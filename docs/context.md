# Architecture Context & Decisions

## Project Purpose

This repository is a **token transformation pipeline**, NOT a component library or showcase.

**Flow:** Figma → Token Studio → `token-studio-sync-provider/` → Style Dictionary → Framework Themes

## Sacred Rules

1. **NEVER modify `token-studio-sync-provider/`** - This directory is automatically synced from Figma via Token Studio. Any manual changes will be overwritten.

2. **Source of truth:** `token-studio-sync-provider/DDS Foundations.json` contains all design tokens in W3C DTCG format.

3. **Style Dictionary is the only transformation tool** - All token processing happens through Style Dictionary with `@tokens-studio/sd-transforms`.

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

## Output Targets

The pipeline generates tokens for multiple frameworks:

1. **JS/ES6** - `build/js/tokens.mjs` - Universal JavaScript module
2. **CSS** - `build/css/tokens.css` - CSS custom properties
3. **MUI** - `build/mui/theme.js` - Material-UI theme configuration
4. **Tailwind** - `build/tailwind/theme.js` - Tailwind CSS configuration

## Build Process

```bash
npm run build:tokens
```

Runs Style Dictionary to transform tokens from DTCG format into framework-specific outputs.

## Key Dependencies

- `style-dictionary` - Token transformation engine
- `@tokens-studio/sd-transforms` - Token Studio/Figma plugin format support

## Known Considerations

- MUI theme generation requires careful mapping of flat tokens to MUI's nested theme structure
- Color tokens may need HSL conversion for certain frameworks
- Typography tokens include font family, size, weight, line height, and letter spacing
- Spacing uses a base-8 scale by default

## Git Workflow

1. Work in feature branches
2. Push to GitHub
3. Create PR on GitHub
4. Merge on GitHub (NOT locally)
5. Pull main to sync

**NEVER force push to main/master.**

