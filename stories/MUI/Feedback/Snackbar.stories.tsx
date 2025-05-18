import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Snackbar,
  Button,
  IconButton,
  Box,
  Alert,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const meta = {
  title: 'MUI/Feedback/Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Snackbar component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: 'If true, the component is shown.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    autoHideDuration: {
      control: 'number',
      description: 'The number of milliseconds to wait before automatically calling the onClose function.',
      table: {
        defaultValue: { summary: 'null' },
      },
    },
    anchorOrigin: {
      control: 'object',
      description: 'The anchor of the Snackbar.',
      table: {
        defaultValue: { summary: '{ vertical: "bottom", horizontal: "left" }' },
      },
    },
  },
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SnackbarWrapper = (args: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Box>
      <Button onClick={handleClick}>Open Snackbar</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={action}
        {...args}
      />
    </Box>
  );
};

const AlertDemo = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Box>
      <Button onClick={handleClick}>Open Snackbar with Alert</Button>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </Snackbar>
    </Box>
  );
};

const PositionsDemo = () => {
  const [state, setState] = React.useState<{
    open: boolean;
    vertical: 'top' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  }>({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, open } = state;

  const handleClick = (newState: { vertical: 'top' | 'bottom'; horizontal: 'left' | 'center' | 'right' }) => () => {
    setState({ open: true, ...newState });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <Box>
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'center' })}>
        Top-Center
      </Button>
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'right' })}>
        Top-Right
      </Button>
      <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
        Bottom-Right
      </Button>
      <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
        Bottom-Center
      </Button>
      <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'left' })}>
        Bottom-Left
      </Button>
      <Button onClick={handleClick({ vertical: 'top', horizontal: 'left' })}>
        Top-Left
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      />
    </Box>
  );
};

export const Default: Story = {
  args: {
    open: false,
    autoHideDuration: 6000,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
  },
  render: (args) => <SnackbarWrapper {...args} />,
};

export const WithAlert: Story = {
  render: () => <AlertDemo />,
};

export const Positions: Story = {
  render: () => <PositionsDemo />,
}; 