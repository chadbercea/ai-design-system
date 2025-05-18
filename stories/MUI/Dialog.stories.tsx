import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const meta = {
  title: 'MUI/Feedback/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Dialog component with various states and variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', false],
      description: 'Determine the max-width of the dialog.',
      table: {
        defaultValue: { summary: 'sm' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the dialog stretches to maxWidth.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    scroll: {
      control: 'select',
      options: ['paper', 'body'],
      description: 'Determine the container for scrolling the dialog.',
      table: {
        defaultValue: { summary: 'paper' },
      },
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DialogWrapper = (args: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        {...args}
      >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ScrollableDialogWrapper = (args: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open Scrollable Dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        {...args}
      >
        <DialogTitle>Scrollable Dialog</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            {Array(50).fill('This is a scrollable dialog content. ').join('')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const Default: Story = {
  args: {},
  render: (args) => <DialogWrapper {...args} />,
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
  render: (args) => <DialogWrapper {...args} />,
};

export const Large: Story = {
  args: {
    maxWidth: 'lg',
  },
  render: (args) => <DialogWrapper {...args} />,
};

export const Scrollable: Story = {
  args: {
    scroll: 'paper',
  },
  render: (args) => <ScrollableDialogWrapper {...args} />,
}; 