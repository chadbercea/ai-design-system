import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  FormControlLabel,
  Checkbox,
  Radio,
  Switch,
  Box,
  Stack,
  FormControl,
  FormLabel,
  FormGroup,
} from '@mui/material';

const meta = {
  title: 'MUI/Inputs/FormControlLabel',
  component: FormControlLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI FormControlLabel component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    control: {
      control: 'object',
      description: 'A control element. For instance, it can be a Radio, a Switch or a Checkbox.',
    },
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    label: {
      control: 'text',
      description: 'The text to be used in an enclosing label element.',
    },
    labelPlacement: {
      control: 'select',
      options: ['top', 'start', 'bottom', 'end'],
      description: 'The position of the label.',
      table: {
        defaultValue: { summary: 'end' },
      },
    },
  },
} satisfies Meta<typeof FormControlLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

const FormControlLabelWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 360 }}>
    <FormControlLabel
      control={<Checkbox />}
      label="Form Control Label"
      {...args}
    />
  </Box>
);

const ControlsDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControlLabel
      control={<Checkbox />}
      label="Checkbox"
    />
    <FormControlLabel
      control={<Radio />}
      label="Radio"
    />
    <FormControlLabel
      control={<Switch />}
      label="Switch"
    />
  </Stack>
);

const PlacementDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControlLabel
      control={<Checkbox />}
      label="End"
      labelPlacement="end"
    />
    <FormControlLabel
      control={<Checkbox />}
      label="Start"
      labelPlacement="start"
    />
    <FormControlLabel
      control={<Checkbox />}
      label="Top"
      labelPlacement="top"
    />
    <FormControlLabel
      control={<Checkbox />}
      label="Bottom"
      labelPlacement="bottom"
    />
  </Stack>
);

const StatesDemo = () => (
  <Stack spacing={3} sx={{ width: '100%', maxWidth: 360 }}>
    <FormControlLabel
      control={<Checkbox />}
      label="Default"
    />
    <FormControlLabel
      control={<Checkbox />}
      label="Disabled"
      disabled
    />
    <FormControlLabel
      control={<Checkbox defaultChecked />}
      label="Checked"
    />
  </Stack>
);

const GroupDemo = () => {
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Assign responsibility</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.gilad}
              onChange={handleChange}
              name="gilad"
            />
          }
          label="Gilad Gray"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.jason}
              onChange={handleChange}
              name="jason"
            />
          }
          label="Jason Killian"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={state.antoine}
              onChange={handleChange}
              name="antoine"
            />
          }
          label="Antoine Llorca"
        />
      </FormGroup>
    </FormControl>
  );
};

export const Default: Story = {
  args: {
    control: <Checkbox />,
    label: 'Form Control Label',
    labelPlacement: 'end',
    disabled: false,
  },
  render: (args) => <FormControlLabelWrapper {...args} />,
};

export const Controls: Story = {
  args: {
    control: <Checkbox />,
    label: 'Checkbox',
    labelPlacement: 'end',
  },
  render: () => <ControlsDemo />,
};

export const Placement: Story = {
  args: {
    control: <Checkbox />,
    label: 'Checkbox',
    labelPlacement: 'end',
  },
  render: () => <PlacementDemo />,
};

export const States: Story = {
  args: {
    control: <Checkbox />,
    label: 'Checkbox',
    labelPlacement: 'end',
  },
  render: () => <StatesDemo />,
};

export const Group: Story = {
  args: {
    control: <Checkbox />,
    label: 'Checkbox',
    labelPlacement: 'end',
  },
  render: () => <GroupDemo />,
}; 