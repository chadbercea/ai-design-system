# Token Audit

## Source Tokens (59 total)

From: `token-studio-sync-provider/DDS Foundations.json`

### Spacing Scale (12 tokens)
- `0`, `10`, `12`, `14`, `16`, `18`, `21`, `24`, `32`, `40`, `48`, `spacing`

**Should map to:**
- MUI: `theme.spacing()` scale
- Tailwind: `spacing` object
- shadcn: spacing scale CSS variables

### Colors (9 token groups)
- `Black`, `White`, `Blue`, `Grey`, `Green`, `Red`, `Orange`, `Yellow`, `Pink`, `Teal`, `Violet`

**Should map to:**
- MUI: `palette.primary`, `palette.secondary`, `palette.grey`, `palette.error`, etc.
- Tailwind: `colors.blue`, `colors.grey`, etc.
- shadcn: `--primary`, `--secondary`, etc. (HSL format)

### Opacity States (7 tokens)
- `hover`, `selected`, `focus`, `focusVisible`, `outlinedBorder`, `active`, `disabled`

**Should map to:**
- MUI: `palette.action.hover`, `palette.action.selected`, etc.
- Tailwind: opacity scale or color opacity modifiers
- shadcn: potentially CSS variable opacity values

### Box Shadow (4 tokens)
- `elevation-1`, `elevation-2`, `elevation-3`, `elevation-4`

**Should map to:**
- MUI: `shadows` array (indices 1-4)
- Tailwind: `boxShadow.sm`, `boxShadow.md`, etc.
- shadcn: potentially shadow CSS variables

### Font Family (3 tokens)
- `marketing`, `product`, `code`

**Should map to:**
- MUI: `typography.fontFamily` or custom variants
- Tailwind: `fontFamily.marketing`, `fontFamily.product`, etc.
- shadcn: font family CSS variables

### Font Weight (5 tokens)
- `light`, `regular`, `semibold`, `bold`, `extrabold`

**Should map to:**
- MUI: `typography.fontWeightLight`, `typography.fontWeightRegular`, etc.
- Tailwind: `fontWeight.light`, `fontWeight.regular`, etc.
- shadcn: potentially font weight variables

### Font Size (9 tokens)
- `10`, `12`, `14`, `16`, `18`, `21`, `24`, `32`, `40`, `48` (overlap with spacing?)

**Should map to:**
- MUI: `typography.fontSize` or typography variant sizes
- Tailwind: `fontSize.xs`, `fontSize.sm`, etc.
- shadcn: font size variables

### Border Radius (4 tokens)
- `none`, `rounded`, `pill`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl` (need to verify names)

**Should map to:**
- MUI: `shape.borderRadius` or multiple radius values
- Tailwind: `borderRadius.none`, `borderRadius.sm`, etc.
- shadcn: `--radius` or multiple radius variables

### Text Styles (5 tokens)
- `Align`, `italic`, `underline`, `uppercase`, `auto`

**Should map to:**
- MUI: potentially typography variants
- Tailwind: utility classes (text-center, italic, underline, uppercase)
- shadcn: potentially CSS variables or left to Tailwind

### Icon Sizes (1 token)
- `Icon`

**Should map to:**
- MUI: potentially custom icon size
- Tailwind: custom icon size scale
- shadcn: icon size variable

---

## Current State: What's Being Transformed

### MUI (`build/mui/theme.js`)
**Transformed:**
- Colors (partial - Blue, Grey, Black, White)
- Typography (hardcoded structure)
- spacing (hardcoded: 8)
- shape.borderRadius (hardcoded: 4)

**MISSING:**
- elevation-1 through elevation-4 → shadows array
- opacity states → palette.action
- font family variants → typography.fontFamily
- font weight tokens → typography.fontWeight*
- border radius variants → shape
- spacing scale → spacing function/multiplier
- icon sizes
- text styles

### Tailwind (`build/tailwind/theme.js`)
**Need to check what's actually in this file**

### shadcn (`build/shadcn/variables.css`)
**Need to check what's actually in this file**

---

## Next Steps

1. Read actual Tailwind and shadcn outputs
2. Document what's missing from each
3. Research Style Dictionary built-in transforms
4. Create transformation strategy

