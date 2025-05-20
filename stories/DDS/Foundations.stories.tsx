import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import * as tokens from '../../build/tokens.mjs';

const meta: Meta = {
  title: 'DDS/Foundations',
  component: Box,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type Token = {
  name: string;
  value: string | number;
  type: 'color' | 'typography' | 'dimension' | 'misc';
};

// Helper to categorize tokens from flat structure
function categorizeTokens(tokens: Record<string, any>): { dimensions: Token[], typography: Token[], color: Token[], misc: Token[] } {
  const result = {
    dimensions: [] as Token[],
    typography: [] as Token[],
    color: [] as Token[],
    misc: [] as Token[]
  };

  Object.entries(tokens).forEach(([key, value]) => {
    const token: Token = { name: key, value, type: 'misc' };

    if (key.startsWith('color')) {
      token.type = 'color';
      result.color.push(token);
    } else if (
      key.startsWith('font') ||
      key.startsWith('letterSpacing') ||
      key.startsWith('lineHeight') ||
      key.startsWith('text')
    ) {
      token.type = 'typography';
      result.typography.push(token);
    } else if (
      key.startsWith('spacing') ||
      key.startsWith('borderRadius') ||
      key.startsWith('breakpoints')
    ) {
      token.type = 'dimension';
      result.dimensions.push(token);
    } else {
      result.misc.push(token);
    }
  });

  return result;
}

const ColorSwatch = ({ name, value }: { name: string; value: string }) => {
  const [hover, setHover] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (e) {
      // ignore
    }
  };

  return (
    <Paper
      elevation={hover ? 10 : 0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleCopy}
      sx={{
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
      }}
      title={copied ? 'Copied!' : 'Click to copy hex'}
    >
      <Box height={120} bgcolor={value} />
      <Box height={40} display="flex" alignItems="center" justifyContent="center">
        <Typography variant="subtitle1" fontWeight="bold">
          {copied ? 'Copied!' : name}
        </Typography>
      </Box>
    </Paper>
  );
};

const SpacingSwatch = ({ name, value }: { name: string; value: string | number }) => (
  <Paper elevation={1}>
    <Box height={40} display="flex" alignItems="center">
      <Box width={typeof value === 'number' ? `${value}px` : value} height={16} bgcolor="primary.main" mr={2} />
      <Typography variant="subtitle1">{name}: {value}</Typography>
    </Box>
  </Paper>
);

const RadiusSwatch = ({ name, value }: { name: string; value: string | number }) => (
  <Paper elevation={1}>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={2}>
      <Box width={48} height={48} bgcolor="primary.main" borderRadius={typeof value === 'number' ? `${value}px` : value} mb={1} />
      <Typography variant="subtitle1">{name}: {value}</Typography>
    </Box>
  </Paper>
);

const FontSizeSwatch = ({ name, value }: { name: string; value: string | number }) => (
  <Paper elevation={1}>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={2}>
      <Typography 
        style={{ 
          fontSize: typeof value === 'number' ? `${value}px` : value,
          lineHeight: tokens.lineHeights100,
          letterSpacing: tokens.letterSpacingsDefault
        }}
      >
        The quick brown fox
      </Typography>
      <Typography variant="subtitle1" mt={1}>
        {name}: {value}
      </Typography>
    </Box>
  </Paper>
);

const FontFamilySwatch = ({ name, value }: { name: string; value: string | number }) => (
  <Paper elevation={1}>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={2}>
      <Typography 
        style={{ 
          fontFamily: String(value),
          fontSize: tokens.fontSizes16,
          lineHeight: tokens.lineHeights100,
          letterSpacing: tokens.letterSpacingsDefault
        }}
      >
        The quick brown fox
      </Typography>
      <Typography variant="subtitle1" mt={1}>
        {name}: {value}
      </Typography>
    </Box>
  </Paper>
);

const FontWeightSwatch = ({ name, value }: { name: string; value: string | number }) => (
  <Paper elevation={1}>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={2}>
      <Typography 
        style={{ 
          fontWeight: typeof value === 'number' ? value : parseInt(String(value), 10),
          fontSize: tokens.fontSizes16,
          lineHeight: tokens.lineHeights100,
          letterSpacing: tokens.letterSpacingsDefault
        }}
      >
        The quick brown fox
      </Typography>
      <Typography variant="subtitle1" mt={1}>
        {name}: {value}
      </Typography>
    </Box>
  </Paper>
);

const GenericSwatch = ({ name, value }: { name: string; value: string | number }) => (
  <Paper elevation={1}>
    <Box height={40} display="flex" alignItems="center" justifyContent="center">
      <Typography variant="subtitle1">{name}: {value}</Typography>
    </Box>
  </Paper>
);

const BreakpointSwatch = ({ name, value }: { name: string; value: string | number }) => {
  const px = typeof value === 'number' ? value : parseInt(String(value), 10);
  return (
    <Paper elevation={1} sx={{ width: px ? Math.min(px, 400) : '100%', maxWidth: '100%', ml: 0, textAlign: 'left', mb: 0 }}>
      <Box height={40} display="flex" alignItems="center" pl={2}>
        <Typography variant="subtitle1">{name}: {value}px</Typography>
      </Box>
    </Paper>
  );
};

export const Foundations: Story = {
  render: () => {
    const { dimensions, typography, color, misc } = categorizeTokens(tokens);

    return (
      <Box>
        <Typography variant="h1" gutterBottom>DDS Foundations</Typography>

        {/* Colors */}
        {color.length > 0 && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Colors</Typography>
            <Grid container spacing={2}>
              {color.map(({ name, value }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                  <ColorSwatch name={name} value={String(value)} />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Typography */}
        {typography.length > 0 && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Typography</Typography>
            <Grid container spacing={2}>
              {typography.map(({ name, value }) => {
                if (name.startsWith('fontSizes')) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                      <FontSizeSwatch name={name} value={value} />
                    </Grid>
                  );
                }
                if (name.startsWith('fontFamilies')) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                      <FontFamilySwatch name={name} value={value} />
                    </Grid>
                  );
                }
                if (name.startsWith('fontWeights')) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                      <FontWeightSwatch name={name} value={value} />
                    </Grid>
                  );
                }
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                    <GenericSwatch name={name} value={value} />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}

        {/* Dimensions */}
        {dimensions.length > 0 && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Dimensions</Typography>
            <Grid container spacing={2}>
              {dimensions.map(({ name, value }) => {
                if (name.startsWith('spacing')) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                      <SpacingSwatch name={name} value={value} />
                    </Grid>
                  );
                }
                if (name.startsWith('borderRadius')) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                      <RadiusSwatch name={name} value={value} />
                    </Grid>
                  );
                }
                if (name.startsWith('breakpoints')) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                      <BreakpointSwatch name={name} value={value} />
                    </Grid>
                  );
                }
                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                    <GenericSwatch name={name} value={value} />
                  </Grid>
                );
              })}
            </Grid>
          </>
        )}

        {/* Misc */}
        {misc.length > 0 && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Miscellaneous</Typography>
            <Grid container spacing={2}>
              {misc.map(({ name, value }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                  <GenericSwatch name={name} value={value} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    );
  },
};