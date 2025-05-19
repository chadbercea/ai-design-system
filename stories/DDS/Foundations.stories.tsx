import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import categorizedTokens from '../../build/primprep.mjs';

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

// Helper to extract tokens from flat object structure
function extractPrimitiveTokens(obj: Record<string, string | number>): { name: string; value: string | number; type?: string }[] {
  return Object.entries(obj).map(([key, value]) => {
    let type;
    // Color tokens: PascalCase "Color"
    if (key.startsWith("Color")) {
      type = "color";
    }
    // Typography tokens: FontSizes, FontFamilies, FontWeights, LineHeights, LetterSpacings, TextCases, TextDecorations
    else if (
      key.startsWith("FontSizes") ||
      key.startsWith("FontFamilies") ||
      key.startsWith("FontWeights") ||
      key.startsWith("LineHeights") ||
      key.startsWith("LetterSpacings") ||
      key.startsWith("TextCases") ||
      key.startsWith("TextDecorations")
    ) {
      type = "typography";
    }
    // Dimension tokens: Spacings, BorderRadius, Breakpoints, Grid, Layout, Sizing, Stack, ParagraphSpacings
    else if (
      key.startsWith("Spacings") ||
      key.startsWith("BorderRadius") ||
      key.startsWith("Breakpoints") ||
      key.startsWith("Grid") ||
      key.startsWith("Layout") ||
      key.startsWith("Sizing") ||
      key.startsWith("Stack") ||
      key.startsWith("ParagraphSpacings")
    ) {
      type = "dimension";
    }
    return {
      name: key,
      value,
      type
    };
  });
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
    const { dimensions, typography, color, misc } = categorizedTokens;

    return (
      <Box>
        <Typography variant="h1" gutterBottom>DDS Foundations</Typography>

        {/* Typography */}
        {typography.length > 0 && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Typography</Typography>
            <Grid container spacing={2}>
              {typography.map(({ name, value }: Token) => {
                if (name.startsWith('FontSizes')) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                      <FontSizeSwatch name={name} value={value} />
                    </Grid>
                  );
                }
                if (name.startsWith('FontFamilies')) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                      <FontFamilySwatch name={name} value={value} />
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
              {dimensions.map(({ name, value }: Token) => {
                if (name.startsWith('Spacings')) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                      <SpacingSwatch name={name} value={value} />
                    </Grid>
                  );
                }
                if (name.startsWith('BorderRadius')) {
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                      <RadiusSwatch name={name} value={value} />
                    </Grid>
                  );
                }
                if (name.startsWith('Breakpoints')) {
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

        {/* Miscellaneous */}
        {misc.length > 0 && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Miscellaneous</Typography>
            <Grid container spacing={2}>
              {misc.map(({ name, value }: Token) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={name}>
                  <GenericSwatch name={name} value={value} />
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* Colors */}
        {color.length > 0 && (
          <>
            <Typography variant="h2" gutterBottom mt={6}>Colors</Typography>
            <Grid container spacing={2}>
              {color.map(({ name, value }: Token) => (
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