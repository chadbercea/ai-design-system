import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Button, 
  Card, 
  CardContent,
  Typography,
  TextField
} from '@mui/material';
import { muiTheme } from '../themes/mui-theme';
import { muiStockTheme } from '../themes/mui-theme-stock';

export const MUIShowcase: React.FC<{ useDDSTheme?: boolean }> = ({ useDDSTheme = false }) => {
  return (
    <ThemeProvider theme={useDDSTheme ? muiTheme : muiStockTheme}>
      <CssBaseline />
      <Typography variant="h5" sx={{ borderBottom: 2, borderColor: 'primary.main', pb: 1, mb: 2 }}>
        MUI Components
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button variant="contained" color="primary">
          Primary Button
        </Button>
        <Button variant="contained" color="secondary">
          Secondary Button
        </Button>
        <Button variant="outlined" color="primary">
          Outlined Button
        </Button>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Card Component
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This card uses design tokens
            </Typography>
          </CardContent>
        </Card>

        <TextField label="Text Input" variant="outlined" size="small" />
      </div>
    </ThemeProvider>
  );
};

