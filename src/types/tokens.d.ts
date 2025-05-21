declare namespace DesignTokens {
  interface ColorToken {
    $value: string;
    $type: 'color';
    $description: string;
  }

  interface DimensionToken {
    $value: string;
    $type: 'dimension';
    $description: string;
  }

  interface TypographyToken {
    $value: string;
    $type: 'typography';
    $description: string;
  }

  interface ColorTokens {
    base: {
      primary: ColorToken;
      secondary: ColorToken;
      neutral: {
        '100': ColorToken;
        '200': ColorToken;
        '300': ColorToken;
        '400': ColorToken;
        '500': ColorToken;
        '600': ColorToken;
        '700': ColorToken;
        '800': ColorToken;
        '900': ColorToken;
      };
    };
  }

  interface TypographyTokens {
    base: {
      family: {
        base: string;
        heading: string;
      };
      size: {
        base: string;
      };
      weight: {
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
      };
    };
  }

  interface SpacingTokens {
    base: {
      '4': DimensionToken;
    };
  }

  interface Tokens {
    color: ColorTokens;
    typography: TypographyTokens;
    spacing: SpacingTokens;
  }
}

declare module '../../build/tokens.mjs' {
  const tokens: { [key: string]: string };
  export default tokens;

  // Font families
  export const fontFamiliesPoppins: string;
  export const fontFamiliesInter: string;
  export const fontFamiliesRobotoMono: string;
  export const fontFamiliesRoboto: string;

  // Font sizes
  export const fontSizes10: string;
  export const fontSizes12: string;
  export const fontSizes14: string;
  export const fontSizes16: string;
  export const fontSizes18: string;
  export const fontSizes21: string;
  export const fontSizes24: string;
  export const fontSizes32: string;
  export const fontSizes40: string;
  export const fontSizes48: string;

  // Font weights
  export const fontWeightsRegular: string;
  export const fontWeightsSemibold: string;
  export const fontWeightsBold: string;
  export const fontWeightsBlack: string;

  // Line heights
  export const lineHeights100: number;

  // Letter spacing
  export const letterSpacingsDefault: string;
  export const letterSpacingsWide: string;
  export const letterSpacingsTight: string;
}

declare module '*/tokens.json' {
  const tokens: DesignTokens.Tokens;
  export default tokens;
}

declare module '*/tokens.js' {
  const tokens: DesignTokens.Tokens;
  export default tokens;
} 