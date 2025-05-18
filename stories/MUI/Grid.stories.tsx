import React from 'react';
import { Grid, Box, Typography, Paper } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'MUI/Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Material-UI Grid component with various layouts and spacing options.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    container: {
      control: 'boolean',
      description: 'If true, the component will have the flex container behavior.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    spacing: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
      description: 'Defines the space between the type item components.',
      table: {
        defaultValue: { summary: '0' },
      },
    },
    direction: {
      control: 'select',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
      description: 'Defines the flex-direction style property.',
      table: {
        defaultValue: { summary: 'row' },
      },
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridDemo = (args: any) => (
  <Grid container spacing={2} {...args}>
    <Grid item xs={6}>
      <Box sx={{ bgcolor: 'primary.main', color: '#fff', p: 2 }}>
        <Typography>Grid Item 1</Typography>
      </Box>
    </Grid>
    <Grid item xs={6}>
      <Box sx={{ bgcolor: 'secondary.main', color: '#fff', p: 2 }}>
        <Typography>Grid Item 2</Typography>
      </Box>
    </Grid>
  </Grid>
);

const GridWrapper = (args: any) => (
  <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 800 }}>
    <Grid {...args}>
      {[0, 1, 2, 3, 4, 5].map((value) => (
        <Grid key={value} item xs={4}>
          <Paper
            sx={{
              p: 2,
              textAlign: 'center',
              color: 'text.secondary',
              height: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography>Item {value + 1}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);

const ResponsiveGrid = () => (
  <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 800 }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>xs=12 sm=6 md=4</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>xs=12 sm=6 md=4</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>xs=12 sm=6 md=4</Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const AutoGrid = () => (
  <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 800 }}>
    <Grid container spacing={2}>
      <Grid item xs>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>xs</Typography>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>xs</Typography>
        </Paper>
      </Grid>
      <Grid item xs>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>xs</Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

const NestedGrid = () => (
  <Box sx={{ flexGrow: 1, width: '100%', maxWidth: 800 }}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, textAlign: 'center' }}>
          <Typography>Main Content</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography>Nested 1</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper sx={{ p: 2, textAlign: 'center' }}>
              <Typography>Nested 2</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
);

export const Default: Story = {
  render: (args) => <GridDemo {...args} />,
};

export const Responsive: Story = {
  render: () => <ResponsiveGrid />,
};

export const Auto: Story = {
  render: () => <AutoGrid />,
};

export const Nested: Story = {
  render: () => <NestedGrid />,
}; 