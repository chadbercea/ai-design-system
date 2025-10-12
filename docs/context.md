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

## AI Agent Instructions - Combat Known Failure Patterns

### Critical Rules for Storybook Demo Work

**NEVER claim something is "fixed" or "complete" without verifying:**
1. ALL three libraries (MUI, shadcn, Tailwind) use THE SAME semantic token for the same visual element
2. NO hardcoded colors (hex, rgb, hsl values) exist in showcase components
3. NO arbitrary shade numbers (grey-300, blue-500) chosen by guessing
4. The fix is in Style Dictionary formatters, NOT in component code

**When components don't match visually:**
1. The problem is ALWAYS in Style Dictionary output, never in component code
2. Fix by adding semantic tokens to Style Dictionary formatters
3. Semantic tokens must match across all three libraries (card, border, background, foreground)
4. Do NOT add inline styles or pick random shades to "make it look similar"

**Before claiming "cards match" or "components match":**
1. Read the actual component files with cat/grep
2. Verify they use semantic classes (bg-card, text-card-foreground) NOT shade numbers (bg-grey-50)
3. Verify Style Dictionary outputs include ALL semantic tokens needed
4. List the specific semantic token each library uses for each element

**Verification checklist for "matching" claims:**
- [ ] MUI uses token from build/mui/theme.js
- [ ] shadcn uses CSS var from build/shadcn/variables.css (--card, --border, etc.)
- [ ] Tailwind uses semantic class from build/tailwind/theme.js (bg-card, NOT bg-grey-50)
- [ ] All three reference the SAME semantic concept (not arbitrary shades)

**If you find yourself:**
- Choosing shade numbers manually (grey-50, grey-300) → STOP, fix Style Dictionary
- Adding inline styles with hex colors → STOP, fix Style Dictionary
- Claiming "it's close enough" → STOP, it's not done
- Defending partial work → STOP, admit it's incomplete

## Git Workflow

1. Work in feature branches
2. Push to GitHub
3. Create PR on GitHub
4. Merge on GitHub (NOT locally)
5. Pull main to sync

**NEVER force push to main/master.**

