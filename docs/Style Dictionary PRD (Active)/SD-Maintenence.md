# Style Dictionary Maintenance Guide

## Overview

This guide explains how to maintain and extend the Style Dictionary custom formatters in this repository.

**Prerequisites:** Read `docs/SD-ACTUAL-SYSTEM.md` first to understand current system.

---

## When to Update

### DO Update When:
- ✅ Adding support for a new UI library (Chakra, Ant Design, etc.)
- ✅ Framework changes its theme API (e.g., MUI v7 changes createTheme structure)
- ✅ Need to add new token categories (animations, shadows, etc.)
- ✅ Fixing a bug in token transformation
- ✅ Token lookup fails in build (extremely rare)

### DON'T Update When:
- ❌ "Just want to remove custom formatters" - They're necessary, see SD-ACTUAL-SYSTEM.md
- ❌ "Want everything to use built-in formats" - They can't produce nested structures
- ❌ System is working fine - Don't fix what isn't broken
- ❌ Someone suggests "best practices" without understanding our constraints

---

## Custom Formatter Structure

All 4 custom formatters follow this pattern:

```javascript
StyleDictionary.registerFormat({
  name: 'framework/format-name',
  format: function({ dictionary }) {
    const tokens = dictionary.allTokens;
    
    // Helper to find tokens
    const findToken = (path) => 
      tokens.find(t => t.path.join('.') === path)?.value;
    
    // Build framework-specific structure
    const output = {
      // Transform flat tokens → nested structure
    };
    
    // Return as string (file content)
    return `export const theme = ${JSON.stringify(output, null, 2)};`;
  }
});
```

**Key parts:**
1. `dictionary.allTokens` - All tokens from source
2. `findToken()` helper - Lookup token by path
3. Framework structure building - Nest tokens per framework requirements
4. Return string - File contents

---

## How to Update Existing Formatter

### Example: Add New Color to MUI Theme

**File:** `config/style-dictionary.config.mjs`

**Find the MUI formatter:**
```javascript
StyleDictionary.registerFormat({
  name: 'mui/theme',
  format: function({ dictionary }) {
    // ...
  }
});
```

**Add new color:**
```javascript
// Inside palette object
success: {
  main: findToken('Green.500') || '#2e7d32',
  light: findToken('Green.300') || '#66bb6a',
  dark: findToken('Green.700') || '#1b5e20',
  contrastText: findToken('White.100%') || '#ffffff'
}
```

**Test:**
```bash
npm run build:tokens
cat build/mui/theme.js | grep -A4 "success"
```

**Verify in Storybook:**
```bash
npm run storybook
# Check if MUI components can use success color
```

---

## How to Add New Framework

### Example: Add Chakra UI Support

**Step 1: Research framework requirements**

Read Chakra UI documentation:
- What structure does `extendTheme()` expect?
- What format? (JavaScript object, CSS variables, JSON?)
- What naming conventions? (colors.brand.500, colors.accent.base?)

**Step 2: Create custom formatter**

Add to `config/style-dictionary.config.mjs`:

```javascript
// Register Chakra formatter
StyleDictionary.registerFormat({
  name: 'chakra/theme',
  format: function({ dictionary }) {
    const tokens = dictionary.allTokens;
    
    const findToken = (path) => 
      tokens.find(t => t.path.join('.') === path)?.value;
    
    // Build Chakra structure
    const theme = {
      colors: {
        brand: {
          50: findToken('Blue.50') || '#e3f2fd',
          100: findToken('Blue.100') || '#bbdefb',
          // ... etc
          500: findToken('Blue.500') || '#2560ff',
          900: findToken('Blue.900') || '#001d56'
        }
      },
      // Add other Chakra requirements
    };
    
    return `// Chakra UI theme
export const chakraTheme = ${JSON.stringify(theme, null, 2)};

export default chakraTheme;
`;
  }
});
```

**Step 3: Add platform to config**

```javascript
export default {
  source: ['token-studio-sync-provider/DDS Foundations.json'],
  platforms: {
    // ... existing platforms
    
    // Add Chakra platform
    chakra: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/chakra/',
      files: [
        {
          destination: 'theme.js',
          format: 'chakra/theme'
        }
      ]
    }
  }
};
```

**Step 4: Test build**

```bash
npm run build:tokens

# Verify output
ls -la build/chakra/theme.js
cat build/chakra/theme.js
```

**Step 5: Create integration file**

```typescript
// src/themes/chakra-theme.ts
import { extendTheme } from '@chakra-ui/react';
import { chakraTheme } from '../../build/chakra/theme.js';

const theme = extendTheme(chakraTheme);

export default theme;
```

**Step 6: Test in Storybook**

Create `stories/Chakra-Library.stories.tsx` to verify components render.

**Step 7: Document**

Update `docs/SD-ACTUAL-SYSTEM.md` to list 5 custom formatters.

---

## Testing Checklist

After any formatter change:

**1. Build succeeds**
```bash
npm run build:tokens
echo $?  # Should output: 0
```

**2. Output file generated**
```bash
ls -la build/[framework]/theme.js
```

**3. Output is valid**
```bash
# For JavaScript
node -c build/[framework]/theme.js

# For CSS
# No syntax errors when imported
```

**4. Values are correct**
```bash
# Spot check a few colors
cat build/[framework]/theme.js | grep "#2560ff"
```

**5. Integration works**
```bash
npm run storybook
# Manually verify components render
```

**6. No console errors**
```bash
# Check browser console in Storybook
# Should be clean
```

---

## Debugging Build Failures

### Build fails with "token not found"

**Symptom:**
```
Error: Cannot read property 'value' of undefined
```

**Cause:** `findToken('SomePath')` returned undefined

**Fix:**
1. Check token path is correct in source:
   ```bash
   cat token-studio-sync-provider/DDS\ Foundations.json | grep -i "blue"
   ```

2. Verify path syntax matches source structure

3. Add fallback if token might not exist:
   ```javascript
   const value = findToken('Optional.Token') || '#defaultValue';
   ```

### Build succeeds but output is wrong

**Check:**
1. Is formatter logic correct?
2. Are you transforming the right tokens?
3. Is output format valid for framework?

**Debug:**
```javascript
// Add console.log to formatter
format: function({ dictionary }) {
  console.log('All tokens:', dictionary.allTokens);
  // Continue formatting...
}
```

Run build and check output.

### Framework integration fails

**Symptom:** Components don't render or use wrong colors

**Check:**
1. Is theme file imported correctly?
2. Is framework theme provider wrapping components?
3. Are class names/CSS variables correct?

**Verify:**
```typescript
// In browser console
console.log(theme);  // Check structure
```

---

## Common Patterns

### Pattern 1: Find Token with Fallback

```javascript
const primary = findToken('Blue.500') || '#2560ff';
```

**Why:** Safety net if token path changes

### Pattern 2: Build Color Scale

```javascript
const buildColorScale = (colorFamily) => ({
  50: findToken(`${colorFamily}.50`),
  100: findToken(`${colorFamily}.100`),
  // ... etc
  900: findToken(`${colorFamily}.900`)
});

const colors = {
  blue: buildColorScale('Blue'),
  grey: buildColorScale('Grey')
};
```

**Why:** DRY principle, easier to maintain

### Pattern 3: Convert Hex to HSL

```javascript
const hexToHSL = (hex) => {
  // Conversion logic
  return `${h} ${s}% ${l}%`;
};

const primary = hexToHSL(findToken('Blue.500'));
```

**Why:** shadcn requires HSL format

### Pattern 4: Conditional Token Lookup

```javascript
const errorColor = findToken('Red.500') || findToken('Error.Main') || '#d32f2f';
```

**Why:** Try multiple paths, always have fallback

---

## When Token Source Changes

If `token-studio-sync-provider/DDS Foundations.json` structure changes (e.g., Figma tokens reorganized):

**1. Identify breaking changes**
```bash
# Before change
cat token-studio-sync-provider/DDS\ Foundations.json | jq 'keys'

# After change
# Compare structure
```

**2. Update findToken() calls**

If token path changed from `Blue.500` to `Primary.Blue.500`:
```javascript
// Old
const blue = findToken('Blue.500');

// New
const blue = findToken('Primary.Blue.500');
```

**3. Test all formatters**

Run full build and verify all outputs.

**4. Update fallbacks if needed**

If token values changed, update hardcoded fallbacks to match.

---

## Performance Considerations

**Current formatters are fast (<1 second build time)**

If build becomes slow:

**Check:**
1. How many tokens in source? (Currently ~150, manageable)
2. How complex is formatter logic? (Simple lookups are fast)
3. Are you doing expensive operations in loop?

**Optimize:**
- Cache token lookups
- Build lookup map once, reuse
- Avoid nested loops

**Example:**
```javascript
// Slow: O(n) lookup per token
tokens.find(t => t.path.join('.') === 'Blue.500');

// Fast: O(1) lookup with map
const tokenMap = new Map(tokens.map(t => [t.path.join('.'), t.value]));
const value = tokenMap.get('Blue.500');
```

---

## Adding Token Categories

Currently transforms: colors, spacing, typography, border radius

**To add new category (e.g., shadows):**

**1. Add tokens to Figma**

Token Studio: Create shadow tokens

**2. Verify export**
```bash
cat token-studio-sync-provider/DDS\ Foundations.json | jq '.shadows'
```

**3. Update formatters**

Add shadow properties to each framework's output:

```javascript
// MUI
shadows: {
  small: findToken('Shadow.sm'),
  medium: findToken('Shadow.md'),
  large: findToken('Shadow.lg')
}

// Tailwind
boxShadow: {
  sm: findToken('Shadow.sm'),
  DEFAULT: findToken('Shadow.md'),
  lg: findToken('Shadow.lg')
}

// shadcn
--shadow-sm: [value];
--shadow-md: [value];
--shadow-lg: [value];
```

**4. Test and verify**

---

## Rollback Procedure

If formatter change breaks everything:

**1. Revert commit**
```bash
git log --oneline config/style-dictionary.config.mjs
git revert [commit-hash]
```

**2. Rebuild**
```bash
npm run build:tokens
```

**3. Verify Storybook**
```bash
npm run storybook
```

**4. Debug original change**

Find what went wrong, fix, test again.

---

## Documentation Requirements

When you update formatters:

**Update these docs:**
1. `docs/SD-ACTUAL-SYSTEM.md` - If adding/removing formatters
2. This file (`SD-Maintenance.md`) - If creating new patterns
3. Commit message - Explain what and why

**Don't update:**
- `docs/context.md` - Only if changing fundamental architecture
- `README.md` - Only if public API changes

---

## Security Considerations

**Token source is public** (GitHub repository)

**Don't put secrets in tokens:**
- ❌ API keys
- ❌ Passwords
- ❌ Private URLs
- ❌ Authentication tokens

**Only put in tokens:**
- ✅ Colors
- ✅ Spacing
- ✅ Typography
- ✅ Public design values

---

## Version Control Best Practices

**Commit messages:**
```bash
# Good
git commit -m "feat(sd): add Chakra UI custom formatter"
git commit -m "fix(sd): correct MUI primary color lookup"

# Bad
git commit -m "update config"
git commit -m "changes"
```

**Branch naming:**
```bash
# Good
git checkout -b feature/add-chakra-formatter
git checkout -b fix/mui-color-lookup

# Bad
git checkout -b updates
git checkout -b test
```

**Pull requests:**
- Explain what changed
- Why it changed
- How to test
- Include before/after screenshots if visual

---

## Getting Help

**If formatter change fails:**

1. Check this guide first
2. Review `docs/SD-ACTUAL-SYSTEM.md`
3. Check Style Dictionary docs: https://amzn.github.io/style-dictionary/
4. Check framework theme docs (MUI, Tailwind, shadcn)
5. Ask in PR/issue with:
   - What you're trying to do
   - What's failing
   - Error messages
   - What you've tried

---

## Summary

**Maintaining custom formatters:**
- Update when framework APIs change or adding new frameworks
- Don't update just because "custom formatters are bad"
- Test thoroughly: build → output → integration → Storybook
- Document changes
- Commit with clear messages

**The system works. Keep it working.**

