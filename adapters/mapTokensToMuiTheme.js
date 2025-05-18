// src/mapTokensToMuiTheme.js
// Mapping function: Style Dictionary tokens -> MUI theme schema

/**
 * Map Style Dictionary tokens to a MUI theme object.
 * @param {object} tokens - The output from Style Dictionary (flat named exports)
 * @returns {object} - MUI theme object
 */
export function mapTokensToMuiTheme(tokens) {
  return {
    palette: {
      primary: {
        main: tokens.ColorBasePrimary || '#1976d2',
        light: tokens.ColorBaseSecondary || '#42a5f5',
        dark: tokens.ColorBaseNeutral700 || '#1565c0',
        contrastText: tokens.ColorBaseNeutral100 || '#fff',
      },
      secondary: {
        main: tokens.ColorBaseSecondary || '#9c27b0',
        light: tokens.ColorBaseNeutral200 || '#ba68c8',
        dark: tokens.ColorBaseNeutral800 || '#7b1fa2',
        contrastText: tokens.ColorBaseNeutral100 || '#fff',
      },
      error: {
        main: tokens.ColorBaseError || '#d32f2f',
        light: tokens.ColorBaseErrorLight || '#ef5350',
        dark: tokens.ColorBaseErrorDark || '#c62828',
        contrastText: tokens.ColorBaseNeutral100 || '#fff',
      },
      warning: {
        main: tokens.ColorBaseWarning || '#ed6c02',
        light: tokens.ColorBaseWarningLight || '#ff9800',
        dark: tokens.ColorBaseWarningDark || '#e65100',
        contrastText: tokens.ColorBaseNeutral900 || '#fff',
      },
      info: {
        main: tokens.ColorBaseInfo || '#0288d1',
        light: tokens.ColorBaseInfoLight || '#03a9f4',
        dark: tokens.ColorBaseInfoDark || '#01579b',
        contrastText: tokens.ColorBaseNeutral100 || '#fff',
      },
      success: {
        main: tokens.ColorBaseSuccess || '#2e7d32',
        light: tokens.ColorBaseSuccessLight || '#4caf50',
        dark: tokens.ColorBaseSuccessDark || '#1b5e20',
        contrastText: tokens.ColorBaseNeutral100 || '#fff',
      },
      grey: {
        50: tokens.ColorBaseNeutral100 || '#fafafa',
        100: tokens.ColorBaseNeutral200 || '#f5f5f5',
        200: tokens.ColorBaseNeutral300 || '#eeeeee',
        300: tokens.ColorBaseNeutral400 || '#e0e0e0',
        400: tokens.ColorBaseNeutral500 || '#bdbdbd',
        500: tokens.ColorBaseNeutral600 || '#9e9e9e',
        600: tokens.ColorBaseNeutral700 || '#757575',
        700: tokens.ColorBaseNeutral800 || '#616161',
        800: tokens.ColorBaseNeutral900 || '#424242',
        900: tokens.ColorBaseNeutral900 || '#212121',
      },
      text: {
        primary: tokens.ColorBaseNeutral900 || 'rgba(0, 0, 0, 0.87)',
        secondary: tokens.ColorBaseNeutral700 || 'rgba(0, 0, 0, 0.6)',
        disabled: tokens.ColorBaseNeutral500 || 'rgba(0, 0, 0, 0.38)',
      },
      background: {
        default: tokens.ColorBaseNeutral100 || '#fff',
        paper: tokens.ColorBaseNeutral200 || '#fff',
      },
    },
    typography: {
      fontFamily: tokens.TypographyFamilyBase || '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: parseInt(tokens.TypographySizeBase) || 14,
      fontWeightLight: parseInt(tokens.TypographyWeightNormal) || 300,
      fontWeightRegular: parseInt(tokens.TypographyWeightMedium) || 400,
      fontWeightMedium: parseInt(tokens.TypographyWeightSemibold) || 500,
      fontWeightBold: parseInt(tokens.TypographyWeightBold) || 700,
      h1: {
        fontFamily: tokens.TypographyFamilyHeading || tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightBold) || 700,
        fontSize: '6rem',
        lineHeight: 1.167,
        letterSpacing: '-0.01562em',
      },
      h2: {
        fontFamily: tokens.TypographyFamilyHeading || tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightBold) || 700,
        fontSize: '3.75rem',
        lineHeight: 1.2,
        letterSpacing: '-0.00833em',
      },
      h3: {
        fontFamily: tokens.TypographyFamilyHeading || tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightBold) || 700,
        fontSize: '3rem',
        lineHeight: 1.167,
        letterSpacing: '0em',
      },
      h4: {
        fontFamily: tokens.TypographyFamilyHeading || tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightBold) || 700,
        fontSize: '2.125rem',
        lineHeight: 1.235,
        letterSpacing: '0.00735em',
      },
      h5: {
        fontFamily: tokens.TypographyFamilyHeading || tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightBold) || 700,
        fontSize: '1.5rem',
        lineHeight: 1.334,
        letterSpacing: '0em',
      },
      h6: {
        fontFamily: tokens.TypographyFamilyHeading || tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightBold) || 700,
        fontSize: '1.25rem',
        lineHeight: 1.6,
        letterSpacing: '0.0075em',
      },
      subtitle1: {
        fontFamily: tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightMedium) || 500,
        fontSize: '1rem',
        lineHeight: 1.75,
        letterSpacing: '0.00938em',
      },
      subtitle2: {
        fontFamily: tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightMedium) || 500,
        fontSize: '0.875rem',
        lineHeight: 1.57,
        letterSpacing: '0.00714em',
      },
      body1: {
        fontFamily: tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightRegular) || 400,
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.00938em',
      },
      body2: {
        fontFamily: tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightRegular) || 400,
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.01071em',
      },
      button: {
        fontFamily: tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightMedium) || 500,
        fontSize: '0.875rem',
        lineHeight: 1.75,
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',
      },
      caption: {
        fontFamily: tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightRegular) || 400,
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
      },
      overline: {
        fontFamily: tokens.TypographyFamilyBase,
        fontWeight: parseInt(tokens.TypographyWeightRegular) || 400,
        fontSize: '0.75rem',
        lineHeight: 2.66,
        letterSpacing: '0.08333em',
        textTransform: 'uppercase',
      },
    },
    spacing: parseInt(tokens.SizeSpacing4) || 8,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      }
    },
    shape: {
      borderRadius: 4,
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
      }
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
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: tokens.ColorBaseNeutral100 || '#fff',
            color: tokens.ColorBaseNeutral900 || 'rgba(0, 0, 0, 0.87)',
          },
        },
      },
    },
  };
} 