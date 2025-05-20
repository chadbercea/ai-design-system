import { resolveTheme } from '../resolveTheme';
import { ThemeOptions } from '@mui/material';

describe('resolveTheme', () => {
  const mockTokens = {
    base: {
      color: {
        blue: {
          700: { $value: '#006596', $type: 'color' },
          400: { $value: '#53AFDC', $type: 'color' },
          800: { $value: '#005179', $type: 'color' }
        },
        common: {
          white: { $value: '#FFFFFF', $type: 'color' }
        }
      }
    }
  };

  it('should resolve mapped tokens correctly', () => {
    const theme = resolveTheme(mockTokens) as ThemeOptions & {
      palette?: {
        primary?: {
          main?: string;
          light?: string;
          dark?: string;
        };
        background?: {
          paper?: string;
          default?: string;
        };
      };
    };

    // Test primary palette values
    expect(theme.palette?.primary?.main).toBe('#006596');
    expect(theme.palette?.primary?.light).toBe('#53AFDC');
    expect(theme.palette?.primary?.dark).toBe('#005179');

    // Test background values
    expect(theme.palette?.background?.paper).toBe('#FFFFFF');
    expect(theme.palette?.background?.default).toBe('#FFFFFF');
  });

  it('should handle unmapped tokens gracefully', () => {
    const theme = resolveTheme(mockTokens) as ThemeOptions & {
      palette?: {
        primary?: {
          contrastText?: string;
        };
      };
      typography?: {
        fontFamily?: string;
      };
      shape?: {
        borderRadius?: number;
      };
    };

    // These should be undefined since they're not mapped
    expect(theme.palette?.primary?.contrastText).toBeUndefined();
    expect(theme.typography?.fontFamily).toBeUndefined();
    expect(theme.shape?.borderRadius).toBeUndefined();
  });

  it('should maintain MUI theme structure', () => {
    const theme = resolveTheme(mockTokens);

    // Verify the theme has the correct structure
    expect(theme).toHaveProperty('palette');
    expect(theme.palette).toHaveProperty('primary');
    expect(theme.palette).toHaveProperty('background');
  });
}); 