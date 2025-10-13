# Style Dictionary - Actual System Documentation

## Overview

This document describes the Style Dictionary configuration as it actually exists and works in this repository.

## Token Source

**File:** `token-studio-sync-provider/DDS Foundations.json`
**Size:** 13,730 bytes
**Synced from:** Figma via Tokens Studio plugin
**Contains:** Primitive design tokens (colors, spacing, typography, font weights, border radius, etc.)

**Verification:**
```bash
ls -la "token-studio-sync-provider/DDS Foundations.json"
```

## Style Dictionary Configuration

**File:** `config/style-dictionary.config.mjs`
**Build command:** `npm run build:tokens`
**Status:** Works successfully, generates all required outputs

## Custom Formatters (4)

The system uses 4 custom Style Dictionary formatters:

### 1. mui/theme
- **Output:** `build/mui/theme.js`
- **Purpose:** Generates Material-UI createTheme() configuration object
- **Format:** Nested palette structure (palette.primary.main, palette.secondary.light, etc.)

### 2. tailwind/theme
- **Output:** `build/tailwind/theme.js`
- **Purpose:** Generates Tailwind CSS theme extension configuration
- **Format:** Color scale structure (colors.blue.500, colors.grey.300, etc.)

### 3. shadcn/css
- **Output:** `build/shadcn/variables.css`
- **Purpose:** Generates shadcn/ui CSS custom properties
- **Format:** HSL format with specific variable names (--primary, --card, --border, etc.)

### 4. shadcn/tailwind
- **Output:** `build/shadcn/tailwind.config.js`
- **Purpose:** Generates shadcn + Tailwind hybrid configuration
- **Format:** Tailwind config structure with shadcn-compatible values

## Why Custom Formatters Are Necessary

Built-in Style Dictionary formats (css/variables, javascript/es6, json) generate flat token lists:

```javascript
// Built-in format output
{
  "Blue500": "#2560ff",
  "Grey300": "#a9b4c6",
  // ...
}
```

Framework integrations require nested, framework-specific structures:

**MUI needs:**
```javascript
{
  palette: {
    primary: {
      main: "#2560ff",
      light: "#7ba4f4",
      dark: "#0843be"
    }
  }
}
```

**Tailwind needs:**
```javascript
{
  colors: {
    blue: {
      500: "#2560ff"
    }
  }
}
```

**shadcn needs:**
```css
.dds-theme {
  --primary: 224 100% 57%; /* HSL format */
  --card: 0 0% 100%;
}
```

Custom formatters transform flat DDS Foundation tokens into these framework-specific structures.

## Hardcoded Fallback Values (44)

Custom formatters use the pattern:
```javascript
main: findToken('Blue.500') || '#2560ff'
```

**Purpose:** Graceful degradation if token lookup fails
**In practice:** Token lookups always succeed, fallbacks are safety net
**Location:** All in custom formatter functions in `config/style-dictionary.config.mjs`

**Why they exist:** Ensures build completes even if token structure changes or lookup fails.

## Generated Outputs

Running `npm run build:tokens` generates:

- `build/mui/theme.js` - MUI theme configuration object
- `build/tailwind/theme.js` - Tailwind theme extension
- `build/shadcn/variables.css` - shadcn CSS custom properties
- `build/shadcn/tailwind.config.js` - shadcn + Tailwind hybrid
- `build/css/tokens.css` - Universal CSS custom properties
- `build/js/tokens.mjs` - JavaScript module with all tokens
- `build/json/tokens.json` - Raw JSON for inspection

**Verification:**
```bash
ls -la build/mui/theme.js
ls -la build/tailwind/theme.js
ls -la build/shadcn/variables.css
```

## Integration Status

### MUI Integration
- **Theme file:** `src/themes/mui-theme.ts`
- **Imports from:** `build/mui/theme.js`
- **Status:** ✅ Components render correctly in Storybook

### Tailwind Integration
- **Config file:** `tailwind.config.js`
- **Imports from:** `build/tailwind/theme.js`
- **Status:** ✅ Classes compile correctly

### shadcn Integration
- **Components:** `src/components/ui/`
- **Uses:** CSS variables from `build/shadcn/variables.css`
- **Status:** ✅ Components render correctly in Storybook

### Storybook Demo
- **Location:** `stories/Home.stories.tsx`
- **Features:** Toggle between stock library defaults and DDS-generated themes
- **Status:** ✅ All three frameworks render, toggle works

## What Works

✅ Token sync: Figma → GitHub via Tokens Studio
✅ Build: `npm run build:tokens` completes successfully (exit code 0)
✅ Output: All framework files generate correctly
✅ MUI: Components render with generated theme
✅ Tailwind: Classes compile with generated config
✅ shadcn: Components use generated CSS variables
✅ Storybook: Demo functional, toggle switches themes correctly

## Known Characteristics

- **Custom formatters required:** Built-in SD formats insufficient for framework-specific structures
- **Hardcoded fallbacks present:** 44 hex codes as safety net (never triggered in practice)
- **Token structure:** Flat primitive tokens in source, nested structures in outputs

## Build Process

```bash
# Build all framework themes from tokens
npm run build:tokens

# Verify build succeeded
echo $?  # Should output: 0

# Check generated files
ls -la build/
```

## Verification Commands

**Verify token source exists:**
```bash
ls -la "token-studio-sync-provider/DDS Foundations.json"
```

**Verify custom formatters count:**
```bash
grep -c "registerFormat" config/style-dictionary.config.mjs
# Expected: 4
```

**Verify hardcoded values count:**
```bash
grep -o "#[0-9a-fA-F]\{6\}" config/style-dictionary.config.mjs | wc -l
# Expected: 44
```

**Verify build works:**
```bash
npm run build:tokens
# Expected: Exit code 0, no errors
```

**Verify outputs exist:**
```bash
ls -la build/mui/theme.js build/tailwind/theme.js build/shadcn/variables.css
# Expected: All files exist
```

## Future Considerations (Optional)

These are potential improvements, NOT current problems:

- Investigate if built-in SD formats can be extended to meet framework requirements
- Add automated tests for token propagation
- Add validation to catch missing tokens before build
- Document token structure and naming conventions

**Priority:** Low - current system works correctly, no active problems

**Estimated effort:** 40-60 hours research + implementation

**Decision:** Only pursue if custom formatters become a maintenance burden or blocking issue

