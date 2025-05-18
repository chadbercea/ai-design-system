import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  InputAdornment,
  TextField,
  Input,
  FormControl,
  Box,
  Stack,
  IconButton,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Search,
  AccountCircle,
  Email,
  Phone,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Inputs/InputAdornment',
  component: InputAdornment,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI InputAdornment component with various positions and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['start', 'end'],
      description: 'The position of the adornment.',
      table: {
        defaultValue: { summary: 'end' },
      },
    },
    disablePointerEvents: {
      control: 'boolean',
      description: 'If true, the adornment will not have pointer events.',
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
} satisfies Meta<typeof InputAdornment>;

export default meta;
type Story = StoryObj<typeof meta>;

const InputAdornmentWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 360 }}>
    <TextField
      label="With InputAdornment"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start" {...args}>
            <Search />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

const PositionsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <TextField
      label="Start Position"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
    <TextField
      label="End Position"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Search />
          </InputAdornment>
        ),
      }}
    />
  </Stack>
);

const IconsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <TextField
      label="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
    />
    <TextField
      label="Username"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        ),
      }}
    />
    <TextField
      label="Email"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email />
          </InputAdornment>
        ),
      }}
    />
    <TextField
      label="Phone"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Phone />
          </InputAdornment>
        ),
      }}
    />
  </Stack>
);

const InteractiveDemo = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
      <TextField
        label="Password"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

export const Default: Story = {
  args: {
    position: 'start',
  },
  render: (args) => <InputAdornmentWrapper {...args} />,
};

export const Positions: Story = {
  args: {
    position: 'start',
  },
  render: () => <PositionsDemo />,
};

export const Icons: Story = {
  args: {
    position: 'start',
  },
  render: () => <IconsDemo />,
};

export const Interactive: Story = {
  args: {
    position: 'end',
  },
  render: () => <InteractiveDemo />,
}; 