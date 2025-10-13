<!-- d756d681-3b54-4dd3-92df-f8b81fd36f4c 82794973-47e3-4ce0-bc29-651e6acf30ef -->
# Fix Style Dictionary Token Transformation Pipeline

## Phase 1: Fix Custom Formatters to Process ALL Tokens Dynamically

**Current Problem:** Custom formatters use hardcoded token lookups (`findToken('Blue.500')`) and only output specific paths, ignoring 80% of available tokens.

**The transforms already work** - `transformGroup: 'tokens-studio'` handles DTCG parsing. All 59 tokens are in `dictionary.allTokens`.

**The fix:** Rewrite formatters to dynamically iterate through `dictionary.allTokens` filtered by `$type`.

### Pattern Change:

**BAD (current hardcoded approach):**
```javascript
grey: {
  50: findToken('Grey.50') || '#f9fafb',
  100: findToken('Grey.100') || '#e7eaef',
  // ...only outputs 9 hardcoded shades
}
```

**GOOD (dynamic approach):**
```javascript
// Get ALL color tokens
const colorTokens = dictionary.allTokens.filter(t => t.$type === 'color');

// Build color families dynamically
const colorFamilies = {};
colorTokens.forEach(token => {
  const [family, shade] = token.path;
  if (family && shade) {
    if (!colorFamilies[family.toLowerCase()]) {
      colorFamilies[family.toLowerCase()] = {};
    }
    colorFamilies[family.toLowerCase()][shade] = token.$value;
  }
});
// Now ALL color families (Blue, Grey, Green, Red, Orange, Yellow, Pink, Teal, Violet) 
// and ALL shades automatically included
```

### Tasks:

1. **Rewrite MUI formatter (`mui/theme`)** to dynamically process:
   - ALL colors by filtering `$type === 'color'`
   - ALL fontWeights by filtering `$type === 'fontWeights'`
   - ALL fontSizes by filtering `$type === 'fontSizes'`
   - ALL box shadows by filtering `$type === 'boxShadow'` → build `shadows` array
   - ALL borderRadius by filtering `$type === 'borderRadius'` → build `shape.borderRadius`
   - ALL opacity by filtering `$type === 'opacity'` → build `palette.action`
   - Font families by filtering `$type === 'fontFamilies'` → use for `typography.fontFamily`

2. **Rewrite Tailwind formatter (`tailwind/theme`)** to dynamically process:
   - ALL colors by filtering `$type === 'color'`
   - ALL fontWeights by filtering `$type === 'fontWeights'`
   - ALL fontSizes by filtering `$type === 'fontSizes'`
   - ALL box shadows by filtering `$type === 'boxShadow'` → build `boxShadow`
   - ALL borderRadius by filtering `$type === 'borderRadius'` → build `borderRadius`
   - ALL borderWidth by filtering `$type === 'borderWidth'` → build `borderWidth`
   - ALL opacity by filtering `$type === 'opacity'` → build `opacity`
   - Font families by filtering `$type === 'fontFamilies'` → build `fontFamily`
   - Letter spacing by filtering `$type === 'letterSpacing'` → build `letterSpacing`

3. **Rewrite shadcn formatter (`shadcn/css`)** to dynamically process:
   - ALL box shadows by filtering `$type === 'boxShadow'` → CSS variables
   - ALL borderRadius by filtering `$type === 'borderRadius'` → CSS variables
   - ALL borderWidth by filtering `$type === 'borderWidth'` → CSS variables
   - ALL fontFamilies by filtering `$type === 'fontFamilies'` → CSS variables
   - ALL fontWeights by filtering `$type === 'fontWeights'` → CSS variables
   - ALL fontSizes by filtering `$type === 'fontSizes'` → CSS variables
   - ALL opacity by filtering `$type === 'opacity'` → CSS variables

**Verification:**
```bash
npm run build:tokens
# Count tokens in each output
cat build/mui/theme.js | wc -l  # Should be ~300+ lines (currently 141)
cat build/tailwind/theme.js | wc -l  # Should increase significantly
cat build/shadcn/variables.css | wc -l  # Should increase significantly

# Verify all color families present
cat build/mui/theme.js | grep -E "(blue|grey|green|red|orange|yellow|pink|teal|violet):"
cat build/tailwind/theme.js | grep -E "(blue|grey|green|red|orange|yellow|pink|teal|violet):"

# Verify new token types present
cat build/mui/theme.js | grep "shadows"
cat build/tailwind/theme.js | grep "boxShadow"
cat build/tailwind/theme.js | grep "borderWidth"
```

**Exit Criteria:**
- Formatters iterate through `dictionary.allTokens` filtered by `$type`
- No hardcoded token paths (only fallback hex values: `|| '#hex'`)
- All color families present in outputs (not just Blue, Grey)
- New token types (shadows, borderWidth, opacity, etc.) present in outputs

---

## Phase 2: Box Shadows (elevation-1 through elevation-4)

**Current State:** NOT transformed in any framework
**Source:** `elevation-1`, `elevation-2`, `elevation-3`, `elevation-4` in DDS Foundations.json
**Token Type:** boxShadow with `{color, x, y, blur, spread}` structure

### Implementation:
1. **MUI:** Transform to `shadows` array
   - `shadows[1]` = elevation-1
   - `shadows[2]` = elevation-2
   - `shadows[3]` = elevation-3
   - `shadows[4]` = elevation-4
   - Use SD built-in shadow transform (if exists) or minimal custom formatter

2. **Tailwind:** Transform to `boxShadow` object
   - `boxShadow.sm` = elevation-1
   - `boxShadow.DEFAULT` = elevation-2
   - `boxShadow.md` = elevation-3
   - `boxShadow.lg` = elevation-4
   - Use SD built-in shadow transform (if exists) or minimal custom formatter

3. **shadcn:** Transform to CSS variables
   - `--shadow-sm` = elevation-1 (CSS shadow format)
   - `--shadow` = elevation-2
   - `--shadow-md` = elevation-3
   - `--shadow-lg` = elevation-4
   - Use SD built-in shadow/css transform

**Verification:**
```bash
npm run build:tokens
cat build/mui/theme.js | grep -A5 "shadows"
cat build/tailwind/theme.js | grep -A5 "boxShadow"
cat build/shadcn/variables.css | grep "shadow"
```

**Exit Criteria:**
- All 4 elevation tokens present in all 3 framework outputs
- Values come from tokens (verified with grep)
- No hardcoded shadow values
- Storybook renders components with shadows correctly

---

## Phase 3: Border Radius (pill, rounded, others)

**Current State:** MUI hardcoded 4, Tailwind missing, shadcn hardcoded 0.5rem
**Source:** `pill`, `rounded`, and other borderRadius tokens in DDS Foundations.json
**Token Type:** borderRadius

### Implementation:
1. **MUI:** Transform to `shape.borderRadius` object
   - `shape.borderRadius.pill` = pill token
   - `shape.borderRadius.rounded` = rounded token
   - Use SD built-in size transform

2. **Tailwind:** Transform to `borderRadius` object
   - `borderRadius.pill` = pill token
   - `borderRadius.DEFAULT` = rounded token
   - Use SD built-in size transform

3. **shadcn:** Transform to CSS variables
   - `--radius-pill` = pill token
   - `--radius` = rounded token
   - Use SD built-in size/css transform

**Verification:**
```bash
cat build/mui/theme.js | grep -A5 "borderRadius"
cat build/tailwind/theme.js | grep -A5 "borderRadius"
cat build/shadcn/variables.css | grep "radius"
```

**Exit Criteria:**
- All borderRadius tokens present in all 3 framework outputs
- Values come from tokens
- No hardcoded radius values (except existing fallbacks pattern)

---

## Phase 4: Border Width (sm, md, lg, xl, xxl)

**Current State:** NOT transformed in any framework
**Source:** `sm`, `md`, `lg`, `xl`, `xxl` borderWidth tokens in DDS Foundations.json
**Token Type:** borderWidth

### Implementation:
1. **MUI:** Skip (MUI doesn't use theme-level border width config)

2. **Tailwind:** Transform to `borderWidth` object
   - `borderWidth.sm` = sm token
   - `borderWidth.DEFAULT` = md token
   - `borderWidth.lg` = lg token
   - `borderWidth.xl` = xl token
   - `borderWidth.2xl` = xxl token
   - Use SD built-in size transform

3. **shadcn:** Transform to CSS variables
   - `--border-width-sm` = sm token
   - `--border-width` = md token
   - `--border-width-lg` = lg token
   - Use SD built-in size/css transform

**Exit Criteria:**
- All borderWidth tokens present in Tailwind and shadcn outputs
- Values come from tokens

---

## Phase 5: Font Families (marketing, product, code)

**Current State:** MUI hardcodes Inter, Tailwind missing, shadcn missing
**Source:** `marketing` (Poppins), `product` (Inter), `code` (Roboto Mono) in DDS Foundations.json
**Token Type:** fontFamilies

### Implementation:
1. **MUI:** Transform to `typography.fontFamily` (use product/Inter as default)
   - Can add custom variants if needed
   - Use SD built-in font transform

2. **Tailwind:** Transform to `fontFamily` object
   - `fontFamily.marketing` = marketing token + fallback stack
   - `fontFamily.product` = product token + fallback stack
   - `fontFamily.code` = code token + fallback stack
   - Use SD built-in font transform

3. **shadcn:** Transform to CSS variables
   - `--font-marketing` = marketing token + fallback stack
   - `--font-product` = product token + fallback stack
   - `--font-code` = code token + fallback stack
   - Use SD built-in font/css transform

**Exit Criteria:**
- All 3 fontFamily tokens present in all 3 framework outputs
- Values come from tokens (not hardcoded "Inter")
- Proper fallback stacks included

---

## Phase 6: Font Weights (light, regular, semibold, bold, extrabold)

**Current State:** MUI hardcoded, Tailwind hardcoded wrong values, shadcn missing
**Source:** `light` (300), `regular` (400), `semibold` (500), `bold` (700), `extrabold` (900) in DDS Foundations.json
**Token Type:** fontWeights

### Implementation:
1. **MUI:** Transform to `typography.fontWeight*`
   - `typography.fontWeightLight` = light token (300)
   - `typography.fontWeightRegular` = regular token (400)
   - `typography.fontWeightMedium` = semibold token (500)
   - `typography.fontWeightBold` = bold token (700)
   - Add `typography.fontWeightExtrabold` = extrabold token (900)
   - Use SD built-in number transform

2. **Tailwind:** Transform to `fontWeight` object
   - `fontWeight.light` = light token
   - `fontWeight.normal` = regular token
   - `fontWeight.semibold` = semibold token
   - `fontWeight.bold` = bold token
   - `fontWeight.extrabold` = extrabold token
   - Use SD built-in number transform

3. **shadcn:** Transform to CSS variables
   - `--font-weight-light`, `--font-weight-normal`, etc.
   - Use SD built-in number/css transform

**Exit Criteria:**
- All 5 fontWeight tokens present in all 3 framework outputs
- Values come from tokens (not hardcoded 300, 400, 500, 700)
- Tailwind values match token values (not Tailwind defaults)

---

## Phase 7: Font Sizes (10, 12, 14, 16, 18, 21, 24, 32, 40, 48)

**Current State:** MUI hardcoded in variants, Tailwind correct, shadcn missing
**Source:** Font size tokens in DDS Foundations.json
**Token Type:** fontSizes

### Implementation:
1. **MUI:** Transform to typography variants
   - Update hardcoded fontSize values in h1-h6, body1, body2, button, caption, overline
   - Use SD built-in size transform

2. **Tailwind:** Already correct (verify values match tokens)
   - `fontSize.xs` through `fontSize.5xl`
   - Verify using SD built-in size transform

3. **shadcn:** Transform to CSS variables
   - `--text-xs`, `--text-sm`, `--text-base`, `--text-md`, `--text-lg`, etc.
   - Use SD built-in size/css transform

**Exit Criteria:**
- All 10 fontSize tokens present in all 3 framework outputs
- MUI variant sizes come from tokens (not hardcoded "48px", "40px", etc.)
- Tailwind values verified to match tokens

---

## Phase 8: Opacity States (hover, selected, focus, disabled, active, focusVisible, outlinedBorder)

**Current State:** MUI hardcoded wrong values, Tailwind missing, shadcn missing
**Source:** Opacity tokens in DDS Foundations.json (12%, 16%, 24%, 32%, etc.)
**Token Type:** opacity

### Implementation:
1. **MUI:** Transform to `palette.action.*Opacity`
   - `palette.action.hoverOpacity` = hover token (convert 12% → 0.12)
   - `palette.action.selectedOpacity` = selected token (convert 16% → 0.16)
   - `palette.action.focusOpacity` = focus token (convert 24% → 0.24)
   - `palette.action.disabledOpacity` = disabled token (convert 32% → 0.32)
   - `palette.action.activatedOpacity` = active token
   - Use SD built-in opacity transform (may need custom percentage → decimal conversion)

2. **Tailwind:** Transform to `opacity` object
   - `opacity.hover` = hover token (as integer: 12)
   - `opacity.selected` = selected token (as integer: 16)
   - `opacity.focus`, `opacity.disabled`, `opacity.active`
   - Use SD built-in opacity transform

3. **shadcn:** Transform to CSS variables
   - `--opacity-hover`, `--opacity-selected`, `--opacity-focus`, etc.
   - Use SD built-in opacity/css transform

**Exit Criteria:**
- All opacity tokens present in all 3 framework outputs
- MUI values converted to decimal (0.12, not hardcoded)
- Tailwind values as integers
- Values come from tokens

---

## Phase 9: Spacing Scale (xs + others if present)

**Current State:** MUI hardcoded 8, Tailwind hardcoded defaults, shadcn missing
**Source:** `xs` (4px) and other spacing tokens in DDS Foundations.json
**Token Type:** spacing

### Implementation:
1. **MUI:** Determine spacing base unit from tokens
   - If xs = 4px, MUI spacing(1) should = 8px (2 * 4px)
   - Set `spacing` value based on token analysis
   - Use SD built-in size transform

2. **Tailwind:** Transform to `spacing` object
   - Map spacing tokens to Tailwind spacing scale
   - Use SD built-in size transform

3. **shadcn:** Transform to CSS variables
   - `--spacing-*` variables
   - Use SD built-in size/css transform

**Exit Criteria:**
- Spacing values derived from tokens (not hardcoded 8)
- All spacing tokens present in outputs

---

## Phase 10: Letter Spacing

**Current State:** NOT transformed
**Source:** `0` (0%) letterSpacing token in DDS Foundations.json
**Token Type:** letterSpacing

### Implementation:
1. **MUI:** Add to typography variants if needed
2. **Tailwind:** Transform to `letterSpacing` object
3. **shadcn:** Transform to CSS variables

**Exit Criteria:**
- Letter spacing tokens present in outputs

---

## Phase 11: Verify Complete Color Coverage

**Current State:** Partial (Blue, Grey, Black, White only)
**Source:** Blue, Grey, Green, Red, Orange, Yellow, Pink, Teal, Violet, Black, White in DDS Foundations.json
**Token Type:** color

### Tasks:
1. Verify ALL 9 color scales transform to MUI palette
2. Verify ALL 9 color scales transform to Tailwind colors
3. Verify ALL color tokens transform to shadcn CSS variables

**Exit Criteria:**
- Green, Red, Orange, Yellow, Pink, Teal, Violet present in all outputs
- Not just Blue, Grey, Black, White

---

## Phase 12: Final Verification

### Verification Commands:
```bash
# Count source tokens
cat "token-studio-sync-provider/DDS Foundations.json" | jq 'keys | length'
# Expected: 59

# Verify no hardcoded values (except fallbacks)
grep -E '#[0-9a-fA-F]{3,6}' config/style-dictionary.config.mjs
# Every result should be part of fallback pattern: || '#hex'

# Build tokens
npm run build:tokens

# Check MUI output completeness
wc -l build/mui/theme.js
# Target: ~300+ lines (currently 141)

# Verify Storybook
npm run storybook
# Check all three frameworks render
# Check theme toggle works
# Check no console errors
```

### Exit Criteria (SD-SOP.md Success Criteria):
1. ALL 59 source tokens transform to framework outputs
2. MUI output contains: palette (complete), typography (complete), shadows, spacing, shape, palette.action
3. Tailwind output contains: colors (complete), boxShadow, borderRadius, borderWidth, fontFamily, fontWeight, fontSize, opacity, spacing, letterSpacing
4. shadcn output contains: semantic colors, shadows, radius, border widths, font families, font weights, font sizes, opacity states
5. Zero hardcoded values (except fallbacks pattern)
6. Storybook renders all three frameworks correctly
7. Theme toggle works
8. No console errors
9. Documentation updated

---

## Documentation Updates

After implementation complete:
1. Update `docs/SD-ACTUAL-SYSTEM.md` with new system state
2. Update `docs/TOKEN-MAPPING-COMPLETE.md` with completion status
3. Create commit summarizing all token transformations added

---

## Critical Rules (From SD-SOP.md)

**During ALL phases:**
- Research SD built-in transforms FIRST
- Use built-in transforms wherever possible
- Custom formatters ONLY for framework-specific nesting
- Zero hardcoding (except fallbacks)
- Verify after EACH phase before proceeding
- Follow METAPLAN principles (one phase at a time, verify, then proceed)


### To-dos

- [ ] Research Style Dictionary built-in transform capabilities and document findings
- [ ] Implement box shadow transformation for MUI, Tailwind, shadcn (elevation-1 through 4)
- [ ] Implement border radius transformation for all frameworks (pill, rounded, etc.)
- [ ] Implement border width transformation for Tailwind and shadcn
- [ ] Implement font family transformation for all frameworks (marketing, product, code)
- [ ] Implement font weight transformation for all frameworks (light, regular, semibold, bold, extrabold)
- [ ] Implement font size transformation for all frameworks (10-48)
- [ ] Implement opacity state transformation for all frameworks (hover, selected, focus, disabled, active)
- [ ] Implement spacing scale transformation for all frameworks
- [ ] Implement letter spacing transformation for all frameworks
- [ ] Verify ALL color scales transform (Green, Red, Orange, Yellow, Pink, Teal, Violet, not just Blue/Grey)
- [ ] Run complete SD-SOP.md verification checklist and verify all 59 tokens transform