import React from 'react';
import { Typography, ThemeProvider, createTheme } from '@mui/material';
import { theme as ddsTheme } from '../../build/mui/theme';

const stockTheme = createTheme();

export default {
  title: 'MUI/Typography',
  component: Typography
};

export const StockMUI = () => (
  <ThemeProvider theme={stockTheme}>
    <div style={{ padding: '20px' }}>
      <h3>Stock MUI Typography</h3>
      <p>Using MUI's default font sizes, weights, and line heights.</p>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body1" paragraph>
        This is body1 text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="body2" paragraph>
        This is body2 text. Smaller than body1, often used for secondary content.
      </Typography>
      <Typography variant="caption" display="block">
        Caption text - very small text for captions or labels
      </Typography>
    </div>
  </ThemeProvider>
);

export const WithDDSTheme = () => (
  <ThemeProvider theme={ddsTheme}>
    <div style={{ padding: '20px' }}>
      <h3>Typography with DDS Theme</h3>
      <p>Using your design system's typography scales from Figma.</p>
      <Typography variant="h1">Heading 1</Typography>
      <Typography variant="h2">Heading 2</Typography>
      <Typography variant="h3">Heading 3</Typography>
      <Typography variant="h4">Heading 4</Typography>
      <Typography variant="h5">Heading 5</Typography>
      <Typography variant="h6">Heading 6</Typography>
      <Typography variant="body1" paragraph>
        This is body1 text. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </Typography>
      <Typography variant="body2" paragraph>
        This is body2 text. Smaller than body1, often used for secondary content.
      </Typography>
      <Typography variant="caption" display="block">
        Caption text - very small text for captions or labels
      </Typography>
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Typography Tokens Applied:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px', fontSize: '14px' }}>
          <li>Font sizes: 10px, 12px, 14px, 16px, 18px, 21px, 24px, 32px, 40px, 48px</li>
          <li>Font weights: 300 (light), 400 (regular), 500 (medium), 700 (bold), 900 (extrabold)</li>
          <li>All values sourced from your Figma design tokens</li>
        </ul>
      </div>
    </div>
  </ThemeProvider>
);

