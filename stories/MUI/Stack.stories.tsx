import React from 'react';
import { Stack, Box, Typography, Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MUI/Layout/Stack',
  component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const StackDemo = (args: any) => (
  <Stack direction="row" spacing={2} {...args}>
    <Button variant="contained">Button 1</Button>
    <Button variant="contained">Button 2</Button>
    <Button variant="contained">Button 3</Button>
  </Stack>
);

export const Default: Story = {
  render: (args) => <StackDemo {...args} />, 
}; 