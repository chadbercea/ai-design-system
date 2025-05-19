import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { themes, THEME_KEYS, isValidThemeKey } from '../src/theme/themeToggle';
import React from 'react';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: THEME_KEYS.MUI_DEFAULT,
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: THEME_KEYS.MUI_DEFAULT, title: THEME_KEYS.MUI_DEFAULT },
          { value: THEME_KEYS.DDS_FOUNDATIONS, title: THEME_KEYS.DDS_FOUNDATIONS },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      // Get the selected theme key from context
      const themeKey = context.globals.theme;
      
      // Validate the theme key and fallback to default if invalid
      const validThemeKey = isValidThemeKey(themeKey) ? themeKey : THEME_KEYS.MUI_DEFAULT;
      
      // Get the theme object
      const theme = themes[validThemeKey];
      
      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview; 