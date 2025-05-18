# Color Tokens: Governance & Best Practices

References:
- [Tokens Studio: Color Token Type](https://docs.tokens.studio/manage-tokens/token-types/color)
- [Tokens Studio: Modified Colors](https://docs.tokens.studio/manage-tokens/token-types/color/modified)
- [Tokens Studio: Gradient Colors](https://docs.tokens.studio/manage-tokens/token-types/color/gradient)

---

## 1. What is a Color Token?
- A color token defines a color value for use in design and code.
- Color tokens can be solid colors, modified colors, or gradients.
- Every color token **must** have a `$type` of `color`.

---

## 2. Allowed Color Formats
- **Solid Color:**
  - Hex (`#RRGGBB`), RGBA (`rgba(…)`), or named CSS color (rare, not recommended)
  - Example: `"#ff0000"`, `"rgba(255,0,0,1)"`
- **Modified Color:**
  - A color with a modification (e.g., alpha, lighten, darken)
  - Example: `{ "color": "#ff0000", "modify": "alpha", "value": 0.5 }`
- **Gradient Color:**
  - An object describing a linear or radial gradient
  - Example: `{ "type": "linear", "stops": [ { "color": "#ff0000", "position": 0 }, { "color": "#0000ff", "position": 1 } ], "rotation": 90 }`

---

## 3. Required Fields
- `$type`: Must be `color`
- `$value`: Must be a valid color value (see above)
- `$description`: Recommended, human-readable

---

## 4. Structure: Nested Only (No Dashed Keys)

### **Required Nested Model for Colors**
- **Dashed keys (e.g., `grey-50`) are never permitted for color tokens.**
- **All color primitives must use a nested structure:**
  - Top-level: `"color"`
  - Next: color family (e.g., `"grey"`, `"blue"`)
  - Next: scale (e.g., `"50"`, `"500"`)
  - Example:
    ```json
    {
      "color": {
        "grey": {
          "50": {
            "$type": "color",
            "$value": "#fafafa",
            "$description": "Grey 50"
          }
        },
        "blue": {
          "500": {
            "$type": "color",
            "$value": "#2196f3",
            "$description": "Blue 500"
          }
        }
      }
    }
    ```
- **This is the only allowed structure for color tokens.**
- **No dashes in keys, no flat or atomic keys for colors.**
- This enables referencing like `{color.blue.500}` in themes and downstream tools.

### **Why the Exception?**
- Color families and scales are critical for semantic use, theming, and overrides.
- Many tools and pipelines (including Tokens Studio) expect or require this structure for color tokens.
- This structure enables easy referencing, theming, and brand overrides.

---

## 5. When to Use Each Structure
- **Nested structure:**
  - Use for all color primitives, for DTCG/TS compliance, semantic referencing, and maximum interoperability.
- **Flat, atomic (kebab-case) structure:**
  - Use only for other primitives (spacing, font sizes, etc.), never for colors.

---

## 6. What is NOT Allowed
- No dashed keys (e.g., `grey-50`) for color tokens.
- No dot notation or camelCase in primitive keys.
- No custom or project-specific wrappers.
- No missing `$type` or `$value` fields.
- No partial gradient or modified color objects (all required fields must be present).

---

## 7. Examples

**Valid Nested for Colors:**
```json
{
  "color": {
    "blue": {
      "500": {
        "$type": "color",
        "$value": "#2196f3",
        "$description": "Blue 500"
      }
    }
  }
}
```

**Invalid (Dashed Key):**
```json
{
  "colors": {
    "blue-500": {
      "$type": "color",
      "$value": "#2196f3"
    }
  }
}
```

---

## 8. Summary
- Use the nested structure for all color primitives: `color.family.scale`.
- Never use dashed keys for color tokens.
- For all other primitives, use flat, atomic, kebab-case keys.
- Document this exception clearly in your governance to avoid confusion.
- If in doubt, check the W3C DTCG spec and Tokens Studio documentation.

---

## References
- [Tokens Studio: Color Token Type](https://docs.tokens.studio/manage-tokens/token-types/color)
- [Tokens Studio: Modified Colors](https://docs.tokens.studio/manage-tokens/token-types/color/modified)
- [Tokens Studio: Gradient Colors](https://docs.tokens.studio/manage-tokens/token-types/color/gradient)