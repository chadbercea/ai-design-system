import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FormHelperText,
  FormControl,
  Input,
  Box,
  Stack,
} from '@mui/material';
import type { FormHelperTextProps } from '@mui/material';

const meta = {
  title: 'MUI/Inputs/FormHelperText',
  component: FormHelperText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI FormHelperText component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'If true, the helper text will be displayed in a disabled state.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'boolean',
      description: 'If true, the helper text will be displayed in an error state.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    required: {
      control: 'boolean',
      description: 'If true, the helper text will indicate that the input is required.',
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
} satisfies Meta<typeof FormHelperText>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormHelperTextWrapper = (args: FormHelperTextProps) => (
  <Box sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <Input />
      <FormHelperText {...args}>Helper text</FormHelperText>
    </FormControl>
  </Box>
);

const StatesDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <Input />
      <FormHelperText>Default helper text</FormHelperText>
    </FormControl>
    <FormControl error>
      <Input />
      <FormHelperText error>Error helper text</FormHelperText>
    </FormControl>
    <FormControl disabled>
      <Input />
      <FormHelperText disabled>Disabled helper text</FormHelperText>
    </FormControl>
    <FormControl required>
      <Input />
      <FormHelperText required>Required helper text</FormHelperText>
    </FormControl>
  </Stack>
);

const VariantsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl variant="standard">
      <Input />
      <FormHelperText>Standard variant</FormHelperText>
    </FormControl>
    <FormControl variant="outlined">
      <Input />
      <FormHelperText>Outlined variant</FormHelperText>
    </FormControl>
    <FormControl variant="filled">
      <Input />
      <FormHelperText>Filled variant</FormHelperText>
    </FormControl>
  </Stack>
);

export const Default: Story = {
  args: {
    children: 'Helper text',
  },
  render: (args) => <FormHelperTextWrapper {...args} />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
}; 