/**
 * Architectural Guideline for MUI Masonry and Theme Switching
 *
 * 1. We generate both light and dark themes at Storybook boot time using createTheme.
 * 2. Both theme objects are stored and referenced statically in memory. Do not re-instantiate them on toggle.
 * 3. On theme change, we directly switch the active ThemeProvider to use the prebuilt theme object.
 * 4. Masonry must be wrapped in a container that is keyed by the theme mode string. This forces a full React remount.
 * 5. Do not rely on context-only updates or passive re-renders. Masonry's internal ResizeObserver will not reflow unless it sees a remount or layout shift.
 * 6. Do not attempt DOM-based resize workarounds. They are ignored by Masonry unless the layout box model actually changes.
 * 7. The theme switch logic must be synchronous and driven by a real key change and static theme object swap.
 * 8. This pattern avoids persistent layout drift and guarantees Masonry will rebuild correctly on theme mode transitions.
 *
 * Ensure any decorator or story logic complies with this structure. If component reflows are still broken after this,
 * verify that the theme key passed to Masonry actually changes and that the parent container fully remounts it.
 */

import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Paper,
  Stack,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  CardActions
} from '@mui/material';
import { Masonry } from '@mui/lab';
import {
  Delete as DeleteIcon,
  Send as SendIcon,
  Alarm as AlarmIcon,
  AddShoppingCart as AddShoppingCartIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';

const meta: Meta = {
  title: 'MUI/Theme Masonry Showcase',
  component: Box,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeShowcase: Story = {
  render: () => (
    <Box sx={{ width: '100%', minHeight: '100vh', p: 4, bgcolor: 'background.default' }}>
      <Masonry 
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} 
        spacing={3}
        sx={{ width: '100%' }}
      >
        {/* Typography Card */}
        <Card sx={{ width: '100%', maxWidth: 350, mx: 'auto', transition: 'box-shadow 0.3s', boxShadow: 2, '&:hover': { boxShadow: 8 } }}>
          <CardHeader title="Typography" />
          <CardContent>
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
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="text">MUI Docs</Button>
            <Button variant="contained" color="primary">See More</Button>
          </CardActions>
        </Card>

        {/* Buttons Card */}
        <Card sx={{ width: '100%', maxWidth: 350, mx: 'auto', transition: 'box-shadow 0.3s', boxShadow: 2, '&:hover': { boxShadow: 8 } }}>
          <CardHeader title="Buttons" />
          <CardContent>
            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Variants
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="text">Text</Button>
                  <Button variant="contained">Contained</Button>
                  <Button variant="outlined">Outlined</Button>
                </Stack>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Sizes
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button variant="contained" size="small">Small</Button>
                  <Button variant="contained" size="medium">Medium</Button>
                  <Button variant="contained" size="large">Large</Button>
                </Stack>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Colors
                </Typography>
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  <Button variant="contained" color="primary">Primary</Button>
                  <Button variant="contained" color="secondary">Secondary</Button>
                  <Button variant="contained" color="success">Success</Button>
                  <Button variant="contained" color="error">Error</Button>
                  <Button variant="contained" color="info">Info</Button>
                  <Button variant="contained" color="warning">Warning</Button>
                </Stack>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  With Icons
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" startIcon={<DeleteIcon />}>Delete</Button>
                  <Button variant="contained" endIcon={<SendIcon />}>Send</Button>
                </Stack>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Icon Buttons
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton color="primary"><DeleteIcon /></IconButton>
                  <IconButton color="secondary"><AlarmIcon /></IconButton>
                  <IconButton color="success"><AddShoppingCartIcon /></IconButton>
                  <IconButton color="error"><CloudUploadIcon /></IconButton>
                </Stack>
              </Box>
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="text">MUI Docs</Button>
            <Button variant="contained" color="primary">See More</Button>
          </CardActions>
        </Card>

        {/* Text Fields Card */}
        <Card sx={{ width: '100%', maxWidth: 350, mx: 'auto', transition: 'box-shadow 0.3s', boxShadow: 2, '&:hover': { boxShadow: 8 } }}>
          <CardHeader title="Text Fields" />
          <CardContent>
            <Stack spacing={2}>
              <TextField 
                label="Standard" 
                variant="outlined"
                size="small"
                fullWidth 
              />
              <TextField 
                label="Outlined" 
                variant="outlined"
                size="small"
                fullWidth 
              />
              <TextField 
                label="Filled" 
                variant="outlined"
                size="small"
                fullWidth 
              />
              <TextField 
                label="With Helper Text" 
                variant="outlined"
                size="small"
                helperText="Some important text" 
                fullWidth 
              />
              <TextField 
                label="Error" 
                variant="outlined"
                size="small"
                error 
                helperText="Error message" 
                fullWidth 
              />
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="text">MUI Docs</Button>
            <Button variant="contained" color="primary">See More</Button>
          </CardActions>
        </Card>

        {/* Paper & Elevation Card */}
        <Card sx={{ width: '100%', maxWidth: 350, mx: 'auto', transition: 'box-shadow 0.3s', boxShadow: 2, '&:hover': { boxShadow: 8 } }}>
          <CardHeader title="Paper & Elevation" />
          <CardContent>
            <Stack spacing={2}>
              <Paper elevation={0} sx={{ p: 2, textAlign: 'center' }}>
                Elevation 0
              </Paper>
              <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                Elevation 1
              </Paper>
              <Paper elevation={2} sx={{ p: 2, textAlign: 'center' }}>
                Elevation 2
              </Paper>
              <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                Elevation 3
              </Paper>
              <Paper elevation={4} sx={{ p: 2, textAlign: 'center' }}>
                Elevation 4
              </Paper>
              <Paper elevation={5} sx={{ p: 2, textAlign: 'center' }}>
                Elevation 5
              </Paper>
            </Stack>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button variant="text">MUI Docs</Button>
            <Button variant="contained" color="primary">See More</Button>
          </CardActions>
        </Card>
      </Masonry>
    </Box>
  ),
};