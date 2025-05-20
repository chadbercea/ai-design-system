# For Docker Eyeholes Only

**🚨 WARNING: This repo is not a drop-in Docker image. If you're looking for a one-command container, you're in the wrong multiverse. This is a design system pipeline, not a Mr. Meeseeks box. Proceed only if you're ready to dive in! 🚨**

# AI Design System

## Overview
This project uses Style Dictionary to generate design tokens from a stable, validated source (`DDS Foundations.json`). The tokens are then converted into an MUI theme using our streamlined toolchain.

## Toolchain
```
DDS Foundations.json → Style Dictionary → tokens.mjs → createTheme.js → MUI Theme
```

1. **Source**: `token-studio-sync-provider/DDS Foundations.json`
   - Single source of truth for design tokens
   - Follows DTCG format
   - Contains all design system primitive values

2. **Style Dictionary** (`config/style-dictionary.config.mjs`)
   - Processes JSON tokens
   - Uses `@tokens-studio/sd-transforms`
   - Flattens and transforms tokens
   - Outputs ES6 module format

3. **Output**: `build/tokens.mjs`
   - Flat, camelCase tokens
   - All values resolved
   - Ready for JavaScript/TypeScript import
   - Example: `colorBlue500`, `fontSizes14`, etc.

4. **Theme Creation**: `src/theme/createTheme.js`
   - Imports tokens from `tokens.mjs`
   - Maps them to MUI's theme structure
   - Creates a complete MUI theme
   - Used by `themeToggle.ts` for theme switching

## Expected Token Structure
Tokens in `DDS Foundations.json` should follow this format:
```json
{
  "color": {
    "blue": {
      "500": {
        "$type": "color",
        "$value": "#0070f3",
        "$description": "Primary blue color"
      }
    }
  }
}
```
Each token must include `$value`, `$type`, and (optionally) `$description`. The path hierarchy should be clear and consistent.

## Troubleshooting
**Common build errors and what they mean:**
- **"No tokens for tokens.js"**: The glob pattern didn't match any files. Check your `source` config.
- **"Token collisions detected"**: The flattening process is using non-CTI naming, or there are duplicate token names.
- **"Reference Errors"**: Some token references could not be found. Check for typos or missing tokens.

## How to Extend
- Add new token files one at a time.
- Validate each file for DTCG compliance before including it in the build.
- Token files can be modular or flat, but must follow the expected structure.
- After adding a new file, run the build and check for errors before merging.

## CI/CD Status and Intended Workflow
- The token build pipeline is intended to run on every PR and merge to `main`.
- Output (`build/tokens.mjs`) is intended for local consumption and can be published as an NPM package for broader use.
- Future automation will include validation and theme generation as part of CI, ensuring only valid tokens and themes are published.

## Consuming the Tokens
The generated `build/tokens.mjs` file is imported and used to create an MUI theme:
```js
import { createTheme } from '@mui/material/styles';
import theme from './src/theme/createTheme';

// Use the theme in your app
const App = () => (
  <ThemeProvider theme={theme}>
    <YourApp />
  </ThemeProvider>
);
```

## Getting Started
1. Ensure `token-studio-sync-provider/DDS Foundations.json` is present and valid.
2. Run the build script:
   ```bash
   npm run build:tokens
   ```
3. The output file (`build/tokens.mjs`) will be generated and can be used by the theme system.
4. **Verify a successful build:** Check that `build/tokens.mjs` exists and contains your exported tokens in the expected structure.

## Project Structure
- `config/style-dictionary.config.mjs`: Configuration for Style Dictionary
- `scripts/build-tokens.mjs`: Script to build tokens using Style Dictionary
- `src/theme/createTheme.js`: Theme creation using MUI's createTheme
- `src/theme/themeToggle.ts`: Theme switching functionality

## Contributing
Please follow the project guidelines for file organization, validation, and error handling. Holler at yer boi @ChadBercea with any questions, comments, or snide remarks.