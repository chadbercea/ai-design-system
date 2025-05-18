import { mapTokensToTailwindConfig } from '../mapTokensToTailwindConfig.js';

const mockTokens = {
  ColorBasePrimary: '#007aff',
  ColorBaseSecondary: '#5856d6',
  SizeSpacing0: '0',
  SizeSpacing1: '0.25rem',
  SizeSpacing2: '0.5rem',
  SizeSpacing3: '0.75rem',
  SizeSpacing4: '1rem',
};

test('mapTokensToTailwindConfig returns correct Tailwind config shape', () => {
  const config = mapTokensToTailwindConfig(mockTokens);
  expect(config.theme.colors.primary).toBe('#007aff');
  expect(config.theme.colors.secondary).toBe('#5856d6');
  expect(config.theme.spacing[1]).toBe('0.25rem');
  expect(config.theme.spacing[4]).toBe('1rem');
}); 