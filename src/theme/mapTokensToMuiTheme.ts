import { ThemeOptions } from '@mui/material';

export function mapTokensToMuiTheme(tokens: any): ThemeOptions {
  return {
    palette: {
      primary: {
        main: tokens["color.blue.500"]?.$value || "#2196f3"
      },
      background: {
        default: tokens["color.grey.50"]?.$value || "#f5f5f5",
        paper: tokens["color.grey.100"]?.$value || "#ffffff"
      },
      text: {
        primary: tokens["color.grey.900"]?.$value || "#000000",
        secondary: tokens["color.grey.700"]?.$value || "#666666"
      }
    },
    typography: {
      fontFamily: tokens["typography.family.base"]?.$value || "'Roboto', sans-serif",
      fontSize: parseInt(tokens["typography.size.base"]?.$value) || 14,
      fontWeightRegular: parseInt(tokens["typography.weight.regular"]?.$value) || 400,
      fontWeightBold: parseInt(tokens["typography.weight.bold"]?.$value) || 700
    },
    shape: {
      borderRadius: parseInt(tokens["borderRadius.md"]?.$value) || 4
    },
    spacing: (factor: number) => {
      const base = parseInt(tokens["spacing.base"]?.$value) || 8
      return base * factor
    },
    breakpoints: {
      values: {
        xs: parseInt(tokens["breakpoints.xs"]?.$value) || 0,
        sm: parseInt(tokens["breakpoints.sm"]?.$value) || 600,
        md: parseInt(tokens["breakpoints.md"]?.$value) || 900,
        lg: parseInt(tokens["breakpoints.lg"]?.$value) || 1200,
        xl: parseInt(tokens["breakpoints.xl"]?.$value) || 1536
      }
    }
  }
} 