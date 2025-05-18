import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Link, Typography, Box } from '@mui/material';
import type { LinkProps } from '@mui/material';

const meta = {
  title: 'MUI/Navigation/Link',
  component: Link,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Link component with various states and configurations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success', 'inherit'],
      description: 'The color of the link.',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    underline: {
      control: 'select',
      options: ['none', 'hover', 'always'],
      description: 'Controls when the link should have an underline.',
      table: {
        defaultValue: { summary: 'always' },
      },
    },
    variant: {
      control: 'select',
      options: ['body1', 'body2', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'button', 'caption', 'overline'],
      description: 'Applies the theme typography styles.',
      table: {
        defaultValue: { summary: 'inherit' },
      },
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

const LinkWrapper = (args: LinkProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Link href="#" {...args}>
      Link
    </Link>
  </Box>
);

const ColorsDemo = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Link href="#" color="primary">
      Primary Link
    </Link>
    <Link href="#" color="secondary">
      Secondary Link
    </Link>
    <Link href="#" color="error">
      Error Link
    </Link>
    <Link href="#" color="warning">
      Warning Link
    </Link>
    <Link href="#" color="info">
      Info Link
    </Link>
    <Link href="#" color="success">
      Success Link
    </Link>
  </Box>
);

const UnderlineDemo = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Link href="#" underline="none">
      Underline None
    </Link>
    <Link href="#" underline="hover">
      Underline Hover
    </Link>
    <Link href="#" underline="always">
      Underline Always
    </Link>
  </Box>
);

const VariantsDemo = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    <Link href="#" variant="h1">
      H1 Link
    </Link>
    <Link href="#" variant="h2">
      H2 Link
    </Link>
    <Link href="#" variant="h3">
      H3 Link
    </Link>
    <Link href="#" variant="body1">
      Body1 Link
    </Link>
    <Link href="#" variant="body2">
      Body2 Link
    </Link>
    <Link href="#" variant="button">
      Button Link
    </Link>
  </Box>
);

export const Default: Story = {
  args: {
    color: 'primary',
    underline: 'always',
  },
  render: (args) => <LinkWrapper {...args} />,
};

export const Colors: Story = {
  render: () => <ColorsDemo />,
};

export const Underline: Story = {
  render: () => <UnderlineDemo />,
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
}; 