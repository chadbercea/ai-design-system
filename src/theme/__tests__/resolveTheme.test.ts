import createDDSTheme from '../createMuiTheme';

describe('createDDSTheme', () => {
  it('creates a theme with correct color values', () => {
    const theme = createDDSTheme();

    // Test primary colors
    expect(theme.palette.primary.main).toBe('#2560ff');
    expect(theme.palette.primary.light).toBe('#bbdefb');
    expect(theme.palette.primary.dark).toBe('#0d47a1');

    // Test secondary colors
    expect(theme.palette.secondary.main).toBe('#9c27b0');
    expect(theme.palette.secondary.light).toBe('#e1bee7');
    expect(theme.palette.secondary.dark).toBe('#4a148c');

    // Test error colors
    expect(theme.palette.error.main).toBe('#f44336');
    expect(theme.palette.error.light).toBe('#fecdd2');
    expect(theme.palette.error.dark).toBe('#b71c1c');

    // Test warning colors
    expect(theme.palette.warning.main).toBe('#ff9800');
    expect(theme.palette.warning.light).toBe('#ffe0b2');
    expect(theme.palette.warning.dark).toBe('#e65100');

    // Test info colors
    expect(theme.palette.info.main).toBe('#00bcd4');
    expect(theme.palette.info.light).toBe('#b2ebf2');
    expect(theme.palette.info.dark).toBe('#006064');

    // Test success colors
    expect(theme.palette.success.main).toBe('#4caf50');
    expect(theme.palette.success.light).toBe('#c8e6c9');
    expect(theme.palette.success.dark).toBe('#1b5e20');
  });

  it('creates a theme with correct typography values', () => {
    const theme = createDDSTheme();

    // Test base typography
    expect(theme.typography.fontFamily).toBeDefined();
    expect(theme.typography.fontSize).toBeDefined();
    expect(theme.typography.fontWeightLight).toBe(300);
    expect(theme.typography.fontWeightRegular).toBeDefined();
    expect(theme.typography.fontWeightMedium).toBeDefined();
    expect(theme.typography.fontWeightBold).toBeDefined();

    // Test variant typography
    expect(theme.typography.h1).toBeDefined();
    expect(theme.typography.h2).toBeDefined();
    expect(theme.typography.h3).toBeDefined();
    expect(theme.typography.h4).toBeDefined();
    expect(theme.typography.h5).toBeDefined();
    expect(theme.typography.h6).toBeDefined();
    expect(theme.typography.subtitle1).toBeDefined();
    expect(theme.typography.subtitle2).toBeDefined();
    expect(theme.typography.body1).toBeDefined();
    expect(theme.typography.body2).toBeDefined();
    expect(theme.typography.button).toBeDefined();
    expect(theme.typography.caption).toBeDefined();
    expect(theme.typography.overline).toBeDefined();
  });

  it('creates a theme with correct shape values', () => {
    const theme = createDDSTheme();

    expect(theme.shape.borderRadius).toBe(8); // From borderRadiusMd
  });

  it('creates a theme with correct breakpoint values', () => {
    const theme = createDDSTheme();

    expect(theme.breakpoints.values.xs).toBe(444);
    expect(theme.breakpoints.values.sm).toBe(600);
    expect(theme.breakpoints.values.md).toBe(900);
    expect(theme.breakpoints.values.lg).toBe(1200);
    expect(theme.breakpoints.values.xl).toBe(1536);
  });
}); 