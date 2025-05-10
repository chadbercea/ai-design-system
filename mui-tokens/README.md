# MUI Design Token Pipeline

A Node.js pipeline for extracting, transforming, and outputting Material-UI (MUI) design tokens in a W3C/Tokens Studio–compliant JSON format.

## Overview

This pipeline automates the conversion of MUI design tokens into a standardized format that can be used with Tokens Studio for Figma and other design token tools. It maintains a clear separation between primitive tokens and semantic (MUI) tokens while following W3C design token standards.

## Structure

The pipeline consists of:

- **Input**: `mui-tokens-raw.json` (MUI design tokens)
- **Transform**: `transform-for-tokens-studio.js` (Node.js transformation script)
- **Output**: `tokens-studio-format.json` (W3C-compliant format)
- **Reference**: `_ref/design-token-overview.txt` (Structure and rules)

## Token Categories

### Primitives
The `Primitives` set contains only raw, base design values:
- Base colors (e.g., `blue.500`, `red.100`)
- Raw typography values
- Raw spacing values
- Raw sizing values

### Semantic (MUI)
The `MUI` set contains all semantic tokens that reference primitives or define MUI-specific values:
- Palette tokens (e.g., `palette.primary.main`)
- Common tokens (e.g., `common.black`, `common.white`)
- Component-specific tokens
- Theme-specific tokens
- System-level tokens

## Usage

1. Ensure `mui-tokens-raw.json` is up to date
2. Run the transformation script:
   ```sh
   node transform-for-tokens-studio.js
   ```
3. The output will be written to `tokens-studio-format.json`

## Output Format

```json
{
  "$schema": "https://design-tokens.github.io/design-tokens/schema.json",
  "Primitives": {
    "blue.500": {
      "$value": "#2196f3",
      "$type": "color",
      "$description": "blue 500"
    }
  },
  "MUI": {
    "palette": {
      "primary": {
        "main": {
          "$value": "#1976d2",
          "$type": "color",
          "$description": "MUI palette.primary.main"
        }
      }
    },
    "common": {
      "black": {
        "$value": "#000",
        "$type": "color",
        "$description": "MUI common.black"
      }
    }
  }
}
```

## Development

### Adding New Token Types

1. Add a new builder function in `transform-for-tokens-studio.js`
2. Update the `main()` function to include the new tokens
3. Add validation for the new token type

### Validation

The script includes validation to ensure:
- Required schema is present
- Primitives and MUI sections exist
- Metadata is properly structured
- Primitives set only contains raw values (no semantic tokens)
- Semantic tokens are properly placed in the MUI set

## Contributing

1. Follow the structure in `_ref/design-token-overview.txt`
2. Add tests for new token types
3. Update documentation as needed
4. Ensure proper separation of primitive and semantic tokens

## License

MIT

## Contact

See repo owner or last commit author for questions. 