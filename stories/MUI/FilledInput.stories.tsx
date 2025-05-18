import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FilledInput,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
  Box,
  Stack,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { FilledInputProps } from '@mui/material';

const meta = {
  title: 'MUI/Inputs/FilledInput',
  component: FilledInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI FilledInput component with various states and configurations.',
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
} satisfies Meta<typeof FilledInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const FilledInputWrapper = (args: FilledInputProps) => (
  <Box sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl fullWidth>
      <InputLabel>Filled Input</InputLabel>
      <FilledInput {...args} />
    </FormControl>
  </Box>
);

const ColorsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <InputLabel>Primary</InputLabel>
      <FilledInput color="primary" />
    </FormControl>
    <FormControl>
      <InputLabel>Secondary</InputLabel>
      <FilledInput color="secondary" />
    </FormControl>
    <FormControl>
      <InputLabel>Error</InputLabel>
      <FilledInput color="error" />
    </FormControl>
    <FormControl>
      <InputLabel>Info</InputLabel>
      <FilledInput color="info" />
    </FormControl>
    <FormControl>
      <InputLabel>Success</InputLabel>
      <FilledInput color="success" />
    </FormControl>
    <FormControl>
      <InputLabel>Warning</InputLabel>
      <FilledInput color="warning" />
    </FormControl>
  </Stack>
);

const StatesDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <InputLabel>Default</InputLabel>
      <FilledInput />
    </FormControl>
    <FormControl>
      <InputLabel>Disabled</InputLabel>
      <FilledInput disabled />
    </FormControl>
    <FormControl error>
      <InputLabel>Error</InputLabel>
      <FilledInput error />
    </FormControl>
    <FormControl>
      <InputLabel>Small</InputLabel>
      <FilledInput size="small" />
    </FormControl>
  </Stack>
);

const PasswordDemo = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowPassword((show) => !show);
  };

  return (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
      <FormControl>
        <InputLabel>Password</InputLabel>
        <FilledInput
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
        />
      </FormControl>
    </Stack>
  );
};

export const Default: Story = {
  args: {},
  render: (args) => <FilledInputWrapper {...args} />,
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