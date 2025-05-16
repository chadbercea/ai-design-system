import tokens from '../../build/tokens/tokens.js';

export const mapTokensToMuiTheme = (tokens) => ({
  palette: {
    primary: {
      main: tokens.color.blue[500].value,
      light: tokens.color.blue[300].value,
      dark: tokens.color.blue[700].value,
      contrastText: '#fff'
    },
    secondary: {
      main: tokens.color.purple[500].value,
      light: tokens.color.purple[300].value,
      dark: tokens.color.purple[700].value,
      contrastText: '#fff'
    },
    grey: {
      50: tokens.color.grey[50].value,
      100: tokens.color.grey[100].value,
      200: tokens.color.grey[200].value,
      300: tokens.color.grey[300].value,
      400: tokens.color.grey[400].value,
      500: tokens.color.grey[500].value,
      600: tokens.color.grey[600].value,
      700: tokens.color.grey[700].value,
      800: tokens.color.grey[800].value,
      900: tokens.color.grey[900].value,
      A100: tokens.color.grey.a100.value,
      A200: tokens.color.grey.a200.value,
      A400: tokens.color.grey.a400.value,
      A700: tokens.color.grey.a700.value
    }
  },
  typography: {
    fontFamily: tokens.fontFamilies.roboto.value,
    fontWeightRegular: tokens.fontWeights.regular.value,
    fontWeightBold: tokens.fontWeights.bold.value,
    h1: {
      fontFamily: tokens.fontFamilies.roboto.value,
      fontSize: tokens.fontSizes[48].value,
      fontWeight: tokens.fontWeights.bold.value,
      lineHeight: tokens.lineHeights[100].value
    },
    h2: {
      fontFamily: tokens.fontFamilies.roboto.value,
      fontSize: tokens.fontSizes[40].value,
      fontWeight: tokens.fontWeights.bold.value,
      lineHeight: tokens.lineHeights[100].value
    },
    h3: {
      fontFamily: tokens.fontFamilies.roboto.value,
      fontSize: tokens.fontSizes[32].value,
      fontWeight: tokens.fontWeights.bold.value,
      lineHeight: tokens.lineHeights[100].value
    },
    h4: {
      fontFamily: tokens.fontFamilies.roboto.value,
      fontSize: tokens.fontSizes[24].value,
      fontWeight: tokens.fontWeights.bold.value,
      lineHeight: tokens.lineHeights[100].value
    },
    h5: {
      fontFamily: tokens.fontFamilies.roboto.value,
      fontSize: tokens.fontSizes[21].value,
      fontWeight: tokens.fontWeights.bold.value,
      lineHeight: tokens.lineHeights[100].value
    },
    h6: {
      fontFamily: tokens.fontFamilies.roboto.value,
      fontSize: tokens.fontSizes[18].value,
      fontWeight: tokens.fontWeights.bold.value,
      lineHeight: tokens.lineHeights[100].value
    },
    subtitle1: {
      fontFamily: tokens.fontFamilies.roboto.value,
      fontSize: tokens.fontSizes[16].value,
      fontWeight: tokens.fontWeights.regular.value,
      lineHeight: tokens.lineHeights[100].value
    },
    body1: {
      fontFamily: tokens.fontFamilies.roboto.value,
      fontSize: tokens.fontSizes[14].value,
      fontWeight: tokens.fontWeights.regular.value,
      lineHeight: tokens.lineHeights[100].value
    },
    body2: {
      fontFamily: tokens.fontFamilies.roboto.value,
      fontSize: tokens.fontSizes[12].value,
      fontWeight: tokens.fontWeights.regular.value,
      lineHeight: tokens.lineHeights[100].value
    },
    caption: {
      fontFamily: tokens.fontFamilies.roboto.value,
      fontSize: tokens.fontSizes[10].value,
      fontWeight: tokens.fontWeights.regular.value,
      lineHeight: tokens.lineHeights[100].value
    }
  },
  shape: {
    borderRadius: tokens.borderRadius.md.value
  },
  breakpoints: {
    values: {
      xs: tokens.breakpoints.xs.value,
      sm: tokens.breakpoints.sm.value,
      md: tokens.breakpoints.md.value,
      lg: tokens.breakpoints.lg.value,
      xl: tokens.breakpoints.xl.value
    }
  },
  spacing: (factor) => tokens.spacings[`${factor}`]?.value || `${parseInt(factor, 10) * 8}px`
}); 