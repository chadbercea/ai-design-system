import { Theme, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}

declare function createDDSTheme(mode?: 'light' | 'dark'): Theme;
export default createDDSTheme; 