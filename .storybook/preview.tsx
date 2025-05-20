import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { getTheme, THEME_KEYS, isValidThemeKey } from '../src/theme/themeToggle';
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
      const themeKey = context.globals.theme;
      const validThemeKey = isValidThemeKey(themeKey) ? themeKey : THEME_KEYS.MUI_DEFAULT;
      const theme = getTheme(validThemeKey);
      // Log for live verification
      if (theme.palette && theme.palette.primary) {
        // eslint-disable-next-line no-console
        console.log('STORYBOOK THEME primary.main:', theme.palette.primary.main);
      }
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