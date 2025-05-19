import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Box, 
  Typography, 
  Button, 
  TextField, 
  Paper,
  Stack,
  Divider
} from '@mui/material';

const meta: Meta = {
  title: 'MUI/Theme Comparison',
  component: Box,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeShowcase: Story = {
  render: () => (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      {/* Typography Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Typography
        </Typography>
        <Stack spacing={2}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="body1">
            Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography variant="body2">
            Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography variant="button">Button Text</Typography>
        </Stack>
      </Paper>

      {/* Buttons Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Buttons
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Button variant="contained">Contained</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="secondary">Secondary</Button>
          <Button variant="outlined" color="secondary">Secondary</Button>
          <Button variant="text" color="secondary">Secondary</Button>
        </Stack>
      </Paper>

      {/* Text Fields Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Text Fields
        </Typography>
        <Stack spacing={2}>
          <TextField 
            label="Standard" 
            variant="standard" 
            fullWidth 
          />
          <TextField 
            label="Outlined" 
            variant="outlined" 
            fullWidth 
          />
          <TextField 
            label="Filled" 
            variant="filled" 
            fullWidth 
          />
          <TextField 
            label="With Helper Text" 
            helperText="Some important text" 
            fullWidth 
          />
          <TextField 
            label="Error" 
            error 
            helperText="Error message" 
            fullWidth 
          />
        </Stack>
      </Paper>

      {/* Paper & Elevation Section */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Paper & Elevation
        </Typography>
        <Stack direction="row" spacing={2}>
          <Paper elevation={0} sx={{ p: 2, width: 100, textAlign: 'center' }}>
            Elevation 0
          </Paper>
          <Paper elevation={1} sx={{ p: 2, width: 100, textAlign: 'center' }}>
            Elevation 1
          </Paper>
          <Paper elevation={2} sx={{ p: 2, width: 100, textAlign: 'center' }}>
            Elevation 2
          </Paper>
          <Paper elevation={3} sx={{ p: 2, width: 100, textAlign: 'center' }}>
            Elevation 3
          </Paper>
          <Paper elevation={4} sx={{ p: 2, width: 100, textAlign: 'center' }}>
            Elevation 4
          </Paper>
        </Stack>
      </Paper>
    </Box>
  ),
}; 