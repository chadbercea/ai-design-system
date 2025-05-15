# Token Sets: Governance & Best Practices

## 1. Token Sets Are Organizational, Not Structural
- Token Sets are folders for tokens. They exist to help you organize, not to change the meaning or structure of your tokens.
- How you split tokens into sets is up to you. There is no "correct" number or arrangement of Token Sets. Use as many or as few as you need to keep your project manageable.

## 2. Token Set Names Must Be Unique
- Every Token Set must have a unique name.
- Flat names (e.g., `brands-berry`) and folder names (e.g., `brands/berry`) are both valid.
- Folder names use `/` to create hierarchy in the UI. This is for organization only—it does not affect token structure or meaning.

## 3. Token Names Must Be Unique Within a Set
- Within a single Token Set, all token names must be unique.
- Across different Token Sets, the same token name can appear multiple times. This is how theming and overrides work.

## 4. Token Set Status Controls Availability and Overrides
- **Enabled:** Tokens in this set are active and can be applied or referenced.
- **Disabled:** Tokens in this set are ignored for all actions.
- **Source (Reference Only):** Tokens in this set can be referenced by other sets, but are not directly applied.

## 5. Token Set Position Controls Precedence
- Order matters. The lowest enabled Token Set in the list overrides values from sets higher up.
- This is how you create a cascade of defaults and overrides, similar to CSS.

## 6. Engineers Will Flatten All Token Sets for Delivery
- All Token Sets are combined into a single flat list of tokens during the transformation/build process.
- The organization in Figma/Plugin is for human convenience only. The final output is a flat, unique list of tokens.

## 7. Naming Is a Personal/Team Choice, Not a Spec
- There is no enforced naming convention for Token Sets or tokens. Use what makes sense for your team and project.
- Thoughtful naming helps with navigation and scaling, but is not required by Tokens Studio.

## 8. Folder vs. Flat Set Names
- **Flat Set Name:** Appears as a single item in the list (e.g., `brands-berry`).
- **Folder Set Name:** Uses `/` to create a tree (e.g., `brands/berry`). This is purely for UI organization—it does not affect token resolution or output.

## 9. Theming and Overrides Require Multiple Token Sets
- To use theming or brand overrides, you must use multiple Token Sets.
- Tokens with the same name in different sets are how you create theme/brand/component variations.

## 10. Summary: If You're Not Sure, Keep It Simple
- If you're confused, use one Token Set per major theme, brand, or component group.
- Don't overthink it. The only hard rules are:
  - Token Set names must be unique.
  - Token names must be unique within a set.
  - The lowest enabled set wins in case of name collisions.

## Example
```json
// Token Set: primitive
{
  "color-primary": { "value": "#ff0000", "type": "color" }
}
// Token Set: brands/berry
{
  "color-primary": { "value": "#a020f0", "type": "color" }
}
// Token Set: theme/dark
{
  "color-primary": { "value": "#222222", "type": "color" }
}
```
- In the plugin, you see a tree if you use `/` in the set name.
- In code, all sets are merged and the lowest enabled set's value for `color-primary` wins.

## References
- [Tokens Studio: Token Sets Documentation](https://docs.tokens.studio/manage-tokens/token-sets)

Frequently asked questions
Select a question below to view the answer. 

How you organize your Token Sets is a personal preference that design systems maintainers and engineers often make together. Some things to consider:

The number of Tokens can add up for large component libraries, so breaking them up into multiple Token Sets can make it easier to find what you are looking for.

Using folder names helps keep a large number of Token Sets organized.

Engineers will combine all Token Sets into one large list of Tokens during the Transformation part of the Token Process, so if it helps you as the person working in the Plugin to have more Token Sets, go for it.

You need multiple Token Sets to take advantage of Theming, like the examples above for multiple brands

Technically no. Naming is a personal choice. However, you may find it easier to navigate through your Token project as it scales if you are thoughtful with the naming structure of your Themes, Sets, and Tokens. 