# Token Types: Governance & Best Practices

Reference: [Tokens Studio: Token Types Documentation](https://docs.tokens.studio/manage-tokens/token-types)

---

## 1. What is a Token Type?
- A Token Type defines the kind of value a token holds and how it should be interpreted by design tools and code.
- Every token **must** have a valid type. The type determines validation, usage, and transformation.

---

## 2. Allowed Token Types (as of Tokens Studio)
- **color**
- **borderRadius**
- **borderWidth**
- **sizing**
- **spacing**
- **opacity**
- **fontFamilies**
- **fontWeights**
- **fontSizes**
- **lineHeights**
- **letterSpacing**
- **paragraphSpacing**
- **textCase**
- **textDecoration**
- **typography** (composite)
- **boxShadow** (composite)
- **composition** (legacy/composite)
- **dimension**
- **breakpoints**
- **zIndex**
- **duration**
- **assets**
- **boolean**
- **text**
- **number**
- **other**

> **Note:** Composite types (like `typography`, `boxShadow`, `composition`) are objects with multiple properties. All others are primitives.

---

## 3. How to Use Token Types
- **Always use the canonical type name** (no casing or pluralization variations).
- **Do not invent new types.** If you need a new type, check the official docs first.
- **Composite types** must follow the structure required by Tokens Studio (see their docs for details).
- **Primitives** must have a static value matching the type's requirements (e.g., color as hex or rgba, fontSize as px/rem, etc.).

---

## 4. What is NOT Allowed
- No custom or project-specific types.
- No type aliases or synonyms (e.g., use `fontSizes`, not `font-size` or `fontsizes`).
- No mixing types in a single token.
- No missing or empty type fields.

---

## 5. Example Table
| Token Name      | $type         | $value         | Valid? |
|----------------|---------------|---------------|--------|
| primary        | color         | #ff0000       | Yes    |
| xl             | fontSizes     | 32px          | Yes    |
| tight          | lineHeights   | 0.8           | Yes    |
| heading        | typography    | { ...object } | Yes    |
| shadow         | boxShadow     | { ...object } | Yes    |
| foo            | font-size     | 32px          | **No** |
| bar            | color         | 32px          | **No** |
| baz            | customType    | ...           | **No** |

---

## 6. Summary
- Use only the allowed token types from the official Tokens Studio list.
- Always use the canonical type name, exactly as specified.
- Composite types must follow the required structure.
- If in doubt, check the [official documentation](https://docs.tokens.studio/manage-tokens/token-types).

---

## References
- [Tokens Studio: Token Types Documentation](https://docs.tokens.studio/manage-tokens/token-types)