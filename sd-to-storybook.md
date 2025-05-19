# Theme Toggle Implementation Plan for Storybook

## Overview
This document outlines the steps to implement theme toggling in Storybook, allowing comparison between MUI's default theme and DDS Foundations theme.

## Implementation Steps

### 1. Theme Setup
```typescript
// src/theme/themeToggle.ts
import { createTheme } from '@mui/material';
import { mapTokensToMuiTheme } from './mapTokensToMuiTheme';
import tokens from '../build/tokens.js';

export const themes = {
  'MUI Default': createTheme(),
  'DDS Foundations': createTheme(mapTokensToMuiTheme(tokens))
};

export type ThemeKey = keyof typeof themes;
```

### 2. Storybook Configuration
```typescript
// .storybook/preview.ts
import { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material';
import { themes } from '../src/theme/themeToggle';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'MUI Default',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'MUI Default', title: 'MUI Default' },
          { value: 'DDS Foundations', title: 'DDS Foundations' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = themes[context.globals.theme];
      return (
        <ThemeProvider theme={theme}>
          <Story />
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
```

### 3. Theme Stories
```typescript
// stories/MUI/Theme.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Button } from '@mui/material';

const meta: Meta = {
  title: 'MUI/Theme Comparison',
  component: Box,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeShowcase: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" gutterBottom>
        Typography
      </Typography>
      <Typography variant="h2" gutterBottom>
        Heading 2
      </Typography>
      <Typography variant="body1" gutterBottom>
        Body text with primary color
      </Typography>
      <Button variant="contained" sx={{ mr: 2 }}>
        Contained Button
      </Button>
      <Button variant="outlined" sx={{ mr: 2 }}>
        Outlined Button
      </Button>
      <Button variant="text">
        Text Button
      </Button>
    </Box>
  ),
};
```

## Testing the Implementation

1. Start Storybook:
```bash
npm run storybook
```

2. Navigate to the "MUI/Theme Comparison" story
3. Use the toolbar dropdown to switch between themes
4. Verify that:
   - Colors update correctly
   - Typography styles change
   - Component spacing adjusts
   - All MUI components reflect the selected theme

## Notes
- The theme toggle will affect all stories globally
- Each story will re-render when the theme changes
- The toolbar control will persist across story navigation

---

# Plan

## Step 1
- Create a theme module
- Define and export a map of named themes
- Use consistent keys for ‘MUI Default’ and ‘DDS Foundations’
- Ensure both themes are built using MUI’s createTheme
- Use your mapped DDS theme as the second entry

## Step 2
- Update the Storybook preview configuration
- Define a globalTypes entry for theme
- List available themes using the keys from the theme module
- Define a decorator that wraps all stories in MUI’s ThemeProvider
- In the decorator, select the current theme from context.globals
- Add a fallback to the default theme in case of key mismatch

## Step 3
- Create a demonstration story
- Make a dedicated Theme Showcase story
- Include Typography, Buttons, TextFields, and Paper components
- Use default MUI variants to reflect real token impact
- Ensure spacing, type, and color are visually distinguishable

## Step 4
- Validate theme application
- Run Storybook
- Toggle between themes in the toolbar
- Verify that token-driven values are applied under DDS Foundations
- Ensure components re-render correctly with each toggle change

## Step 5
- Make token output a Storybook dependency
- Update your Storybook start script to run the token build first
- Fail the start process if the token output is missing or malformed
- This guarantees the DDS theme is always present and correct

## Step 6
- Prepare for future CI and visual testing
- Ensure the theme toggle is controlled via globals
- Make stories deterministic by removing external state
- Document how visual snapshots are taken for both themes

# Outcome
- A global toggle that switches between themes without changing code
- Visual confidence that DDS Foundations tokens are applied consistently
- A reproducible foundation for theme-aware testing and review workflows