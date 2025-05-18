import React from 'react';
import { LinearProgress, Button, Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MUI/Feedback/Progress',
  component: LinearProgress,
} satisfies Meta<typeof LinearProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

const ProgressDemo = (args: any) => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="determinate" value={progress} {...args} />
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <ProgressDemo {...args} />, 
}; 