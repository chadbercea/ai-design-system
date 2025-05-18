import React from 'react';
import { Paper } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MUI/Surfaces/Paper',
  component: Paper,
} satisfies Meta<typeof Paper>;

export default meta;
type Story = StoryObj<typeof meta>;

const PaperDemo = (args: any) => (
  <Paper {...args} style={{ padding: 24 }}>Paper Content</Paper>
);

export const Default: Story = {
  render: (args) => <PaperDemo {...args} />, 
}; 