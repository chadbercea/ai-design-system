# Text Tokens: Governance & Best Practices

Reference: [Tokens Studio: Text Token Type](https://docs.tokens.studio/manage-tokens/token-types/text)

---

## 1. What is a Text Token?
- A text token defines a string value for use in design and code (e.g., labels, placeholders, or any static text).
- Every text token **must** have a `$type` of `text`.

---

## 2. Allowed Formats
- **String only:**
  - The `$value` must be a string (e.g., `"Submit"`, `"Loading..."`, `"N/A"`).
  - No numbers, objects, or arrays.

---

## 3. Required Fields
- `$type`: Must be `text`.
- `$value`: Must be a string.
- `$description`: Recommended, human-readable.

---

## 4. What is NOT Allowed
- No non-string values (numbers, objects, arrays, booleans).
- No missing `$type` or `$value` fields.
- No references or math in text tokens.

---

## 5. Examples

**Valid Text Token:**
```json
{
  "button-label": {
    "$type": "text",
    "$value": "Submit",
    "$description": "Label for submit button"
  }
}
```

**Invalid Text Token (Wrong Type):**
```json
{
  "button-label": {
    "$type": "text",
    "$value": 123
  }
}
```

**Invalid Text Token (Reference):**
```json
{
  "button-label": {
    "$type": "text",
    "$value": "{other-token}"
  }
}
```

---

## 6. Summary
- Text tokens must use a string value only.
- `$type` must be `text`.
- `$value` must be a string.
- `$description` is recommended.
- If in doubt, check the [official documentation](https://docs.tokens.studio/manage-tokens/token-types/text).

---

## References
- [Tokens Studio: Text Token Type](https://docs.tokens.studio/manage-tokens/token-types/text)