import { createTheme } from '@mui/material/styles';
import { theme as themeConfig } from '../../build/mui/theme.js';

// The build/mui/theme.js exports a theme object, but we need to remove its createTheme import
// So we extract just the config and create the theme here
const config = typeof themeConfig === 'object' && 'palette' in themeConfig 
  ? themeConfig 
  : {};

export const muiTheme = createTheme(config);

