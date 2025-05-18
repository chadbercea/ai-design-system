import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Box,
} from '@mui/material';
import {
  FileCopy as FileCopyIcon,
  Save as SaveIcon,
  Print as PrintIcon,
  Share as ShareIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Navigation/Speed Dial',
  component: SpeedDial,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI SpeedDial component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    ariaLabel: {
      control: 'text',
      description: 'The aria-label of the button element.',
    },
    direction: {
      control: 'select',
      options: ['up', 'down', 'left', 'right'],
      description: 'Direction the menu opens relative to the SpeedDial.',
      table: {
        defaultValue: { summary: 'up' },
      },
    },
    open: {
      control: 'boolean',
      description: 'If true, the SpeedDial will be open.',
    },
    icon: {
      control: 'object',
      description: 'The icon to display in the SpeedDial Fab.',
    },
  },
} satisfies Meta<typeof SpeedDial>;

export default meta;
type Story = StoryObj<typeof meta>;

const SpeedDialWrapper = (args: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        {...args}
      >
        <SpeedDialAction
          icon={<FileCopyIcon />}
          tooltipTitle="Copy"
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<SaveIcon />}
          tooltipTitle="Save"
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<PrintIcon />}
          tooltipTitle="Print"
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<ShareIcon />}
          tooltipTitle="Share"
          tooltipOpen
          onClick={handleClose}
        />
      </SpeedDial>
    </Box>
  );
};

const DirectionsDemo = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial directions example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        <SpeedDialAction
          icon={<FileCopyIcon />}
          tooltipTitle="Copy"
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<SaveIcon />}
          tooltipTitle="Save"
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<PrintIcon />}
          tooltipTitle="Print"
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<ShareIcon />}
          tooltipTitle="Share"
          tooltipOpen
          onClick={handleClose}
        />
      </SpeedDial>
    </Box>
  );
};

const CustomIconDemo = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial custom icon example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        <SpeedDialAction
          icon={<FileCopyIcon />}
          tooltipTitle="Copy"
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<SaveIcon />}
          tooltipTitle="Save"
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<PrintIcon />}
          tooltipTitle="Print"
          tooltipOpen
          onClick={handleClose}
        />
        <SpeedDialAction
          icon={<ShareIcon />}
          tooltipTitle="Share"
          tooltipOpen
          onClick={handleClose}
        />
      </SpeedDial>
    </Box>
  );
};

export const Default: Story = {
  args: {
    ariaLabel: 'SpeedDial basic example',
    direction: 'up',
  },
  render: (args) => <SpeedDialWrapper {...args} />,
};

export const Directions: Story = {
  args: {
    ariaLabel: 'SpeedDial directions example',
    direction: 'up',
  },
  render: () => <DirectionsDemo />,
};

export const CustomIcon: Story = {
  args: {
    ariaLabel: 'SpeedDial custom icon example',
    direction: 'up',
  },
  render: () => <CustomIconDemo />,
}; 