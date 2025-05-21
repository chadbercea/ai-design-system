import { createTheme } from '@mui/material';
import createDDSTheme from './createTheme';

// Define theme keys as a const to ensure type safety
export const THEME_KEYS = {
  MUI_DEFAULT: 'MUI Default',
  DDS_FOUNDATIONS: 'DDS Foundations'
} as const;

// Create a type from the theme keys
export type ThemeKey = typeof THEME_KEYS[keyof typeof THEME_KEYS];

// Export the themes map with consistent keys
export function getTheme(key: ThemeKey) {
  if (key === THEME_KEYS.DDS_FOUNDATIONS) {
    console.log('Using DDS Foundations theme');
    return createDDSTheme();
  }
  return createTheme({
    palette: {
      tertiary: {
        main: '#00bcd4', // Cyan
        light: '#b2ebf2',
        dark: '#00838f',
        contrastText: '#fff',
      },
    },
  });
}

// Type guard to check if a string is a valid theme key
export const isValidThemeKey = (key: string): key is ThemeKey => {
  return Object.values(THEME_KEYS).includes(key as ThemeKey);
}; 