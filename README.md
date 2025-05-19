# For Docker Eyeholes Only

**🚨 WARNING: This repo is not a drop-in Docker image. If you're looking for a one-command container, you're in the wrong multiverse. This is a design system pipeline, not a Mr. Meeseeks box. Proceed only if you're ready to dive in! 🚨**

# AI Design System

## Overview
This project uses Style Dictionary to generate design tokens from a stable, validated source (`token-studio-sync-provider/DDS Foundations.json`). The tokens are then converted into an MUI theme using a mapping function (`adapter.js`).

## Current Status
- **Token Source:** Locked to `token-studio-sync-provider/DDS Foundations.json` for a stable, collision-free build.
- **Build Pipeline:** Style Dictionary generates tokens, which are then mapped to an MUI theme.
- **Automation:** The entire conversion process is automated, with no manual intervention required.

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

## MUI Theme Mapping Example
The `adapter.js` function maps tokens to MUI theme properties. For example:
```js
// Example mapping in adapter.js
theme.palette.primary.main = tokens.color.blue[500].value;
```
This bridges the output of Style Dictionary to the real UI theming system. See `mapTokensToMuiTheme()` for the full mapping logic.

## Troubleshooting
**Common build errors and what they mean:**
- **"No tokens for tokens.js"**: The glob pattern didn't match any files. Check your `source` config.
- **"Token collisions detected"**: The flattening process is using non-CTI naming, or there are duplicate token names.
- **"Reference Errors"**: Some token references could not be found. Check for typos or missing tokens.

## How to Extend
- Add new token files one at a time.
- Validate each file for DTCG compliance before including it in the build.
- Token files can be modular or flat, but must follow the expected structure.
- In the future, tokens may be grouped by Foundations, Themes, or Components for better organization and scalability.
- After adding a new file, run the build and check for errors before merging.

## CI/CD Status and Intended Workflow
- The token build pipeline is intended to run on every PR and merge to `main`.
- Output (`build/tokens.js`) is intended for local consumption and can be published as an NPM package for broader use.
- Future automation will include validation and theme generation as part of CI, ensuring only valid tokens and themes are published.

## Consuming the Tokens
The generated `build/tokens.js` file is imported and mapped to an MUI theme using `mapTokensToMuiTheme`, then passed to MUI's `createTheme`:
```js
import tokens from '../build/tokens.js';
import mapTokensToMuiTheme from '../src/theme/adapter.js';
import { createTheme } from '@mui/material/styles';

const muiTheme = createTheme(mapTokensToMuiTheme(tokens));
```
This enables seamless integration of your design tokens into your application's UI theme.

## Future Steps
- Incrementally add and validate additional token files as they become ready.
- Implement validation scripts and error handling for theme generation.
- Reorganize files to match the prescribed project structure.
- Integrate BuildCache into theme generation for consistent caching.

## Getting Started
1. Ensure `token-studio-sync-provider/DDS Foundations.json` is present and valid.
2. Run the build script:
   ```bash
   node scripts/build-tokens.mjs
   ```
3. The output file (`build/tokens.js`) will be generated and can be used by the theme adapter.
4. **Verify a successful build:** Check that `build/tokens.js` exists and contains your exported tokens in the expected structure.

## Project Structure
- `config/style-dictionary.config.mjs`: Configuration for Style Dictionary.
- `scripts/build-tokens.mjs`: Script to build tokens using Style Dictionary.
- `src/theme/adapter.js`: Mapping function to convert tokens into an MUI theme.

## Contributing
Please follow the project guidelines for file organization, validation, and error handling.