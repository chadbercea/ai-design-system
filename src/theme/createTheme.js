import { createTheme } from '@mui/material/styles';
import * as tokens from '../../build/tokens.mjs';
import { typography } from './typography';

// Create a complete MUI theme with all required properties
const createDDSTheme = (mode = 'light') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: tokens.colorBlue500,
        light: tokens.colorBlue100,
        dark: tokens.colorBlue900,
        contrastText: '#fff',
      },
      secondary: {
        main: tokens.colorPurple500,
        light: tokens.colorPurple100,
        dark: tokens.colorPurple900,
        contrastText: '#fff',
      },
      error: {
        main: tokens.colorRed500,
        light: tokens.colorRed100,
        dark: tokens.colorRed900,
        contrastText: '#fff',
      },
      warning: {
        main: tokens.colorOrange500,
        light: tokens.colorOrange100,
        dark: tokens.colorOrange900,
        contrastText: '#fff',
      },
      info: {
        main: tokens.colorCyan500,
        light: tokens.colorCyan100,
        dark: tokens.colorCyan900,
        contrastText: '#fff',
      },
      success: {
        main: tokens.colorGreen500,
        light: tokens.colorGreen100,
        dark: tokens.colorGreen900,
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
        primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
        secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
        disabled: mode === 'light' ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.38)',
      },
      background: {
        default: mode === 'light' ? '#fff' : '#121212',
        paper: mode === 'light' ? '#fff' : '#1e1e1e',
      },
    },
    typography: typography,
    shape: {
      borderRadius: parseInt(tokens.borderRadiusMd),
    },
    breakpoints: {
      values: {
        xs: tokens.breakpointsXs,
        sm: tokens.breakpointsSm,
        md: tokens.breakpointsMd,
        lg: tokens.breakpointsLg,
        xl: tokens.breakpointsXl,
      },
    },
    spacing: 8, // MUI's default spacing unit
    zIndex: {
      mobileStepper: 1000,
      fab: 1050,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
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
  });
};

export default createDDSTheme; 