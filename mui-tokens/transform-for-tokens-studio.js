const fs = require('fs');
const path = require('path');

// Extract primitive colors from MUI tokens
function extractPrimitiveColors(muiTokens) {
  const primitives = {
    "blue": {},
    "red": {},
    "green": {},
    "grey": {},
    "purple": {},
    "orange": {},
    "yellow": {},
    "teal": {},
    "pink": {},
    "indigo": {}
  };

  // Extract all color tokens from MUI's palette
  const colorMap = muiTokens.base.color || {};
  
  // Process each color in the palette
  Object.entries(colorMap).forEach(([path, value]) => {
    // Skip if not a color value
    if (!value || typeof value !== 'string') return;

    // Determine color family and shade based on the path
    let colorFamily = 'grey'; // default
    let shade = '500'; // default
    let description = `MUI ${path} color`;

    // Map paths to color families
    if (path.includes('primary')) colorFamily = 'blue';
    else if (path.includes('secondary')) colorFamily = 'purple';
    else if (path.includes('error')) colorFamily = 'red';
    else if (path.includes('warning')) colorFamily = 'orange';
    else if (path.includes('success')) colorFamily = 'green';
    else if (path.includes('info')) colorFamily = 'blue';
    else if (path.includes('grey')) colorFamily = 'grey';
    else if (path.includes('common.black')) {
      colorFamily = 'grey';
      shade = 'black';
    }
    else if (path.includes('common.white')) {
      colorFamily = 'grey';
      shade = 'white';
    }

    // Extract shade from path
    if (path.includes('light')) shade = '300';
    else if (path.includes('dark')) shade = '700';
    else if (path.includes('contrastText')) shade = 'contrast';
    else if (path.includes('grey.')) {
      const greyMatch = path.match(/grey\.(\w+)/);
      if (greyMatch) shade = greyMatch[1];
    }

    // Handle RGBA values
    if (value.startsWith('rgba')) {
      // For RGBA values, we'll create a new shade with the opacity
      const rgbaMatch = value.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
      if (rgbaMatch) {
        const [_, r, g, b, a] = rgbaMatch;
        // Convert to hex for the base color
        const hex = `#${Number(r).toString(16).padStart(2, '0')}${Number(g).toString(16).padStart(2, '0')}${Number(b).toString(16).padStart(2, '0')}`;
        // Add opacity to the shade name
        shade = `${shade}-${Math.round(a * 100)}`;
        value = hex;
      }
    }

    // Add the color to primitives
    if (!primitives[colorFamily]) {
      primitives[colorFamily] = {};
    }
    primitives[colorFamily][shade] = {
      "$type": "color",
      "$value": value,
      "$description": description
    };
  });

  // Remove empty color families
  Object.keys(primitives).forEach(family => {
    if (Object.keys(primitives[family]).length === 0) {
      delete primitives[family];
    }
  });

  return primitives;
}

// Find the closest primitive color for a given hex value
function findClosestPrimitive(hexValue, primitives) {
  // Convert hex to RGB for comparison
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Calculate color distance
  const colorDistance = (c1, c2) => {
    return Math.sqrt(
      Math.pow(c1.r - c2.r, 2) +
      Math.pow(c1.g - c2.g, 2) +
      Math.pow(c1.b - c2.b, 2)
    );
  };

  const targetRgb = hexToRgb(hexValue);
  if (!targetRgb) return null;

  let closestColor = null;
  let minDistance = Infinity;

  for (const [colorFamily, shades] of Object.entries(primitives)) {
    for (const [shade, primitive] of Object.entries(shades)) {
      const primitiveRgb = hexToRgb(primitive.$value);
      if (primitiveRgb) {
        const distance = colorDistance(targetRgb, primitiveRgb);
        if (distance < minDistance) {
          minDistance = distance;
          closestColor = { colorFamily, shade };
        }
      }
    }
  }

  return closestColor;
}

function getMuiValueByPath(muiTokens, pathArr) {
  // Try to find a value in muiTokens.base or muiTokens.other by path
  let current = muiTokens.base;
  for (let i = 0; i < pathArr.length; i++) {
    if (current && typeof current === 'object' && pathArr[i] in current) {
      current = current[pathArr[i]];
    } else {
      current = undefined;
      break;
    }
  }
  if (current !== undefined) return current;
  // Try dot notation in color
  if (muiTokens.base.color) {
    const dotKey = pathArr.join('.');
    if (dotKey in muiTokens.base.color) return muiTokens.base.color[dotKey];
  }
  // Try in other
  current = muiTokens.other;
  for (let i = 0; i < pathArr.length; i++) {
    if (current && typeof current === 'object' && pathArr[i] in current) {
      current = current[pathArr[i]];
    } else {
      current = undefined;
      break;
    }
  }
  return current;
}

function fillTemplateWithMui(template, muiTokens, primitives, pathArr = []) {
  if (typeof template !== 'object' || template === null) return template;
  if ('$type' in template && '$value' in template) {
    // Try to fill $value from MUI tokens
    const muiValue = getMuiValueByPath(muiTokens, [...pathArr]);
    let newValue = muiValue !== undefined ? muiValue : template['$value'];
    
    // If this is a color token, try to reference a primitive
    if (template.$type === 'color' && typeof newValue === 'string') {
      // Handle rgba values
      if (newValue.startsWith('rgba')) {
        // For now, keep rgba values as is
        // TODO: Consider mapping to opacity + color primitive
      } else {
        // For hex values, find closest primitive
        const closest = findClosestPrimitive(newValue, primitives);
        if (closest) {
          newValue = `{${closest.colorFamily}.${closest.shade}}`;
        }
      }
    }
    
    // If the template value is an object (e.g., border, boxShadow), try to map each property
    if (typeof template['$value'] === 'object' && template['$value'] !== null) {
      newValue = {};
      for (const k in template['$value']) {
        if (typeof template['$value'][k] === 'string') {
          // Try to map each property from MUI
          const propValue = getMuiValueByPath(muiTokens, [...pathArr, k]);
          newValue[k] = propValue !== undefined ? propValue : template['$value'][k];
        } else {
          newValue[k] = template['$value'][k];
        }
      }
    }
    
    return {
      ...template,
      '$value': newValue
    };
  }
  
  // Recurse for nested objects
  const out = Array.isArray(template) ? [] : {};
  for (const k in template) {
    out[k] = fillTemplateWithMui(template[k], muiTokens, primitives, [...pathArr, k]);
  }
  return out;
}

function cleanupMuiTokens(tokens) {
  const result = { ...tokens };
  
  // List of example tokens to remove
  const exampleTokens = [
    'Padding',
    'Margin',
    'default',
    'Roboto',
    'Bold',
    'ExampleCategory',
    'border-goes-here',
    'line-height-example',
    'font-size-example',
    'elevation-0',
    'border-width-example',
    'letter-spacing-example'
  ];
  
  // Remove example tokens
  exampleTokens.forEach(token => {
    if (result[token]) {
      delete result[token];
    }
  });
  
  return result;
}

function flattenColorPrimitives(muiTokens) {
  // Flattens only true color primitives (e.g., blue.50, red.900, etc., and common.black/white)
  const primitives = {};
  const colorMap = muiTokens.base.color || {};
  Object.entries(colorMap).forEach(([key, value]) => {
    // Only include keys that match the color primitive pattern (e.g., blue.50, red.900, etc.) or common.black/white
    if (/^[a-zA-Z]+\.(\d+|A\d+)$/.test(key) || key === 'common.black' || key === 'common.white') {
      primitives[key] = {
        "$type": "color",
        "$value": value
      };
    }
  });
  return primitives;
}

// Semantic mapping for typography values
const fontSizeMap = {
  '6rem': '6xl',
  '3.75rem': '5xl',
  '3rem': '4xl',
  '2.125rem': '3xl',
  '1.5rem': '2xl',
  '1.25rem': 'xl',
  '1rem': 'base',
  '0.875rem': 'sm',
  '0.75rem': 'xs',
  'inherit': 'inherit'
};
const fontWeightMap = {
  '300': 'light',
  '400': 'regular',
  '500': 'medium',
  '700': 'bold',
  'inherit': 'inherit'
};
const lineHeightMap = {
  '1.167': 'tight',
  '1.2': 'snug',
  '1.5': 'normal',
  '1.75': 'relaxed',
  '2.66': 'loose',
  '1.235': 'xl',
  '1.334': 'lg',
  '1.6': 'md',
  '1.43': 'sm',
  '1.57': 'xs',
  '1.66': 'xxs',
  'inherit': 'inherit'
};
const letterSpacingMap = {
  '-0.01562em': 'tighter',
  '-0.00833em': 'tight',
  '0em': 'normal',
  '0.00735em': 'wide',
  '0.00938em': 'wider',
  '0.02857em': 'widest',
  '0.08333em': 'ultra',
  '0.00714em': 'xl',
  '0.01071em': 'lg',
  '0.03333em': 'md',
  '0.0075em': 'sm',
  'inherit': 'inherit'
};

function extractTypographyPrimitives(muiTokens) {
  const primitives = {};
  const typographyMap = muiTokens.base.typography?.typography || {};
  
  Object.entries(typographyMap).forEach(([key, value]) => {
    if (typeof value !== 'object' || value === null) return; // Only process style objects (h1, h2, etc.)
    // Font Family
    if (value.fontFamily) {
      primitives[`fontFamily.roboto`] = {
        "$type": "fontFamily",
        "$value": String(value.fontFamily)
      };
    }
    // Font Size
    if (value.fontSize) {
      const fontSizeStr = String(value.fontSize);
      const name = fontSizeMap[fontSizeStr];
      if (!name) throw new Error(`Unmapped fontSize value: ${fontSizeStr}`);
      primitives[`fontSize.${name}`] = {
        "$type": "fontSize",
        "$value": fontSizeStr
      };
    }
    // Font Weight
    if (value.fontWeight) {
      const weightStr = String(value.fontWeight);
      const name = fontWeightMap[weightStr];
      if (!name) throw new Error(`Unmapped fontWeight value: ${weightStr}`);
      primitives[`fontWeight.${name}`] = {
        "$type": "fontWeight",
        "$value": weightStr
      };
    }
    // Line Height
    if (value.lineHeight) {
      const lineHeightStr = String(value.lineHeight);
      const name = lineHeightMap[lineHeightStr];
      if (!name) throw new Error(`Unmapped lineHeight value: ${lineHeightStr}`);
      primitives[`lineHeight.${name}`] = {
        "$type": "lineHeight",
        "$value": lineHeightStr
      };
    }
    // Letter Spacing
    if (value.letterSpacing) {
      const spacingStr = String(value.letterSpacing);
      const name = letterSpacingMap[spacingStr];
      if (!name) throw new Error(`Unmapped letterSpacing value: ${spacingStr}`);
      primitives[`letterSpacing.${name}`] = {
        "$type": "letterSpacing",
        "$value": spacingStr
      };
    }
  });
  return primitives;
}

try {
  // Read input files
  const template = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens-studio-format.json'), 'utf8'));
  const muiTokens = require('./mui-tokens-raw.json');
  
  // Extract both color and typography primitives
  const colorPrimitives = flattenColorPrimitives(muiTokens);
  const typographyPrimitives = extractTypographyPrimitives(muiTokens);
  
  // Combine primitives
  const primitives = {
    ...colorPrimitives,
    ...typographyPrimitives
  };
  
  // Use the existing logic for semantic tokens (MUI)
  const semanticTokens = cleanupMuiTokens(fillTemplateWithMui(template.MUI, muiTokens, primitives));
  
  // Create final structure (flat, no wrappers)
  const finalOutput = {
    "Primitives": primitives,
    "MUI": semanticTokens,
    "$themes": [],
    "$metadata": {
      "tokenSetOrder": ["Primitives", "MUI"]
    }
  };
  
  // Write output
  fs.writeFileSync(
    path.join(__dirname, 'tokens-studio-format.json'),
    JSON.stringify(finalOutput, null, 2)
  );
  
  console.log('Successfully mapped MUI tokens to the TS structure. Output: tokens-studio-format.json');
} catch (error) {
  console.error('Error mapping tokens:', error);
}
