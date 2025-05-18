import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, Box, Stack } from '@mui/material';
import {
  Person as PersonIcon,
  Image as ImageIcon,
  Work as WorkIcon,
  BeachAccess as BeachAccessIcon,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Data display/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Avatar component with various sizes, colors, and variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['circular', 'rounded', 'square'],
      description: 'The shape of the avatar.',
      table: {
        defaultValue: { summary: 'circular' },
      },
    },
    sizes: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'The size of the avatar.',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
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
        defaultValue: { summary: 'primary' },
      },
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

const AvatarWrapper = (args: any) => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Avatar {...args}>
      <PersonIcon />
    </Avatar>
  </Box>
);

const SizesDemo = () => (
  <Stack direction="row" spacing={2}>
    <Avatar sx={{ width: 24, height: 24 }}>S</Avatar>
    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
    <Avatar sx={{ width: 40, height: 40 }}>L</Avatar>
    <Avatar sx={{ width: 56, height: 56 }}>XL</Avatar>
  </Stack>
);

const ColorsDemo = () => (
  <Stack direction="row" spacing={2}>
    <Avatar sx={{ bgcolor: 'primary.main' }}>P</Avatar>
    <Avatar sx={{ bgcolor: 'secondary.main' }}>S</Avatar>
    <Avatar sx={{ bgcolor: 'success.main' }}>S</Avatar>
    <Avatar sx={{ bgcolor: 'error.main' }}>E</Avatar>
    <Avatar sx={{ bgcolor: 'warning.main' }}>W</Avatar>
    <Avatar sx={{ bgcolor: 'info.main' }}>I</Avatar>
  </Stack>
);

const VariantsDemo = () => (
  <Stack direction="row" spacing={2}>
    <Avatar variant="circular">
      <PersonIcon />
    </Avatar>
    <Avatar variant="rounded">
      <WorkIcon />
    </Avatar>
    <Avatar variant="square">
      <BeachAccessIcon />
    </Avatar>
  </Stack>
);

const ImageDemo = () => (
  <Stack direction="row" spacing={2}>
    <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
    <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
    <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
    <Avatar>
      <ImageIcon />
    </Avatar>
  </Stack>
);

export const Default: Story = {
  render: (args) => <AvatarWrapper {...args} />,
};

export const Sizes: Story = {
  render: () => <SizesDemo />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
};

export const Images: Story = {
  render: () => <ImageDemo />,
}; 