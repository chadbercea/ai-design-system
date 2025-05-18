import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Stack,
} from '@mui/material';

const meta = {
  title: 'MUI/Inputs/FormControl',
  component: FormControl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI FormControl component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'outlined', 'filled'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'standard' },
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
    error: {
      control: 'boolean',
      description: 'If true, the component will be displayed in an error state.',
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
    fullWidth: {
      control: 'boolean',
      description: 'If true, the component will take up the full width of its container.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof FormControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormControlWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl {...args}>
      <FormLabel>Form Control</FormLabel>
      <Input />
      <FormHelperText>Helper text</FormHelperText>
    </FormControl>
  </Box>
);

const VariantsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl variant="standard">
      <FormLabel>Standard</FormLabel>
      <Input />
      <FormHelperText>Standard variant</FormHelperText>
    </FormControl>
    <FormControl variant="outlined">
      <FormLabel>Outlined</FormLabel>
      <Input />
      <FormHelperText>Outlined variant</FormHelperText>
    </FormControl>
    <FormControl variant="filled">
      <FormLabel>Filled</FormLabel>
      <Input />
      <FormHelperText>Filled variant</FormHelperText>
    </FormControl>
  </Stack>
);

const StatesDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControl>
      <FormLabel>Default</FormLabel>
      <Input />
      <FormHelperText>Default state</FormHelperText>
    </FormControl>
    <FormControl disabled>
      <FormLabel>Disabled</FormLabel>
      <Input />
      <FormHelperText>Disabled state</FormHelperText>
    </FormControl>
    <FormControl error>
      <FormLabel>Error</FormLabel>
      <Input />
      <FormHelperText>Error state</FormHelperText>
    </FormControl>
    <FormControl required>
      <FormLabel>Required</FormLabel>
      <Input />
      <FormHelperText>Required state</FormHelperText>
    </FormControl>
  </Stack>
);

const SelectControlDemo = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: any) => {
    setAge(event.target.value);
  };

  return (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <FormHelperText>With Select</FormHelperText>
      </FormControl>
    </Stack>
  );
};

export const Default: Story = {
  args: {
    variant: 'standard',
    size: 'medium',
    disabled: false,
    error: false,
    required: false,
    fullWidth: false,
  },
  render: (args) => <FormControlWrapper {...args} />,
};

export const Variants: Story = {
  args: {
    variant: 'standard',
  },
  render: () => <VariantsDemo />,
};

export const States: Story = {
  args: {
    variant: 'standard',
  },
  render: () => <StatesDemo />,
};

export const SelectControl: Story = {
  args: {
    variant: 'standard',
  },
  render: () => <SelectControlDemo />,
}; 