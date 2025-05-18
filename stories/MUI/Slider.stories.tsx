import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Slider,
  Box,
  Stack,
  Typography,
  FormControl,
  FormLabel,
} from '@mui/material';

const meta = {
  title: 'MUI/Inputs/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Slider component with various states and configurations.',
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
    marks: {
      control: 'boolean',
      description: 'If true, marks are displayed.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    step: {
      control: 'number',
      description: 'The granularity with which the slider can step through values.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    min: {
      control: 'number',
      description: 'The minimum allowed value of the slider.',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    max: {
      control: 'number',
      description: 'The maximum allowed value of the slider.',
      table: {
        defaultValue: { summary: '100' },
      },
    },
  },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

const SliderWrapper = (args: any) => {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        value={value}
        onChange={handleChange}
        {...args}
      />
    </Box>
  );
};

const ColorsDemo = () => {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Stack spacing={4} sx={{ width: 300 }}>
      <FormControl>
        <FormLabel>Colors</FormLabel>
        <Slider
          value={value}
          onChange={handleChange}
          color="primary"
          aria-label="Primary"
        />
      </FormControl>
      <FormControl>
        <Slider
          value={value}
          onChange={handleChange}
          color="secondary"
          aria-label="Secondary"
        />
      </FormControl>
      <FormControl>
        <Slider
          value={value}
          onChange={handleChange}
          color="success"
          aria-label="Success"
        />
      </FormControl>
      <FormControl>
        <Slider
          value={value}
          onChange={handleChange}
          color="error"
          aria-label="Error"
        />
      </FormControl>
      <FormControl>
        <Slider
          value={value}
          onChange={handleChange}
          color="info"
          aria-label="Info"
        />
      </FormControl>
      <FormControl>
        <Slider
          value={value}
          onChange={handleChange}
          color="warning"
          aria-label="Warning"
        />
      </FormControl>
    </Stack>
  );
};

const StatesDemo = () => {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Stack spacing={4} sx={{ width: 300 }}>
      <FormControl>
        <FormLabel>States</FormLabel>
        <Slider
          value={value}
          onChange={handleChange}
          aria-label="Default"
        />
      </FormControl>
      <FormControl>
        <Slider
          value={value}
          onChange={handleChange}
          disabled
          aria-label="Disabled"
        />
      </FormControl>
      <FormControl>
        <Slider
          value={value}
          onChange={handleChange}
          size="small"
          aria-label="Small"
        />
      </FormControl>
    </Stack>
  );
};

const RangeDemo = () => {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return (
    <Box sx={{ width: 300 }}>
      <FormControl>
        <FormLabel>Range</FormLabel>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-label="Range"
        />
      </FormControl>
    </Box>
  );
};

const MarksDemo = () => {
  const [value, setValue] = React.useState<number>(30);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const marks = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ];

  return (
    <Box sx={{ width: 300 }}>
      <FormControl>
        <FormLabel>Marks</FormLabel>
        <Slider
          value={value}
          onChange={handleChange}
          marks={marks}
          aria-label="Marks"
        />
      </FormControl>
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <SliderWrapper {...args} />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Range: Story = {
  render: () => <RangeDemo />,
};

export const Marks: Story = {
  render: () => <MarksDemo />,
}; 