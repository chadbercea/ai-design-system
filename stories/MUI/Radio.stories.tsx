import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

const meta = {
  title: 'MUI/Inputs/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Radio component with various states and variants.',
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
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

const RadioWrapper = (args: any) => (
  <FormControl>
    <FormLabel id="demo-radio-buttons-group-label">Radio Group</FormLabel>
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      defaultValue="option1"
      name="radio-buttons-group"
    >
      <FormControlLabel value="option1" control={<Radio {...args} />} label="Option 1" />
      <FormControlLabel value="option2" control={<Radio {...args} />} label="Option 2" />
      <FormControlLabel value="option3" control={<Radio {...args} />} label="Option 3" />
    </RadioGroup>
  </FormControl>
);

export const Default: Story = {
  render: (args) => <RadioWrapper {...args} />,
};

export const Primary: Story = {
  render: (args) => <RadioWrapper {...args} color="primary" />,
};

export const Secondary: Story = {
  render: (args) => <RadioWrapper {...args} color="secondary" />,
};

export const Success: Story = {
  render: (args) => <RadioWrapper {...args} color="success" />,
};

export const Error: Story = {
  render: (args) => <RadioWrapper {...args} color="error" />,
};

export const Disabled: Story = {
  render: (args) => <RadioWrapper {...args} disabled />,
};

export const Small: Story = {
  render: (args) => <RadioWrapper {...args} size="small" />,
}; 