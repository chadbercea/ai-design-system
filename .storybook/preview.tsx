import type { Preview } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import React from 'react';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import { getTheme, THEME_KEYS } from '../src/theme/themeToggle';

// Prebuild and cache both themes
const MUI_DEFAULT_LIGHT = getTheme(THEME_KEYS.MUI_DEFAULT, 'light');
const MUI_DEFAULT_DARK = getTheme(THEME_KEYS.MUI_DEFAULT, 'dark');
const DDS_FOUNDATIONS_LIGHT = getTheme(THEME_KEYS.DDS_FOUNDATIONS, 'light');
const DDS_FOUNDATIONS_DARK = getTheme(THEME_KEYS.DDS_FOUNDATIONS, 'dark');

const preview: Preview = {
  globalTypes: {
    themeSelect: {
      name: 'Theme',
      description: 'Select theme',
      defaultValue: THEME_KEYS.MUI_DEFAULT,
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: THEME_KEYS.MUI_DEFAULT, title: 'MUI Default' },
          { value: THEME_KEYS.DDS_FOUNDATIONS, title: 'DDS Foundations' },
          { value: 'DDS Next Gen', title: 'DDS Next Gen (Coming Soon)', disabled: true }
        ],
        showName: true,
      },
    },
    modeSelect: {
      name: 'Mode',
      description: 'Select mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light Mode' },
          { value: 'dark', title: 'Dark Mode' }
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      let theme;
      if (context.globals.themeSelect === THEME_KEYS.MUI_DEFAULT) {
        theme = context.globals.modeSelect === 'dark' ? MUI_DEFAULT_DARK : MUI_DEFAULT_LIGHT;
      } else if (context.globals.themeSelect === THEME_KEYS.DDS_FOUNDATIONS) {
        theme = context.globals.modeSelect === 'dark' ? DDS_FOUNDATIONS_DARK : DDS_FOUNDATIONS_LIGHT;
      } else {
        theme = MUI_DEFAULT_LIGHT;
      }
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Story modeSelect={context.globals.modeSelect} />
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    backgrounds: { disable: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview; 