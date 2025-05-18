import React from 'react';
import { Skeleton, Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MUI/Feedback/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

const SkeletonDemo = (args: any) => (
  <Box sx={{ width: 300 }}>
    <Skeleton variant="text" width={210} height={40} {...args} />
    <Skeleton variant="circular" width={40} height={40} {...args} />
    <Skeleton variant="rectangular" width={210} height={60} {...args} />
  </Box>
);

export const Default: Story = {
  render: (args) => <SkeletonDemo {...args} />, 
}; 