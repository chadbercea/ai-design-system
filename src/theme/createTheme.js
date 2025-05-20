import { createTheme } from '@mui/material/styles';
import * as tokens from '../../build/tokens.mjs';
import { createTypographyFromTokens } from './typography';

console.log('Creating theme with tokens:', {
  fontFamily: tokens.fontFamiliesRoboto,
  fontSize: tokens.fontSizes14,
  fontWeight: tokens.fontWeightsRegular,
});

// Map our flat tokens to MUI's theme structure
const theme = createTheme({
  palette: {
    primary: {
      main: tokens.colorBlue500,
      light: tokens.colorBlue300,
      dark: tokens.colorBlue700,
      contrastText: '#fff',
    },
    secondary: {
      main: tokens.colorPurple500,
      light: tokens.colorPurple300,
      dark: tokens.colorPurple700,
      contrastText: '#fff',
    },
    error: {
      main: tokens.colorRed500,
      light: tokens.colorRed300,
      dark: tokens.colorRed700,
      contrastText: '#fff',
    },
    warning: {
      main: tokens.colorOrange500,
      light: tokens.colorOrange300,
      dark: tokens.colorOrange700,
      contrastText: '#fff',
    },
    info: {
      main: tokens.colorLightblue500,
      light: tokens.colorLightblue300,
      dark: tokens.colorLightblue700,
      contrastText: '#fff',
    },
    success: {
      main: tokens.colorGreen500,
      light: tokens.colorGreen300,
      dark: tokens.colorGreen700,
      contrastText: '#fff',
    },
    grey: {
      50: tokens.colorGrey50,
      100: tokens.colorGrey100,
      200: tokens.colorGrey200,
      300: tokens.colorGrey300,
      400: tokens.colorGrey400,
      500: tokens.colorGrey500,
      600: tokens.colorGrey600,
      700: tokens.colorGrey700,
      800: tokens.colorGrey800,
      900: tokens.colorGrey900,
      A100: tokens.colorGreyA100,
      A200: tokens.colorGreyA200,
      A400: tokens.colorGreyA400,
      A700: tokens.colorGreyA700,
    },
    text: {
      primary: tokens.colorGrey900,
      secondary: tokens.colorGrey700,
      disabled: tokens.colorGrey400,
    },
    divider: tokens.colorGrey200,
    background: {
      default: '#fff',
      paper: '#fff',
    },
  },
  typography: createTypographyFromTokens(),
  shape: {
    borderRadius: parseInt(tokens.borderRadiusMd),
  },
  spacing: (factor) => tokens[`spacings${factor}`] || factor * 8,
  breakpoints: {
    values: {
      xs: tokens.breakpointsXs,
      sm: tokens.breakpointsSm,
      md: tokens.breakpointsMd,
      lg: tokens.breakpointsLg,
      xl: tokens.breakpointsXl,
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

console.log('Created theme typography:', theme.typography);

export default theme; 