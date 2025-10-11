import React from 'react';
import { Card, CardContent, CardActions, Button, Typography, ThemeProvider, createTheme } from '@mui/material';
import { theme as ddsTheme } from '../../build/mui/theme';

const stockTheme = createTheme();

export default {
  title: 'MUI/Card',
  component: Card
};

export const StockMUI = () => (
  <ThemeProvider theme={stockTheme}>
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h3>Stock MUI Card</h3>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Card Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a card using MUI's default theme. Notice the colors, spacing, and typography all come from MUI's built-in defaults.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">Learn More</Button>
          <Button size="small" color="secondary">Share</Button>
        </CardActions>
      </Card>
    </div>
  </ThemeProvider>
);

export const WithDDSTheme = () => (
  <ThemeProvider theme={ddsTheme}>
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h3>Card with DDS Theme</h3>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Card Title
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is a card using your design system theme. The colors, spacing, and typography all come from your Figma tokens.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">Learn More</Button>
          <Button size="small" color="secondary">Share</Button>
        </CardActions>
      </Card>
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Design Tokens Applied:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px', fontSize: '14px' }}>
          <li>Colors from your Blue and Grey palettes</li>
          <li>Typography scales from your token definitions</li>
          <li>Spacing using your design system's spacing scale</li>
        </ul>
      </div>
    </div>
  </ThemeProvider>
);

