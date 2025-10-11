# For Docker Eyeholes Only

**🚨 WARNING: This repo is not a drop-in Docker image. If you're looking for a one-command container, you're in the wrong multiverse. This is a design system pipeline, not a Mr. Meeseeks box. Proceed only if you're ready to dive in! 🚨**

# AI Design System

## Overview
This project uses Style Dictionary to generate design tokens from a stable, validated source (`DDS Foundations.json`). The tokens are transformed into framework-specific themes for MUI, Tailwind, and Shadcn.

---

## Toolchain
```
Figma → Token Studio → DDS Foundations.json → Style Dictionary → Framework Themes (MUI/Tailwind/Shadcn)
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

3. **Outputs**:
   - `build/js/tokens.mjs` - ES6 module with all tokens
   - `build/css/dds-tokens.css` - CSS custom properties
   - `build/json/tokens.json` - JSON format
   - `build/mui/theme.js` - MUI theme configuration
   - `build/tailwind/theme.js` - Tailwind theme configuration
   - `build/shadcn/theme.js` - Shadcn theme configuration

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
3. The output files will be generated in `build/` and can be consumed by your application.
4. **Verify a successful build:** Check that all files in `build/` exist and contain your exported tokens in the expected structure.

## Project Structure
- `config/style-dictionary.config.mjs`: Configuration for Style Dictionary
- `config/register-transforms.mjs`: Custom transforms and formatters
- `scripts/normalize-tokens.mjs`: Token normalization utilities
- `token-studio-sync-provider/`: Figma token sync directory (DO NOT MODIFY)
- `build/`: Generated theme files for consumption

## Contributing
Please follow the project guidelines for file organization, validation, and error handling. Holler at yer boi @ChadBercea with any questions, comments, or snide remarks.

---

## Known Issues

### HSL Color Output with Style Dictionary and @tokens-studio/sd-transforms

Currently, the `ts/color/modifiers` transform from `@tokens-studio/sd-transforms` only outputs HSL color values if your color tokens include the `$extensions.studio.tokens.modify` property with `space: "hsl"`.
**By default, primitive color tokens do not have this property.**
There is no built-in transform to automatically add this extension to all color tokens.

**Long-term solution:**
Add the `$extensions.studio.tokens.modify` property to your color tokens in your source token files or preprocess them before running Style Dictionary.

**MVP workaround:**
For now, a custom Style Dictionary transform should be used to convert hex color values to HSL in the output.

For more details and up-to-date instructions on color conversion (including hex to HSL), see the official documentation:

https://www.npmjs.com/package/@tokens-studio/sd-transforms

- **PX to REM Conversion**: Style Dictionary does not natively support converting px values to rem. A custom transform (`custom/pxToRem`) is used as a temporary workaround. This should be removed once upstream or token source supports rem output natively.