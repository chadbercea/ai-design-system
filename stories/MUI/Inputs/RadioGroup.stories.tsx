import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
  Stack,
} from '@mui/material';

const meta = {
  title: 'MUI/Inputs/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI RadioGroup component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'The default value of the radio group.',
    },
    name: {
      control: 'text',
      description: 'The name used to reference the value of the control.',
    },
    row: {
      control: 'boolean',
      description: 'Display group of elements in a compact row.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const RadioGroupWrapper = (args: any) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup {...args}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};

const RowDemo = () => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup row>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};

const ControlledDemo = () => {
  const [value, setValue] = React.useState('female');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>
    </FormControl>
  );
};

const ColorsDemo = () => {
  const [value, setValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Stack spacing={2}>
      <FormControl component="fieldset">
        <FormLabel component="legend">Colors</FormLabel>
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel value="a" control={<Radio color="primary" />} label="Primary" />
          <FormControlLabel value="b" control={<Radio color="secondary" />} label="Secondary" />
          <FormControlLabel value="c" control={<Radio color="success" />} label="Success" />
          <FormControlLabel value="d" control={<Radio color="error" />} label="Error" />
          <FormControlLabel value="e" control={<Radio color="info" />} label="Info" />
          <FormControlLabel value="f" control={<Radio color="warning" />} label="Warning" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

const StatesDemo = () => {
  const [value, setValue] = React.useState('a');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <Stack spacing={2}>
      <FormControl component="fieldset">
        <FormLabel component="legend">States</FormLabel>
        <RadioGroup value={value} onChange={handleChange}>
          <FormControlLabel value="a" control={<Radio />} label="Default" />
          <FormControlLabel value="b" control={<Radio disabled />} label="Disabled" />
          <FormControlLabel value="c" control={<Radio size="small" />} label="Small" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

const ErrorDemo = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl error component="fieldset">
      <FormLabel component="legend">Error</FormLabel>
      <RadioGroup value={value} onChange={handleChange}>
        <FormControlLabel value="a" control={<Radio />} label="First" />
        <FormControlLabel value="b" control={<Radio />} label="Second" />
        <FormControlLabel value="c" control={<Radio />} label="Third" />
      </RadioGroup>
      <FormHelperText>You can display an error message here</FormHelperText>
    </FormControl>
  );
};

export const Default: Story = {
  args: {
    defaultValue: 'female',
    name: 'gender',
    row: false,
  },
  render: (args) => <RadioGroupWrapper {...args} />,
};

export const Row: Story = {
  render: () => <RowDemo />,
};

export const Controlled: Story = {
  render: () => <ControlledDemo />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Error: Story = {
  render: () => <ErrorDemo />,
}; 