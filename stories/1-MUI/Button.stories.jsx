import React from 'react';
import { Button, ThemeProvider, createTheme } from '@mui/material';
import { theme as ddsTheme } from '../../build/mui/theme';

const stockTheme = createTheme();

export default {
  title: 'MUI/Button',
  component: Button
};

export const StockMUI = () => (
  <ThemeProvider theme={stockTheme}>
    <div style={{ padding: '20px' }}>
      <h3>Stock MUI Buttons</h3>
      <p>Using MUI's default theme colors and styling.</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="contained" color="warning">Warning</Button>
        <Button variant="contained" color="info">Info</Button>
        <Button variant="contained" color="success">Success</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
        <Button variant="outlined" color="primary">Outlined Primary</Button>
        <Button variant="outlined" color="secondary">Outlined Secondary</Button>
        <Button variant="text" color="primary">Text Primary</Button>
      </div>
    </div>
  </ThemeProvider>
);

export const WithDDSTheme = () => (
  <ThemeProvider theme={ddsTheme}>
    <div style={{ padding: '20px' }}>
      <h3>Buttons with DDS Theme</h3>
      <p>Using your design system tokens from Figma.</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Button variant="contained" color="primary">Primary</Button>
        <Button variant="contained" color="secondary">Secondary</Button>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="contained" color="warning">Warning</Button>
        <Button variant="contained" color="info">Info</Button>
        <Button variant="contained" color="success">Success</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
        <Button variant="outlined" color="primary">Outlined Primary</Button>
        <Button variant="outlined" color="secondary">Outlined Secondary</Button>
        <Button variant="text" color="primary">Text Primary</Button>
      </div>
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Token Info:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li>Primary: Blue.500 from your Figma tokens</li>
          <li>Secondary: Grey.500 from your Figma tokens</li>
          <li>Typography: Font sizes and weights from your design system</li>
        </ul>
      </div>
    </div>
  </ThemeProvider>
);

