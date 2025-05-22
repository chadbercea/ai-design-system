import * as React from 'react';
import { ThemeProvider, CssBaseline, Button, ButtonGroup, Switch, FormControlLabel } from '@mui/material';
import TokenExtractor from './components/TokenExtractor';
import { getTheme, THEME_KEYS, ThemeKey } from './theme/themeToggle';

/**
 * Renders the main application interface with dynamic theme and color mode switching.
 *
 * Provides controls for selecting between "MUI Default" and "DDS Foundations" themes, as well as toggling between light and dark modes. The selected theme and mode are applied globally using Material-UI's ThemeProvider. Also renders the {@link TokenExtractor} component below the theme controls.
 */
export default function App() {
  // State for theme key and mode
  const [themeKey, setThemeKey] = React.useState<ThemeKey>(THEME_KEYS.MUI_DEFAULT);
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

  // Generate theme based on current selection
  const theme = React.useMemo(() => getTheme(themeKey, mode), [themeKey, mode]);

  // UI controls for theme and mode
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: 16 }}>
        <ButtonGroup variant="outlined" sx={{ mb: 2 }}>
          <Button
            onClick={() => setThemeKey(THEME_KEYS.MUI_DEFAULT)}
            variant={themeKey === THEME_KEYS.MUI_DEFAULT ? 'contained' : 'outlined'}
          >
            MUI Default
          </Button>
          <Button
            onClick={() => setThemeKey(THEME_KEYS.DDS_FOUNDATIONS)}
            variant={themeKey === THEME_KEYS.DDS_FOUNDATIONS ? 'contained' : 'outlined'}
          >
            DDS Foundations
          </Button>
        </ButtonGroup>
        <FormControlLabel
          control={
            <Switch
              checked={mode === 'dark'}
              onChange={() => setMode(mode === 'light' ? 'dark' : 'light')}
              color="primary"
            />
          }
          label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
          sx={{ ml: 2 }}
        />
      </div>
      <TokenExtractor />
    </ThemeProvider>
  );
}