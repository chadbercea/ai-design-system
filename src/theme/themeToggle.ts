import { createTheme } from '@mui/material';
import createDDSTheme from './createMuiTheme';

// Define theme keys as a const to ensure type safety
export const THEME_KEYS = {
  MUI_DEFAULT: 'MUI Default',
  DDS_FOUNDATIONS: 'DDS Foundations'
} as const;

// Theme change event name
export const THEME_MODE_CHANGE_EVENT = 'theme-mode-change';

// Create a type from the theme keys
export type ThemeKey = typeof THEME_KEYS[keyof typeof THEME_KEYS];

// Event dispatcher for theme mode changes
export const dispatchThemeModeChange = (mode: 'light' | 'dark') => {
  const event = new CustomEvent(THEME_MODE_CHANGE_EVENT, { detail: { mode } });
  window.dispatchEvent(event);
  // Force Masonry to recalculate
  window.dispatchEvent(new Event('resize'));
};

// Export the themes map with consistent keys
export function getTheme(key: ThemeKey, mode: 'light' | 'dark' = 'light') {
  if (key === THEME_KEYS.DDS_FOUNDATIONS) {
    console.log('Using DDS Foundations theme');
    return createDDSTheme(mode);
  }
  // Return a pure, untouched MUI default theme
  return createTheme({ palette: { mode } });
}

// Type guard to check if a string is a valid theme key
export const isValidThemeKey = (key: string): key is ThemeKey => {
  return Object.values(THEME_KEYS).includes(key as ThemeKey);
}; 