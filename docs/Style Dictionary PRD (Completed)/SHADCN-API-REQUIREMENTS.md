# shadcn/ui Theme API Requirements

**Source:** shadcn/ui Official Documentation (https://ui.shadcn.com/docs/theming)

## Overview

shadcn/ui components consume design tokens via **CSS custom properties** (CSS variables). All tokens must be defined in CSS variable format.

---

## CSS Variable Format

### General Requirements

**Required Format:** `--variable-name: value;`

**shadcn Behavior:**
- All components read from CSS variables
- Variables must be defined in a CSS class (e.g., `.dds-theme`)
- Values must include units where applicable

---

## Color Variables

### Semantic Color Format

**Required Format:** HSL values WITHOUT `hsl()` wrapper

**shadcn Behavior:**
- Colors defined as HSL triplets: `hue saturation lightness`
- Example: `--primary: 224 100% 57%;`
- Components use these with `hsl(var(--primary))`

**What shadcn Does:**
```css
/* ✅ CORRECT */
.dds-theme {
  --primary: 224 100% 57%;
  --secondary: 218 20% 52%;
}

/* ❌ INCORRECT */
.dds-theme {
  --primary: #2560ff;  /* Hex not HSL */
  --secondary: hsl(218, 20%, 52%);  /* Has hsl() wrapper */
}
```

**Official shadcn Source:**
- https://ui.shadcn.com/docs/theming#css-variables
- Example: https://ui.shadcn.com/themes

---

## Size Variables

### Border Radius

**Required Format:** CSS length with units

**shadcn Behavior:**
- Expects values with units: `8px`, `0.5rem`, etc.
- Variable name: `--radius` or `--radius-*`

**What shadcn Does:**
```css
/* ✅ CORRECT */
.dds-theme {
  --radius: 0.5rem;
  --radius-rounded: 8px;
  --radius-pill: 200px;
}

/* ❌ INCORRECT */
.dds-theme {
  --radius: 8;  /* Missing units */
}
```

**Official shadcn Source:**
- https://ui.shadcn.com/docs/components/card
- Components use: `className="rounded-[var(--radius)]"`

---

## Typography Variables

### Font Size

**Required Format:** CSS length with units

**shadcn Behavior:**
- Expects pixel or rem values: `14px`, `1rem`
- Variable naming: `--text-*`

**What shadcn Does:**
```css
/* ✅ CORRECT */
.dds-theme {
  --text-base: 14px;
  --text-lg: 18px;
}

/* ❌ INCORRECT */
.dds-theme {
  --text-base: 14;  /* Missing units */
}
```

---

## Shadow Variables

### Box Shadow

**Required Format:** Valid CSS box-shadow value

**shadcn Behavior:**
- Expects complete CSS shadow syntax
- Units (px) are required
- Variable naming: `--shadow-*`

**What shadcn Does:**
```css
/* ✅ CORRECT */
.dds-theme {
  --shadow-sm: 0px 2px 4px 4px rgba(0,0,0,0.15);
  --shadow-md: 0px 4px 8px 4px rgba(0,0,0,0.20);
}

/* ❌ INCORRECT */
.dds-theme {
  --shadow-sm: 0 2 4 4 rgba(0,0,0,0.15);  /* Missing px units */
}
```

**Official shadcn Source:**
- https://ui.shadcn.com/docs/theming
- Components may reference shadow variables directly

---

## Font Weight Variables

### Font Weight

**Required Format:** Number (unitless)

**shadcn Behavior:**
- Expects CSS font-weight values: `300`, `400`, `700`
- Variable naming: `--font-weight-*`

**What shadcn Does:**
```css
/* ✅ CORRECT */
.dds-theme {
  --font-weight-normal: 400;
  --font-weight-bold: 700;
}
```

---

## Summary Table

| Property Type | Required Format | Example | Why |
|---------------|----------------|---------|-----|
| Colors | HSL without `hsl()` | `224 100% 57%` | shadcn wraps in `hsl(var(...))` |
| Border Radius | Length with units | `8px` or `0.5rem` | CSS requires units |
| Font Size | Length with units | `14px` | CSS requires units |
| Shadows | CSS shadow with px | `0px 2px 4px 4px rgba(...)` | Valid CSS syntax |
| Font Weight | Number (unitless) | `700` | CSS font-weight spec |

---

## Variable Scope

**Required:** All variables must be scoped to a CSS class

```css
/* ✅ CORRECT */
.dds-theme {
  --primary: 224 100% 57%;
  --radius: 8px;
}

/* ❌ INCORRECT */
:root {
  --primary: 224 100% 57%;
}
```

shadcn components expect the theme class to be applied to a parent element, not `:root`.

**Official shadcn Source:**
- https://ui.shadcn.com/docs/theming#adding-new-colors

