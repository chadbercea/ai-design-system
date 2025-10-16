# Visual Discrepancies Report

**Date**: October 14, 2025
**Status**: In Progress - Automated audits complete, awaiting manual visual verification

## Automated Audit Results

### Discrepancy 1: Tailwind Outlined Button Border Width

**Component**: Button (outlined variant)
**Property**: Border width
**Location**: `src/demo-components/TailwindShowcase.tsx` line 18

**Current State**:
- MUI: Uses `components.MuiButton.styleOverrides.outlined.borderWidth: '1px'`
- Tailwind: Uses `border-2` class (resolves to 2px)
- shadcn: Uses `border border-input` (resolves to 1px default)

**Source Token**: `borderWidth.sm = 1px`

**Expected**: All three frameworks should use 1px border

**Root Cause**: Tailwind showcase component uses `border-2` class instead of `border` or `border-sm`

**Fix Layer**: Component code (Tailwind showcase)

**Fix Required**: Change line 18 from:
```tsx
<button className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition">
```

To:
```tsx
<button className="border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition">
```

**Status**: ✅ RESOLVED - Fixed on October 14, 2025

**Fix Applied**: Changed `border-2` to `border` in TailwindShowcase.tsx line 18

---

### Discrepancy 2: Drop Shadows on Buttons and Components

**Components**: All buttons (MUI, Tailwind, shadcn), Cards, Inputs
**Property**: Box shadow / elevation
**Location**: Multiple

**Current State (before fix)**:
- MUI buttons: Contained variant had default elevation (shadow visible)
- Tailwind buttons: N/A (Tailwind doesn't use shadows by default)
- shadcn buttons: Used `shadow` and `shadow-sm` classes (resolved to actual shadows)
- Cards and inputs: Also had shadow classes applied

**Source Token**: `elevation-0` (no shadow) or explicit `none`

**Expected**: All components should have NO drop shadow (elevation=0, flat appearance)

**Root Causes**:
1. **MUI**: `MuiButton` had no `defaultProps.disableElevation` setting, so contained buttons defaulted to elevation=1 or 2
2. **Tailwind/shadcn**: `tailwind.config.js` only overrode `boxShadow.DEFAULT` to 'none', but `shadow-sm`, `shadow-md`, `shadow-lg` still had actual shadow values from SD output. shadcn button component uses these classes.

**Fix Layer**: Configuration (SD config + Tailwind config)

**Fixes Applied**:

**Fix 2a: MUI Button Elevation**
File: `config/style-dictionary.config.mjs` lines 257-260
```javascript
MuiButton: {
  defaultProps: {
    disableElevation: true  // ← Added
  },
  styleOverrides: {
    outlined: {
      borderWidth: '1px'
    }
  }
}
```

**Fix 2b: Tailwind Shadow Classes**
File: `tailwind.config.js` lines 74-81
```javascript
boxShadow: {
  ...ddsTheme.boxShadow,
  // Override ALL shadow classes to none (elevation=0 for all components)
  DEFAULT: 'none',
  sm: 'none',      // ← Added
  md: 'none',      // ← Added
  lg: 'none'       // ← Added
},
```

**Reasoning**: 
- MUI's `disableElevation: true` removes all shadows from buttons globally
- Overriding all Tailwind shadow classes ensures `shadow`, `shadow-sm`, `shadow-md`, `shadow-lg` all resolve to 'none'
- This makes shadcn components (which use these classes) also flat

**Status**: ✅ RESOLVED - Fixed on October 14, 2025

**Verification Required**: User must toggle DDS theme and confirm NO drop shadows appear on any buttons, cards, or inputs

---

## Manual Visual Verification Checklist

**Storybook URL**: http://localhost:6006

### Instructions
1. Open Storybook in browser
2. Toggle DDS theme ON
3. Verify each item below by visual inspection
4. Mark ✅ if identical across all three frameworks, ⚠️ if discrepancy found

### Card Component
- [ ] Background color: All white
- [ ] Border color: All grey-300 (#c8cfda)
- [ ] Border width: All 1px
- [ ] Border radius: All 8px (visually rounded corners)
- [ ] Shadow: All flat (no shadow) OR all have same shadow
- [ ] Overall size: All same dimensions

**Notes**:
- MUI Card: Theme sets elevation=0 (flat), border='1px solid', borderColor=grey.300
- Tailwind Card: Uses `border border-grey-300`, no shadow (boxShadow.DEFAULT='none')
- shadcn Card: Uses `border bg-card shadow`, shadow resolves to 'none'

### Primary Button (Contained/Default variant)
- [ ] Background color: All same blue (#2560ff / Blue.500)
- [ ] Text color: All white
- [ ] Border radius: All 8px
- [ ] Font family: All Inter
- [ ] Font size: All 14px
- [ ] Font weight: All 500 (semibold/medium)
- [ ] Padding: All same (verify visual spacing)

**Notes**:
- MUI: palette.primary.main
- Tailwind: bg-blue-500
- shadcn: bg-primary (CSS var --primary)

### Secondary Button
- [ ] Background color: All same grey (#6c7e9d / Grey.500)
- [ ] Text color: All white
- [ ] Border radius: All 8px
- [ ] Font family: All Inter
- [ ] Font size: All 14px
- [ ] Font weight: All 500

**Notes**:
- MUI: palette.secondary.main
- Tailwind: bg-grey-500
- shadcn: bg-secondary (CSS var --secondary)

### Outlined Button
- [⚠️] Border color: All same blue (#2560ff)
- [⚠️] Border width: MUI=1px, Tailwind=2px (KNOWN DISCREPANCY), shadcn=1px
- [ ] Border radius: All 8px
- [ ] Background: All transparent/white
- [ ] Text color: All blue
- [ ] Font: Same as other buttons

**Known Issue**: Tailwind uses `border-2` (2px) instead of `border` (1px). See Discrepancy 1 above.

### Input (Text Field)
- [ ] Border color: All grey-300 (#c8cfda)
- [ ] Border width: All 1px
- [ ] Border radius: All 8px
- [ ] Font size: All 14px
- [ ] Background: All white
- [ ] Padding: All same (verify visual spacing)

**Notes**:
- MUI: TextField variant="outlined" size="small"
- Tailwind: border border-grey-300 rounded
- shadcn: border-input rounded

### Typography
- [ ] Font family: All Inter
- [ ] Heading (h5/h6): All same size
- [ ] Body text: All same size
- [ ] Font weight (semibold): All 500
- [ ] Text color: All same (black or near-black)

**Notes**:
- MUI: typography.fontFamily, typography variants
- Tailwind: font-sans (maps to Inter), text-* classes
- shadcn: Inherits Tailwind font

---

## Additional Checks

### Color Accuracy
Verify exact color values match across frameworks:
- Primary blue: #2560ff (Blue.500)
- Secondary grey: #6c7e9d (Grey.500)
- Border grey: #c8cfda (Grey.300)
- White: #ffffff (White.100%)

Use browser DevTools to inspect computed styles.

### Spacing Consistency
Verify padding/margin values match:
- Button padding: Should be consistent (MUI uses spacing(n), Tailwind uses px-4 py-2)
- Card padding: Should be consistent
- Input padding: Should be consistent

### Interactive States
- [ ] Hover states: All buttons show hover effect
- [ ] Focus states: All inputs show focus ring/border
- [ ] Disabled states: (if present) All show disabled styling

---

## Resolution Process

For each discrepancy found:

1. **Document**: Component, property, what's different
2. **Trace back**: Component code → Framework config → SD output → SD config → Source token
3. **Identify fix layer**:
   - Source token incorrect? (should not happen - tokens are source of truth)
   - SD config not transforming correctly? → Fix SD config
   - Framework config not consuming SD output? → Fix framework config
   - Component code hardcoded? → Fix component code
4. **Apply fix at root level**: Prefer SD config > framework config > component code
5. **Verify fix**: Rebuild, check output, visual inspection
6. **Update this document**: Mark discrepancy as RESOLVED
7. **Repeat**: Continue until all discrepancies resolved

---

## Proof of Visual Identity

When all manual verification items are ✅:

1. Take screenshots of all three frameworks side-by-side
2. Verify pixel-perfect match (use image diff tool if possible)
3. Document any remaining discrepancies as "Acceptable framework limitations" with proof
4. Mark system as achieving 100% visual identity goal

---

## Status Summary

**Automated Audits**: ✅ Complete
- Phase 2 (SD Format Fixes): ✅ All 6 fixes verified
- Phase 4 (Framework Config): ✅ All configs audited
- Phase 5 (Component Code): ✅ All components audited

**Identified Issues**:
1. ✅ Tailwind outlined button border width (2px vs 1px) - RESOLVED
2. ✅ Drop shadows on buttons and components (elevation should be 0) - RESOLVED

**Manual Verification**: ⏸️ AWAITING USER - Please re-verify after shadow fixes

**Next Steps**:
1. User performs manual visual verification checklist
2. User documents any additional discrepancies found
3. AI applies fixes for all discrepancies
4. Recursive loop until 100% visual identity achieved

