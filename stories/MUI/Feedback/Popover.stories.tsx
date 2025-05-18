import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Popover,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
} from '@mui/material';

const meta = {
  title: 'MUI/Feedback/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Popover component with various states and configurations.',
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
    anchorOrigin: {
      control: 'object',
      description: 'This is the point on the anchor where the popover will attach.',
    },
    transformOrigin: {
      control: 'object',
      description: 'This is the point on the popover which will attach to the anchor.',
    },
  },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const PopoverWrapper = (args: any) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Button variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        {...args}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
};

const PositionsDemo = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [position, setPosition] = React.useState<{
    vertical: 'top' | 'center' | 'bottom';
    horizontal: 'left' | 'center' | 'right';
  }>({
    vertical: 'bottom',
    horizontal: 'left',
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleClick}>
          Open Popover
        </Button>
      </Stack>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: position.vertical,
          horizontal: position.horizontal,
        }}
      >
        <Paper sx={{ p: 2 }}>
          <Typography>Popover Content</Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
            <Button
              size="small"
              onClick={() => setPosition({ vertical: 'top', horizontal: 'left' })}
            >
              Top Left
            </Button>
            <Button
              size="small"
              onClick={() => setPosition({ vertical: 'top', horizontal: 'center' })}
            >
              Top Center
            </Button>
            <Button
              size="small"
              onClick={() => setPosition({ vertical: 'top', horizontal: 'right' })}
            >
              Top Right
            </Button>
          </Stack>
        </Paper>
      </Popover>
    </Box>
  );
};

const CustomContentDemo = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Button variant="contained" onClick={handleClick}>
        Open Popover
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Paper sx={{ p: 2, maxWidth: 300 }}>
          <Typography variant="h6" gutterBottom>
            Popover Title
          </Typography>
          <Typography variant="body2" paragraph>
            This is a more complex popover with custom content and styling.
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button size="small" onClick={handleClose}>
              Cancel
            </Button>
            <Button size="small" variant="contained" onClick={handleClose}>
              Confirm
            </Button>
          </Stack>
        </Paper>
      </Popover>
    </Box>
  );
};

export const Default: Story = {
  args: {
    open: false,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
  },
  render: (args) => <PopoverWrapper {...args} />,
};

export const Positions: Story = {
  args: {
    open: false,
  },
  render: () => <PositionsDemo />,
};

export const CustomContent: Story = {
  args: {
    open: false,
  },
  render: () => <CustomContentDemo />,
}; 