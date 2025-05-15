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

## 4. What is NOT Allowed
- No invalid color formats (e.g., `32px`, `"redish"`)
- No missing `$type` or `$value`
- No references to non-existent tokens
- No partial gradient or modified color objects (all required fields must be present)

---

## 5. Examples

**Valid Solid Color:**
```json
{
  "primary": {
    "$type": "color",
    "$value": "#ff0000",
    "$description": "Primary brand color"
  }
}
```

**Valid Modified Color:**
```json
{
  "primary-alpha": {
    "$type": "color",
    "$value": { "color": "#ff0000", "modify": "alpha", "value": 0.5 },
    "$description": "Primary color with 50% opacity"
  }
}
```

**Valid Gradient Color:**
```json
{
  "gradient-brand": {
    "$type": "color",
    "$value": {
      "type": "linear",
      "stops": [
        { "color": "#ff0000", "position": 0 },
        { "color": "#0000ff", "position": 1 }
      ],
      "rotation": 90
    },
    "$description": "Brand linear gradient"
  }
}
```

**Invalid Color Token (Wrong Format):**
```json
{
  "bad-color": {
    "$type": "color",
    "$value": "32px"
  }
}
```

---

## 6. Summary
- Color tokens must use valid color formats: solid, modified, or gradient.
- `$type` must be `color`.
- `$value` must be a valid color value or object.
- `$description` is recommended.
- If in doubt, check the [official documentation](https://docs.tokens.studio/manage-tokens/token-types/color).

---

## References
- [Tokens Studio: Color Token Type](https://docs.tokens.studio/manage-tokens/token-types/color)
- [Tokens Studio: Modified Colors](https://docs.tokens.studio/manage-tokens/token-types/color/modified)
- [Tokens Studio: Gradient Colors](https://docs.tokens.studio/manage-tokens/token-types/color/gradient)