import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  "typography": {
    "fontFamily": "Inter",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "h1": {
      "fontFamily": "Inter",
      "fontWeight": 300,
      "fontSize": 40,
      "lineHeight": 1.167,
      "letterSpacing": "-0.01562em"
    },
    "h2": {
      "fontFamily": "Inter",
      "fontWeight": 300,
      "fontSize": 32,
      "lineHeight": 1.2,
      "letterSpacing": "-0.00833em"
    },
    "h3": {
      "fontFamily": "Inter",
      "fontWeight": 400,
      "fontSize": 24,
      "lineHeight": 1.167,
      "letterSpacing": "0em"
    },
    "h4": {
      "fontFamily": "Inter",
      "fontWeight": 400,
      "fontSize": 21,
      "lineHeight": 1.235,
      "letterSpacing": "0.00735em"
    },
    "h5": {
      "fontFamily": "Inter",
      "fontWeight": 400,
      "fontSize": 18,
      "lineHeight": 1.334,
      "letterSpacing": "0em"
    },
    "h6": {
      "fontFamily": "Inter",
      "fontWeight": 500,
      "fontSize": 16,
      "lineHeight": 1.6,
      "letterSpacing": "0.0075em"
    }
  },
  "palette": {
    "mode": "light",
    "primary": {
      "main": "#2560ff",
      "light": "#7ba4f4",
      "dark": "#003db5",
      "contrastText": "#fff"
    },
    "secondary": {
      "main": "#7d2eff",
      "light": "#ae82ff",
      "dark": "#5700bb",
      "contrastText": "#fff"
    },
    "error": {
      "main": "#ff5757",
      "light": "#ffa8a8",
      "dark": "#e40c2c",
      "contrastText": "#fff"
    },
    "warning": {
      "main": "#ffcc48",
      "light": "#ffe8ad",
      "dark": "#eb9c00",
      "contrastText": "#fff"
    },
    "info": {
      "main": "#2fd0d2",
      "light": "#a0e5e8",
      "dark": "#2c9ea0",
      "contrastText": "#fff"
    },
    "success": {
      "main": "#5ace8c",
      "light": "#a9e5bd",
      "dark": "#2d9568",
      "contrastText": "#fff"
    },
    "grey": {
      "50": "#f9fafb",
      "100": "#e7eaef",
      "200": "#c8cfda",
      "300": "#a9b4c6",
      "400": "#8b99b2",
      "500": "#6c7e9d",
      "600": "#566581",
      "700": "#434c5f",
      "800": "#2c333f",
      "900": "#1e2129",
      "950": "#0f121b"
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.6)",
      "disabled": "rgba(0, 0, 0, 0.38)"
    },
    "divider": "rgba(0, 0, 0, 0.12)",
    "background": {
      "default": "#fff",
      "paper": "#fff"
    },
    "common": {
      "black": "#000000",
      "white": "#ffffff"
    }
  },
  "shape": {
    "borderRadius": 8
  },
  "spacing": 4
});