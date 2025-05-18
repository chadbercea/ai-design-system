import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  TextField,
  Stack,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const meta = {
  title: 'MUI/Inputs/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI TextField component with various variants and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outlined', 'filled', 'standard'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'outlined' },
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
    required: {
      control: 'boolean',
      description: 'If true, the label is displayed as required.',
      table: {
        defaultValue: { summary: 'false' },
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
      description: 'If true, the label is displayed in an error state.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    helperText: {
      control: 'text',
      description: 'The helper text content.',
    },
    label: {
      control: 'text',
      description: 'The label content.',
    },
    placeholder: {
      control: 'text',
      description: 'The short hint displayed in the input before the user enters a value.',
    },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

const TextFieldWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 360 }}>
    <TextField {...args} />
  </Box>
);

const VariantsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <TextField label="Outlined" variant="outlined" />
    <TextField label="Filled" variant="filled" />
    <TextField label="Standard" variant="standard" />
  </Stack>
);

const StatesDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <TextField label="Required" required />
    <TextField label="Disabled" disabled />
    <TextField label="Error" error helperText="Incorrect entry." />
    <TextField label="Helper Text" helperText="Some important text" />
  </Stack>
);

const SizesDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <TextField label="Small" size="small" />
    <TextField label="Medium" size="medium" />
  </Stack>
);

const PasswordDemo = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <FormControl sx={{ width: '100%', maxWidth: 360 }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
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
  );
};

const MultilineDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <TextField
      label="Multiline"
      multiline
      rows={4}
      defaultValue="Default Value"
    />
    <TextField
      label="Multiline Placeholder"
      multiline
      placeholder="Placeholder"
      rows={4}
    />
  </Stack>
);

export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
  render: (args) => <TextFieldWrapper {...args} />,
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Sizes: Story = {
  render: () => <SizesDemo />,
};

export const Password: Story = {
  render: () => <PasswordDemo />,
};

export const Multiline: Story = {
  render: () => <MultilineDemo />,
}; 