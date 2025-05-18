import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, Stack, Box, Typography } from '@mui/material';

const meta = {
  title: 'MUI/Feedback/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Alert component with various severity levels and variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['error', 'warning', 'info', 'success'],
      description: 'The severity of the alert.',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    variant: {
      control: 'select',
      options: ['filled', 'outlined', 'standard'],
      description: 'The variant to use.',
      table: {
        defaultValue: { summary: 'standard' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when the component requests to be closed.',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

const AlertWrapper = (args: any) => (
  <Box sx={{ width: '100%', maxWidth: 600 }}>
    <Alert {...args}>
      This is an alert message.
    </Alert>
  </Box>
);

const SeverityDemo = () => (
  <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
    <Alert severity="error">This is an error alert.</Alert>
    <Alert severity="warning">This is a warning alert.</Alert>
    <Alert severity="info">This is an info alert.</Alert>
    <Alert severity="success">This is a success alert.</Alert>
  </Stack>
);

const VariantDemo = () => (
  <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
    <Alert variant="standard" severity="error">
      This is a standard error alert.
    </Alert>
    <Alert variant="outlined" severity="warning">
      This is an outlined warning alert.
    </Alert>
    <Alert variant="filled" severity="info">
      This is a filled info alert.
    </Alert>
    <Alert variant="filled" severity="success">
      This is a filled success alert.
    </Alert>
  </Stack>
);

const ActionDemo = () => (
  <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
    <Alert onClose={() => {}}>This is a closable alert.</Alert>
    <Alert
      action={
        <button onClick={() => {}}>
          UNDO
        </button>
      }
    >
      This is an alert with an action.
    </Alert>
  </Stack>
);

const DescriptionDemo = () => (
  <Stack spacing={2} sx={{ width: '100%', maxWidth: 600 }}>
    <Alert severity="error">
      <Typography variant="h6" sx={{ mb: 1 }}>Error</Typography>
      This is an error alert with a title and description.
    </Alert>
    <Alert severity="warning">
      <Typography variant="h6" sx={{ mb: 1 }}>Warning</Typography>
      This is a warning alert with a title and description.
    </Alert>
    <Alert severity="info">
      <Typography variant="h6" sx={{ mb: 1 }}>Info</Typography>
      This is an info alert with a title and description.
    </Alert>
    <Alert severity="success">
      <Typography variant="h6" sx={{ mb: 1 }}>Success</Typography>
      This is a success alert with a title and description.
    </Alert>
  </Stack>
);

export const Default: Story = {
  render: (args) => <AlertWrapper {...args} />,
};

export const Severity: Story = {
  render: () => <SeverityDemo />,
};

export const Variants: Story = {
  render: () => <VariantDemo />,
};

export const Actions: Story = {
  render: () => <ActionDemo />,
};

export const Description: Story = {
  render: () => <DescriptionDemo />,
}; 