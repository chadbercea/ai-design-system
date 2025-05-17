/**
 * Map Style Dictionary tokens to a v0 theme object.
 * @param {object} tokens - The output from Style Dictionary
 * @returns {object} - v0 theme object
 */
export function mapTokensToV0Theme(tokens) {
  return {
    colors: {
      primary: tokens.ColorBasePrimary || '#007aff',
      secondary: tokens.ColorBaseSecondary || '#5856d6',
    },
    spacing: {
      0: tokens.SizeSpacing0 || '0',
      1: tokens.SizeSpacing1 || '0.25rem',
      2: tokens.SizeSpacing2 || '0.5rem',
      3: tokens.SizeSpacing3 || '0.75rem',
      4: tokens.SizeSpacing4 || '1rem',
      // ...add more as needed
    },
  };
} 