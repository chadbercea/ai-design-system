// src/mapTokensToMuiTheme.js
// Mapping function: Style Dictionary tokens -> MUI theme schema

/**
 * Map Style Dictionary tokens to a MUI theme object.
 * @param {object} tokens - The output from Style Dictionary (with .value at leaves)
 * @returns {object} - MUI theme object
 */
export function mapTokensToMuiTheme(tokens) {
  return {
    palette: {
      primary: {
        main: tokens.color?.blue?.[500]?.value || '#1976d2',
        light: tokens.color?.blue?.[300]?.value || '#42a5f5',
        dark: tokens.color?.blue?.[700]?.value || '#1565c0',
        contrastText: tokens.color?.white?.value || '#fff',
      },
      // TODO: Map secondary, error, warning, info, success, background, text, etc.
    },
    typography: {
      fontFamily: tokens.typography?.fontFamily?.value || '"Roboto", "Helvetica", "Arial", sans-serif',
      fontSize: tokens.typography?.fontSize?.value || 14,
      fontWeightLight: tokens.typography?.fontWeight?.light?.value || 300,
      fontWeightRegular: tokens.typography?.fontWeight?.regular?.value || 400,
      fontWeightMedium: tokens.typography?.fontWeight?.medium?.value || 500,
      fontWeightBold: tokens.typography?.fontWeight?.bold?.value || 700,
      // TODO: Map h1-h6, subtitle1, subtitle2, body1, body2, button, caption, overline
    },
    spacing: tokens.spacing?.base?.value || 8,
    breakpoints: {
      values: {
        xs: tokens.breakpoint?.xs?.value || 0,
        sm: tokens.breakpoint?.sm?.value || 600,
        md: tokens.breakpoint?.md?.value || 900,
        lg: tokens.breakpoint?.lg?.value || 1200,
        xl: tokens.breakpoint?.xl?.value || 1536,
      }
    },
    shape: {
      borderRadius: tokens.shape?.borderRadius?.value || 4,
    },
    transitions: {
      duration: {
        shortest: tokens.transition?.duration?.shortest?.value || 150,
        shorter: tokens.transition?.duration?.shorter?.value || 200,
        short: tokens.transition?.duration?.short?.value || 250,
        standard: tokens.transition?.duration?.standard?.value || 300,
        complex: tokens.transition?.duration?.complex?.value || 375,
        enteringScreen: tokens.transition?.duration?.enteringScreen?.value || 225,
        leavingScreen: tokens.transition?.duration?.leavingScreen?.value || 195,
      },
      easing: {
        easeInOut: tokens.transition?.easing?.easeInOut?.value || 'cubic-bezier(0.4, 0, 0.2, 1)',
        easeOut: tokens.transition?.easing?.easeOut?.value || 'cubic-bezier(0.0, 0, 0.2, 1)',
        easeIn: tokens.transition?.easing?.easeIn?.value || 'cubic-bezier(0.4, 0, 1, 1)',
        sharp: tokens.transition?.easing?.sharp?.value || 'cubic-bezier(0.4, 0, 0.6, 1)',
      }
    },
    zIndex: {
      mobileStepper: tokens.zIndex?.mobileStepper?.value || 1000,
      speedDial: tokens.zIndex?.speedDial?.value || 1050,
      appBar: tokens.zIndex?.appBar?.value || 1100,
      drawer: tokens.zIndex?.drawer?.value || 1200,
      modal: tokens.zIndex?.modal?.value || 1300,
      snackbar: tokens.zIndex?.snackbar?.value || 1400,
      tooltip: tokens.zIndex?.tooltip?.value || 1500,
    },
    // TODO: Add components overrides if needed
  };
} 