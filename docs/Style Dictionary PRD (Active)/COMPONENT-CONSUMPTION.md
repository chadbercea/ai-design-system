# Component Token Consumption Documentation

## Purpose

This document maps how each showcase component (Card, Button, Input, Typography) consumes design tokens across MUI, Tailwind, and shadcn frameworks. Understanding these consumption mechanisms is critical for achieving visual identity across frameworks.

**Key Insight**: Different frameworks use different terminology for the same visual property. For example:
- MUI calls it `elevation` (via shadows array)
- Tailwind calls it `boxShadow` 
- shadcn calls it `shadow` (CSS variable)

All three must resolve to the same source token (`elevation-1`, `elevation-2`, etc.) to achieve visual identity.

---

## Card Component Consumption Matrix

| Property | MUI Mechanism | Tailwind Mechanism | shadcn Mechanism | Source Token | Expected Value |
|----------|--------------|-------------------|------------------|--------------|----------------|
| **Background** | `palette.background.paper` | `bg-card` class → `colors.card` | `bg-card` class → `--card` var | `White.100%` | `#ffffff` |
| **Border** | `components.MuiCard.styleOverrides.root.border` + `borderColor` | `border border-grey-300` classes | `border` class → `--border` var | `Grey.300` | `#c8cfda` |
| **Border Width** | `components.MuiCard.styleOverrides.root.border` | `border` class (default 1px) | `border` class (default 1px) | `borderWidth.sm` | `1px` |
| **Border Radius** | `shape.borderRadius` | `rounded-lg` → `borderRadius.lg` | `rounded-xl` → Tailwind `borderRadius` | `rounded` | `8px` |
| **Shadow** | `shadows[elevation]` via elevation prop | `shadow-sm` → `boxShadow.sm` | `shadow` class → Tailwind shadow | `elevation-1` | `0px 2px 4px 4px rgba(...)` |

### Correlation Notes
- **MUI**: Card elevation defaults to 1, resolved via `shadows[1]` from theme
- **Tailwind**: Must explicitly add `shadow-sm` class or card is flat
- **shadcn**: Default includes `shadow` class in component definition
- **Alignment Strategy**: Set MUI default elevation to 0 for flat cards OR ensure all three use elevation-1 consistently

---

## Button Component Consumption Matrix

| Property | MUI Mechanism | Tailwind Mechanism | shadcn Mechanism | Source Token | Expected Value |
|----------|--------------|-------------------|------------------|--------------|----------------|
| **Primary BG** | `palette.primary.main` | `bg-blue-500` → `colors.blue.500` | `bg-primary` → `--primary` var | `Blue.500` | `#2560ff` |
| **Secondary BG** | `palette.secondary.main` | `bg-grey-500` → `colors.grey.500` | `bg-secondary` → `--secondary` var | `Grey.500` | `#6c7e9d` |
| **Outlined Border** | `components.MuiButton.styleOverrides.outlined.borderWidth` | `border-2` → `borderWidth['2']` | `border` class → `--border` var | `borderWidth.sm` | `1px` |
| **Border Radius** | `shape.borderRadius` | `rounded-md` → `borderRadius.md` | `rounded-md` → Tailwind config | `rounded` | `8px` |
| **Font Weight** | `typography.button.fontWeight` | `font-semibold` → `fontWeight.semibold` | `font-medium` → `fontWeight.medium` | `semibold` | `500` |
| **Font Size** | `typography.button.fontSize` (number) | `text-sm` → `fontSize.sm` (string with px) | `text-sm` → `fontSize.sm` | `14` | MUI: `14`, TW/shadcn: `"14px"` |
| **Text Color (contained)** | `palette.primary.contrastText` | `text-white` → `colors.white` | `text-primary-foreground` → `--primary-foreground` | `White.100%` | `#ffffff` |

### Correlation Notes
- **MUI**: Uses `variant` prop (`contained`, `outlined`) and `color` prop (`primary`, `secondary`)
- **Tailwind**: Requires explicit utility classes for all styling
- **shadcn**: Uses `variant` prop with CSS variables for theming
- **Alignment Strategy**: Ensure `rounded-md` in all frameworks resolves to 8px from `rounded` token

---

## Input Component Consumption Matrix

| Property | MUI Mechanism | Tailwind Mechanism | shadcn Mechanism | Source Token | Expected Value |
|----------|--------------|-------------------|------------------|--------------|----------------|
| **Border Color** | `palette.text.secondary` or `palette.divider` | `border-grey-300` → `colors.grey['300']` | `border-input` → `--input` var | `Grey.300` | `#c8cfda` |
| **Border Width** | MUI default (1px) | `border` class (default 1px) | `border` class (default 1px) | `borderWidth.sm` | `1px` |
| **Border Radius** | `shape.borderRadius` | `rounded` → `borderRadius.DEFAULT` | `rounded` → Tailwind config | `rounded` | `8px` |
| **Font Size** | `typography.fontSize` | `text-sm` → `fontSize.sm` | `text-sm` → `fontSize.sm` | `14` | MUI: `14`, TW/shadcn: `"14px"` |
| **Padding** | `spacing(n)` - MUI uses 8px base | `px-4 py-2` → `spacing['4']` `spacing['2']` | `px-4 py-2` → Tailwind spacing | `spacing` | `8px` base |
| **Background** | `palette.background.default` or paper | `bg-background` → `colors.background` | `bg-background` → `--background` | `White.100%` | `#ffffff` |

### Correlation Notes
- **MUI**: TextField uses `variant="outlined"` with `size="small"`
- **Tailwind**: Native `<input>` element with utility classes
- **shadcn**: Typically wraps native input with shadcn styling
- **Alignment Strategy**: Ensure `rounded` class maps to `borderRadius.DEFAULT` = 8px in Tailwind config

---

## Typography Consumption Matrix

| Property | MUI Mechanism | Tailwind Mechanism | shadcn Mechanism | Source Token | Expected Value |
|----------|--------------|-------------------|------------------|--------------|----------------|
| **Font Family** | `typography.fontFamily` | `font-sans` → `fontFamily.sans` | Default font stack or explicit class | `product` | `"Inter", sans-serif` |
| **H5 Size** | `typography.h5.fontSize` (number) | `text-xl` → `fontSize.xl` (string) | `text-xl` class | `21` | MUI: `21`, TW/shadcn: `"21px"` |
| **H6 Size** | `typography.h6.fontSize` | `text-lg` → `fontSize.lg` | `text-lg` class | `18` | MUI: `18`, TW/shadcn: `"18px"` |
| **Body1 Size** | `typography.body1.fontSize` | `text-base` → `fontSize.base` | `text-base` class | `16` | MUI: `16`, TW/shadcn: `"16px"` |
| **Body2 Size** | `typography.body2.fontSize` | `text-sm` → `fontSize.sm` | `text-sm` class | `14` | MUI: `14`, TW/shadcn: `"14px"` |
| **Semibold Weight** | `typography.fontWeightMedium` | `font-semibold` → `fontWeight.semibold` | `font-semibold` class | `semibold` | `500` |
| **Bold Weight** | `typography.fontWeightBold` | `font-bold` → `fontWeight.bold` | `font-bold` class | `bold` | `700` |
| **Primary Color** | `palette.text.primary` | `text-black` or default | `text-foreground` → `--foreground` | `Black.100%` | `#000000` or `rgba(0,0,0,0.87)` |

### Correlation Notes
- **MUI**: Uses `variant` prop (`h1`, `h2`, `h6`, `body1`, `body2`, etc.)
- **Tailwind**: Uses utility classes for size, weight, color
- **shadcn**: Typically uses Tailwind classes for typography
- **Alignment Strategy**: Ensure Tailwind `font-sans` is set to DDS `product` font (Inter)

---

## Critical Correlations for Visual Identity

### The Elevation/Shadow Problem
**Challenge**: MUI calls it `elevation`, Tailwind/shadcn call it `boxShadow`/`shadow`.

**Correlation**:
```
Source Token: elevation-1
├─ MUI: shadows[1] = "0px 2px 4px 4px rgba(...)"
├─ Tailwind: boxShadow.sm = "0px 2px 4px 4px rgba(...)"
└─ shadcn: --elevation-1 = "0px 2px 4px 4px rgba(...)"
```

**For Card**: 
- MUI: `<Card elevation={0}>` or `components.MuiCard.defaultProps.elevation = 0` for flat
- MUI: `<Card elevation={1}>` or default for elevation-1 shadow
- Tailwind: Add `shadow-sm` class for elevation-1
- shadcn: Component includes `shadow` class by default

### The Border Radius Problem
**Challenge**: Tailwind has named radius classes (`sm`, `md`, `lg`) that don't match our `rounded` token.

**Correlation**:
```
Source Token: rounded = 8px
├─ MUI: shape.borderRadius = 8 (number)
├─ Tailwind: borderRadius.DEFAULT = "8px" (for `rounded` class)
├─ Tailwind: Override all classes (sm, md, lg, xl) to use 8px OR 200px (pill)
└─ shadcn: Uses Tailwind classes, so inherits Tailwind config
```

**Solution**: In `tailwind.config.js`, override Tailwind's default radius scale to use DDS tokens.

### The Font Family Problem
**Challenge**: Tailwind's default `sans` font is not Inter.

**Correlation**:
```
Source Token: product = "Inter"
├─ MUI: typography.fontFamily = '"Inter", sans-serif'
├─ Tailwind: fontFamily.sans = ["Inter", "sans-serif"]
└─ shadcn: Inherits Tailwind's `sans` font
```

**Solution**: In Tailwind formatter, set `fontFamily.sans = fontFamily.product`.

### The Font Weight Problem
**Challenge**: Tailwind's `font-semibold` is 600 by default, but DDS `semibold` is 500.

**Correlation**:
```
Source Token: semibold = 500
├─ MUI: typography.fontWeightMedium = 500
├─ Tailwind: fontWeight.semibold = 500 (override default 600)
└─ shadcn: Uses Tailwind classes, inherits weight
```

**Solution**: In Tailwind formatter, ensure `fontWeight.semibold = 500` from token.

---

## Component-Specific Implementation Status

### MUI Showcase (`src/demo-components/MUIShowcase.tsx`)
- ✅ Card: Uses `<Card>` with no elevation prop (theme default)
- ✅ Card: Has theme override for border (`components.MuiCard.styleOverrides`)
- ✅ Button: Uses `variant` and `color` props only
- ✅ Input: Uses TextField with `variant="outlined"` and `size="small"`
- ✅ Typography: Uses Typography components with variant props

### Tailwind Showcase (`src/demo-components/TailwindShowcase.tsx`)
- ⚠️ Card: Uses `bg-card` but may need semantic token check
- ⚠️ Button: Uses `bg-blue-500` (direct color scale, not semantic)
- ⚠️ Button: Uses `rounded-md` (needs verification this maps to 8px)
- ⚠️ Input: Uses `rounded` (should map to DEFAULT/8px)
- ⚠️ Typography: Need to verify Inter font is applied

### shadcn Components (`src/components/ui/`)
- ✅ Card: Uses `rounded-xl`, `border`, `bg-card`, `shadow` classes
- ✅ Button: Uses CSS variables (`bg-primary`, `text-primary-foreground`)
- ⚠️ Need to verify `rounded-xl` resolves to 8px
- ⚠️ Need to verify `shadow` class has correct elevation

---

## Verification Strategy

For each component property:
1. **Trace the token path**: Source token → SD output → Framework config → Component usage
2. **Verify the value**: Use grep/node to check actual values in build outputs
3. **Visual inspection**: Toggle DDS theme in Storybook, compare all three frameworks
4. **Document discrepancies**: Any visual difference gets root-cause analysis

**Next Steps**: Execute Phase 2 (SD Format Fixes) to ensure all outputs are in correct formats before verifying visual identity.

