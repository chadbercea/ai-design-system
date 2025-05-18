import React from 'react';
import { Box, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MUI/Layout/Box',
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

const BoxDemo = (args: any) => (
  <Box {...args} sx={{ p: 2, bgcolor: 'background.paper', border: '1px solid #ccc' }}>
    <Typography>Box Content</Typography>
  </Box>
);

export const Default: Story = {
  render: (args) => <BoxDemo {...args} />, 
}; 