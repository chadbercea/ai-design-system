import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FormLabel,
  FormControl,
  Input,
  Box,
  Stack,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@mui/material';
import type { FormLabelProps } from '@mui/material';

const meta = {
  title: 'MUI/Inputs/FormLabel',
  component: FormLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI FormLabel component with various states and configurations.',
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
    focused: {
      control: 'boolean',
      description: 'If true, the label will be displayed in a focused state.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof FormLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormLabelWrapper = (args: FormLabelProps) => (
  <Box sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <FormLabel {...args}>Form Label</FormLabel>
      <Input />
    </FormControl>
  </Box>
);

const ColorsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <FormLabel color="primary">Primary</FormLabel>
      <Input />
    </FormControl>
    <FormControl>
      <FormLabel color="secondary">Secondary</FormLabel>
      <Input />
    </FormControl>
    <FormControl>
      <FormLabel color="error">Error</FormLabel>
      <Input />
    </FormControl>
    <FormControl>
      <FormLabel color="info">Info</FormLabel>
      <Input />
    </FormControl>
    <FormControl>
      <FormLabel color="success">Success</FormLabel>
      <Input />
    </FormControl>
    <FormControl>
      <FormLabel color="warning">Warning</FormLabel>
      <Input />
    </FormControl>
  </Stack>
);

const StatesDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <FormLabel>Default</FormLabel>
      <Input />
    </FormControl>
    <FormControl disabled>
      <FormLabel disabled>Disabled</FormLabel>
      <Input />
    </FormControl>
    <FormControl error>
      <FormLabel error>Error</FormLabel>
      <Input />
    </FormControl>
    <FormControl required>
      <FormLabel required>Required</FormLabel>
      <Input />
    </FormControl>
  </Stack>
);

const RadioGroupExample = () => (
  <FormControl component="fieldset">
    <FormLabel component="legend">Gender</FormLabel>
    <RadioGroup defaultValue="female" name="radio-buttons-group">
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
      <FormControlLabel value="other" control={<Radio />} label="Other" />
    </RadioGroup>
  </FormControl>
);

export const Default: Story = {
  args: {
    children: 'Form Label',
  },
  render: (args) => <FormLabelWrapper {...args} />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const WithRadioGroup: Story = {
  render: () => <RadioGroupExample />,
}; 