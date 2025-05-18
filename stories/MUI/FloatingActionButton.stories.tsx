import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Fab,
  Box,
  Stack,
} from '@mui/material';
import {
  Add,
  Edit,
  Save,
  Delete,
  Navigation,
  Favorite,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Inputs/FloatingActionButton',
  component: Fab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI FloatingActionButton component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error', 'info', 'warning'],
      description: 'The color of the component.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the component.',
      table: {
        defaultValue: { summary: 'large' },
      },
    },
    variant: {
      control: 'select',
      options: ['circular', 'extended'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'circular' },
      },
    },
  },
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

const FloatingActionButtonWrapper = (args: any) => {
  return (
    <Box>
      <Fab {...args}>
        <Add />
      </Fab>
    </Box>
  );
};

const ColorsDemo = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Fab color="primary">
        <Add />
      </Fab>
      <Fab color="secondary">
        <Edit />
      </Fab>
      <Fab color="success">
        <Save />
      </Fab>
      <Fab color="error">
        <Delete />
      </Fab>
      <Fab color="info">
        <Navigation />
      </Fab>
      <Fab color="warning">
        <Favorite />
      </Fab>
    </Stack>
  );
};

const SizesDemo = () => {
  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Fab size="small">
        <Add />
      </Fab>
      <Fab size="medium">
        <Add />
      </Fab>
      <Fab size="large">
        <Add />
      </Fab>
    </Stack>
  );
};

const StatesDemo = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Fab>
        <Add />
      </Fab>
      <Fab disabled>
        <Add />
      </Fab>
      <Fab variant="extended">
        <Add sx={{ mr: 1 }} />
        Add
      </Fab>
    </Stack>
  );
};

export const Default: Story = {
  args: {
    color: 'primary',
    disabled: false,
    size: 'large',
    variant: 'circular',
  },
  render: (args) => <FloatingActionButtonWrapper {...args} />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const Sizes: Story = {
  render: () => <SizesDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
}; 