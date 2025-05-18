import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Badge,
  Box,
  Stack,
  IconButton,
  Avatar,
  Typography,
} from '@mui/material';
import {
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Data display/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Badge component with various styles and positions.',
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
        defaultValue: { summary: 'primary' },
      },
    },
    variant: {
      control: 'select',
      options: ['standard', 'dot'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'standard' },
      },
    },
    overlap: {
      control: 'select',
      options: ['rectangular', 'circular'],
      description: 'Wrapped shape the badge should overlap.',
      table: {
        defaultValue: { summary: 'rectangular' },
      },
    },
    anchorOrigin: {
      control: 'object',
      description: 'The anchor of the badge.',
      table: {
        defaultValue: { summary: '{ vertical: "top", horizontal: "right" }' },
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

const BadgeWrapper = (args: any) => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Badge {...args}>
      <MailIcon />
    </Badge>
  </Box>
);

const IconBadgesDemo = () => (
  <Stack direction="row" spacing={2}>
    <IconButton size="large">
      <Badge badgeContent={4} color="primary">
        <MailIcon />
      </Badge>
    </IconButton>
    <IconButton size="large">
      <Badge badgeContent={4} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
    <IconButton size="large">
      <Badge badgeContent={4} color="error">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  </Stack>
);

const AvatarBadgesDemo = () => (
  <Stack direction="row" spacing={2}>
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
    </Badge>
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent=" "
      color="success"
    >
      <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
    </Badge>
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={5}
      color="error"
    >
      <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
    </Badge>
  </Stack>
);

const PositionDemo = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Badge badgeContent={4} color="primary">
        <MailIcon />
      </Badge>
      <Badge badgeContent={4} color="primary" anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
        <MailIcon />
      </Badge>
    </Box>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Badge badgeContent={4} color="primary" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MailIcon />
      </Badge>
      <Badge badgeContent={4} color="primary" anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
        <MailIcon />
      </Badge>
    </Box>
  </Box>
);

const MaxValueDemo = () => (
  <Stack direction="row" spacing={2}>
    <Badge badgeContent={99} color="primary">
      <MailIcon />
    </Badge>
    <Badge badgeContent={100} color="primary">
      <MailIcon />
    </Badge>
    <Badge badgeContent={1000} max={999} color="primary">
      <MailIcon />
    </Badge>
  </Stack>
);

export const Default: Story = {
  render: (args) => <BadgeWrapper {...args} />,
};

export const IconBadges: Story = {
  render: () => <IconBadgesDemo />,
};

export const AvatarBadges: Story = {
  render: () => <AvatarBadgesDemo />,
};

export const Position: Story = {
  render: () => <PositionDemo />,
};

export const MaxValue: Story = {
  render: () => <MaxValueDemo />,
}; 