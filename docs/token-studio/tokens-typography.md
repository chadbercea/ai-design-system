# Typography Tokens: Governance & Best Practices

Reference: [Tokens Studio: Typography Token Type](https://docs.tokens.studio/manage-tokens/token-types/typography)

---

## 1. What is a Typography Token?
- A typography token is a **composite token** that defines a set of font-related properties for text styles.
- It is used to group all typography attributes (font family, size, weight, etc.) into a single, reusable object.

---

## 2. Required Fields for Typography Tokens
A valid typography token **must** include:
- `fontFamily` (string)
- `fontWeight` (number or string)
- `fontSize` (string, e.g., `16px` or `1rem`)
- `lineHeight` (string or number)
- `letterSpacing` (string or number)
- `paragraphSpacing` (string or number)
- `textCase` (string, e.g., `none`, `uppercase`, `lowercase`, `capitalize`)
- `textDecoration` (string, e.g., `none`, `underline`, `line-through`)

> **Note:** All fields must be present, even if their value is `none` or `normal`.

---

## 3. Allowed Structure
- Typography tokens are always objects (not primitives).
- The `$type` field must be set to `typography`.
- The `$value` field must be an object containing all required typography properties.
- The `$description` field is recommended and should be human-readable.

---

## 4. What is NOT Allowed
- No missing or extra fields in the `$value` object.
- No references or math in typography property values (must be static values).
- No partial typography tokens (all required fields must be present).
- No nesting or grouping beyond the composite object.

---

## 5. Example: Valid Typography Token
```json
{
  "heading": {
    "$type": "typography",
    "$value": {
      "fontFamily": "Inter",
      "fontWeight": 700,
      "fontSize": "32px",
      "lineHeight": "120%",
      "letterSpacing": "0%",
      "paragraphSpacing": "0",
      "textCase": "none",
      "textDecoration": "none"
    },
    "$description": "Typography style for headings"
  }
}
```

---

## 6. Example: Invalid Typography Token
```json
{
  "heading": {
    "$type": "typography",
    "$value": {
      "fontFamily": "Inter",
      "fontWeight": 700,
      "fontSize": "32px"
      // Missing required fields
    },
    "$description": "Typography style for headings"
  }
}
```

---

## 7. Summary
- Typography tokens are composite objects with all required font properties.
- All fields must be present and use static values.
- `$type` must be `typography`.
- `$value` must be an object with the correct structure.
- If in doubt, check the [official documentation](https://docs.tokens.studio/manage-tokens/token-types/typography).

---

## References
- [Tokens Studio: Typography Token Type](https://docs.tokens.studio/manage-tokens/token-types/typography)