import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Box, Typography, Button, Stack } from '@mui/material';

const meta = {
  title: 'MUI/Theme',
  component: Box,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="body1">Body text</Typography>
      <Button variant="contained">Contained Button</Button>
      <Button variant="outlined">Outlined Button</Button>
      <Button variant="text">Text Button</Button>
    </Stack>
  ),
}; 