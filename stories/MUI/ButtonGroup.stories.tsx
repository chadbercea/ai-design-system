import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  ButtonGroup,
  Button,
  Box,
  Stack,
} from '@mui/material';
import type { ButtonGroupProps } from '@mui/material';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  FormatAlignJustify,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Inputs/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI ButtonGroup component with various states and configurations.',
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
    disabled: {
      control: 'boolean',
      description: 'If true, the component is disabled.',
      table: {
        defaultValue: { summary: 'false' },
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
    variant: {
      control: 'select',
      options: ['text', 'outlined', 'contained'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'outlined' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the button group.',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const ButtonGroupWrapper = (args: ButtonGroupProps) => {
  return (
    <Box>
      <ButtonGroup {...args}>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Box>
  );
};

const ColorsDemo = () => {
  return (
    <Stack spacing={2}>
      <ButtonGroup variant="contained" color="primary">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="secondary">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained" color="success">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};

const SizesDemo = () => {
  return (
    <Stack spacing={2}>
      <ButtonGroup size="small" variant="contained">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup size="medium" variant="contained">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup size="large" variant="contained">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};

const VariantsDemo = () => {
  return (
    <Stack spacing={2}>
      <ButtonGroup variant="text">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="outlined">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup variant="contained">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};

const StatesDemo = () => {
  return (
    <Stack spacing={2}>
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup disabled>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};

const OrientationDemo = () => {
  return (
    <Stack direction="row" spacing={2}>
      <ButtonGroup orientation="horizontal">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical">
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup>
    </Stack>
  );
};

const IconsDemo = () => {
  return (
    <Stack spacing={2}>
      <ButtonGroup variant="contained">
        <Button>
          <FormatAlignLeft />
        </Button>
        <Button>
          <FormatAlignCenter />
        </Button>
        <Button>
          <FormatAlignRight />
        </Button>
        <Button>
          <FormatAlignJustify />
        </Button>
      </ButtonGroup>
      <ButtonGroup variant="contained">
        <Button>
          <FormatBold />
        </Button>
        <Button>
          <FormatItalic />
        </Button>
        <Button>
          <FormatUnderlined />
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

export const Default: Story = {
  args: {
    color: 'primary',
    disabled: false,
    size: 'medium',
    variant: 'outlined',
    orientation: 'horizontal',
  },
  render: (args) => <ButtonGroupWrapper {...args} />,
};

export const Colors: Story = {
  args: {
    variant: 'contained',
  },
  render: () => <ColorsDemo />,
};

export const Sizes: Story = {
  args: {
    variant: 'contained',
  },
  render: () => <SizesDemo />,
};

export const Variants: Story = {
  args: {},
  render: () => <VariantsDemo />,
};

export const States: Story = {
  args: {},
  render: () => <StatesDemo />,
};

export const Orientation: Story = {
  args: {},
  render: () => <OrientationDemo />,
};

export const Icons: Story = {
  args: {
    variant: 'contained',
  },
  render: () => <IconsDemo />,
}; 