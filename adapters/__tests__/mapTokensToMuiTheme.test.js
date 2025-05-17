import { mapTokensToMuiTheme } from '../mapTokensToMuiTheme.js';

const mockTokens = {
  color: {
    blue: {
      500: { value: '#1976d2' },
      300: { value: '#42a5f5' },
      700: { value: '#1565c0' }
    },
    white: { value: '#fff' }
  },
  typography: {
    fontFamily: { value: 'Arial, sans-serif' },
    fontSize: { value: 16 },
    fontWeight: {
      light: { value: 200 },
      regular: { value: 400 },
      medium: { value: 500 },
      bold: { value: 700 }
    }
  },
  spacing: { base: { value: 10 } },
  breakpoint: {
    xs: { value: 0 },
    sm: { value: 600 },
    md: { value: 900 },
    lg: { value: 1200 },
    xl: { value: 1536 }
  },
  shape: { borderRadius: { value: 6 } },
  transition: {
    duration: {
      shortest: { value: 100 },
      shorter: { value: 200 },
      short: { value: 250 },
      standard: { value: 300 },
      complex: { value: 375 },
      enteringScreen: { value: 225 },
      leavingScreen: { value: 195 }
    },
    easing: {
      easeInOut: { value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
      easeOut: { value: 'cubic-bezier(0.0, 0, 0.2, 1)' },
      easeIn: { value: 'cubic-bezier(0.4, 0, 1, 1)' },
      sharp: { value: 'cubic-bezier(0.4, 0, 0.6, 1)' }
    }
  },
  zIndex: {
    mobileStepper: { value: 1000 },
    speedDial: { value: 1050 },
    appBar: { value: 1100 },
    drawer: { value: 1200 },
    modal: { value: 1300 },
    snackbar: { value: 1400 },
    tooltip: { value: 1500 }
  }
};

test('mapTokensToMuiTheme returns correct MUI theme shape', () => {
  const theme = mapTokensToMuiTheme(mockTokens);
  expect(theme.palette.primary.main).toBe('#1976d2');
  expect(theme.typography.fontFamily).toBe('Arial, sans-serif');
  expect(theme.spacing).toBe(10);
  expect(theme.breakpoints.values.md).toBe(900);
  expect(theme.shape.borderRadius).toBe(6);
  expect(theme.transitions.duration.shortest).toBe(100);
  expect(theme.zIndex.tooltip).toBe(1500);
}); 