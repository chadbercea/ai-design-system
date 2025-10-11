# MUI Integration with Style Dictionary

## Toolchain Overview
```
DDS Foundations.json → Style Dictionary → tokens.mjs → createTheme.js → MUI Theme
```

## Configuration

### 1. Style Dictionary Config
```javascript
// config/style-dictionary.config.mjs
import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

export default {
  source: ['token-studio-sync-provider/DDS Foundations.json'],
  platforms: {
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/',
      files: [{
        destination: 'tokens.mjs',
        format: 'javascript/es6',
        options: {
          showFileHeader: true
        }
      }]
    }
  }
};
```

### 2. Theme Creation
```javascript
// src/theme/createTheme.js
import { createTheme } from '@mui/material/styles';
import * as tokens from '../../build/tokens.mjs';

const theme = createTheme({
  palette: {
    primary: {
      main: tokens.colorBlue500,
      light: tokens.colorBlue300,
      dark: tokens.colorBlue700,
      contrastText: '#fff',
    },
    // ... other palette configurations
  },
  typography: {
    fontFamily: tokens.fontFamiliesRoboto,
    fontSize: parseInt(tokens.fontSizes14),
    // ... other typography configurations
  },
  // ... other theme configurations
});

export default theme;
```

### 3. Theme Usage
```javascript
// src/theme/ThemeProvider.js
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/CssBaseline';
import theme from './createTheme';

export function ThemeProvider({ children }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
```

## Best Practices

1. **Token Organization**
   - Keep primitive tokens in DDS Foundations.json
   - Use consistent naming conventions
   - Group related tokens together

2. **Value Types**
   - Ensure correct value types (numbers vs strings)
   - Handle unit conversions
   - Validate token values

3. **Theme Extension**
   - Allow for theme overrides
   - Support multiple themes
   - Enable theme switching

4. **Type Safety**
   - Generate TypeScript definitions
   - Validate token structure
   - Ensure type compatibility

5. **Build Process**
   - Watch for token changes
   - Optimize build output
   - Cache when possible 