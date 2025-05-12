# Design Token Canon

## I. The T-D-W-P System
The definitive order of operations for all token processing:

### T: Type Determination
1. Determine the token's `$type` based on Tokens Studio taxonomy
2. Use **exactly** these type values:
   - `color`
   - `fontSize` (not fontSizes)
   - `fontWeight` (not fontWeights)
   - `fontFamily` (not fontFamilies)
   - `lineHeight` (not lineHeights)
   - `letterSpacing`
   - `borderRadius`
   - `borderWidth`
   - `spacing`
   - `sizing`
   - `opacity`
   - `boxShadow`
   - `typography`
   - `paragraphSpacing`
   - `textCase`
   - `textDecoration`
   - `composition`
   - `dimension`
   - `breakpoints`
   - `border`
   - `zIndex`
   - `duration`
   - `assets`
   - `boolean`
   - `text`
   - `number`
   - `other` (use only if absolutely necessary)

### D: Decide Category
1. Every token belongs to one of the canonical categories:
   - Color
   - FontSize
   - FontWeight
   - FontFamily
   - LineHeight
   - LetterSpacing
   - BorderRadius
   - BorderWidth
   - Spacing
   - Sizing
   - Opacity
   - BoxShadow
   - Typography
   - ParagraphSpacing
   - TextCase
   - TextDecoration
   - Composition
   - Dimension
   - Breakpoints
   - Border
   - ZIndex
   - Duration
   - Assets
   - Boolean
   - Text
   - Number
   - Other (use only if absolutely necessary)
2. Categories must use PascalCase singular form
3. Do not invent new categories not on this list

### W: Wrapping Decision
Apply this critical test to determine token placement:
1. Convert both the token's `$type` and its category name to lowercase
2. Compare them exactly (case-insensitive comparison):
   - If they match (e.g., `color` = `color`): Place token directly under `Primitives` (no wrapping)
   - If they differ (e.g., `fontsize` ≠ `typography`): Place token under its PascalCase category
3. If a token's category and type match, it MUST be placed directly under `Primitives` without any wrapper

### P: Path and Property Formatting
1. Every token must have exactly these three properties:
   - `$value`: The raw value (must be a string or number for primitives)
   - `$type`: The type determined in step T
   - `$description`: Clear description of the token's purpose
2. Format token names based on placement:
   - For tokens directly under `Primitives`: 
     - Colors: Use lowercase dot notation (e.g., `blue.500`, `red.A100`)
     - Others: Use PascalCase (e.g., `Xl`, `Medium`)
   - For tokens under categories: Always use PascalCase (e.g., `Xl`, `Medium`)

## II. Core Rules

### 1. Primitive vs Semantic Law
- Primitives must have direct raw values (string or number)
- Semantic tokens can reference primitive tokens
- Reference syntax: `{Primitives.Category.TokenName}`
- For unwrapped primitives: `{Primitives.blue.500}` or `{Primitives.Xl}`
- Exclude from `Primitives`:
  - Values that are objects, arrays, or references
  - Keys that start with semantic prefixes

### 2. Special Rules
- Color tokens ALWAYS use lowercase dot notation
- NEVER wrap color tokens in a "Color" category
- Use consistent color naming patterns

### 3. Key Reuse in Primitives
- In the `Primitives` object, the same key (e.g., `md`) can be used multiple times
- Each key must have a unique combination of `$type` and `$value`
- Example of valid key reuse in `Primitives`:
  ```json
  {
    "md": { "$type": "dimension", "$value": "8" },
    "md": { "$type": "opacity", "$value": "50%" }
  }
  ```
- This allows consistent naming patterns across different token types
- The key's uniqueness is determined by its `$type`, not its name
- DO NOT wrap these tokens in their type name - they belong directly in `Primitives`

### 4. Common Errors to Avoid
1. **Double Nesting**: Never create nested groups under `Primitives`
2. **Inconsistent Types**: Never use plural forms in `$type`
3. **Wrapping Matching Types**: Never wrap tokens when type and category match
4. **Semantic in Primitives**: Never include references or composite values in `Primitives`
5. **Missing Properties**: Always include all three required properties
6. **Unnecessary Wrapping**: Never wrap a token in its type name when the type matches its category

## III. Best Practices
1. **Consistent Naming**: Use consistent naming across categories
2. **Clear Descriptions**: Write clear, detailed descriptions for every token
3. **Single Source of Truth**: Semantic tokens should reference primitives
4. **Naming Conventions**: Follow PascalCase for categories and token names (except colors)
5. **Valid References**: Check that all references point to existing tokens
6. **JSON Validation**: Ensure JSON is valid before using with Tokens Studio

## IV. Note on "Grouped by Category"
Conceptually grouping tokens by category does not always mean wrapping them in JSON objects. The Wrapping Decision (W step) determines the actual structure. The rule "do not wrap tokens in a category object if the category and type are the same" takes precedence.

Follow these rules in exact order (T-D-W-P) to ensure consistent token structure with no contradictions.
