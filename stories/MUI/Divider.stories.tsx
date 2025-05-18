import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Divider,
  Box,
  Stack,
  Typography,
  Paper,
} from '@mui/material';

const meta = {
  title: 'MUI/Data display/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Divider component with various styles and orientations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['fullWidth', 'inset', 'middle'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'fullWidth' },
      },
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The divider orientation.',
      table: {
        defaultValue: { summary: 'horizontal' },
      },
    },
    flexItem: {
      control: 'boolean',
      description: 'If true, the divider will be a flex item.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

const DividerWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 600 }}>
    <Typography>Above</Typography>
    <Divider {...args} />
    <Typography>Below</Typography>
  </Box>
);

const VariantDemo = () => (
  <Box sx={{ width: '100%', maxWidth: 600 }}>
    <Typography>Full Width</Typography>
    <Divider variant="fullWidth" />
    <Typography sx={{ mt: 2 }}>Inset</Typography>
    <Divider variant="inset" />
    <Typography sx={{ mt: 2 }}>Middle</Typography>
    <Divider variant="middle" />
  </Box>
);

const OrientationDemo = () => (
  <Box sx={{ display: 'flex', height: 100, alignItems: 'center' }}>
    <Typography>Left</Typography>
    <Divider orientation="vertical" flexItem />
    <Typography>Center</Typography>
    <Divider orientation="vertical" flexItem />
    <Typography>Right</Typography>
  </Box>
);

const WithTextDemo = () => (
  <Box sx={{ width: '100%', maxWidth: 600 }}>
    <Divider>
      <Typography variant="body2" color="text.secondary">
        OR
      </Typography>
    </Divider>
  </Box>
);

const ListDemo = () => (
  <Paper sx={{ width: '100%', maxWidth: 600 }}>
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">List Item 1</Typography>
      <Typography variant="body2" color="text.secondary">
        Description for item 1
      </Typography>
    </Box>
    <Divider />
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">List Item 2</Typography>
      <Typography variant="body2" color="text.secondary">
        Description for item 2
      </Typography>
    </Box>
    <Divider />
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">List Item 3</Typography>
      <Typography variant="body2" color="text.secondary">
        Description for item 3
      </Typography>
    </Box>
  </Paper>
);

export const Default: Story = {
  args: {
    variant: 'fullWidth',
  },
  render: (args) => <DividerWrapper {...args} />,
};

export const Variants: Story = {
  args: {
    variant: 'fullWidth',
  },
  render: () => <VariantDemo />,
};

export const Orientation: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: () => <OrientationDemo />,
};

export const WithText: Story = {
  args: {
    variant: 'fullWidth',
  },
  render: () => <WithTextDemo />,
};

export const List: Story = {
  args: {
    variant: 'fullWidth',
  },
  render: () => <ListDemo />,
}; 