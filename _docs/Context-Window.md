# Design Token System - Current State

## Core System
- T-D-W-P (Type, Decide, Wrap, Path) system
- Tokens Studio sync provider
- W3C DTCG-compliant structure
- Production-ready token sets

## Current Architecture
```
token-studio-sync-provider/
├── core.json          # Base token set
├── dark.json          # Dark theme tokens
├── light.json         # Light theme tokens
├── theme.json         # Theme-specific tokens
├── $themes.json       # Theme relationships
└── $metadata.json     # Set configuration
```

## AI Assistant Guidelines

### Token Processing Rules
1. **Always follow T-D-W-P in order**:
   - T: Determine type first
   - D: Decide category second
   - W: Apply wrapping rules third
   - P: Format path and properties last

2. **Validation Requirements**:
   - Every token MUST have: `$value`, `$type`, `$description`
   - Types MUST be singular (e.g., `fontSize` not `fontSizes`)
   - Categories MUST be PascalCase singular
   - Color tokens MUST use lowercase dot notation

3. **Error Conditions**:
   - Double nesting under Primitives
   - Plural forms in `$type`
   - Wrapping when type matches category
   - Semantic tokens in Primitives
   - Missing required properties

### AI Response Patterns
1. **When Processing Tokens**:
   - First, check against T-D-W-P system
   - Second, validate against Canon rules
   - Third, ensure W3C compliance
   - Finally, verify Tokens Studio compatibility

2. **When Suggesting Changes**:
   - Maintain primitive/semantic separation
   - Preserve existing references
   - Follow established naming patterns
   - Document all modifications

3. **When Validating Structure**:
   - Check type determination
   - Verify category assignment
   - Confirm wrapping decisions
   - Validate path formatting

### Reference Points
1. **Primary Sources**:
   - Design Token Canon for structure rules
   - Tokens Studio documentation for type system
   - W3C DTCG specification for compliance

2. **Validation Steps**:
   - Type matches Tokens Studio taxonomy
   - Category follows PascalCase singular
   - Wrapping follows type/category match rules
   - Path follows placement rules

3. **Error Prevention**:
   - Flag any deviation from T-D-W-P
   - Identify potential conflicts
   - Suggest corrections
   - Maintain consistency

## Next Steps
1. **Enhance Token Governance**
   - Implement automated validation
   - Add drift detection
   - Create decision support system

2. **Automated Local Regression Testing**
   - Pre-merge validation pipeline
   - T-D-W-P compliance checks
   - Reference validation
   - Type checking
   - Structure verification
   - Theme consistency
   - No breaking changes to existing tokens

3. **Expand Token Coverage**
   - Add more component tokens
   - Implement additional themes
   - Create variant system

4. **Improve Documentation**
   - Update usage guidelines
   - Create contribution rules
   - Document best practices 

   ////////////////////////////
   New Problem Space
   \\\\\\\\\\\\\\\\\\\\\\\\\\\\

  "opacity": {
    "low": {
      "$type": "opacity",
      "$value": "10%",
      "$description": "Low opacity value"
    },
    "md": {
      "$type": "opacity",
      "$value": "50%",
      "$description": "Medium opacity value"
    },
    "high": {
      "$type": "opacity",
      "$value": "90%",
      "$description": "High opacity value"
    }
  }

  This JSON is creating a double nested situation that means if the wrapper or the name should not == $value