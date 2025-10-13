# Complete Token Mapping

## Source: `token-studio-sync-provider/DDS Foundations.json`

### 1. Box Shadow (4 tokens)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `elevation-1` | boxShadow | `{color, x, y, blur, spread}` | `shadows[1]` | `boxShadow.sm` | `--shadow-sm` |
| `elevation-2` | boxShadow | `{color, x, y, blur, spread}` | `shadows[2]` | `boxShadow.DEFAULT` | `--shadow` |
| `elevation-3` | boxShadow | `{color, x, y, blur, spread}` | `shadows[3]` | `boxShadow.md` | `--shadow-md` |
| `elevation-4` | boxShadow | `{color, x, y, blur, spread}` | `shadows[4]` | `boxShadow.lg` | `--shadow-lg` |

**Current:** NOT transformed in any framework output
**Should:** Style Dictionary has built-in `shadow/css` transform

---

### 2. Border Radius (10 tokens)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `pill` | borderRadius | `200px` | `shape.borderRadius.pill` | `borderRadius.pill` | `--radius-pill` |
| `rounded` | borderRadius | `8px` | `shape.borderRadius.rounded` | `borderRadius.DEFAULT` | `--radius` |
| (others?) | borderRadius | various | `shape.borderRadius.*` | `borderRadius.*` | `--radius-*` |

**Current:** MUI has hardcoded 4, Tailwind missing, shadcn has hardcoded 0.5rem
**Should:** Transform all borderRadius tokens

---

### 3. Border Width (5 tokens)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `sm` | borderWidth | `1px` | N/A (MUI doesn't use) | `borderWidth.sm` | `--border-width-sm` |
| `md` | borderWidth | `1.25px` | N/A | `borderWidth.DEFAULT` | `--border-width` |
| `lg` | borderWidth | `1.5px` | N/A | `borderWidth.lg` | `--border-width-lg` |
| `xl` | borderWidth | `2px` | N/A | `borderWidth.xl` | `--border-width-xl` |
| `xxl` | borderWidth | `2.5px` | N/A | `borderWidth.2xl` | `--border-width-2xl` |

**Current:** NOT transformed in any framework output
**Should:** Add to Tailwind and shadcn

---

### 4. Font Families (3 tokens)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `marketing` | fontFamilies | `"Poppins"` | `typography.fontFamily` (or custom) | `fontFamily.marketing` | `--font-marketing` |
| `product` | fontFamilies | `"Inter"` | `typography.fontFamily` | `fontFamily.product` | `--font-product` |
| `code` | fontFamilies | `"Roboto Mono"` | `typography.fontFamily` (or custom) | `fontFamily.code` | `--font-code` |

**Current:** MUI hardcodes Inter, Tailwind missing, shadcn missing
**Should:** Transform all fontFamily tokens with proper fallback stacks

---

### 5. Font Weights (5 tokens)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `light` | fontWeights | `300` | `typography.fontWeightLight` | `fontWeight.light` | `--font-weight-light` |
| `regular` | fontWeights | `400` | `typography.fontWeightRegular` | `fontWeight.normal` | `--font-weight-normal` |
| `semibold` | fontWeights | `500` | `typography.fontWeightMedium` | `fontWeight.semibold` | `--font-weight-semibold` |
| `bold` | fontWeights | `700` | `typography.fontWeightBold` | `fontWeight.bold` | `--font-weight-bold` |
| `extrabold` | fontWeights | `900` | N/A (add custom) | `fontWeight.extrabold` | `--font-weight-extrabold` |

**Current:** MUI hardcoded, Tailwind has hardcoded values, shadcn missing
**Should:** Transform from tokens (Tailwind ALREADY HAS THIS! Just hardcoded wrong values)

---

### 6. Font Sizes (10 tokens)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `10` | fontSizes | `10` | `typography.fontSize` or variants | `fontSize.xs` | `--text-xs` |
| `12` | fontSizes | `12` | `typography.fontSize` or variants | `fontSize.sm` | `--text-sm` |
| `14` | fontSizes | `14` | `typography.fontSize` or variants | `fontSize.base` | `--text-base` |
| `16` | fontSizes | `16` | `typography.fontSize` or variants | `fontSize.md` | `--text-md` |
| `18` | fontSizes | `18` | `typography.fontSize` or variants | `fontSize.lg` | `--text-lg` |
| `21` | fontSizes | `21` | `typography.fontSize` or variants | `fontSize.xl` | `--text-xl` |
| `24` | fontSizes | `24` | `typography.fontSize` or variants | `fontSize.2xl` | `--text-2xl` |
| `32` | fontSizes | `32` | `typography.fontSize` or variants | `fontSize.3xl` | `--text-3xl` |
| `40` | fontSizes | `40` | `typography.fontSize` or variants | `fontSize.4xl` | `--text-4xl` |
| `48` | fontSizes | `48` | `typography.fontSize` or variants | `fontSize.5xl` | `--text-5xl` |

**Current:** MUI hardcoded in variants, Tailwind HAS THIS (good!), shadcn missing
**Should:** Tailwind is CORRECT, replicate for MUI and shadcn

---

### 7. Opacity States (7 tokens)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `hover` | opacity | `12%` | `palette.action.hoverOpacity` (0.12) | `opacity.hover` (12) | `--opacity-hover` |
| `selected` | opacity | `16%` | `palette.action.selectedOpacity` (0.16) | `opacity.selected` (16) | `--opacity-selected` |
| `focus` | opacity | `24%` | `palette.action.focusOpacity` (0.24) | `opacity.focus` (24) | `--opacity-focus` |
| `focusVisible` | opacity | ? | `palette.action.focusOpacity` | `opacity.focusVisible` | `--opacity-focus-visible` |
| `active` | opacity | ? | `palette.action.activatedOpacity` | `opacity.active` | `--opacity-active` |
| `disabled` | opacity | `32%` | `palette.action.disabledOpacity` (0.32) | `opacity.disabled` (32) | `--opacity-disabled` |
| `outlinedBorder` | opacity | ? | N/A | N/A | N/A |

**Current:** MUI hardcoded (wrong values!), Tailwind missing, shadcn missing
**Should:** Transform opacity tokens, convert `12%` → `0.12` for MUI, `12%` → `12` for Tailwind

---

### 8. Spacing (1 token + 1 scale token)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `xs` | spacing | `4px` | `spacing(0.5)` ? | `spacing.1` | `--spacing-1` |
| `spacing.none` | paragraphSpacing | `0%` | N/A | N/A | `--paragraph-spacing-none` |

**Current:** MUI hardcoded 8, Tailwind hardcoded Tailwind defaults, shadcn missing
**Should:** Need to clarify spacing scale strategy (xs is 4px, but MUI spacing(1) is 8px by default)

---

### 9. Letter Spacing (1 token)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `0` | letterSpacing | `0%` | `typography.letterSpacing` | `letterSpacing.normal` | `--letter-spacing-normal` |

**Current:** NOT transformed
**Should:** Add to all frameworks

---

### 10. Text Styles (5 tokens)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `Align` | ? | ? | N/A | utility classes | N/A |
| `italic` | ? | ? | N/A | utility class | N/A |
| `underline` | textDecoration | ? | N/A | utility class | N/A |
| `uppercase` | textCase | ? | N/A | utility class | N/A |
| `none` | textDecoration | `none` | N/A | utility class | N/A |
| `auto` | ? | ? | N/A | N/A | N/A |

**Current:** NOT transformed (Tailwind uses utility classes, not theme tokens)
**Should:** Potentially skip - these are utilities, not theme tokens

---

### 11. Icon (1 token)
| Token | Type | Value | MUI | Tailwind | shadcn |
|-------|------|-------|-----|----------|--------|
| `Icon` | ? | ? | custom | custom | custom |

**Current:** NOT transformed
**Should:** Check token structure, then add to all frameworks

---

### 12. Colors (All color tokens)
**Current:** Partially transformed (Blue, Grey, Black, White are good)
**Should:** Verify ALL color scales are transformed (Green, Red, Orange, Yellow, Pink, Teal, Violet)

---

## Summary: What's Missing

### MUI Missing:
- ❌ `shadows` array (elevation-1 through elevation-4)
- ❌ Multiple `shape.borderRadius` values (pill, rounded, etc.)
- ❌ `palette.action.hoverOpacity` and other action opacities FROM TOKENS
- ❌ Font families FROM TOKENS (currently hardcoded)
- ❌ Font weights FROM TOKENS (currently hardcoded)
- ❌ Font sizes FROM TOKENS in typography variants
- ❌ Letter spacing

### Tailwind Missing:
- ❌ `boxShadow` (elevation-1 through elevation-4)
- ❌ `borderRadius` (pill, rounded, etc.)
- ❌ `borderWidth` (sm, md, lg, xl, xxl)
- ❌ `fontFamily` (marketing, product, code)
- ❌ Font weights FROM TOKENS (currently hardcoded different values!)
- ❌ `opacity` scale (hover, selected, focus, disabled, active)
- ❌ `letterSpacing`
- ❌ Spacing FROM TOKENS (currently using Tailwind defaults)

### shadcn Missing:
- ❌ Box shadows (elevation-1 through elevation-4)
- ❌ Multiple radius values (pill, rounded, etc.)
- ❌ Border widths
- ❌ Font families
- ❌ Font weights
- ❌ Font sizes
- ❌ Opacity states
- ❌ Spacing scale
- ❌ Letter spacing

---

## Transformation Strategy

**Step 1:** Check Style Dictionary built-in transforms for DTCG token types
**Step 2:** Identify what can be done with built-in transforms vs custom formatters
**Step 3:** Rewrite SD config to:
- Use built-in transforms for all standard token types
- Use minimal custom formatters ONLY for framework-specific nesting
- Pull ALL values from tokens (zero hardcoding except fallbacks)
**Step 4:** Verify all 59 tokens make it through the pipeline

