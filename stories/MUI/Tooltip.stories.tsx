import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Tooltip,
  Button,
  Stack,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Data display/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Tooltip component with various positions and styles.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'right',
        'bottom',
        'left',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
        'right-start',
        'right-end',
        'left-start',
        'left-end',
      ],
      description: 'Tooltip placement.',
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
    arrow: {
      control: 'boolean',
      description: 'If true, adds an arrow to the tooltip.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    enterDelay: {
      control: 'number',
      description: 'The number of milliseconds to wait before showing the tooltip.',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    leaveDelay: {
      control: 'number',
      description: 'The number of milliseconds to wait before hiding the tooltip.',
      table: {
        defaultValue: { summary: '0' },
      },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const TooltipWrapper = (args: any) => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Tooltip {...args}>
      <Button>Hover me</Button>
    </Tooltip>
  </Box>
);

const PositionDemo = () => (
  <Stack spacing={2} direction="row">
    <Tooltip title="Delete">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Add" placement="right">
      <IconButton>
        <AddIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Home" placement="bottom">
      <IconButton>
        <HomeIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Settings" placement="left">
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </Stack>
);

const ArrowDemo = () => (
  <Stack spacing={2} direction="row">
    <Tooltip title="Delete" arrow>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Add" placement="right" arrow>
      <IconButton>
        <AddIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Home" placement="bottom" arrow>
      <IconButton>
        <HomeIcon />
      </IconButton>
    </Tooltip>
    <Tooltip title="Settings" placement="left" arrow>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  </Stack>
);

const InteractiveDemo = () => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Tooltip
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      title="Interactive tooltip"
    >
      <Button>Click me</Button>
    </Tooltip>
  );
};

const CustomizedDemo = () => (
  <Stack spacing={2} direction="row">
    <Tooltip
      title={
        <Typography variant="body2" color="inherit">
          Custom tooltip with <strong>HTML</strong>
        </Typography>
      }
    >
      <Button>Custom HTML</Button>
    </Tooltip>
    <Tooltip
      title="Custom styled tooltip"
      componentsProps={{
        tooltip: {
          sx: {
            bgcolor: 'primary.main',
            '& .MuiTooltip-arrow': {
              color: 'primary.main',
            },
          },
        },
      }}
    >
      <Button>Custom styled</Button>
    </Tooltip>
  </Stack>
);

export const Default: Story = {
  args: {
    title: 'Tooltip',
  },
  render: (args) => <TooltipWrapper {...args} />,
};

export const Position: Story = {
  args: {
    title: 'Tooltip',
  },
  render: () => <PositionDemo />,
};

export const Arrow: Story = {
  args: {
    title: 'Tooltip',
  },
  render: () => <ArrowDemo />,
};

export const Interactive: Story = {
  args: {
    title: 'Tooltip',
  },
  render: () => <InteractiveDemo />,
};

export const Customized: Story = {
  args: {
    title: 'Tooltip',
  },
  render: () => <CustomizedDemo />,
}; 