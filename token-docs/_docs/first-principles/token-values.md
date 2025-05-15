# Token Values: Governance & Best Practices

References:
- [Tokens Studio: Token Values](https://docs.tokens.studio/manage-tokens/token-values)
- [Tokens Studio: Design Token Fundamentals](https://docs.tokens.studio/fundamentals/design-tokens)

---

## 1. What is a Token Value?
- A token value is the actual data assigned to a design token. It defines the output for that token (e.g., a color, a number, a string, or a reference to another token).
- Every token **must** have a `$value` field.

---

## 2. Allowed Value Formats
- **Primitive values:**
  - String (e.g., `"#ff0000"`, `"32px"`, `"Inter"`)
  - Number (e.g., `1.5`, `700`)
- **References:**
  - You can use references to other tokens using curly braces (e.g., `{color-primary}`)
  - References must point to a valid, existing token name
- **Math (where supported):**
  - You can use math expressions with references (e.g., `{spacing-base} * 2`)
  - Math is only allowed where Tokens Studio supports it (see their docs)
- **Composite values:**
  - For composite types (e.g., `typography`, `boxShadow`), `$value` is an object with required fields

---

## 3. What is NOT Allowed
- No references to non-existent tokens
- No circular references
- No math in types that do not support it
- No missing or empty `$value` fields
- No invalid formats (e.g., color as `32px`, fontSize as `#ff0000`)

---

## 4. Examples

**Valid Primitive Value:**
```json
{
  "primary": {
    "$value": "#ff0000",
    "$type": "color"
  }
}
```

**Valid Reference:**
```json
{
  "color.accent": {
    "$value": "{color-primary}",
    "$type": "color"
  }
}
```

**Valid Math Expression:**
```json
{
  "spacing-large": {
    "$value": "{spacing-base} * 2",
    "$type": "spacing"
  }
}
```

**Invalid Value (Wrong Format):**
```json
{
  "font-size-large": {
    "$value": "#ff0000",
    "$type": "fontSizes"
  }
}
```

**Invalid Reference (Non-existent):**
```json
{
  "color-error": {
    "$value": "{color-nonexistent}",
    "$type": "color"
  }
}
```

---

## 5. Summary
- Every token must have a `$value` field.
- Use only valid formats for the type.
- References and math are allowed only where supported and must resolve to valid tokens.
- If in doubt, check the [official documentation](https://docs.tokens.studio/manage-tokens/token-values).

---

## References
- [Tokens Studio: Token Values](https://docs.tokens.studio/manage-tokens/token-values)
- [Tokens Studio: Design Token Fundamentals](https://docs.tokens.studio/fundamentals/design-tokens)