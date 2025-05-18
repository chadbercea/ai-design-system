import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Chip,
  Stack,
  Box,
  Avatar,
} from '@mui/material';
import {
  Face as FaceIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Data display/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Chip component with various styles and interactions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'error',
        'warning',
        'info',
      ],
      description: 'The color of the component.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'filled' },
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
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

const ChipWrapper = (args: any) => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Chip label="Chip" {...args} />
  </Box>
);

const BasicChipsDemo = () => (
  <Stack direction="row" spacing={1}>
    <Chip label="Basic" />
    <Chip label="Disabled" disabled />
    <Chip label="Clickable" onClick={() => {}} />
    <Chip label="Deletable" onDelete={() => {}} />
  </Stack>
);

const ColorChipsDemo = () => (
  <Stack direction="row" spacing={1}>
    <Chip label="Primary" color="primary" />
    <Chip label="Secondary" color="secondary" />
    <Chip label="Success" color="success" />
    <Chip label="Error" color="error" />
    <Chip label="Warning" color="warning" />
    <Chip label="Info" color="info" />
  </Stack>
);

const IconChipsDemo = () => (
  <Stack direction="row" spacing={1}>
    <Chip icon={<FaceIcon />} label="With Icon" />
    <Chip
      avatar={<Avatar>M</Avatar>}
      label="With Avatar"
      variant="outlined"
    />
    <Chip
      icon={<DeleteIcon />}
      label="Delete"
      onDelete={() => {}}
      color="error"
    />
    <Chip
      icon={<CheckIcon />}
      label="Success"
      color="success"
    />
    <Chip
      icon={<WarningIcon />}
      label="Warning"
      color="warning"
    />
  </Stack>
);

const VariantChipsDemo = () => (
  <Stack direction="row" spacing={1}>
    <Chip label="Filled" />
    <Chip label="Outlined" variant="outlined" />
    <Chip label="Filled Primary" color="primary" />
    <Chip label="Outlined Primary" variant="outlined" color="primary" />
  </Stack>
);

const SizeChipsDemo = () => (
  <Stack direction="row" spacing={1}>
    <Chip label="Small" size="small" />
    <Chip label="Medium" size="medium" />
    <Chip label="Small Outlined" size="small" variant="outlined" />
    <Chip label="Medium Outlined" size="medium" variant="outlined" />
  </Stack>
);

export const Default: Story = {
  render: (args) => <ChipWrapper {...args} />,
};

export const Basic: Story = {
  render: () => <BasicChipsDemo />,
};

export const Colors: Story = {
  render: () => <ColorChipsDemo />,
};

export const Icons: Story = {
  render: () => <IconChipsDemo />,
};

export const Variants: Story = {
  render: () => <VariantChipsDemo />,
};

export const Sizes: Story = {
  render: () => <SizeChipsDemo />,
}; 