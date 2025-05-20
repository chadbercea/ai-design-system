import { ThemeOptions } from '@mui/material';

export function mapTokensToMuiTheme(tokens: any): ThemeOptions {
  console.log('Received tokens:', tokens);
  console.log('Attempting to access tokens:', {
    primary: tokens["ColorBlue500"],
    background: tokens["ColorGrey50"],
    text: tokens["ColorGrey900"]
  });

  const theme = {
    palette: {
      primary: {
        main: tokens["ColorBlue500"] || "#2196f3"
      },
      background: {
        default: tokens["ColorGrey50"] || "#f5f5f5",
        paper: tokens["ColorGrey100"] || "#ffffff"
      },
      text: {
        primary: tokens["ColorGrey900"] || "#000000",
        secondary: tokens["ColorGrey700"] || "#666666"
      }
    },
    typography: {
      fontFamily: tokens["TypographyFamilyBase"] || "'Roboto', sans-serif",
      fontSize: parseInt(tokens["TypographySizeBase"]) || 14,
      fontWeightRegular: parseInt(tokens["TypographyWeightRegular"]) || 400,
      fontWeightBold: parseInt(tokens["TypographyWeightBold"]) || 700
    },
    shape: {
      borderRadius: parseInt(tokens["BorderRadiusMd"]) || 4
    },
    spacing: (factor: number) => {
      const base = parseInt(tokens["SpacingBase"]) || 8
      return base * factor
    },
    breakpoints: {
      values: {
        xs: parseInt(tokens["BreakpointsXs"]) || 0,
        sm: parseInt(tokens["BreakpointsSm"]) || 600,
        md: parseInt(tokens["BreakpointsMd"]) || 900,
        lg: parseInt(tokens["BreakpointsLg"]) || 1200,
        xl: parseInt(tokens["BreakpointsXl"]) || 1536
      }
    }
  };

  console.log('Generated theme:', theme);
  return theme;
} 