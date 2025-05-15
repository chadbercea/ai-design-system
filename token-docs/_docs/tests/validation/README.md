# Token Validation Test Framework

This framework provides automated testing for design token validation rules.

## Overview

The test framework validates:
- Token classification (primitive vs semantic)
- Reference resolution
- Token transformation
- Token set management
- Unit normalization
- Error handling

## Directory Structure

```
tests/validation/
├── README.md           # This file
├── test-tokens.js      # Test runner and test cases
└── test-data/          # Test data files
    ├── primitives.json # Primitive token examples
    ├── semantics.json  # Semantic token examples
    └── invalid.json    # Invalid token examples
```

## Usage

### Running Tests

```bash
node test-tokens.js
```

### Test Categories

1. **Classification Tests**
   - Validates token classification as primitive or semantic
   - Checks pattern matching for token types
   - Verifies classification rules

2. **Reference Tests**
   - Validates reference resolution
   - Checks circular reference detection
   - Verifies math expression handling

3. **Transformation Tests**
   - Validates token format conversion
   - Checks CSS/SCSS output
   - Verifies error handling

4. **Token Set Tests**
   - Validates set naming conventions
   - Checks set organization rules
   - Verifies merging and splitting

5. **Unit Tests**
   - Validates unit conversion
   - Checks unit normalization
   - Verifies unit validation

## Adding Tests

1. Add test data to `test-data/` directory
2. Add test case to appropriate category in `test-tokens.js`
3. Run tests to verify

## Test Data Format

```json
{
  "validPrimitives": {
    "color.primary": {
      "$type": "color",
      "$value": "#ff0000",
      "$description": "Primary brand color"
    }
  },
  "validSemantics": {
    "button.primary": {
      "$type": "color",
      "$value": "{color.primary}",
      "$description": "Primary button color"
    }
  },
  "invalidTokens": {
    "invalid.type": {
      "$type": "invalid",
      "$value": "test",
      "$description": "Invalid type"
    }
  }
}
```

## Best Practices

1. **Test Coverage**
   - Test both valid and invalid cases
   - Include edge cases
   - Test error handling

2. **Test Data**
   - Use realistic examples
   - Include all token types
   - Document test data purpose

3. **Test Organization**
   - Group related tests
   - Use descriptive names
   - Keep tests focused

4. **Error Handling**
   - Test error messages
   - Verify error recovery
   - Check error types

## Contributing

1. Fork the repository
2. Add your tests
3. Run existing tests
4. Submit pull request

## References

- [W3C Design Tokens Community Group](https://design-tokens.github.io/community-group/)
- [Tokens Studio Documentation](https://docs.tokens.studio/) 