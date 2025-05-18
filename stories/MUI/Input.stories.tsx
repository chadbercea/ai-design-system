import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Input,
  InputAdornment,
  FormControl,
  FormHelperText,
  FormLabel,
  Box,
  Stack,
} from '@mui/material';
import { Search, AccountCircle } from '@mui/icons-material';

const meta = {
  title: 'MUI/Inputs/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Input component with various states and configurations.',
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
      description: 'If true, the component is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'If true, the input will indicate an error.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fullWidth: {
      control: 'boolean',
      description: 'If true, the input will take up the full width of its container.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the component.',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const InputWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl fullWidth>
      <FormLabel>Input</FormLabel>
      <Input {...args} />
    </FormControl>
  </Box>
);

const ColorsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <FormLabel>Colors</FormLabel>
      <Input color="primary" placeholder="Primary" />
    </FormControl>
    <FormControl>
      <Input color="secondary" placeholder="Secondary" />
    </FormControl>
    <FormControl>
      <Input color="error" placeholder="Error" />
    </FormControl>
    <FormControl>
      <Input color="info" placeholder="Info" />
    </FormControl>
    <FormControl>
      <Input color="success" placeholder="Success" />
    </FormControl>
    <FormControl>
      <Input color="warning" placeholder="Warning" />
    </FormControl>
  </Stack>
);

const StatesDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <FormLabel>States</FormLabel>
      <Input placeholder="Default" />
    </FormControl>
    <FormControl>
      <Input disabled placeholder="Disabled" />
    </FormControl>
    <FormControl error>
      <Input placeholder="Error" />
      <FormHelperText>Error message</FormHelperText>
    </FormControl>
    <FormControl>
      <Input placeholder="Small" size="small" />
    </FormControl>
  </Stack>
);

const AdornmentsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <FormLabel>Adornments</FormLabel>
      <Input
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        }
      />
    </FormControl>
    <FormControl>
      <Input
        placeholder="Username"
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
      />
    </FormControl>
    <FormControl>
      <Input
        placeholder="Amount"
        startAdornment={
          <InputAdornment position="start">$</InputAdornment>
        }
      />
    </FormControl>
  </Stack>
);

export const Default: Story = {
  args: {
    placeholder: 'Input',
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Adornments: Story = {
  render: () => <AdornmentsDemo />,
}; 