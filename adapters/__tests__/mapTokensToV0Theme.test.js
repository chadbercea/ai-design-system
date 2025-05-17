import { mapTokensToV0Theme } from '../mapTokensToV0Theme.js';

const mockTokens = {
  ColorBasePrimary: '#007aff',
  ColorBaseSecondary: '#5856d6',
  SizeSpacing0: '0',
  SizeSpacing1: '0.25rem',
  SizeSpacing2: '0.5rem',
  SizeSpacing3: '0.75rem',
  SizeSpacing4: '1rem',
};

test('mapTokensToV0Theme returns correct v0 theme shape', () => {
  const theme = mapTokensToV0Theme(mockTokens);
  expect(theme.colors.primary).toBe('#007aff');
  expect(theme.colors.secondary).toBe('#5856d6');
  expect(theme.spacing[1]).toBe('0.25rem');
  expect(theme.spacing[4]).toBe('1rem');
}); 