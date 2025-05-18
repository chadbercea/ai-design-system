import React from 'react';
import { Backdrop, Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MUI/Feedback/Backdrop',
  component: Backdrop,
} satisfies Meta<typeof Backdrop>;

export default meta;
type Story = StoryObj<typeof meta>;

const BackdropDemo = (args: any) => {
  const [open, setOpen] = React.useState(false);
  const handleToggle = () => setOpen(!open);
  return (
    <div>
      <Button onClick={handleToggle}>Toggle Backdrop</Button>
      <Backdrop open={open} {...args} onClick={handleToggle}>
        <span style={{ color: '#fff', fontSize: 24 }}>Backdrop Content</span>
      </Backdrop>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <BackdropDemo {...args} />, 
}; 