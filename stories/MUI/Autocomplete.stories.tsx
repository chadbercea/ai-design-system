import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Autocomplete,
  TextField,
  Box,
  Stack,
  Chip,
  FormControl,
  FormLabel,
} from '@mui/material';

const meta = {
  title: 'MUI/Inputs/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Autocomplete component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'If true, the value must be an array and the menu will support multiple selections.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    freeSolo: {
      control: 'boolean',
      description: 'If true, the Autocomplete is free solo, meaning that the user input is not bound to provided options.',
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
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'The size of the component.',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
  },
} satisfies Meta<typeof Autocomplete>;

export default meta;
type Story = StoryObj<typeof meta>;

const top100Films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  { label: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
];

const AutocompleteWrapper = (args: any) => {
  const [value, setValue] = React.useState<typeof top100Films[0] | null>(null);

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        value={value}
        onChange={(_event: React.SyntheticEvent, newValue: typeof top100Films[0] | null) => {
          setValue(newValue);
        }}
        options={top100Films}
        renderInput={(params) => <TextField {...params} label="Movie" />}
        {...args}
      />
    </Box>
  );
};

const MultipleDemo = () => {
  const [value, setValue] = React.useState<typeof top100Films[0][]>([]);

  return (
    <Box sx={{ width: 300 }}>
      <FormControl>
        <FormLabel>Multiple Selection</FormLabel>
        <Autocomplete
          multiple
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
          options={top100Films}
          renderInput={(params) => <TextField {...params} label="Movies" />}
        />
      </FormControl>
    </Box>
  );
};

const FreeSoloDemo = () => {
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <Box sx={{ width: 300 }}>
      <FormControl>
        <FormLabel>Free Solo</FormLabel>
        <Autocomplete
          freeSolo
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
          options={top100Films.map((option) => option.label)}
          renderInput={(params) => <TextField {...params} label="Free Solo" />}
        />
      </FormControl>
    </Box>
  );
};

const StatesDemo = () => {
  const [value, setValue] = React.useState<typeof top100Films[0] | null>(null);

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>States</FormLabel>
        <Stack spacing={2}>
          <Autocomplete
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Default" />}
          />
          <Autocomplete
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Disabled" />}
            disabled
          />
          <Autocomplete
            value={value}
            onChange={(_event, newValue) => {
              setValue(newValue);
            }}
            options={top100Films}
            renderInput={(params) => <TextField {...params} label="Small" />}
            size="small"
          />
        </Stack>
      </FormControl>
    </Stack>
  );
};

const CustomRenderDemo = () => {
  const [value, setValue] = React.useState<typeof top100Films[0][]>([]);

  return (
    <Box sx={{ width: 300 }}>
      <FormControl>
        <FormLabel>Custom Render</FormLabel>
        <Autocomplete
          multiple
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
          }}
          options={top100Films}
          renderInput={(params) => <TextField {...params} label="Movies" />}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.label}
                {...getTagProps({ index })}
                color="primary"
                variant="outlined"
              />
            ))
          }
        />
      </FormControl>
    </Box>
  );
};

export const Default: Story = {
  args: {
    options: top100Films,
    renderInput: (params) => <TextField {...params} label="Movie" />,
  },
  render: (args) => <AutocompleteWrapper {...args} />,
};

export const Multiple: Story = {
  args: {
    multiple: true,
    options: top100Films,
    renderInput: (params) => <TextField {...params} label="Movies" />,
  },
  render: () => <MultipleDemo />,
};

export const FreeSolo: Story = {
  args: {
    freeSolo: true,
    options: top100Films.map((option) => option.label),
    renderInput: (params) => <TextField {...params} label="Free Solo" />,
  },
  render: () => <FreeSoloDemo />,
};

export const States: Story = {
  args: {
    options: top100Films,
    renderInput: (params) => <TextField {...params} label="Default" />,
  },
  render: () => <StatesDemo />,
};

export const CustomRender: Story = {
  args: {
    multiple: true,
    options: top100Films,
    renderInput: (params) => <TextField {...params} label="Movies" />,
  },
  render: () => <CustomRenderDemo />,
}; 