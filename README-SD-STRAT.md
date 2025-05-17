# Style Dictionary Strategy

## Directory Structure

```
/tokens/
  color.json
  spacing.json
/adapters/
  mapTokensToMuiTheme.js
  mapTokensToTailwindConfig.js
  mapTokensToV0Theme.js
/scripts/
  build-mui-theme.js
  build-tailwind-theme.js
/build/
  mui/theme.js
  tailwind/theme.js
```

---

## Pipeline Overview

1. **Tokens**: Source-of-truth DTCG-compliant JSON files in `/tokens/`.
2. **Style Dictionary**: Transforms tokens into flat JS/JSON outputs for use by mapping functions.
3. **Adapters**: Custom mapping functions in `/adapters/` convert SD output to the schema required by each consumer (MUI, Tailwind, v0, etc.).
4. **Scripts**: Build scripts in `/scripts/` automate the process for each consumer.
5. **Build Outputs**: Consumer-ready theme/config files in `/build/` are imported by apps.

---

## How to Add a New Consumer

1. **Write a mapping function** in `/adapters/` (e.g., `mapTokensToTailwindConfig.js`).
2. **Create a build script** in `/scripts/` to run the mapping and output the config (e.g., `build-tailwind-theme.js`).
3. **Run Style Dictionary** to generate the latest tokens output.
4. **Run your build script** to generate the new consumer config in `/build/`.
5. **Import the generated config** in your app as needed.

---

## Best Practices
- Keep tokens DTCG-compliant and well-documented.
- Treat `/adapters/` as the handoff point between design system and app teams.
- Apps should only import from `/build/`, never from `/tokens/` or `/adapters/`.
- Document each mapping function and its intended consumer.
- Automate the pipeline with scripts and CI/CD as needed.

---

## Example Usage

```js
// In your app (MUI example):
import { createTheme } from '@mui/material/styles';
import theme from '../build/mui/theme.js';
const muiTheme = createTheme(theme);
```

---

## References
- [W3C DTCG](https://design-tokens.github.io/community-group/)
- [Style Dictionary](https://amzn.github.io/style-dictionary/#/)
- [MUI Theming](https://mui.com/material-ui/customization/theming/) 