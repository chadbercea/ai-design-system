import { mapTokensToMuiTheme } from '../mapTokensToMuiTheme.js';

const mockTokens = {
  ColorBasePrimary: '#1976d2',
  ColorBaseSecondary: '#42a5f5',
  ColorBaseNeutral700: '#1565c0',
  ColorBaseNeutral100: '#fff',
  TypographyFamilyBase: 'Arial, sans-serif',
  TypographySizeBase: '16',
  TypographyWeightNormal: '200',
  TypographyWeightMedium: '400',
  TypographyWeightSemibold: '500',
  TypographyWeightBold: '700',
  SizeSpacing4: '10',
};

test('mapTokensToMuiTheme returns correct MUI theme shape', () => {
  const theme = mapTokensToMuiTheme(mockTokens);
  expect(theme.palette.primary.main).toBe('#1976d2');
  expect(theme.typography.fontFamily).toBe('Arial, sans-serif');
  expect(theme.spacing).toBe(10);
  expect(theme.breakpoints.values.md).toBe(900);
  expect(theme.shape.borderRadius).toBe(4);
  expect(theme.transitions.duration.shortest).toBe(150);
  expect(theme.zIndex.tooltip).toBe(1500);
}); 