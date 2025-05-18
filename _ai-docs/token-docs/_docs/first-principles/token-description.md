# Token Descriptions: Governance & Best Practices

Reference: [Tokens Studio: Token Description](https://docs.tokens.studio/manage-tokens/token-description)

---

## 1. What is a Token Description?
- A token description is a human-readable string that explains the purpose or usage of a design token.
- Every token **should** have a `$description` field, even though it is not strictly required by the W3C DTCG spec.

---

## 2. Why Descriptions Matter
- Descriptions provide context for designers, engineers, and anyone consuming tokens.
- They make tokens self-documenting and reduce ambiguity or misuse.
- Good descriptions speed up onboarding and reduce errors in implementation.

---

## 3. Required Patterns
- **Be specific and clear.**
  - Describe what the token is for, not just what it is.
- **Use full sentences or clear phrases.**
- **Avoid placeholders, acronyms, or internal jargon.**
- **Keep it concise but informative.**

---

## 4. Forbidden Patterns
- No placeholders (e.g., "TBD", "todo", "fixme").
- No generic or copy-paste text (e.g., "A color token.", "Font size.").
- No references to other tokens (e.g., "See primary").
- No internal-only notes or implementation details.
- No semantic intent in primitives (e.g., "Primary brand color" for a primitive is wrong; use "Blue 500" or "Gray 900").

---

## 5. Examples

**Valid Description (Primitive):**
```json
{
  "blue.500": {
    "$value": "#3b82f6",
    "$type": "color",
    "$description": "Blue 500"
  }
}
```

**Valid Description (Primitive, Mechanism):**
```json
{
  "spacing.8": {
    "$value": "8px",
    "$type": "spacing",
    "$description": "Spacing scale step 8"
  }
}
```

**Invalid Description (Placeholder):**
```json
{
  "blue.500": {
    "$value": "#3b82f6",
    "$type": "color",
    "$description": "TBD"
  }
}
```

**Invalid Description (Semantic Intent):**
```json
{
  "blue.500": {
    "$value": "#3b82f6",
    "$type": "color",
    "$description": "Primary brand color"
  }
}
```

---

## 6. Summary
- Every token should have a clear, specific, human-readable description.
- No placeholders, no semantic intent for primitives, no references to other tokens.
- If in doubt, check the [official documentation](https://docs.tokens.studio/manage-tokens/token-description).

---

## References
- [Tokens Studio: Token Description](https://docs.tokens.studio/manage-tokens/token-description)