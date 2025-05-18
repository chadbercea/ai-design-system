import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  InputLabel,
  FormControl,
  Input,
  Box,
  Stack,
} from '@mui/material';
import type { InputLabelProps } from '@mui/material';

const meta = {
  title: 'MUI/Inputs/InputLabel',
  component: InputLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI InputLabel component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'info', 'success', 'warning'],
      description: 'The color of the component.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the label will be displayed in a disabled state.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'If true, the label will be displayed in an error state.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'If true, the label will indicate that the input is required.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    shrink: {
      control: 'boolean',
      description: 'If true, the label will shrink.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'standard' },
      },
    },
  },
} satisfies Meta<typeof InputLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

const InputLabelWrapper = (args: InputLabelProps) => (
  <Box sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <InputLabel {...args}>Input Label</InputLabel>
      <Input />
    </FormControl>
  </Box>
);

const ColorsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <InputLabel color="primary">Primary</InputLabel>
      <Input />
    </FormControl>
    <FormControl>
      <InputLabel color="secondary">Secondary</InputLabel>
      <Input />
    </FormControl>
    <FormControl>
      <InputLabel color="error">Error</InputLabel>
      <Input />
    </FormControl>
    <FormControl>
      <InputLabel color="info">Info</InputLabel>
      <Input />
    </FormControl>
    <FormControl>
      <InputLabel color="success">Success</InputLabel>
      <Input />
    </FormControl>
    <FormControl>
      <InputLabel color="warning">Warning</InputLabel>
      <Input />
    </FormControl>
  </Stack>
);

const StatesDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <InputLabel>Default</InputLabel>
      <Input />
    </FormControl>
    <FormControl disabled>
      <InputLabel disabled>Disabled</InputLabel>
      <Input />
    </FormControl>
    <FormControl error>
      <InputLabel error>Error</InputLabel>
      <Input />
    </FormControl>
    <FormControl required>
      <InputLabel required>Required</InputLabel>
      <Input />
    </FormControl>
  </Stack>
);

const VariantsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl variant="standard">
      <InputLabel>Standard</InputLabel>
      <Input />
    </FormControl>
    <FormControl variant="outlined">
      <InputLabel>Outlined</InputLabel>
      <Input />
    </FormControl>
    <FormControl variant="filled">
      <InputLabel>Filled</InputLabel>
      <Input />
    </FormControl>
  </Stack>
);

export const Default: Story = {
  args: {
    children: 'Input Label',
  },
  render: (args) => <InputLabelWrapper {...args} />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
}; 