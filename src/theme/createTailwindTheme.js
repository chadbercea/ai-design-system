import * as tokens from '../../build/tokens.mjs';

// Scaffold: Map tokens to a Tailwind-compatible theme structure
const createTailwindTheme = () => {
  return {
    theme: {
      colors: {
        primary: tokens.colorBlue500,
        secondary: tokens.colorPurple500,
        error: tokens.colorRed500,
        warning: tokens.colorOrange500,
        info: tokens.colorCyan500,
        success: tokens.colorGreen500,
        gray: {
          50: tokens.colorGrey50,
          100: tokens.colorGrey100,
          200: tokens.colorGrey200,
          300: tokens.colorGrey300,
          400: tokens.colorGrey400,
          500: tokens.colorGrey500,
          600: tokens.colorGrey600,
          700: tokens.colorGrey700,
          800: tokens.colorGrey800,
          900: tokens.colorGrey900,
        },
        background: tokens.colorBackground,
        surface: tokens.colorSurface,
      },
      spacing: {
        xs: tokens.spacingXs,
        sm: tokens.spacingSm,
        md: tokens.spacingMd,
        lg: tokens.spacingLg,
        xl: tokens.spacingXl,
      },
      borderRadius: {
        sm: tokens.borderRadiusSm,
        md: tokens.borderRadiusMd,
        lg: tokens.borderRadiusLg,
      },
      fontFamily: {
        sans: tokens.fontFamilySans,
        mono: tokens.fontFamilyMono,
      },
      fontSize: {
        xs: tokens.fontSizeXs,
        sm: tokens.fontSizeSm,
        md: tokens.fontSizeMd,
        lg: tokens.fontSizeLg,
        xl: tokens.fontSizeXl,
      },
      lineHeight: {
        normal: tokens.lineHeightBase,
        relaxed: tokens.lineHeightRelaxed,
        tight: tokens.lineHeightTight,
      },
    },
  };
};

export default createTailwindTheme; 