import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Rating,
  Box,
  Stack,
  Typography,
  FormControl,
  FormLabel,
} from '@mui/material';
import {
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVerySatisfied,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Inputs/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Rating component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    precision: {
      control: 'number',
      description: 'The minimum increment value change allowed.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    max: {
      control: 'number',
      description: 'Maximum rating.',
      table: {
        defaultValue: { summary: '5' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
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
    readOnly: {
      control: 'boolean',
      description: 'If true, the rating is read-only.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

const RatingWrapper = (args: any) => {
  const [value, setValue] = React.useState<number | null>(2);

  const handleChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Rating
        value={value}
        onChange={handleChange}
        {...args}
      />
    </Box>
  );
};

const SizesDemo = () => {
  const [value, setValue] = React.useState<number | null>(2);

  const handleChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Sizes</FormLabel>
        <Stack spacing={2}>
          <Rating
            value={value}
            onChange={handleChange}
            size="small"
            aria-label="Small"
          />
          <Rating
            value={value}
            onChange={handleChange}
            size="medium"
            aria-label="Medium"
          />
          <Rating
            value={value}
            onChange={handleChange}
            size="large"
            aria-label="Large"
          />
        </Stack>
      </FormControl>
    </Stack>
  );
};

const StatesDemo = () => {
  const [value, setValue] = React.useState<number | null>(2);

  const handleChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>States</FormLabel>
        <Stack spacing={2}>
          <Rating
            value={value}
            onChange={handleChange}
            aria-label="Default"
          />
          <Rating
            value={value}
            onChange={handleChange}
            disabled
            aria-label="Disabled"
          />
          <Rating
            value={value}
            readOnly
            aria-label="Read Only"
          />
        </Stack>
      </FormControl>
    </Stack>
  );
};

const PrecisionDemo = () => {
  const [value, setValue] = React.useState<number | null>(2);

  const handleChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={4}>
      <FormControl>
        <FormLabel>Precision</FormLabel>
        <Stack spacing={2}>
          <Rating
            value={value}
            onChange={handleChange}
            precision={0.5}
            aria-label="Half"
          />
          <Rating
            value={value}
            onChange={handleChange}
            precision={0.1}
            aria-label="Tenth"
          />
        </Stack>
      </FormControl>
    </Stack>
  );
};

const CustomIconsDemo = () => {
  const [value, setValue] = React.useState<number | null>(2);

  const handleChange = (_event: React.SyntheticEvent, newValue: number | null) => {
    setValue(newValue);
  };

  const customIcons: {
    [index: number]: {
      icon: React.ReactElement;
      label: string;
    };
  } = {
    1: {
      icon: <SentimentVeryDissatisfied color="error" />,
      label: 'Very Dissatisfied',
    },
    2: {
      icon: <SentimentDissatisfied color="error" />,
      label: 'Dissatisfied',
    },
    3: {
      icon: <SentimentSatisfied color="warning" />,
      label: 'Neutral',
    },
    4: {
      icon: <SentimentSatisfiedAlt color="success" />,
      label: 'Satisfied',
    },
    5: {
      icon: <SentimentVerySatisfied color="success" />,
      label: 'Very Satisfied',
    },
  };

  return (
    <Box sx={{ width: 300 }}>
      <FormControl>
        <FormLabel>Custom Icons</FormLabel>
        <Rating
          value={value}
          onChange={handleChange}
          max={5}
          getLabelText={(value: number) => customIcons[value].label}
          icon={customIcons[5].icon}
          emptyIcon={customIcons[1].icon}
        />
      </FormControl>
    </Box>
  );
};

export const Default: Story = {
  render: (args) => <RatingWrapper {...args} />,
};

export const Sizes: Story = {
  render: () => <SizesDemo />,
};

export const States: Story = {
  render: () => <StatesDemo />,
};

export const Precision: Story = {
  render: () => <PrecisionDemo />,
};

export const CustomIcons: Story = {
  render: () => <CustomIconsDemo />,
}; 