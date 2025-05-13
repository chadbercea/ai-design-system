# Design Token System - Current State

## Prime Directive
Token names are canonical primitive identifiers. No wrappers. No prefixes. No plural forms.

Tokens exist at root level. No exceptions. No folders. No containers. Tokens Studio patterns are the only valid nesting.

$value must be static string or number. No aliases. No math. No references. Violations fail the build.

## W3C Compliance
For strict W3C Design Tokens Community Group (DTCG) compliance, only the following fields are required:
- `$type` (required)
- `$value` (required)
- `$description` (recommended, not required by W3C)

`$category` is **not** part of the W3C standard. It may be used internally for project-specific validation or organization, but is not required for W3C compliance.

## Architecture
```
token-studio-sync-provider/
├── core.json          # Read-only outside CI. Direct edits fail.
├── dark.json          # Dark overrides. Deep merge only.
├── light.json         # Light overrides. Deep merge only.
├── theme.json         # Semantic tokens. No primitives.
├── $themes.json       # Theme relationships. Declarative.
└── $metadata.json     # Schema version. Locked.
```

Enforcement:
- core.json is read-only outside CI. Direct edits trigger failure.
- All changes flow through schema validation and merge-approved pipelines.
- No manual mutation of primitives. That's not a warning. That's policy.

## Validation and Enforcement Logic

### T-D-W-P System
1. Type
   $type must match allowedTypes enum. Any deviation fails. No casing variations. No pluralization. No substitutions.

   ```json
   {
     "allowedTypes": [
       "color",
       "fontSizes",
       "fontWeights",
       "fontFamilies",
       "lineHeights",
       "letterSpacing",
       "borderRadius",
       "borderWidths",
       "spacing",
       "sizing",
       "opacity",
       "boxShadow",
       "typography",
       "paragraphSpacing",
       "textCase",
       "textDecoration",
       "composition",
       "dimension",
       "breakpoints",
       "border",
       "zIndex",
       "duration",
       "assets",
       "boolean",
       "text",
       "number",
       "other"
     ]
   }
   ```

2. Category
   Category must match allowedCategories enum. Any deviation fails. No exceptions.

   ```json
   {
     "allowedCategories": [
       "Color",
       "FontSize",
       "FontWeight",
       "FontFamily",
       "LineHeight",
       "LetterSpacing",
       "BorderRadius",
       "BorderWidth",
       "Spacing",
       "Sizing",
       "Opacity",
       "BoxShadow",
       "Typography",
       "ParagraphSpacing",
       "TextCase",
       "TextDecoration",
       "Composition",
       "Dimension",
       "Breakpoints",
       "Border",
       "ZIndex",
       "Duration",
       "Assets",
       "Boolean",
       "Text",
       "Number",
       "Other"
     ]
   }
   ```

3. Wrapping
   Wrapping key and $type must not match after lowercasing. Violation fails the build.

   Only fontSizes, fontFamilies, fontWeights, lineHeights may use category wrapping. All others are flat primitives.

4. Path
   - Root-level tokens use flat canonical names
   - Tokens Studio patterns use category wrappers

### Required Fields
- $type: matches canonical type
- $value: raw string or number
- $description: sentence-length, human-readable. No placeholders. No TBD.

### Format Rules
- Color tokens: lowercase dot notation (blue.500)
- Plural keys: forbidden except Tokens Studio 4
- Token keys: unique per file per $type
- Reused keys: must have distinct $type

### Error Conditions
These structures fail. No warnings. No exceptions.

1. Double nesting: parent key equals $type after normalization. Flatten and reject.
2. Wrapping violation: wrapping key equals $type after lowercasing. Reject.
3. Plural type: forbidden unless Tokens Studio pattern. Reject.
4. Missing field: immediate rejection.
5. Mixed units: blocked.
6. {} in $value: rejected. Semantic leak.
7. Semantic in primitive: rejected.
8. Path violation: blocked.

## Schema Versioning
1. Schema Lock
   - Version in $metadata.json
   - Deviation blocks build
   - Version bump required for changes

2. Tokens Studio
   - Validates against current schema
   - Rejects unexpected $type
   - Versions schema changes

3. Design Tools
   - Validates against Figma schema
   - Matches Tokens Studio sync
   - Blocks invalid exports

## Theme Resolution
1. Precedence (strict)
   1. core.json (primitives)
   2. theme.json (semantic)
   3. light/dark.json (overrides)
   4. $themes.json (relationships)
   Collisions without disambiguation fail.

2. Overrides
   - Deep merge only
   - Semantic required in theme.json
   - No primitive references
   - Collisions require disambiguation

3. References
   - Limited to theme.json and overrides
   - Flattened at build
   - Circulars rejected
   - Invalid links crash

## Unit Normalization
1. Legal Units
   ```json
   {
     "opacity": "percent strings only (10%)",
     "spacing": "numbers as px (10)",
     "duration": "ms only (100ms)",
     "fontSize": "px or rem (16px, 1rem)",
     "lineHeight": "unitless (1.5)",
     "borderRadius": "px or rem (4px, 0.25rem)",
     "borderWidth": "px only (1px)",
     "boxShadow": "px, color (0 2px 4px rgba(0,0,0,0.1))",
     "zIndex": "integers (1)",
     "color": "hex or rgba (#000000, rgba(0,0,0,0.5))"
   }
   ```

2. Validation
   - Type-specific unit validation
   - Mixed units blocked
   - Build-time conversion
   - Invalid units rejected

## Schema Evolution
1. Forward Compatibility
   - Unknown keys rejected
   - Reserved fields declared
   - Deprecated fields marked

2. Reserved Fields
   ```json
   {
     "reservedFields": [
       "$type",
       "$value",
       "$description",
       "$category",
       "$metadata",
       "$version"
     ]
   }
   ```

3. Deprecation
   - Fields marked deprecated
   - One major version minimum
   - Removal in major bump
   - Migration guide required

## Canonical Violation Example
Invalid (Fails):
```json
{
  "opacity": {
    "low": {
      "$type": "opacity",
      "$value": "10%",
      "$description": "Low opacity value"
    }
  }
}
```

Fails:
- opacity = wrapping key = $type
- low should be root
- Double nesting
- Linter rejects

Valid:
```json
{
  "low": {
    "$type": "opacity",
    "$value": "10%",
    "$description": "Low opacity value"
  }
}
```

## Next Actions
1. JSON schema (blocks build)
2. Linter (blocks commit)
3. Flattener (fix + fail)
4. Snapshots (strict mode)
5. DTCG sync
6. Docs

## Summary
System fails fast. No drift. No ambiguity. T-D-W-P is law.

## Enforcement
- core.json: validated, T-D-W-P compliant
- Failures: block pipeline
- No manual primitives. Policy.