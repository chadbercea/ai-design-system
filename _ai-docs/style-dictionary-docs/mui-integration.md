# Style Dictionary to MUI Theme Integration

## Required Configuration

### 1. Style Dictionary Format
```javascript
StyleDictionary.registerFormat({
  name: 'javascript/mui-theme',
  formatter: function(dictionary, config) {
    return `module.exports = ${JSON.stringify({
      palette: {
        primary: {
          main: dictionary.properties.color.primary.main.value,
          light: dictionary.properties.color.primary.light.value,
          dark: dictionary.properties.color.primary.dark.value,
          contrastText: dictionary.properties.color.primary.contrastText.value
        },
        // ... other color tokens
      },
      typography: {
        fontFamily: dictionary.properties.typography.fontFamily.value,
        fontSize: dictionary.properties.typography.fontSize.value,
        fontWeightLight: dictionary.properties.typography.fontWeight.light.value,
        fontWeightRegular: dictionary.properties.typography.fontWeight.regular.value,
        fontWeightMedium: dictionary.properties.typography.fontWeight.medium.value,
        fontWeightBold: dictionary.properties.typography.fontWeight.bold.value,
        // ... other typography tokens
      },
      spacing: dictionary.properties.spacing.base.value,
      breakpoints: {
        values: {
          xs: dictionary.properties.breakpoint.xs.value,
          sm: dictionary.properties.breakpoint.sm.value,
          md: dictionary.properties.breakpoint.md.value,
          lg: dictionary.properties.breakpoint.lg.value,
          xl: dictionary.properties.breakpoint.xl.value
        }
      },
      shape: {
        borderRadius: dictionary.properties.shape.borderRadius.value
      },
      transitions: {
        duration: {
          shortest: dictionary.properties.transition.duration.shortest.value,
          shorter: dictionary.properties.transition.duration.shorter.value,
          short: dictionary.properties.transition.duration.short.value,
          standard: dictionary.properties.transition.duration.standard.value,
          complex: dictionary.properties.transition.duration.complex.value,
          enteringScreen: dictionary.properties.transition.duration.enteringScreen.value,
          leavingScreen: dictionary.properties.transition.duration.leavingScreen.value
        },
        easing: {
          easeInOut: dictionary.properties.transition.easing.easeInOut.value,
          easeOut: dictionary.properties.transition.easing.easeOut.value,
          easeIn: dictionary.properties.transition.easing.easeIn.value,
          sharp: dictionary.properties.transition.easing.sharp.value
        }
      },
      zIndex: {
        mobileStepper: dictionary.properties.zIndex.mobileStepper.value,
        speedDial: dictionary.properties.zIndex.speedDial.value,
        appBar: dictionary.properties.zIndex.appBar.value,
        drawer: dictionary.properties.zIndex.drawer.value,
        modal: dictionary.properties.zIndex.modal.value,
        snackbar: dictionary.properties.zIndex.snackbar.value,
        tooltip: dictionary.properties.zIndex.tooltip.value
      }
    }, null, 2)};`;
  }
});
```

### 2. Style Dictionary Config
```javascript
module.exports = {
  source: ['tokens/**/*.json'],
  platforms: {
    mui: {
      transformGroup: 'js',
      buildPath: 'build/mui/',
      files: [{
        destination: 'theme.js',
        format: 'javascript/mui-theme'
      }]
    }
  }
};
```

### 3. Token Structure
```json
{
  "color": {
    "primary": {
      "main": { "value": "#1976d2" },
      "light": { "value": "#42a5f5" },
      "dark": { "value": "#1565c0" },
      "contrastText": { "value": "#fff" }
    }
  },
  "typography": {
    "fontFamily": { "value": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif" },
    "fontSize": { "value": 14 },
    "fontWeight": {
      "light": { "value": 300 },
      "regular": { "value": 400 },
      "medium": { "value": 500 },
      "bold": { "value": 700 }
    }
  },
  "spacing": {
    "base": { "value": 8 }
  },
  "breakpoint": {
    "xs": { "value": 0 },
    "sm": { "value": 600 },
    "md": { "value": 900 },
    "lg": { "value": 1200 },
    "xl": { "value": 1536 }
  }
}
```

### 4. Usage in MUI
```javascript
import { createTheme } from '@mui/material/styles';
import theme from './build/mui/theme';

const muiTheme = createTheme(theme);
```

## Best Practices

1. **Token Organization**
   - Match MUI's theme structure in your tokens
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