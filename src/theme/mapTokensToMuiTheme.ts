import { ThemeOptions } from '@mui/material';

export function mapTokensToMuiTheme(tokens: any): ThemeOptions {
  return {
    palette: {
      primary: {
        main: tokens["color.blue.500"] || "#2196f3"
      },
      background: {
        default: tokens["color.grey.50"] || "#f5f5f5",
        paper: tokens["color.grey.100"] || "#ffffff"
      },
      text: {
        primary: tokens["color.grey.900"] || "#000000",
        secondary: tokens["color.grey.700"] || "#666666"
      }
    },
    typography: {
      fontFamily: tokens["typography.family.base"] || "'Roboto', sans-serif",
      fontSize: parseInt(tokens["typography.size.base"]) || 14,
      fontWeightRegular: parseInt(tokens["typography.weight.regular"]) || 400,
      fontWeightBold: parseInt(tokens["typography.weight.bold"]) || 700
    },
    shape: {
      borderRadius: parseInt(tokens["borderRadius.md"]) || 4
    },
    spacing: (factor: number) => {
      const base = parseInt(tokens["spacing.base"]) || 8
      return base * factor
    },
    breakpoints: {
      values: {
        xs: parseInt(tokens["breakpoints.xs"]) || 0,
        sm: parseInt(tokens["breakpoints.sm"]) || 600,
        md: parseInt(tokens["breakpoints.md"]) || 900,
        lg: parseInt(tokens["breakpoints.lg"]) || 1200,
        xl: parseInt(tokens["breakpoints.xl"]) || 1536
      }
    }
  }
} 