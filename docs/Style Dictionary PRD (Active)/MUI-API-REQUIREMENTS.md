# MUI Theme API Requirements

**Source:** MUI Official Documentation (https://mui.com/material-ui/customization/theming/)

## Typography

### fontSize (typography.fontSize and all variant fontSize properties)

**Required Type:** `number`

**MUI Behavior:**
- MUI interprets number values as **pixels** by default
- Example: `fontSize: 14` renders as `14px`
- Strings are NOT supported for variant fontSize properties

**What MUI Does:**
```javascript
// ✅ CORRECT
typography: {
  fontSize: 14,
  h1: { fontSize: 48 }
}
// MUI renders as: 14px and 48px

// ❌ INCORRECT
typography: {
  fontSize: "14px",
  h1: { fontSize: "48px" }
}
// MUI ignores or misinterprets these
```

**Official MUI Source:**
- https://mui.com/material-ui/customization/typography/#font-size
- TypeScript definition: `fontSize?: number`

---

## Shape

### borderRadius (shape.borderRadius)

**Required Type:** `number`

**MUI Behavior:**
- MUI interprets number values as **pixels**
- Example: `borderRadius: 8` renders as `8px`
- Strings with units are NOT supported

**What MUI Does:**
```javascript
// ✅ CORRECT
shape: {
  borderRadius: 8
}
// MUI renders as: 8px border radius

// ❌ INCORRECT
shape: {
  borderRadius: "8px"
}
// MUI ignores or defaults to its own value
```

**Official MUI Source:**
- https://mui.com/material-ui/customization/theme-components/#global-style-overrides
- TypeScript definition: `borderRadius?: number`

---

## Shadows

### shadows (shadows array)

**Required Type:** `string[]` with valid CSS shadow syntax

**MUI Behavior:**
- Expects an array of 25 shadow strings
- Each shadow must be valid CSS `box-shadow` format
- Units (px) are REQUIRED

**What MUI Does:**
```javascript
// ✅ CORRECT
shadows: [
  "none",
  "0px 2px 4px 4px rgba(0,0,0,0.15)",
  "0px 4px 8px 4px rgba(0,0,0,0.20)"
]
// MUI applies these as valid CSS

// ❌ INCORRECT
shadows: [
  "none",
  "0 2 4 4 rgba(0,0,0,0.15)"
]
// Invalid CSS - missing px units, browsers may reject
```

**Official MUI Source:**
- https://mui.com/material-ui/customization/shadows/
- TypeScript definition: `shadows?: Shadows` (type Shadows = [shadow0: string, ...shadow1through24: string[]])

---

## Palette Actions

### opacity values (palette.action.*)

**Required Type:** `number` (decimal between 0 and 1)

**MUI Behavior:**
- Expects decimal values: `0.12` not `12`
- Used for interactive state opacity overlays

**What MUI Does:**
```javascript
// ✅ CORRECT
palette: {
  action: {
    hoverOpacity: 0.12,
    selectedOpacity: 0.16
  }
}

// ❌ INCORRECT
palette: {
  action: {
    hoverOpacity: 12,  // Treated as 12 opacity (invalid, >1)
    selectedOpacity: "16%"  // String not accepted
  }
}
```

**Official MUI Source:**
- https://mui.com/material-ui/customization/palette/#adding-new-colors
- TypeScript definition: `hoverOpacity?: number`

---

## Summary Table

| Property | Required Type | Example | Why |
|----------|---------------|---------|-----|
| `typography.fontSize` | `number` | `14` | MUI converts to px |
| `typography.h1.fontSize` | `number` | `48` | Same as above |
| `shape.borderRadius` | `number` | `8` | MUI converts to px |
| `shadows[1]` | `string` | `"0px 2px 4px 4px rgba(...)"` | Valid CSS with units |
| `palette.action.hoverOpacity` | `number` | `0.12` | Decimal 0-1 |

