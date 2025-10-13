# Style Dictionary - Standard Operating Procedure

## Purpose

This document defines the mandatory process for ANY work involving Style Dictionary configuration. Deviation from this SOP will result in catastrophic pipeline failures.

---

## Sacred Rules

### Rule 1: ALL Tokens MUST Transform
**Source:** `token-studio-sync-provider/DDS Foundations.json` contains **59 tokens**

**ALL 59 tokens MUST transform to framework outputs.**

If ANY token is missing from framework outputs, the pipeline is BROKEN.

### Rule 2: Zero Hardcoding (Except Fallbacks)
**Hardcoding = Pipeline Failure**

Every value in framework outputs MUST come from tokens.

**Allowed:** `findToken('Blue.500') || '#2560ff'` (fallback if token lookup fails)
**Not Allowed:** `main: '#2560ff'` (hardcoded value)

### Rule 3: Verify Before and After EVERY Change
**Never assume. Always verify.**

Before claiming "done", run verification checklist. No exceptions.

---

## Token Inventory

**Total Tokens:** 59

**Reference:** `docs/TOKEN-MAPPING-COMPLETE.md` for complete mapping

### Token Types Present:
1. **Colors** (9 scales: Blue, Grey, Green, Red, Orange, Yellow, Pink, Teal, Violet + Black, White)
2. **Box Shadows** (4: elevation-1, elevation-2, elevation-3, elevation-4)
3. **Border Radius** (pill, rounded, others)
4. **Border Width** (sm, md, lg, xl, xxl)
5. **Font Families** (3: marketing, product, code)
6. **Font Weights** (5: light, regular, semibold, bold, extrabold)
7. **Font Sizes** (10: 10, 12, 14, 16, 18, 21, 24, 32, 40, 48)
8. **Opacity States** (7: hover, selected, focus, focusVisible, active, disabled, outlinedBorder)
9. **Spacing** (xs + spacing.none)
10. **Letter Spacing** (0)
11. **Text Styles** (Align, italic, underline, uppercase, none, auto)
12. **Icon** (Icon size token)

---

## Pre-Flight Checklist

**Before modifying `config/style-dictionary.config.mjs`, complete ALL items:**

- [ ] Read `docs/TOKEN-MAPPING-COMPLETE.md`
- [ ] Identify which tokens will be affected by the change
- [ ] Know the expected output format for each framework (MUI, Tailwind, shadcn)
- [ ] Verify current state of outputs (`build/mui/theme.js`, `build/tailwind/theme.js`, `build/shadcn/variables.css`)
- [ ] Document what tokens are currently missing
- [ ] Research Style Dictionary built-in transforms for affected token types
- [ ] Plan whether to use built-in transforms or custom formatters
- [ ] If using custom formatters, document WHY built-in transforms insufficient

---

## Making Changes to SD Config

### Step 1: Research Built-in Transforms First
**Always prefer built-in Style Dictionary transforms over custom code.**

Check Style Dictionary docs for:
- Built-in transform groups (`css`, `js`, `web`, etc.)
- Built-in transforms (`color/css`, `size/px`, `shadow/css`, etc.)
- Built-in formats (`css/variables`, `javascript/es6`, etc.)

### Step 2: Use Custom Formatters ONLY When Necessary
**Custom formatters are needed for framework-specific nesting.**

**Valid reasons for custom formatters:**
- MUI needs nested `palette.primary.main` structure
- Tailwind needs nested `colors.blue.500` structure
- shadcn needs HSL format with specific variable names

**Invalid reasons for custom formatters:**
- "I don't know how to use built-in transforms"
- "Custom is easier"
- "It's already custom, why change?"

### Step 3: Look Up Tokens, Don't Hardcode
**Every value MUST come from token lookup.**

**Pattern:**
```javascript
const findToken = (path) => {
  const keys = path.split('.');
  let current = dictionary.tokens;
  for (const key of keys) {
    if (!current[key]) return null;
    current = current[key];
  }
  return current.$value || current.value;
};

// Then use:
main: findToken('Blue.500') || '#2560ff', // fallback if lookup fails
```

**Never:**
```javascript
main: '#2560ff', // hardcoded
```

### Step 4: Transform ALL Tokens of a Given Type
**If you're transforming colors, transform ALL color tokens.**
**If you're transforming shadows, transform ALL shadow tokens.**
**If you're transforming font sizes, transform ALL font size tokens.**

**No cherry-picking. No "we only need these." ALL tokens.**

---

## Post-Flight Checklist

**After modifying SD config, verify ALL items before claiming "done":**

### Build Check
- [ ] `npm run build:tokens` completes without errors
- [ ] All output files generated:
  - [ ] `build/mui/theme.js`
  - [ ] `build/tailwind/theme.js`
  - [ ] `build/shadcn/variables.css`
  - [ ] `build/shadcn/tailwind.config.js`
  - [ ] `build/css/tokens.css`
  - [ ] `build/js/tokens.mjs`
  - [ ] `build/json/tokens.json`

### Token Completeness Check
- [ ] Count tokens in source: `cat "token-studio-sync-provider/DDS Foundations.json" | jq 'keys | length'`
- [ ] Expected: 59 tokens
- [ ] Verify MUI output includes tokens for:
  - [ ] Colors (palette.primary, palette.secondary, palette.grey, etc.)
  - [ ] Shadows (shadows array with elevation-1 through 4)
  - [ ] Typography (fontFamily, fontWeight, fontSize, letterSpacing)
  - [ ] Shape (borderRadius)
  - [ ] Spacing (spacing value or scale)
  - [ ] Palette actions (hoverOpacity, selectedOpacity, focusOpacity, disabledOpacity)
- [ ] Verify Tailwind output includes tokens for:
  - [ ] Colors (colors.blue, colors.grey, etc.)
  - [ ] Box shadows (boxShadow.sm, md, lg, etc.)
  - [ ] Border radius (borderRadius.pill, rounded, etc.)
  - [ ] Border width (borderWidth.sm, md, lg, xl, xxl)
  - [ ] Font families (fontFamily.marketing, product, code)
  - [ ] Font weights (fontWeight.light, regular, semibold, bold, extrabold)
  - [ ] Font sizes (fontSize.xs, sm, base, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
  - [ ] Opacity scale (opacity.hover, selected, focus, disabled, active)
  - [ ] Spacing (spacing scale)
  - [ ] Letter spacing (letterSpacing)
- [ ] Verify shadcn output includes tokens for:
  - [ ] Semantic colors (--primary, --secondary, --background, --foreground, etc.)
  - [ ] Shadows (--shadow-sm, --shadow, --shadow-md, --shadow-lg)
  - [ ] Radius (--radius, --radius-pill, etc.)
  - [ ] Border widths (--border-width, --border-width-sm, etc.)
  - [ ] Font families (--font-marketing, --font-product, --font-code)
  - [ ] Font weights (--font-weight-light, --font-weight-normal, etc.)
  - [ ] Font sizes (--text-xs, --text-sm, etc.)
  - [ ] Opacity states (--opacity-hover, --opacity-selected, etc.)

### Hardcoding Check
- [ ] Search for hardcoded hex values: `grep -E '#[0-9a-fA-F]{3,6}' config/style-dictionary.config.mjs`
- [ ] Every hex value is part of a fallback pattern (`|| '#hex'`) not a direct assignment
- [ ] No hardcoded numeric values (spacing, font sizes, etc.) except in fallbacks
- [ ] No hardcoded string values (font families, etc.) except in fallbacks

### Integration Check
- [ ] `npm run storybook` launches without errors
- [ ] MUI components render correctly
- [ ] Tailwind components render correctly
- [ ] shadcn components render correctly
- [ ] Theme toggle works (toggle ON shows DDS tokens applied)
- [ ] No console errors in browser

### Documentation Check
- [ ] Update `docs/SD-ACTUAL-SYSTEM.md` if system changed
- [ ] Update `docs/SD-Maintenence.md` if maintenance procedures changed
- [ ] Document any new custom formatters added (with justification)
- [ ] Document any new transforms added

---

## Red Flags (Signs of Regression)

**If you observe ANY of these, STOP and fix:**

### 🚩 Red Flag 1: Hardcoding Values
**Pattern:** `main: '#2560ff'` instead of `main: findToken('Blue.500') || '#2560ff'`

**Why this is catastrophic:** Breaks token pipeline. Changes in Figma don't propagate.

**Fix:** Look up token value, use hardcode only as fallback.

---

### 🚩 Red Flag 2: Ignoring Token Types
**Pattern:** "We don't need elevation tokens" or "Icon size isn't important"

**Why this is catastrophic:** User has ALL these tokens in Figma for a reason. Ignoring tokens = incomplete pipeline.

**Fix:** Transform ALL tokens. If you don't know how, research Style Dictionary transforms for that token type.

---

### 🚩 Red Flag 3: Cherry-Picking Tokens
**Pattern:** "I'll just do Blue and Grey colors" (ignoring Green, Red, Orange, Yellow, Pink, Teal, Violet)

**Why this is catastrophic:** Incomplete pipeline. User expects ALL tokens to work.

**Fix:** Transform ALL tokens of a given type, not just some.

---

### 🚩 Red Flag 4: "Close Enough" Mentality
**Pattern:** "MUI has 141 lines, that's pretty good" (when 80% of tokens missing)

**Why this is catastrophic:** "Close enough" = broken pipeline. Either ALL tokens transform or pipeline is broken.

**Fix:** Verify EVERY token type is present in output. No shortcuts.

---

### 🚩 Red Flag 5: Skipping Verification
**Pattern:** "I updated SD config, it should work" (without running build or checking outputs)

**Why this is catastrophic:** Assumptions without verification = guaranteed failure.

**Fix:** Run EVERY item in Post-Flight Checklist. No exceptions.

---

### 🚩 Red Flag 6: Claiming Ignorance of SD Capabilities
**Pattern:** "I don't know what transforms Style Dictionary has" (then immediately writing custom code)

**Why this is catastrophic:** Reinventing the wheel, creating maintenance burden, ignoring built-in, tested, documented transforms.

**Fix:** Read Style Dictionary documentation FIRST. Research built-in transforms BEFORE writing custom code.

---

### 🚩 Red Flag 7: Framework Excuses
**Pattern:** "MUI doesn't use border width tokens" or "Tailwind doesn't need font family variants"

**Why this is catastrophic:** Making excuses for incomplete transformation. User has tokens, tokens MUST transform.

**Fix:** If framework doesn't have a direct mapping, create a reasonable mapping (e.g., border width → custom MUI theme extension, font families → Tailwind fontFamily object).

---

### 🚩 Red Flag 8: Defensive Behavior
**Pattern:** "I did verify" (when verification commands show otherwise) or "That's not important" (when user says it is)

**Why this is catastrophic:** Dishonesty and defensiveness prevent learning and progress.

**Fix:** Accept feedback. Verify claims with commands. Show evidence, not assertions.

---

## Verification Commands

### Count Source Tokens
```bash
cat "token-studio-sync-provider/DDS Foundations.json" | jq 'keys | length'
# Expected: 59
```

### List All Source Token Keys
```bash
cat "token-studio-sync-provider/DDS Foundations.json" | jq 'keys'
```

### Check Specific Token Structure
```bash
cat "token-studio-sync-provider/DDS Foundations.json" | jq '."TOKEN_NAME"'
```

### Build Tokens
```bash
npm run build:tokens
```

### Count Lines in MUI Output (rough completeness check)
```bash
wc -l build/mui/theme.js
# Currently: 141 lines (incomplete)
# Target: ~300+ lines (with all tokens)
```

### Search for Hardcoded Hex Values
```bash
grep -E '#[0-9a-fA-F]{3,6}' config/style-dictionary.config.mjs
# Every result should be part of fallback pattern: || '#hex'
```

### Verify Storybook Builds
```bash
npm run build-storybook
# Should complete without errors
```

---

## Success Criteria

**Pipeline is complete when:**

1. ✅ ALL 59 source tokens present in SD config
2. ✅ ALL 59 source tokens transform to appropriate framework outputs
3. ✅ MUI output contains: palette (complete), typography (complete), shadows, spacing, shape, palette.action
4. ✅ Tailwind output contains: colors (complete), boxShadow, borderRadius, borderWidth, fontFamily, fontWeight, fontSize, opacity, spacing, letterSpacing
5. ✅ shadcn output contains: semantic colors, shadows, radius, border widths, font families, font weights, font sizes, opacity states
6. ✅ Zero hardcoded values (except fallbacks)
7. ✅ Storybook renders all three frameworks correctly
8. ✅ Theme toggle works (toggle ON applies DDS tokens uniformly)
9. ✅ No console errors
10. ✅ Documentation updated to reflect reality

**No partial credit. All criteria must pass.**

---

## Emergency Rollback

**If SD changes break the pipeline:**

1. `git status` - check what changed
2. `git diff config/style-dictionary.config.mjs` - see exact changes
3. `git checkout config/style-dictionary.config.mjs` - rollback SD config
4. `npm run build:tokens` - rebuild with previous working config
5. Verify Storybook works again
6. Document what broke, research fix, try again following SOP

---

## Maintenance

**This SOP is a living document.**

- Update when new token types added to Figma
- Update when new frameworks added to pipeline
- Update when Style Dictionary version changes
- Update when new red flags identified

**Last Updated:** [Current date - AI should fill this in when editing]

