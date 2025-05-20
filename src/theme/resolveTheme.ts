import { ThemeOptions } from '@mui/material';
import mappingTable from '../../theme-validation/mapping-table.json';
import tokens from '../../build/tokens.mjs';

// Type for the mapping table
type MappingTable = {
  [key: string]: string | null;
};

/**
 * Creates a MUI theme options object from DDS tokens using the mapping table
 * @param tokens The DDS tokens object
 * @returns MUI ThemeOptions object
 */
export function resolveTheme(tokens: any): ThemeOptions {
  // Create a flat object of resolved values
  const flatTheme: Record<string, any> = {};

  // Resolve each MUI key from the mapping table
  for (const muiKey of Object.keys(mappingTable)) {
    const ddsKey = (mappingTable as MappingTable)[muiKey];
    if (ddsKey && tokens[ddsKey] !== undefined) {
      flatTheme[muiKey] = tokens[ddsKey];
    }
  }

  // Transform the flat object into a nested ThemeOptions object
  const theme: any = {};
  for (const [key, value] of Object.entries(flatTheme)) {
    const parts = key.split('.');
    let current = theme;
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part];
    }
    current[parts[parts.length - 1]] = value;
  }

  // Live verification: print the resolved primary color
  if (theme.palette && theme.palette.primary) {
    console.log('DDS THEME primary.main:', theme.palette.primary.main);
  } else {
    console.log('DDS THEME primary.main: NOT FOUND');
  }

  return theme;
} 