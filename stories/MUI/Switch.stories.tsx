import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Switch,
  FormControlLabel,
  Stack,
  Typography,
  Box,
} from '@mui/material';

const meta = {
  title: 'MUI/Inputs/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Switch component with various states and colors.',
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
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the component.',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    defaultChecked: {
      control: 'boolean',
      description: 'The default checked state.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

const SwitchWrapper = (args: any) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={checked}
          onChange={handleChange}
          {...args}
        />
      }
      label="Switch"
    />
  );
};

const ColorsDemo = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Stack spacing={2}>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            color="primary"
          />
        }
        label="Primary"
      />
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            color="secondary"
          />
        }
        label="Secondary"
      />
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            color="success"
          />
        }
        label="Success"
      />
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            color="error"
          />
        }
        label="Error"
      />
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            color="info"
          />
        }
        label="Info"
      />
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            color="warning"
          />
        }
        label="Warning"
      />
    </Stack>
  );
};

const StatesDemo = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Stack spacing={2}>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
          />
        }
        label="Default"
      />
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            disabled
          />
        }
        label="Disabled"
      />
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
            size="small"
          />
        }
        label="Small"
      />
    </Stack>
  );
};

const LabelDemo = () => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360 }}>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={handleChange}
          />
        }
        label={
          <Typography variant="body2" color="text.secondary">
            This is a switch with custom label styling
          </Typography>
        }
      />
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <SwitchWrapper {...args} />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Label: Story = {
  render: () => <LabelDemo />,
}; 