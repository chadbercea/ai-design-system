// MUI theme configuration object
// Import and use with: import { createTheme } from '@mui/material/styles'; createTheme(themeConfig);

export const theme = {
  "palette": {
    "mode": "light",
    "primary": {
      "main": "#2560ff",
      "light": "#7ba4f4",
      "dark": "#0843be",
      "contrastText": "#ffffff"
    },
    "secondary": {
      "main": "#6c7e9d",
      "light": "#a9b4c6",
      "dark": "#3c4a5d",
      "contrastText": "#ffffff"
    },
    "error": {
      "main": "#d32f2f",
      "light": "#e57373",
      "dark": "#c62828",
      "contrastText": "#ffffff"
    },
    "warning": {
      "main": "#ed6c02",
      "light": "#ff9800",
      "dark": "#e65100",
      "contrastText": "#ffffff"
    },
    "info": {
      "main": "#0288d1",
      "light": "#03a9f4",
      "dark": "#01579b",
      "contrastText": "#ffffff"
    },
    "success": {
      "main": "#2e7d32",
      "light": "#66bb6a",
      "dark": "#1b5e20",
      "contrastText": "#ffffff"
    },
    "grey": {
      "50": "#f9fafb",
      "100": "#e7eaef",
      "200": "#c8cfda",
      "300": "#a9b4c6",
      "400": "#8b99b2",
      "500": "#6c7e9d",
      "600": "#566581",
      "700": "#3c4a5d",
      "800": "#2c3747",
      "900": "#1c2532"
    },
    "text": {
      "primary": "rgba(0, 0, 0, 0.87)",
      "secondary": "rgba(0, 0, 0, 0.6)",
      "disabled": "rgba(0, 0, 0, 0.38)"
    },
    "divider": "rgba(0, 0, 0, 0.12)",
    "background": {
      "default": "#ffffff",
      "paper": "#ffffff"
    },
    "common": {
      "black": "#000000",
      "white": "#ffffff"
    }
  },
  "typography": {
    "fontFamily": "\"Inter\", \"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "h1": {
      "fontSize": "48px",
      "fontWeight": 700,
      "lineHeight": 1.2
    },
    "h2": {
      "fontSize": "40px",
      "fontWeight": 700,
      "lineHeight": 1.2
    },
    "h3": {
      "fontSize": "32px",
      "fontWeight": 600,
      "lineHeight": 1.3
    },
    "h4": {
      "fontSize": "24px",
      "fontWeight": 600,
      "lineHeight": 1.4
    },
    "h5": {
      "fontSize": "21px",
      "fontWeight": 600,
      "lineHeight": 1.4
    },
    "h6": {
      "fontSize": "18px",
      "fontWeight": 600,
      "lineHeight": 1.4
    },
    "body1": {
      "fontSize": "16px",
      "fontWeight": 400,
      "lineHeight": 1.5
    },
    "body2": {
      "fontSize": "14px",
      "fontWeight": 400,
      "lineHeight": 1.43
    },
    "button": {
      "fontSize": "14px",
      "fontWeight": 500,
      "lineHeight": 1.75,
      "textTransform": "none"
    },
    "caption": {
      "fontSize": "12px",
      "fontWeight": 400,
      "lineHeight": 1.66
    },
    "overline": {
      "fontSize": "10px",
      "fontWeight": 700,
      "lineHeight": 2.66,
      "textTransform": "uppercase"
    }
  },
  "spacing": 8,
  "shape": {
    "borderRadius": 4
  }
};

export default theme;
