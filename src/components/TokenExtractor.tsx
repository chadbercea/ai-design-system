import React, { useEffect, useState } from 'react';
import { createTheme, Theme } from '@mui/material/styles';
import { Button, Stack, Typography, Box } from '@mui/material';
import blue from '@mui/material/colors/blue';
import red from '@mui/material/colors/red';
import green from '@mui/material/colors/green';
import purple from '@mui/material/colors/purple';
import orange from '@mui/material/colors/orange';
import yellow from '@mui/material/colors/yellow';
import teal from '@mui/material/colors/teal';
import pink from '@mui/material/colors/pink';
import indigo from '@mui/material/colors/indigo';
import deepOrange from '@mui/material/colors/deepOrange';
import deepPurple from '@mui/material/colors/deepPurple';
import lightBlue from '@mui/material/colors/lightBlue';
import lightGreen from '@mui/material/colors/lightGreen';
import amber from '@mui/material/colors/amber';
import cyan from '@mui/material/colors/cyan';
import lime from '@mui/material/colors/lime';
import brown from '@mui/material/colors/brown';
import grey from '@mui/material/colors/grey';
import common from '@mui/material/colors/common';

interface TokenData {
  raw: {
    base: TokenCategories;
    components: ComponentTokens;
  };
  w3c: W3CTokens;
  relationships: TokenRelationship[];
}

interface TokenCategories {
  color: Record<string, any>;
  spacing: Record<string, any>;
  typography: Record<string, any>;
  breakpoints: Record<string, any>;
  shadows: Record<string, any>;
  shape: Record<string, any>;
  transitions: Record<string, any>;
  zIndex: Record<string, any>;
  components: Record<string, any>;
  other: Record<string, any>;
}

interface ComponentTokens {
  [key: string]: {
    styleOverrides: Record<string, any>;
    defaultProps: Record<string, any>;
    variants: any[];
  };
}

interface W3CTokens {
  color: Record<string, TokenValue>;
  size: Record<string, TokenValue>;
  typography: Record<string, TokenValue>;
  other: Record<string, TokenValue>;
}

interface TokenValue {
  $value: any;
  $type: string;
}

interface TokenRelationship {
  token: string;
  type: string;
  children?: string[];
  value?: any;
}

const muiColorFamilies = {
  blue, red, green, purple, orange, yellow, teal, pink, indigo,
  deepOrange, deepPurple, lightBlue, lightGreen, amber, cyan, lime, brown, grey, common
};

function extractMuiColorPrimitives() {
  const colorTokens: Record<string, string> = {};
  Object.entries(muiColorFamilies).forEach(([family, shades]) => {
    Object.entries(shades).forEach(([shade, value]) => {
      // e.g., blue.50, red.900, etc.
      colorTokens[`${family}.${shade}`] = value;
    });
  });
  return colorTokens;
}

function isObject(item: unknown): item is Record<string, unknown> {
  return Boolean(item && typeof item === 'object' && !Array.isArray(item));
}

function isColor(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  return /^(#|rgb|rgba|hsl|hsla)/.test(value);
}

function isSpacing(value: unknown): boolean {
  if (typeof value !== 'number' && typeof value !== 'string') return false;
  return /^(\d+|\d*\.\d+)(px|rem|em|%)$/.test(String(value));
}

function isTypography(key: string, value: unknown): boolean {
  if (!isObject(value)) return false;
  const typographyProps = ['fontFamilies', 'fontSizes', 'fontWeights', 'lineHeight', 'letterSpacing'];
  return typographyProps.some(prop => prop in value);
}

function categorizeToken(key: string, value: unknown): string {
  if (isColor(value)) return 'color';
  if (isSpacing(value)) return 'spacing';
  if (isTypography(key, value)) return 'typography';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'number') return 'number';
  return 'other';
}

function extractTokens(obj: Record<string, unknown>, parentPath = ''): TokenCategories {
  const tokens: TokenCategories = {
    color: {},
    spacing: {},
    typography: {},
    breakpoints: {},
    shadows: {},
    shape: {},
    transitions: {},
    zIndex: {},
    components: {},
    other: {}
  };

  function processValue(key: string, value: unknown, currentPath: string) {
    const tokenPath = currentPath ? `${currentPath}.${key}` : key;
    
    if (isObject(value)) {
      if (isTypography(key, value)) {
        tokens.typography[tokenPath] = value;
      } else {
        const nestedTokens = extractTokens(value, tokenPath);
        Object.entries(nestedTokens).forEach(([category, values]) => {
          if (category in tokens) {
            tokens[category as keyof TokenCategories] = {
              ...tokens[category as keyof TokenCategories],
              ...values
            };
          }
        });
      }
    } else {
      const category = categorizeToken(key, value);
      if (category === 'color') tokens.color[tokenPath] = value;
      else if (category === 'spacing') tokens.spacing[tokenPath] = value;
      else tokens.other[tokenPath] = value;
    }
  }

  Object.entries(obj).forEach(([key, value]) => {
    processValue(key, value, parentPath);
  });

  // --- ADD ALL MUI COLOR PRIMITIVES ---
  const muiPrimitives = extractMuiColorPrimitives();
  tokens.color = { ...muiPrimitives, ...tokens.color };

  return tokens;
}

function extractComponentTokens(theme: Theme): ComponentTokens {
  const componentTokens: ComponentTokens = {};
  
  if (theme.components) {
    Object.entries(theme.components).forEach(([componentName, definition]) => {
      componentTokens[componentName] = {
        styleOverrides: definition?.styleOverrides || {},
        defaultProps: definition?.defaultProps || {},
        variants: definition?.variants || []
      };
    });
  }

  return componentTokens;
}

function generateW3CTokens(tokens: TokenCategories): W3CTokens {
  return {
    "color": Object.entries(tokens.color).reduce((acc, [path, value]) => {
      acc[path.replace(/\./g, '-')] = {
        "$value": value,
        "$type": "color"
      };
      return acc;
    }, {} as Record<string, TokenValue>),
    "size": Object.entries(tokens.spacing).reduce((acc, [path, value]) => {
      acc[path.replace(/\./g, '-')] = {
        "$value": value,
        "$type": "dimension"
      };
      return acc;
    }, {} as Record<string, TokenValue>),
    "typography": Object.entries(tokens.typography).reduce((acc, [path, value]) => {
      acc[path.replace(/\./g, '-')] = {
        "$value": value,
        "$type": "typography"
      };
      return acc;
    }, {} as Record<string, TokenValue>),
    "other": Object.entries(tokens.other).reduce((acc, [path, value]) => {
      acc[path.replace(/\./g, '-')] = {
        "$value": value,
        "$type": typeof value
      };
      return acc;
    }, {} as Record<string, TokenValue>)
  };
}

function generateRelationships(theme: Record<string, unknown>): TokenRelationship[] {
  const relationships: TokenRelationship[] = [];

  function mapRelationships(obj: Record<string, unknown>, parentPath = '') {
    Object.entries(obj).forEach(([key, value]) => {
      const currentPath = parentPath ? `${parentPath}.${key}` : key;
      
      if (isObject(value)) {
        relationships.push({
          token: currentPath,
          type: 'object',
          children: Object.keys(value)
        });
        mapRelationships(value, currentPath);
      } else {
        relationships.push({
          token: currentPath,
          type: categorizeToken(key, value),
          value: value
        });
      }
    });
  }

  mapRelationships(theme);
  return relationships;
}

export default function TokenExtractor() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  useEffect(() => {
    // Create theme and extract tokens
    const theme = createTheme();
    const baseTokens = extractTokens(theme as unknown as Record<string, unknown>);
    const componentTokens = extractComponentTokens(theme);
    const relationships = generateRelationships(theme as unknown as Record<string, unknown>);

    // Generate token data
    const data: TokenData = {
      raw: {
        base: baseTokens,
        components: componentTokens
      },
      w3c: generateW3CTokens(baseTokens),
      relationships
    };

    setTokenData(data);
    
    // Save to localStorage
    localStorage.setItem('mui-tokens', JSON.stringify(data, null, 2));
    
    // Log to console
    console.log('MUI Tokens extracted:', data);
  }, []);

  const downloadTokens = (format: 'raw' | 'w3c' | 'relationships') => {
    if (!tokenData) return;

    const data = format === 'raw' ? tokenData.raw :
                format === 'w3c' ? tokenData.w3c :
                tokenData.relationships;
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mui-tokens-${format}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        MUI Token Extractor
      </Typography>
      
      <Typography variant="body1" paragraph>
        The tokens have been extracted and saved to localStorage.
        You can also find them in the browser console.
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
        Download Tokens
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button 
          variant="contained" 
          onClick={() => downloadTokens('raw')}
          disabled={!tokenData}
        >
          Download Raw Tokens
        </Button>
        
        <Button 
          variant="contained" 
          onClick={() => downloadTokens('w3c')}
          disabled={!tokenData}
        >
          Download W3C Tokens
        </Button>
        
        <Button 
          variant="contained" 
          onClick={() => downloadTokens('relationships')}
          disabled={!tokenData}
        >
          Download Relationships
        </Button>
      </Stack>
    </Box>
  );
} 