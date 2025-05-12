# ai-design-system
I have an idea for an AI Design System. Let's try and build a prototype.
Right now, we need tokens.

# AI Design System

## Token Validation System

The design token system includes automated validation to ensure compliance with W3C DTCG and T-D-W-P rules.

### Validation Features
- Schema validation for required fields (`$value`, `$type`, `$description`)
- Plural type name detection
- Nested primitive detection
- Snapshot testing for structural integrity
- Pre-commit hooks to prevent invalid commits
- File watching for real-time validation

### Usage

1. **Manual Validation**
   ```bash
   npm run test:tokens
   ```

2. **Watch Mode** (for development)
   ```bash
   npm run test:tokens:watch
   ```

3. **Strict Mode**
   ```bash
   STRICT=true npm run test:tokens
   ```

### Validation Rules
- All tokens must have `$value`, `$type`, and `$description`
- Types must be singular (e.g., `fontSizes` not `fontSizess`)
- No nested primitives allowed
- Color tokens must use lowercase dot notation
- All changes must be validated before commit

### Warning
⚠️ Always validate JSON after using Cursor or other AI tools. These tools may silently modify token structure, remove descriptions, or break references.
