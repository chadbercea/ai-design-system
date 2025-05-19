import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Box, 
  Typography, 
  Grid,
  Paper,
  useTheme,
  Divider
} from '@mui/material';

const meta: Meta = {
  title: 'DDS/Foundations',
  component: Box,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const ColorSwatch = ({ name, value }: { name: string; value: string }) => {
  const theme = useTheme();
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 1,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Box 
        sx={{ 
          height: 100, 
          bgcolor: value,
          borderRadius: 1,
          border: `1px solid ${theme.palette.divider}`
        }} 
      />
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="caption" color="text.secondary">{value}</Typography>
    </Paper>
  );
};

const ColorSection = ({ title, colors }: { title: string; colors: Record<string, string> }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        {Object.entries(colors).map(([key, value]) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <ColorSwatch name={key} value={value} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const SpacingSwatch = ({ name, value }: { name: string; value: string }) => {
  const theme = useTheme();
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 1,
        border: `1px solid ${theme.palette.divider}`
      }}
    >
      <Box 
        sx={{ 
          height: 40,
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Box 
          sx={{ 
            width: value,
            height: 20,
            bgcolor: 'primary.main',
            borderRadius: 1
          }} 
        />
        <Typography variant="caption">{value}</Typography>
      </Box>
      <Typography variant="subtitle2">{name}</Typography>
    </Paper>
  );
};

const TypographySwatch = ({ variant, text }: { variant: string; text: string }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 1,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography variant={variant as any}>{text}</Typography>
      <Typography variant="caption" color="text.secondary">{variant}</Typography>
    </Paper>
  );
};

const ElevationSwatch = ({ level }: { level: number }) => {
  return (
    <Paper 
      elevation={level}
      sx={{ 
        p: 2, 
        height: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography>Elevation {level}</Typography>
    </Paper>
  );
};

const ZIndexSwatch = ({ name, value }: { name: string; value: number }) => {
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column',
        gap: 1,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="caption" color="text.secondary">{value}</Typography>
    </Paper>
  );
};

export const Foundations: Story = {
  render: () => {
    const theme = useTheme();
    
    // Group colors by their base name
    const colorGroups = Object.entries(theme.palette).reduce((acc, [key, value]) => {
      if (typeof value === 'string' && value.startsWith('#')) {
        const baseName = key.split('.')[0];
        if (!acc[baseName]) {
          acc[baseName] = {};
        }
        acc[baseName][key] = value;
      }
      return acc;
    }, {} as Record<string, Record<string, string>>);
    
    return (
      <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
        <Typography variant="h1" gutterBottom>
          DDS Foundations
        </Typography>
        
        {/* Colors */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Colors
          </Typography>
          {Object.entries(colorGroups).map(([groupName, colors]) => (
            <ColorSection key={groupName} title={groupName} colors={colors} />
          ))}
        </Box>

        {/* Typography */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Typography
          </Typography>
          <Grid container spacing={2}>
            {['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'].map((variant) => (
              <Grid item xs={12} key={variant}>
                <TypographySwatch 
                  variant={variant} 
                  text={`${variant.charAt(0).toUpperCase() + variant.slice(1)} - The quick brown fox jumps over the lazy dog`} 
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Spacing */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Spacing
          </Typography>
          <Grid container spacing={2}>
            {[0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24].map((value) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={value}>
                <SpacingSwatch 
                  name={`Spacing ${value}`} 
                  value={`${value * 8}px`} 
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Border Radius */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Border Radius
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(theme.shape).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Box 
                    sx={{ 
                      height: 100,
                      bgcolor: 'primary.main',
                      borderRadius: value,
                      opacity: 0.1
                    }} 
                  />
                  <Typography variant="subtitle2">{key}</Typography>
                  <Typography variant="caption" color="text.secondary">{value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Elevation */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Elevation
          </Typography>
          <Grid container spacing={2}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24].map((level) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={level}>
                <ElevationSwatch level={level} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Z-Index */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Z-Index
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(theme.zIndex).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                <ZIndexSwatch name={key} value={value} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Transitions */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Transitions
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(theme.transitions).map(([key, value]) => (
              <Grid item xs={12} key={key}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="subtitle2">{key}</Typography>
                  {typeof value === 'string' || typeof value === 'number' ? (
                    <Typography variant="caption" color="text.secondary">{value}</Typography>
                  ) : (
                    Object.entries(value).map(([subKey, subValue]) => (
                      <Typography key={subKey} variant="caption" color="text.secondary">
                        {subKey}: {String(subValue)}
                      </Typography>
                    ))
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Breakpoints */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h2" gutterBottom>
            Breakpoints
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(theme.breakpoints.values).map(([key, value]) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 2, 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: 1,
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <Typography variant="subtitle2">{key}</Typography>
                  <Typography variant="caption" color="text.secondary">{value}px</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  },
}; 