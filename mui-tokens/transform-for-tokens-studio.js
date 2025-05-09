const fs = require('fs');

function buildTokens(rawTokens) {
  const tokens = {};

  // Helper to flatten dot notation keys into nested objects
  function setNestedToken(obj, key, value) {
    const parts = key.split('.');
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }

  // Colors
  if (rawTokens.base.color) {
    Object.entries(rawTokens.base.color).forEach(([key, value]) => {
      setNestedToken(tokens, key.replace(/^palette\./, ''), {
        "$type": "color",
        "$value": value
      });
    });
  }

  // Typography (composite)
  if (rawTokens.base.typography?.typography) {
    const typographyStyles = rawTokens.base.typography.typography;
    Object.entries(typographyStyles).forEach(([styleKey, styleValue]) => {
      if (typeof styleValue === 'object') {
        tokens[styleKey] = {
          "$type": "typography",
          "$value": {
            "fontFamily": styleValue.fontFamily,
            "fontSize": styleValue.fontSize,
            "fontWeight": styleValue.fontWeight,
            "lineHeight": styleValue.lineHeight,
            "letterSpacing": styleValue.letterSpacing,
            ...(styleValue.textTransform && { "textTransform": styleValue.textTransform })
          }
        };
      }
    });
  }

  // Spacing, Sizing, Padding, Margin
  const spacingKeys = [
    'spacing', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
    'paddingX', 'paddingY', 'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
    'marginX', 'marginY', 'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight'
  ];
  spacingKeys.forEach((key) => {
    if (rawTokens.base[key] && typeof rawTokens.base[key] === 'object') {
      Object.entries(rawTokens.base[key]).forEach(([k, v]) => {
        tokens[`${key}-${k}`] = {
          "$type": "dimension",
          "$value": v
        };
      });
    }
  });

  // Border Radius
  if (rawTokens.base.shape?.borderRadius) {
    tokens["borderRadius-default"] = {
      "$type": "borderRadius",
      "$value": rawTokens.base.shape.borderRadius
    };
  }

  // Shadows/Elevation
  if (rawTokens.base.shadows) {
    Object.entries(rawTokens.base.shadows).forEach(([key, value]) => {
      tokens[`boxShadow-${key}`] = {
        "$type": "boxShadow",
        "$value": value
      };
    });
  }
  if (rawTokens.other?.shadows && Array.isArray(rawTokens.other.shadows)) {
    rawTokens.other.shadows.forEach((value, idx) => {
      tokens[`elevation-${idx}`] = {
        "$type": "boxShadow",
        "$value": value
      };
    });
  }

  // Opacity
  if (rawTokens.base.opacity) {
    Object.entries(rawTokens.base.opacity).forEach(([key, value]) => {
      tokens[`opacity-${key}`] = {
        "$type": "opacity",
        "$value": value
      };
    });
  }
  // Opacity from 'other' (e.g., palette.action.disabledOpacity)
  Object.entries(rawTokens.other || {}).forEach(([key, value]) => {
    if (key.toLowerCase().includes('opacity')) {
      tokens[key.replace(/\./g, '-')] = {
        "$type": "opacity",
        "$value": value
      };
    }
  });

  // Border Width
  Object.entries(rawTokens.other || {}).forEach(([key, value]) => {
    if (key.toLowerCase().includes('borderwidth')) {
      tokens[key.replace(/\./g, '-')] = {
        "$type": "borderWidth",
        "$value": value
      };
    }
  });

  // Z-Index
  if (rawTokens.base.zIndex) {
    Object.entries(rawTokens.base.zIndex).forEach(([key, value]) => {
      tokens[`zIndex-${key}`] = {
        "$type": "number",
        "$value": value
      };
    });
  }
  Object.entries(rawTokens.other || {}).forEach(([key, value]) => {
    if (key.toLowerCase().startsWith('zindex')) {
      tokens[key.replace(/\./g, '-')] = {
        "$type": "number",
        "$value": value
      };
    }
  });

  // Breakpoints
  Object.entries(rawTokens.other || {}).forEach(([key, value]) => {
    if (key.startsWith('breakpoints.')) {
      tokens[key.replace(/\./g, '-')] = {
        "$type": "dimension",
        "$value": value
      };
    }
  });

  // Transitions (duration, easing)
  if (rawTokens.base.transitions?.duration) {
    Object.entries(rawTokens.base.transitions.duration).forEach(([key, value]) => {
      tokens[`duration-${key}`] = {
        "$type": "duration",
        "$value": `${value}ms`
      };
    });
  }
  if (rawTokens.base.transitions?.easing) {
    Object.entries(rawTokens.base.transitions.easing).forEach(([key, value]) => {
      tokens[`easing-${key}`] = {
        "$type": "cubicBezier",
        "$value": value
      };
    });
  }
  Object.entries(rawTokens.other || {}).forEach(([key, value]) => {
    if (key.startsWith('transitions.')) {
      if (key.includes('easing')) {
        tokens[key.replace(/\./g, '-')] = {
          "$type": "cubicBezier",
          "$value": value
        };
      } else if (key.includes('duration')) {
        tokens[key.replace(/\./g, '-')] = {
          "$type": "duration",
          "$value": `${value}ms`
        };
      }
    }
  });

  // Direction, mode, etc. (as text or other)
  Object.entries(rawTokens.other || {}).forEach(([key, value]) => {
    if (typeof value === 'string' && (key === 'direction' || key.endsWith('.mode'))) {
      tokens[key.replace(/\./g, '-')] = {
        "$type": "text",
        "$value": value
      };
    }
  });

  return tokens;
}

try {
  const rawTokens = require('./mui-tokens-raw.json');
  const tokens = buildTokens(rawTokens);
  const output = {
    MUI: tokens,
    "$metadata": {
      "tokenSetOrder": ["MUI"]
    }
  };
  fs.writeFileSync(
    'tokens-studio-format.json',
    JSON.stringify(output, null, 2)
  );
  console.log('Successfully transformed ALL tokens to flat, spec-compliant Tokens.Studio format.');
} catch (error) {
  console.error('Error transforming tokens:', error);
}
