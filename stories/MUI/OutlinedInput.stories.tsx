import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
  Box,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const meta = {
  title: 'MUI/Inputs/OutlinedInput',
  component: OutlinedInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI OutlinedInput component with various states and configurations.',
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
} satisfies Meta<typeof OutlinedInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const OutlinedInputWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl fullWidth>
      <InputLabel>Outlined Input</InputLabel>
      <OutlinedInput {...args} label="Outlined Input" />
    </FormControl>
  </Box>
);

const ColorsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <InputLabel>Primary</InputLabel>
      <OutlinedInput color="primary" label="Primary" />
    </FormControl>
    <FormControl>
      <InputLabel>Secondary</InputLabel>
      <OutlinedInput color="secondary" label="Secondary" />
    </FormControl>
    <FormControl>
      <InputLabel>Error</InputLabel>
      <OutlinedInput color="error" label="Error" />
    </FormControl>
    <FormControl>
      <InputLabel>Info</InputLabel>
      <OutlinedInput color="info" label="Info" />
    </FormControl>
    <FormControl>
      <InputLabel>Success</InputLabel>
      <OutlinedInput color="success" label="Success" />
    </FormControl>
    <FormControl>
      <InputLabel>Warning</InputLabel>
      <OutlinedInput color="warning" label="Warning" />
    </FormControl>
  </Stack>
);

const StatesDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <InputLabel>Default</InputLabel>
      <OutlinedInput label="Default" />
    </FormControl>
    <FormControl>
      <InputLabel>Disabled</InputLabel>
      <OutlinedInput disabled label="Disabled" />
    </FormControl>
    <FormControl error>
      <InputLabel>Error</InputLabel>
      <OutlinedInput error label="Error" />
    </FormControl>
    <FormControl>
      <InputLabel>Small</InputLabel>
      <OutlinedInput size="small" label="Small" />
    </FormControl>
  </Stack>
);

const PasswordDemo = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
      <FormControl>
        <InputLabel>Password</InputLabel>
        <OutlinedInput
          type={showPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </Stack>
  );
};

export const Default: Story = {
  args: {
    label: 'Outlined Input',
  },
  render: (args) => <OutlinedInputWrapper {...args} />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Password: Story = {
  render: () => <PasswordDemo />,
}; 