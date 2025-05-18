import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Box,
  Stack,
} from '@mui/material';

const meta = {
  title: 'MUI/Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Checkbox component with various states and colors.',
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
    indeterminate: {
      control: 'boolean',
      description: 'If true, the component appears indeterminate.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const CheckboxWrapper = (args: any) => (
  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
    <Checkbox {...args} />
  </Box>
);

const ColorsDemo = () => (
  <Stack spacing={2}>
    <Checkbox defaultChecked color="primary" />
    <Checkbox defaultChecked color="secondary" />
    <Checkbox defaultChecked color="success" />
    <Checkbox defaultChecked color="error" />
    <Checkbox defaultChecked color="info" />
    <Checkbox defaultChecked color="warning" />
  </Stack>
);

const StatesDemo = () => (
  <Stack spacing={2}>
    <Checkbox defaultChecked />
    <Checkbox />
    <Checkbox disabled />
    <Checkbox disabled checked />
    <Checkbox indeterminate />
  </Stack>
);

const SizesDemo = () => (
  <Stack spacing={2}>
    <Checkbox defaultChecked size="small" />
    <Checkbox defaultChecked size="medium" />
  </Stack>
);

const FormDemo = () => {
  const [checked, setChecked] = React.useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Assign responsibility</FormLabel>
      <FormGroup>
        <FormControlLabel
          label="Parent"
          control={
            <Checkbox
              checked={checked[0] && checked[1]}
              indeterminate={checked[0] !== checked[1]}
              onChange={handleChange1}
            />
          }
        />
        {children}
      </FormGroup>
    </FormControl>
  );
};

export const Default: Story = {
  args: {
    defaultChecked: true,
  },
  render: (args) => <CheckboxWrapper {...args} />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Sizes: Story = {
  render: () => <SizesDemo />,
};

export const Form: Story = {
  render: () => <FormDemo />,
}; 