import { createTheme } from '@mui/material';
import createDDSTheme from '../createMuiTheme';

describe('createDDSTheme', () => {
  it('creates a valid MUI theme with all required properties', () => {
    const theme = createDDSTheme();

    // Test palette values
    expect(theme.palette.primary.main).toBeDefined();
    expect(theme.palette.secondary.main).toBeDefined();
    expect(theme.palette.error.main).toBeDefined();
    expect(theme.palette.warning.main).toBeDefined();
    expect(theme.palette.info.main).toBeDefined();
    expect(theme.palette.success.main).toBeDefined();
    expect(theme.palette.grey).toBeDefined();
    expect(theme.palette.text).toBeDefined();
    expect(theme.palette.background).toBeDefined();

    // Test typography
    expect(theme.typography.fontFamily).toBeDefined();
    expect(theme.typography.fontSize).toBeDefined();
    expect(theme.typography.fontWeightLight).toBeDefined();
    expect(theme.typography.fontWeightRegular).toBeDefined();
    expect(theme.typography.fontWeightMedium).toBeDefined();
    expect(theme.typography.fontWeightBold).toBeDefined();

    // Test shape
    expect(theme.shape.borderRadius).toBeDefined();

    // Test breakpoints
    expect(theme.breakpoints.values).toBeDefined();
    expect(theme.breakpoints.values.xs).toBeDefined();
    expect(theme.breakpoints.values.sm).toBeDefined();
    expect(theme.breakpoints.values.md).toBeDefined();
    expect(theme.breakpoints.values.lg).toBeDefined();
    expect(theme.breakpoints.values.xl).toBeDefined();

    // Test spacing
    expect(theme.spacing).toBeDefined();

    // Test zIndex
    expect(theme.zIndex).toBeDefined();
    expect(theme.zIndex.mobileStepper).toBeDefined();
    expect(theme.zIndex.fab).toBeDefined();
    expect(theme.zIndex.speedDial).toBeDefined();
    expect(theme.zIndex.appBar).toBeDefined();
    expect(theme.zIndex.drawer).toBeDefined();
    expect(theme.zIndex.modal).toBeDefined();
    expect(theme.zIndex.snackbar).toBeDefined();
    expect(theme.zIndex.tooltip).toBeDefined();

    // Test transitions
    expect(theme.transitions).toBeDefined();
    expect(theme.transitions.duration).toBeDefined();
    expect(theme.transitions.easing).toBeDefined();
  });

  it('supports dark mode', () => {
    const theme = createDDSTheme('dark');

    expect(theme.palette.mode).toBe('dark');
    expect(theme.palette.background.default).toBe('#121212');
    expect(theme.palette.background.paper).toBe('#1e1e1e');
    expect(theme.palette.text.primary).toBe('rgba(255, 255, 255, 0.87)');
    expect(theme.palette.text.secondary).toBe('rgba(255, 255, 255, 0.6)');
    expect(theme.palette.text.disabled).toBe('rgba(255, 255, 255, 0.38)');
  });
}); 