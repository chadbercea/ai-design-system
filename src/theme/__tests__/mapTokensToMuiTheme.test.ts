import { createTheme } from '@mui/material';
import { mapTokensToMuiTheme } from '../mapTokensToMuiTheme';

describe('mapTokensToMuiTheme', () => {
  it('maps tokens to MUI theme correctly', () => {
    const tokens = {
      "color.blue.500": { $value: "#2196f3" },
      "typography.weight.regular": { $value: "400" },
      "typography.size.base": { $value: "14" },
      "spacing.base": { $value: "8" },
      "borderRadius.md": { $value: "4" }
    };

    const theme = createTheme(mapTokensToMuiTheme(tokens));

    expect(theme.palette.primary.main).toBe("#2196f3");
    expect(theme.typography.fontWeightRegular).toBe(400);
    expect(theme.spacing(2)).toBe("16px");
    expect(theme.shape.borderRadius).toBe(4);
  });
}); 