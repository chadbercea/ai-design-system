# MUI Typography Tokens Reference

## Core Concepts

### Typography Variants
- h1 through h6
- subtitle1, subtitle2
- body1, body2
- button
- caption
- overline

### Token Structure
```typescript
interface Typography {
  fontFamily: string;
  fontSize: number;
  fontWeightLight: number;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  htmlFontSize: number;
  variants: {
    h1: TypographyStyle;
    h2: TypographyStyle;
    h3: TypographyStyle;
    h4: TypographyStyle;
    h5: TypographyStyle;
    h6: TypographyStyle;
    subtitle1: TypographyStyle;
    subtitle2: TypographyStyle;
    body1: TypographyStyle;
    body2: TypographyStyle;
    button: TypographyStyle;
    caption: TypographyStyle;
    overline: TypographyStyle;
  };
}

interface TypographyStyle {
  fontFamily: string;
  fontWeight: number;
  fontSize: string;
  lineHeight: number;
  letterSpacing: string;
  textTransform?: string;
}
```

### Usage
```typescript
// Theme configuration
const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
      lineHeight: 1.2,
    },
    // other variant configurations
  },
});
```

### Best Practices
1. Use semantic typography variants
2. Maintain consistent scale
3. Consider responsive typography
4. Use typography tokens instead of hardcoded values
5. Follow accessibility guidelines for font sizes and line heights