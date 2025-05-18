import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Breadcrumbs,
  Link,
  Typography,
  Box,
} from '@mui/material';
import {
  NavigateNext as NavigateNextIcon,
  Home as HomeIcon,
  Whatshot as WhatshotIcon,
  Grain as GrainIcon,
} from '@mui/icons-material';

const meta = {
  title: 'MUI/Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Breadcrumbs component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxItems: {
      control: 'number',
      description: 'Specifies the maximum number of breadcrumbs to display.',
      table: {
        defaultValue: { summary: '8' },
      },
    },
    itemsAfterCollapse: {
      control: 'number',
      description: 'Specifies the number of items to show after the ellipsis.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    itemsBeforeCollapse: {
      control: 'number',
      description: 'Specifies the number of items to show before the ellipsis.',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    separator: {
      control: 'text',
      description: 'Custom separator node.',
    },
    expandText: {
      control: 'text',
      description: 'Override the default label for the expand button.',
    },
  },
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

const BreadcrumbsWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 500 }}>
    <Breadcrumbs {...args}>
      <Link
        underline="hover"
        color="inherit"
        href="/"
      >
        MUI
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href="/getting-started/installation/"
      >
        Core
      </Link>
      <Typography color="text.primary">Breadcrumbs</Typography>
    </Breadcrumbs>
  </Box>
);

const WithIconsDemo = () => (
  <Box sx={{ width: '100%', maxWidth: 500 }}>
    <Breadcrumbs aria-label="breadcrumb">
      <Link
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/"
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        MUI
      </Link>
      <Link
        underline="hover"
        sx={{ display: 'flex', alignItems: 'center' }}
        color="inherit"
        href="/getting-started/installation/"
      >
        <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Core
      </Link>
      <Typography
        sx={{ display: 'flex', alignItems: 'center' }}
        color="text.primary"
      >
        <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Breadcrumbs
      </Typography>
    </Breadcrumbs>
  </Box>
);

const CustomSeparatorDemo = () => (
  <Box sx={{ width: '100%', maxWidth: 500 }}>
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      <Link
        underline="hover"
        color="inherit"
        href="/"
      >
        MUI
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href="/getting-started/installation/"
      >
        Core
      </Link>
      <Typography color="text.primary">Breadcrumbs</Typography>
    </Breadcrumbs>
  </Box>
);

export const Default: Story = {
  args: {
    maxItems: 8,
    itemsAfterCollapse: 1,
    itemsBeforeCollapse: 1,
  },
  render: (args) => <BreadcrumbsWrapper {...args} />,
};

export const WithIcons: Story = {
  render: () => <WithIconsDemo />,
};

export const CustomSeparator: Story = {
  render: () => <CustomSeparatorDemo />,
}; 