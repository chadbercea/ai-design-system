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

  // Extract color tokens from MUI's palette
  const colorMap = muiTokens.base.color || {};
  
  // Map MUI colors to primitive colors
  const colorMappings = {
    // Primary colors (blue)
    "palette.primary.main": { family: "blue", shade: "500" },
    "palette.primary.light": { family: "blue", shade: "300" },
    "palette.primary.dark": { family: "blue", shade: "700" },
    
    // Secondary colors (purple)
    "palette.secondary.main": { family: "purple", shade: "500" },
    "palette.secondary.light": { family: "purple", shade: "300" },
    "palette.secondary.dark": { family: "purple", shade: "700" },
    
    // Error colors (red)
    "palette.error.main": { family: "red", shade: "500" },
    "palette.error.light": { family: "red", shade: "300" },
    "palette.error.dark": { family: "red", shade: "700" },
    
    // Warning colors (orange)
    "palette.warning.main": { family: "orange", shade: "500" },
    "palette.warning.light": { family: "orange", shade: "300" },
    "palette.warning.dark": { family: "orange", shade: "700" },
    
    // Info colors (blue)
    "palette.info.main": { family: "blue", shade: "400" },
    "palette.info.light": { family: "blue", shade: "200" },
    "palette.info.dark": { family: "blue", shade: "600" },
    
    // Success colors (green)
    "palette.success.main": { family: "green", shade: "500" },
    "palette.success.light": { family: "green", shade: "300" },
    "palette.success.dark": { family: "green", shade: "700" },
    
    // Grey scale
    "palette.grey.50": { family: "grey", shade: "50" },
    "palette.grey.100": { family: "grey", shade: "100" },
    "palette.grey.200": { family: "grey", shade: "200" },
    "palette.grey.300": { family: "grey", shade: "300" },
    "palette.grey.400": { family: "grey", shade: "400" },
    "palette.grey.500": { family: "grey", shade: "500" },
    "palette.grey.600": { family: "grey", shade: "600" },
    "palette.grey.700": { family: "grey", shade: "700" },
    "palette.grey.800": { family: "grey", shade: "800" },
    "palette.grey.900": { family: "grey", shade: "900" },
    "palette.grey.A100": { family: "grey", shade: "A100" },
    "palette.grey.A200": { family: "grey", shade: "A200" },
    "palette.grey.A400": { family: "grey", shade: "A400" },
    "palette.grey.A700": { family: "grey", shade: "A700" }
  };

  // Process each color mapping
  Object.entries(colorMappings).forEach(([muiPath, mapping]) => {
    const value = colorMap[muiPath];
    if (value) {
      if (!primitives[mapping.family]) {
        primitives[mapping.family] = {};
      }
      primitives[mapping.family][mapping.shade] = {
        "$type": "color",
        "$value": value,
        "$description": `MUI ${muiPath} color`
      };
    }
  });

  // Add common colors
  if (colorMap["palette.common.black"]) {
    primitives.grey["black"] = {
      "$type": "color",
      "$value": colorMap["palette.common.black"],
      "$description": "MUI common black"
    };
  }
  if (colorMap["palette.common.white"]) {
    primitives.grey["white"] = {
      "$type": "color",
      "$value": colorMap["palette.common.white"],
      "$description": "MUI common white"
    };
  }

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
          newValue = `{Primitives.${closest.colorFamily}.${closest.shade}}`;
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

try {
  // Read input files
  const template = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens-studio-format.json'), 'utf8'));
  const muiTokens = require('./mui-tokens-raw.json');
  
  // Extract primitive colors
  const primitives = extractPrimitiveColors(muiTokens);
  
  // Transform semantic tokens and clean up examples
  const semanticTokens = cleanupMuiTokens(fillTemplateWithMui(template.MUI, muiTokens, primitives));
  
  // Create final structure
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
