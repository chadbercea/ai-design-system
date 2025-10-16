# Tailwind CSS Theme API Requirements

**Source:** Tailwind CSS Official Documentation (https://tailwindcss.com/docs/theme)

## Font Size

### fontSize (theme.fontSize)

**Required Type:** `string` with units OR `[string, object]` tuple

**Tailwind Behavior:**
- Expects strings with units: `"14px"`, `"1rem"`, etc.
- Can optionally include line-height: `["14px", { lineHeight: "1.5" }]`

**What Tailwind Does:**
```javascript
// ✅ CORRECT
theme: {
  fontSize: {
    base: "14px",
    xl: "1.25rem"
  }
}

// ❌ INCORRECT
theme: {
  fontSize: {
    base: 14  // Number without units - invalid
  }
}
```

**Official Tailwind Source:**
- https://tailwindcss.com/docs/font-size#customizing-your-theme
- Config structure: `fontSize: { [key: string]: string | [string, object] }`

---

## Border Radius

### borderRadius (theme.borderRadius)

**Required Type:** `string` with units

**Tailwind Behavior:**
- Expects strings with units: `"8px"`, `"0.5rem"`, etc.
- Supports `DEFAULT` key for base borderRadius

**What Tailwind Does:**
```javascript
// ✅ CORRECT
theme: {
  borderRadius: {
    DEFAULT: "8px",
    full: "9999px",
    pill: "200px"
  }
}

// ❌ INCORRECT
theme: {
  borderRadius: {
    DEFAULT: 8  // Number without units - invalid
  }
}
```

**Official Tailwind Source:**
- https://tailwindcss.com/docs/border-radius#customizing-your-theme
- Config structure: `borderRadius: { [key: string]: string }`

---

## Colors

### colors (theme.colors)

**Required Type:** `string` (hex, rgb, rgba, hsl)

**Tailwind Behavior:**
- Accepts any valid CSS color format
- Commonly uses hex: `"#2560ff"`
- Supports nested color scales

**What Tailwind Does:**
```javascript
// ✅ CORRECT
theme: {
  colors: {
    blue: {
      500: "#2560ff",
      600: "#0d4df2"
    }
  }
}
```

**Official Tailwind Source:**
- https://tailwindcss.com/docs/customizing-colors
- Config structure: `colors: { [key: string]: string | { [key: string]: string } }`

---

## Box Shadow

### boxShadow (theme.boxShadow)

**Required Type:** `string` (valid CSS box-shadow value)

**Tailwind Behavior:**
- Expects valid CSS box-shadow strings
- Supports `DEFAULT` key for base shadow

**What Tailwind Does:**
```javascript
// ✅ CORRECT
theme: {
  boxShadow: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    DEFAULT: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
  }
}
```

**Official Tailwind Source:**
- https://tailwindcss.com/docs/box-shadow#customizing-your-theme
- Config structure: `boxShadow: { [key: string]: string }`

---

## Font Weight

### fontWeight (theme.fontWeight)

**Required Type:** `string` or `number`

**Tailwind Behavior:**
- Accepts both `"700"` and `700`
- Generates utility classes like `font-bold`

**What Tailwind Does:**
```javascript
// ✅ CORRECT (both work)
theme: {
  fontWeight: {
    bold: "700",
    // OR
    bold: 700
  }
}
```

**Official Tailwind Source:**
- https://tailwindcss.com/docs/font-weight#customizing-your-theme
- Config structure: `fontWeight: { [key: string]: string | number }`

---

## Summary Table

| Property | Required Type | Example | Why |
|----------|---------------|---------|-----|
| `fontSize.base` | `string` | `"14px"` | Tailwind needs units |
| `borderRadius.DEFAULT` | `string` | `"8px"` | Tailwind needs units |
| `colors.blue.500` | `string` | `"#2560ff"` | Any valid CSS color |
| `boxShadow.sm` | `string` | `"0 2px 4px rgba(...)"` | Valid CSS shadow |
| `fontWeight.bold` | `string` or `number` | `"700"` or `700` | Either works |

