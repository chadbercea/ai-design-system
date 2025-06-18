import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme as muiTheme } from '../build/mui/mui-theme';
import { CssBaseline } from '@mui/material';
import { theme as shadcnTheme } from '../build/shadcn/shadcn-theme';

export const globalTypes = {
  dds: {
    name: 'DDS Foundations',
    description: 'Use DDS Foundations theme',
    defaultValue: false,
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: false, title: 'Library Default' },
        { value: true, title: 'DDS Foundations' },
      ],
      showName: true,
    },
  },
  library: {
    name: 'Library',
    description: 'UI Library',
    defaultValue: 'mui',
    toolbar: {
      icon: 'component',
      items: [
        { value: 'mui', title: 'MUI' },
        { value: 'shadcn', title: 'Shadcn' },
      ],
      showName: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const { dds, library } = context.globals;
    let theme;
    if (dds) {
      // Use DDS Foundations theme for all libraries
      switch (library) {
        case 'shadcn':
          theme = shadcnTheme;
          break;
        default:
          theme = muiTheme;
      }
    } else {
      // Use the library's default theme
      switch (library) {
        case 'shadcn':
          theme = shadcnTheme;
          break;
        default:
          theme = muiTheme;
      }
    }
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    );
  },
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}; 