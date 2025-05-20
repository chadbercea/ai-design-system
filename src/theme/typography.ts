import { ThemeOptions } from '@mui/material/styles';
import * as tokens from '../../build/tokens.mjs';

// Use a full font stack for reliability
const fallbackFontStack = '"Roboto", "Helvetica", "Arial", sans-serif';

// Debug logging
console.log('Typography tokens available:', {
  fontFamily: tokens.fontFamiliesRoboto,
  fontSize: tokens.fontSizes14,
  fontWeight: tokens.fontWeightsRegular,
  lineHeight: tokens.lineHeights100,
  letterSpacing: tokens.letterSpacingsDefault,
});

// Types for our mapping system
type TypographyTokenMapping = {
  fontSize: string;
  fontWeight: string;
  lineHeight: number;
  letterSpacing: string;
};

type TypographyVariant = keyof ThemeOptions['typography'];

// Registry of MUI typography variants to our token mappings
const typographyMappings: Record<TypographyVariant, TypographyTokenMapping> = {
  h1: {
    fontSize: tokens.fontSizes48,
    fontWeight: tokens.fontWeightsBold,
    lineHeight: tokens.lineHeights100,
    letterSpacing: tokens.letterSpacingsDefault,
  },
  h2: {
    fontSize: tokens.fontSizes40,
    fontWeight: tokens.fontWeightsBold,
    lineHeight: tokens.lineHeights100,
    letterSpacing: tokens.letterSpacingsDefault,
  },
  h3: {
    fontSize: tokens.fontSizes32,
    fontWeight: tokens.fontWeightsBold,
    lineHeight: tokens.lineHeights100,
    letterSpacing: tokens.letterSpacingsDefault,
  },
  h4: {
    fontSize: tokens.fontSizes24,
    fontWeight: tokens.fontWeightsSemibold,
    lineHeight: tokens.lineHeights100,
    letterSpacing: tokens.letterSpacingsDefault,
  },
  h5: {
    fontSize: tokens.fontSizes21,
    fontWeight: tokens.fontWeightsSemibold,
    lineHeight: tokens.lineHeights100,
    letterSpacing: tokens.letterSpacingsDefault,
  },
  h6: {
    fontSize: tokens.fontSizes18,
    fontWeight: tokens.fontWeightsSemibold,
    lineHeight: tokens.lineHeights100,
    letterSpacing: tokens.letterSpacingsDefault,
  },
  body1: {
    fontSize: tokens.fontSizes16,
    fontWeight: tokens.fontWeightsRegular,
    lineHeight: tokens.lineHeights100,
    letterSpacing: tokens.letterSpacingsDefault,
  },
  body2: {
    fontSize: tokens.fontSizes14,
    fontWeight: tokens.fontWeightsRegular,
    lineHeight: tokens.lineHeights100,
    letterSpacing: tokens.letterSpacingsDefault,
  },
  caption: {
    fontSize: tokens.fontSizes12,
    fontWeight: tokens.fontWeightsRegular,
    lineHeight: tokens.lineHeights100,
    letterSpacing: tokens.letterSpacingsDefault,
  },
} as const;

// Token parsing utilities
const parseFontSize = (size: string): number => {
  console.log('Parsing font size:', size);
  const parsed = parseInt(size.replace('px', ''), 10);
  if (isNaN(parsed)) {
    console.warn(`Invalid font size token: ${size}, falling back to 16px`);
    return 16;
  }
  return parsed;
};

const parseFontWeight = (weight: string): number => {
  console.log('Parsing font weight:', weight);
  const parsed = parseInt(weight, 10);
  if (isNaN(parsed)) {
    console.warn(`Invalid font weight token: ${weight}, falling back to 400`);
    return 400;
  }
  return parsed;
};

const parseLineHeight = (height: number): number | string => {
  console.log('Parsing line height:', height);
  if (typeof height !== 'number' || isNaN(height)) {
    console.warn(`Invalid line height token: ${height}, falling back to 1`);
    return 1;
  }
  return height;
};

const parseLetterSpacing = (spacing: string): string => {
  console.log('Parsing letter spacing:', spacing);
  if (spacing.endsWith('%')) {
    const value = parseFloat(spacing) / 100;
    if (isNaN(value)) {
      console.warn(`Invalid letter spacing token: ${spacing}, falling back to 0`);
      return '0';
    }
    return `${value}em`;
  }
  return spacing;
};

/**
 * Creates a MUI typography configuration from our design tokens
 * @returns A valid MUI ThemeOptions.typography object
 */
export const createTypographyFromTokens = (): ThemeOptions['typography'] => {
  console.log('Creating typography from tokens...');
  
  // Always use the full font stack for fontFamily
  const typography: ThemeOptions['typography'] = {
    fontFamily: fallbackFontStack,
    fontSize: parseFontSize(tokens.fontSizes14),
    fontWeightLight: 300,
    fontWeightRegular: parseFontWeight(tokens.fontWeightsRegular),
    fontWeightMedium: parseFontWeight(tokens.fontWeightsSemibold),
    fontWeightBold: parseFontWeight(tokens.fontWeightsBold),
  };

  console.log('Base typography config:', typography);

  // Map each variant using our registry
  Object.entries(typographyMappings).forEach(([variant, mapping]) => {
    try {
      const variantKey = variant as TypographyVariant;
      const mappingValue = mapping as TypographyTokenMapping;
      
      typography[variantKey] = {
        fontSize: parseFontSize(mappingValue.fontSize),
        fontWeight: parseFontWeight(mappingValue.fontWeight),
        lineHeight: parseLineHeight(mappingValue.lineHeight),
        letterSpacing: parseLetterSpacing(mappingValue.letterSpacing),
        fontFamily: fallbackFontStack,
      };
    } catch (error) {
      console.error(`Failed to map typography variant ${variant}:`, error);
      // Skip this variant if mapping fails
    }
  });

  console.log('Final typography config:', typography);
  return typography;
}; 