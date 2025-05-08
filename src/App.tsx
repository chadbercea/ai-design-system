import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import TokenExtractor from './components/TokenExtractor';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TokenExtractor />
    </ThemeProvider>
  );
}