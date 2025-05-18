# MUI CSS Theme Variables Reference

## Core Concepts

### CSS Variable Structure
- Color system
- Typography
- Spacing
- Breakpoints
- Other theme values

### Token Structure
```typescript
interface ThemeVars {
  // Color system
  '--mui-palette-primary-main': string;
  '--mui-palette-primary-light': string;
  '--mui-palette-primary-dark': string;
  '--mui-palette-primary-contrastText': string;
  
  // Typography
  '--mui-typography-fontFamily': string;
  '--mui-typography-fontSize': string;
  '--mui-typography-fontWeightLight': number;
  '--mui-typography-fontWeightRegular': number;
  '--mui-typography-fontWeightMedium': number;
  '--mui-typography-fontWeightBold': number;
  
  // Spacing
  '--mui-spacing-unit': number;
  
  // Breakpoints
  '--mui-breakpoints-xs': number;
  '--mui-breakpoints-sm': number;
  '--mui-breakpoints-md': number;
  '--mui-breakpoints-lg': number;
  '--mui-breakpoints-xl': number;
}
```

### Usage
```typescript
// Theme configuration
const theme = createTheme({
  cssVarPrefix: 'mui',
  // other theme options
});

// Component usage
const styles = {
  color: 'var(--mui-palette-primary-main)',
  fontFamily: 'var(--mui-typography-fontFamily)',
  padding: 'var(--mui-spacing-2)',
};
```

### Best Practices
1. Use CSS variables for dynamic theming
2. Maintain consistent variable naming
3. Consider browser support
4. Test variable fallbacks
5. Document variable usage