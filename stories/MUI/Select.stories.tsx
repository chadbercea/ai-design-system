import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Stack,
  SelectChangeEvent,
} from '@mui/material';

const meta = {
  title: 'MUI/Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Select component with various variants and states.',
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
    label: {
      control: 'text',
      description: 'The label content.',
    },
    multiple: {
      control: 'boolean',
      description: 'If true, the component can take multiple values.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const SelectWrapper = (args: any) => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
          {...args}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const VariantsDemo = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
      <FormControl fullWidth>
        <InputLabel id="outlined-select-label">Outlined</InputLabel>
        <Select
          labelId="outlined-select-label"
          id="outlined-select"
          value={age}
          label="Outlined"
          onChange={handleChange}
          variant="outlined"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="filled-select-label">Filled</InputLabel>
        <Select
          labelId="filled-select-label"
          id="filled-select"
          value={age}
          label="Filled"
          onChange={handleChange}
          variant="filled"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="standard-select-label">Standard</InputLabel>
        <Select
          labelId="standard-select-label"
          id="standard-select"
          value={age}
          label="Standard"
          onChange={handleChange}
          variant="standard"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

const StatesDemo = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
      <FormControl fullWidth>
        <InputLabel id="required-select-label">Required</InputLabel>
        <Select
          labelId="required-select-label"
          id="required-select"
          value={age}
          label="Required"
          onChange={handleChange}
          required
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="disabled-select-label">Disabled</InputLabel>
        <Select
          labelId="disabled-select-label"
          id="disabled-select"
          value={age}
          label="Disabled"
          onChange={handleChange}
          disabled
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth error>
        <InputLabel id="error-select-label">Error</InputLabel>
        <Select
          labelId="error-select-label"
          id="error-select"
          value={age}
          label="Error"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
};

const MultipleDemo = () => {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl sx={{ width: '100%', maxWidth: 360 }}>
      <InputLabel id="multiple-select-label">Multiple</InputLabel>
      <Select
        labelId="multiple-select-label"
        id="multiple-select"
        multiple
        value={personName}
        label="Multiple"
        onChange={handleChange}
      >
        <MenuItem value="Ten">Ten</MenuItem>
        <MenuItem value="Twenty">Twenty</MenuItem>
        <MenuItem value="Thirty">Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export const Default: Story = {
  render: (args) => <SelectWrapper {...args} />,
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Multiple: Story = {
  render: () => <MultipleDemo />,
}; 