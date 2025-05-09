const fs = require('fs');

function buildNestedTokens(rawTokens) {
  const tokens = {
    color: {},
    typography: {},
    spacing: {},
    shape: {},
    shadows: {},
    transitions: {}
  };

  // Colors
  const colors = rawTokens.base.color;
  Object.entries(colors).forEach(([key, value]) => {
    const parts = key.split('.');
    let current = tokens.color;
    
    // Build nested structure for colors
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
    
    current[parts[parts.length - 1]] = {
      "$type": "color",
      "$value": value
    };
  });

  // Typography
  if (rawTokens.base.typography?.typography) {
    const typographyStyles = rawTokens.base.typography.typography;
    Object.entries(typographyStyles).forEach(([styleKey, styleValue]) => {
      if (typeof styleValue === 'object') {
        tokens.typography[styleKey] = {
          "$type": "typography",
          "$value": {
            "fontFamily": styleValue.fontFamily,
            "fontSize": styleValue.fontSize,
            "fontWeight": styleValue.fontWeight,
            "lineHeight": styleValue.lineHeight,
            "letterSpacing": styleValue.letterSpacing,
            "textTransform": styleValue.textTransform
          }
        };
      }
    });
  }

  // Spacing
  if (rawTokens.base.spacing) {
    Object.entries(rawTokens.base.spacing).forEach(([key, value]) => {
      tokens.spacing[key] = {
        "$type": "dimension",
        "$value": value
      };
    });
  }

  // BorderRadius
  if (rawTokens.base.shape?.borderRadius) {
    tokens.shape.borderRadius = {
      "$type": "dimension",
      "$value": rawTokens.base.shape.borderRadius
    };
  }

  // Shadows
  if (rawTokens.base.shadows) {
    Object.entries(rawTokens.base.shadows).forEach(([key, value]) => {
      tokens.shadows[key] = {
        "$type": "shadow",
        "$value": value
      };
    });
  }

  // Transitions
  if (rawTokens.base.transitions) {
    const { duration, easing } = rawTokens.base.transitions;
    tokens.transitions = {};
    
    if (duration) {
      tokens.transitions.duration = {};
      Object.entries(duration).forEach(([key, value]) => {
        tokens.transitions.duration[key] = {
          "$type": "duration",
          "$value": `${value}ms`
        };
      });
    }
    
    if (easing) {
      tokens.transitions.easing = {};
      Object.entries(easing).forEach(([key, value]) => {
        tokens.transitions.easing[key] = {
          "$type": "cubicBezier",
          "$value": value
        };
      });
    }
  }

  return tokens;
}

try {
  const rawTokens = require('./mui-tokens-raw.json');
  const nestedTokens = buildNestedTokens(rawTokens);
  
  // Remove empty categories
  Object.keys(nestedTokens).forEach(key => {
    if (Object.keys(nestedTokens[key]).length === 0) {
      delete nestedTokens[key];
    }
  });

  const output = {
    MUI: nestedTokens,
    "$metadata": {
      "tokenSetOrder": ["MUI"]
    }
  };

  fs.writeFileSync(
    'tokens-studio-format.json',
    JSON.stringify(output, null, 2)
  );
  console.log('Successfully transformed tokens to nested Tokens.Studio format');
} catch (error) {
  console.error('Error transforming tokens:', error);
}
