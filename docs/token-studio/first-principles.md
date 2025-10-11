# First Principles: Design Token Primitives

### tl;dr - "Follow the W3C DTCG spec. No exceptions. No opinions." "All tokens are flat primitives with $type, $value, $description. No semantic grouping, no nesting, no opinions. See W3C DTCG."
---
W3C DTCG is the law.
- All rules, examples, and validation are based on the W3C spec.
Tokens Studio is the tool.
- We have TS-specific notes only where they don't conflict with W3C.
If there's ever a conflict, W3C wins.
- We can always transform or adapt for TS, but we never break W3C compliance.
---

## Prime Directive
- **Primitives are atoms.** Each primitive represents a single, irreducible value (e.g., a color, a font size, a font family, a number, or a string).
- **No semantic or usage-based grouping.** Primitives are not grouped by usage (e.g., h1, button, card) or by semantic meaning. They are the raw building blocks of the design system.
- **No references, no math.** The `$value` of a primitive is always a static string or number. No references to other tokens, no calculations, no aliases.

## Structure
- **Flat model.** At the conceptual level, all primitives are flat and canonical. Duplicate keys are not just allowed—they are expected. You will have hundreds of `xl` or `tight` keys, each with a different `$type` and `$value`.
- **Canonical category ($type) wrapping for JSON.** For valid JSON and tool compatibility, primitives must be wrapped by their canonical category (e.g., `fontSizes`, `spacing`, `colors`). This is the ONLY allowed grouping. It is not semantic grouping—it's a technical requirement for serialization and interoperability.
- **Canonical Category Set (from Tokens Studio):**
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
- **No semantic grouping, no dot notation, no composite keys.** If you see a wrapper or group that is not a canonical $type, it's wrong.

## Serialization & Storage
- **Why wrap by $type?** JSON does not allow duplicate keys. Wrapping by $type is the only way to serialize the flat model for real-world use, tool sync, and stacking with semantic tokens.
- **This is not semantic grouping.** Wrapping by $type is a technical necessity, not a design or usage-based grouping.
- **Always preserve the flat, atomic, $type-driven model in your logic and transformations.**

## Required Fields
- **$value**: The raw value (string or number). No references, no math, no aliases.
- **$type**: The canonical W3C type (e.g., `fontFamilies`, `fontSizes`, `fontWeights`, `colors`, etc.).
- **$description**: A human-readable description. No placeholders, no TBD.

## Categorization
- **All grouping and categorization is derived from the `$type` field.**
- **No hard-coded or opinionated grouping.** The system is agnostic; tools and consumers derive meaning from `$type` and `$value`, not from the key or structure.

## Example (Canonical Category Wrapping for JSON)
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
  "spacing": {
    "xl": {
      "$value": "40px",
      "$type": "spacing",
      "$description": "Extra large spacing"
    },
    "tight": {
      "$value": "4px",
      "$type": "spacing",
      "$description": "Tight spacing"
    }
  }
}
```

## Additional Valid Example (Singular Wrapper, Plural $type, Atomic Token Name)
```json
{
  "fontFamily": {
    "h1": {
      "$value": "Inter",
      "$type": "fontFamilies",
      "$description": "Font family for h1"
    }
  },
  "color": {
    "primary": {
      "$value": "#ff0000",
      "$type": "colors",
      "$description": "Primary brand color"
    }
  },
  "spacing": {
    "xl": {
      "$value": "40px",
      "$type": "spacings",
      "$description": "Extra large spacing"
    }
  }
}
```

## What NOT to Do
- No wrappers except canonical $type: `spacing: { xl: ... }` is correct, `theme: { xl: ... }` is wrong.
- No dot notation: `spacing.xl` is wrong.
- No grouping by usage: `h1: { fontFamily: ... }` is wrong.
- No unique key enforcement: `xl` can and should appear for multiple $types.

## If You Break a Rule
- Flatten your structure.
- Remove all wrappers and groupings except $type.
- Ensure every token has $type, $value, $description.
- If in doubt, check the W3C DTCG spec.

## Compliance
- **W3C DTCG-compliant.** All primitives follow the W3C Design Tokens Community Group specification for structure and required fields.
- **Agnostic and future-proof.** No system-specific or opinionated grouping; all meaning is derived from the data, not the structure.

## Summary
- Primitives are atomic, flat, and canonical at the model level.
- Canonical $type wrapping is required for valid JSON and tool compatibility.
- No semantic, usage, or opinionated grouping.
- Duplicate keys are expected and correct at the model level.
- The system is designed for maximum interoperability, compliance, and future-proofing.
