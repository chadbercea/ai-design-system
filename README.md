# ai-design-system

## Design Token Pipeline: Modern Paradigm

This project implements a scalable, industry-standard design token pipeline for multi-platform theming. The canonical model is:

**Tokens → Style Dictionary → Mapping Function → Consumer**

- **Tokens:** Source-of-truth, DTCG-compliant design tokens (e.g., DDS Foundations.json)
- **Style Dictionary:** Transforms tokens into consumable JS/JSON/CSS/etc. (agnostic to consumer schema)
- **Mapping Function:** Custom adapter that maps SD output to the exact schema required by each consumer (e.g., MUI theme, Tailwind config)
- **Consumer:** The library or platform that uses the mapped theme/config (MUI, Tailwind, Radix, etc.)

---

## Pipeline Overview

1. **Edit tokens in `tokens/`** (DTCG-compliant JSON)
2. **Run Style Dictionary** to generate `build/tokens.js`
3. **Run the mapping script** to generate a consumer-ready theme/config (e.g., `build/mui/theme.js`)
4. **Import the generated theme/config** in your app or library

---

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Build tokens with Style Dictionary:**
   ```bash
   npx style-dictionary build --config config/style-dictionary.config.mjs
   ```
3. **Generate MUI theme:**
   ```bash
   node scripts/build-mui-theme.js
   ```

---

## Usage Example (MUI)

```js
import { createTheme } from '@mui/material/styles';
import theme from '../build/mui/theme.js';
const muiTheme = createTheme(theme);
```

---

## Extending to Other Consumers

- **Add a new mapping function** (e.g., `mapTokensToTailwindConfig.js`)
- **Create a build script** for the new consumer
- **Document the mapping and usage**

---

## Token Validation System

Automated validation ensures all tokens are DTCG-compliant and follow project rules.

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
- Types must be singular (e.g., `fontSize` not `fontSizes`)
- No nested primitives allowed
- Color tokens must use lowercase dot notation
- All changes must be validated before commit

---

## Testing

- **Jest is configured for ESM.**
- To run all tests:
  ```bash
  node --experimental-vm-modules node_modules/.bin/jest
  ```
- All mapping functions are covered by unit tests in `adapters/__tests__/`.
- Tests use ESM `import/export` syntax throughout the codebase.

---

## How This Works

This section explains each stage of the design token pipeline and how they work together:

### 1. Tokens (Source-of-Truth)
Tokens are DTCG-compliant JSON files in the `tokens/` directory (e.g., colors, spacing, typography). They serve as the single source of truth for all design decisions. These files are human-editable, and each token includes a `$value`, `$type`, and (optionally) `$description`.

### 2. Style Dictionary (Transformation Engine)
Style Dictionary is an open-source tool that reads your tokens and outputs them in various formats (JS, JSON, CSS, etc.). Its purpose is to transform raw tokens into files consumable by different platforms. It reads all token files, applies transforms, and outputs a flat JS file (e.g., `build/tokens.js`) with named exports. The configuration is managed via `config/style-dictionary.config.mjs`.

### 3. Mapping Function (Adapter Layer)
The mapping function (e.g., `mapTokensToMuiTheme`) is a custom JavaScript function that takes the Style Dictionary output and produces an object in the exact shape required by your consumer (such as an MUI theme). This function bridges the gap between generic tokens and the specific schema your consumer expects. It imports all named exports from `build/tokens.js` and maps each token to the correct key in the consumer's schema. This function is custom for each consumer.

### 4. Consumer (Library/Framework)
The consumer is the end system that uses the mapped theme or config (e.g., MUI, Tailwind, Radix, etc.). Its purpose is to use the mapped theme/config to style your application or components. The consumer imports the generated theme/config and applies it using its own API (for example, `createTheme` for MUI).

---

## Warning
⚠️ Always validate JSON after using AI tools. These tools may silently modify token structure, remove descriptions, or break references.

---

## References
- [W3C DTCG](https://design-tokens.github.io/community-group/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/#/)
- [MUI Theming](https://mui.com/material-ui/customization/theming/)

## Future Enhancements

### High Priority
- Integration testing suite
  - Cross-framework compatibility testing
  - Build system validation
  - Token transformation testing
  - Adapter testing (MUI, Tailwind, V0)
  - Visual consistency checks

### Medium Priority
- Additional build targets
  - More framework adapters
  - Additional output formats
  - Custom build configurations
- Adapter customization guidelines
  - Documentation for creating new adapters
  - Best practices for token mapping
  - Performance optimization tips

### Lower Priority
- Visual regression testing
  - Automated screenshot comparison
  - Component-level visual testing
  - Cross-browser testing
- Community feedback mechanisms
  - Issue templates
  - Contribution guidelines
  - User feedback collection
- Additional framework adapters
  - Vue.js
  - Angular
  - Svelte
  - Other popular frameworks

### Performance Optimizations
- Build system improvements
  - Parallel processing
  - Incremental builds
  - Better error handling
- Cache system enhancements
  - Distributed caching
  - Cache compression
  - Cache analytics

### Documentation
- Interactive examples
- API documentation
- Migration guides
- Troubleshooting guides
