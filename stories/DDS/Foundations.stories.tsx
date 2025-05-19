import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import tokens from '../../build/tokens.js'; // Adjust path if needed

const meta: Meta = {
  title: 'DDS/Foundations',
  component: Box,
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to recursively extract color tokens with $value
function extractColorTokens(obj: any, path: string[] = ['color']): { name: string; value: string }[] {
  let result: { name: string; value: string }[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (
      value &&
      typeof value === 'object' &&
      '$value' in value &&
      typeof (value as any).$value === 'string' &&
      ((value as any).$type === 'color' || (value as any).$value.match(/^#|rgb|hsl|^var\(/))
    ) {
      result.push({ name: [...path, key].join('.'), value: (value as any).$value });
    } else if (value && typeof value === 'object') {
      result = result.concat(extractColorTokens(value, [...path, key]));
    }
  }
  return result;
}

// Helper to recursively extract all tokens with $value property
function extractPrimitiveTokens(obj: any, path: string[] = [], typeOverride?: string): { name: string; value: string | number; type?: string }[] {
  let result: { name: string; value: string | number; type?: string }[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (
      value &&
      typeof value === 'object' &&
      '$value' in value &&
      (typeof (value as any).$value === 'string' || typeof (value as any).$value === 'number')
    ) {
      result.push({ name: [...path, key].join('.'), value: (value as any).$value, type: typeOverride || (value as any).$type });
    } else if (value && typeof value === 'object') {
      result = result.concat(extractPrimitiveTokens(value, [...path, key], typeOverride));
    }
  }
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
      <Typography style={{ fontSize: typeof value === 'number' ? `${value}px` : value }}>
        The quick brown fox
      </Typography>
      <Typography variant="subtitle1">{name}: {value}</Typography>
    </Box>
  </Paper>
);

const FontFamilySwatch = ({ name, value }: { name: string; value: string | number }) => (
  <Paper elevation={1}>
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" py={2}>
      <Typography style={{ fontFamily: String(value) }}>
        The quick brown fox
      </Typography>
      <Typography variant="subtitle1">{name}: {value}</Typography>
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
    // Extract all tokens with $value
    const allTokens = extractPrimitiveTokens(tokens);
    // Group tokens by top-level type
    const groups: Record<string, { name: string; value: string | number; type?: string }[]> = {};
    allTokens.forEach(token => {
      const topLevel = token.name.split('.')[0];
      if (!groups[topLevel]) groups[topLevel] = [];
      groups[topLevel].push(token);
    });
    return (
      <Box>
        <Typography variant="h1" gutterBottom>DDS Foundations</Typography>
        {/* Spacing */}
        {groups.spacings && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Spacing</Typography>
            <Grid container spacing={2}>
              {groups.spacings.map(({ name, value }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                  <SpacingSwatch name={name} value={value} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {/* Border Radius */}
        {groups.borderRadius && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Border Radius</Typography>
            <Grid container spacing={2}>
              {groups.borderRadius.map(({ name, value }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                  <RadiusSwatch name={name} value={value} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {/* Font Sizes */}
        {groups.fontSizes && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Font Sizes</Typography>
            <Grid container spacing={2}>
              {groups.fontSizes.map(({ name, value }) => (
                <Grid item xs={12} key={name}>
                  <FontSizeSwatch name={name} value={value} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {/* Font Families */}
        {groups.fontFamilies && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Font Families</Typography>
            <Grid container spacing={2}>
              {groups.fontFamilies.map(({ name, value }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                  <FontFamilySwatch name={name} value={value} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {/* All other primitives */}
        {Object.entries(groups).filter(([k]) => !['color','spacings','borderRadius','fontSizes','fontFamilies','breakpoints'].includes(k)).map(([group, tokens]) => (
          <React.Fragment key={group}>
            <Typography variant="h2" gutterBottom mt={6}>{group.charAt(0).toUpperCase() + group.slice(1)}</Typography>
            <Grid container spacing={2}>
              {tokens.map(({ name, value }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                  <GenericSwatch name={name} value={value} />
                </Grid>
              ))}
            </Grid>
          </React.Fragment>
        ))}
        {/* Breakpoints */}
        {groups.breakpoints && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Breakpoints</Typography>
            <Grid container spacing={0} direction="column">
              {groups.breakpoints.map(({ name, value }) => (
                <Grid item xs={12} key={name} sx={{ mb: 3 }}>
                  <BreakpointSwatch name={name} value={value} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
        {/* Colors (moved to bottom) */}
        {groups.color && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Colors</Typography>
            <Grid container spacing={2}>
              {groups.color.filter(t => t.type === 'color').map(({ name, value }) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                  <ColorSwatch name={name} value={String(value)} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    );
  },
}; 