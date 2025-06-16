import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  "typography": {
    "fontFamily": "\"Roboto\", \"Helvetica\", \"Arial\", sans-serif",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,
    "fontWeightBold": 700,
    "h1": {
      "fontFamily": "",
      "fontWeight": 300,
      "fontSize": "",
      "lineHeight": 1.167,
      "letterSpacing": "-0.01562em"
    },
    "h2": {
      "fontFamily": "",
      "fontWeight": 300,
      "fontSize": "",
      "lineHeight": 1.2,
      "letterSpacing": "-0.00833em"
    },
    "h3": {
      "fontFamily": "",
      "fontWeight": 400,
      "fontSize": "",
      "lineHeight": 1.167,
      "letterSpacing": "0em"
    },
    "h4": {
      "fontFamily": "",
      "fontWeight": 400,
      "fontSize": "",
      "lineHeight": 1.235,
      "letterSpacing": "0.00735em"
    },
    "h5": {
      "fontFamily": "",
      "fontWeight": 400,
      "fontSize": "",
      "lineHeight": 1.334,
      "letterSpacing": "0em"
    },
    "h6": {
      "fontFamily": "",
      "fontWeight": 500,
      "fontSize": "",
      "lineHeight": 1.6,
      "letterSpacing": "0.0075em"
    },
    "subtitle1": {
      "fontFamily": "",
      "fontWeight": 400,
      "fontSize": "",
      "lineHeight": 1.75,
      "letterSpacing": "0.00938em"
    },
    "subtitle2": {
      "fontFamily": "",
      "fontWeight": 500,
      "fontSize": "",
      "lineHeight": 1.57,
      "letterSpacing": "0.00714em"
    },
    "body1": {
      "fontFamily": "",
      "fontWeight": 400,
      "fontSize": "",
      "lineHeight": 1.5,
      "letterSpacing": "0.00938em"
    },
    "body2": {
      "fontFamily": "",
      "fontWeight": 400,
      "fontSize": "",
      "lineHeight": 1.43,
      "letterSpacing": "0.01071em"
    },
    "button": {
      "fontFamily": "",
      "fontWeight": 500,
      "fontSize": "",
      "lineHeight": 1.75,
      "letterSpacing": "0.02857em",
      "textTransform": "uppercase"
    },
    "caption": {
      "fontFamily": "",
      "fontWeight": 400,
      "fontSize": "",
      "lineHeight": 1.66,
      "letterSpacing": "0.03333em"
    },
    "overline": {
      "fontFamily": "",
      "fontWeight": 400,
      "fontSize": "",
      "lineHeight": 2.66,
      "letterSpacing": "0.08333em",
      "textTransform": "uppercase"
    }
  },
  "palette": {
    "mode": "light",
    "primary": {
      "main": "",
      "light": "",
      "dark": "",
      "contrastText": "#fff"
    },
    "secondary": {
      "main": "",
      "light": "",
      "dark": "",
      "contrastText": "#fff"
    },
    "error": {
      "main": "",
      "light": "",
      "dark": "",
      "contrastText": "#fff"
    },
    "warning": {
      "main": "",
      "light": "",
      "dark": "",
      "contrastText": "#fff"
    },
    "info": {
      "main": "",
      "light": "",
      "dark": "",
      "contrastText": "#fff"
    },
    "success": {
      "main": "",
      "light": "",
      "dark": "",
      "contrastText": "#fff"
    },
    "grey": {
      "50": "#fafafa",
      "100": "#f5f5f5",
      "200": "#eeeeee",
      "300": "#e0e0e0",
      "400": "#bdbdbd",
      "500": "#9e9e9e",
      "600": "#757575",
      "700": "#616161",
      "800": "#424242",
      "900": "#212121"
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
    "borderRadius": 200
  },
  "spacing": 4,
  "breakpoints": {
    "values": {
      "xs": 0,
      "sm": 600,
      "md": 900,
      "lg": 1200,
      "xl": 1536
    }
  },
  "transitions": {
    "duration": {
      "shortest": 150,
      "shorter": 200,
      "short": 250,
      "standard": 300,
      "complex": 375,
      "enteringScreen": 225,
      "leavingScreen": 195
    },
    "easing": {
      "easeInOut": "cubic-bezier(0.4, 0, 0.2, 1)",
      "easeOut": "cubic-bezier(0.0, 0, 0.2, 1)",
      "easeIn": "cubic-bezier(0.4, 0, 1, 1)",
      "sharp": "cubic-bezier(0.4, 0, 0.6, 1)"
    }
  },
  "zIndex": {
    "mobileStepper": 1000,
    "speedDial": 1050,
    "appBar": 1100,
    "drawer": 1200,
    "modal": 1300,
    "snackbar": 1400,
    "tooltip": 1500
  }
});