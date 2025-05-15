# Design Token Canon (DTC)

## W3C DTCG Compliance
- **Required fields:**
  - `$type` (required, must match allowedTypes)
  - `$value` (required, static string or number)
  - `$description` (recommended, human-readable)
- **Reserved fields:**
  - Only `$type`, `$value`, `$description` (optionally `$category` for internal use)
- **Forbidden:**
  - Nesting, grouping, references, math, aliases, missing fields, mixed units, unknown keys (except canonical category wrapper for serialization)

---

## Canonical Category Wrapping: The Only Allowed Grouping
- **Category wrappers** are only allowed for the canonical set defined by Tokens Studio:
  - Spacing
  - Color
  - Border Radius
  - Opacity
  - Font Weight
  - Font Size
  - Letter Spacing
  - Sizing
  - Border Width
  - Border
  - Box Shadow
  - Typography
  - Font Family
  - Line Height
  - Paragraph Spacing
  - Text Case
  - Text Decoration
  - Composition (Pro)
  - Assets
  - Dimension
  - Boolean
  - Text
  - Number
  - Other
- **If you see a wrapper that isn't in the canonical set, it's wrong.**
- **The wrapper must be plural** (e.g., `fontSizes`), matching the canonical category set.
- **$type must never match the category wrapper** (e.g., do not wrap `fontSizes` with a token whose `$type` is `fontSizes`). The wrapper is for grouping, $type is for the token's type.
- **No custom or project-specific wrappers.** Only use the canonical set.
- **Why?**
  - This prevents double-nesting, ambiguity, and schema drift. It also ensures compatibility with W3C DTCG and Tokens Studio.

---

## Plural vs. Singular $type: The Rule
- **Use plural for category wrappers** (e.g., `fontSizes`, `fontWeights`).
- **$type must always be singular or plural as defined in the canonical set.**
  - If the canonical set is plural, use plural (e.g., `fontSizes`).
  - If the canonical set is singular, use singular (e.g., `color`).
- **Never invent new forms or mix plural/singular.**

---

## Valid Example (Canonical Category Wrapping)
```json
{
  "fontSizes": {
    "xl": {
      "$value": "32px",
      "$type": "fontSizes",
      "$description": "Extra large font size"
    },
    "h1": {
      "$value": "48px",
      "$type": "fontSizes",
      "$description": "Font size for h1"
    }
  },
  "color": {
    "primary": {
      "$value": "#ff0000",
      "$type": "color",
      "$description": "Primary brand color"
    }
  }
}
```
- **Note:** The wrapper is from the canonical set, and $type matches the canonical type for each token.
- **Never wrap with a non-canonical or project-specific category.**

---

## Invalid Example (Double Nesting, Non-Canonical Wrapper, or $type == Wrapper)
```json
{
  "fontSizes": {
    "fontSizes": {
      "$value": "32px",
      "$type": "fontSizes",
      "$description": "Invalid double nesting"
    }
  },
  "myCustomGroup": {
    "xl": {
      "$value": "32px",
      "$type": "fontSizes",
      "$description": "Invalid custom wrapper"
    }
  }
}
```

---

## Summary
- **Wrap tokens only in the canonical category set, using the plural form as defined by Tokens Studio.**
- **$type must never match the wrapper.**
- **No custom, project-specific, or double-nested wrappers.**
- **If in doubt, check the canonical set and the W3C DTCG spec.**
