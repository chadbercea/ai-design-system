const fs = require('fs');

function buildTokens(rawTokens) {
  const tokens = {};

  // Palette (colors)
  if (rawTokens.base.color) {
    const colors = rawTokens.base.color;
    tokens.palette = {};
    Object.entries(colors).forEach(([key, value]) => {
      const parts = key.split('.');
      let current = tokens.palette;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = {
        "$type": "color",
        "$value": value
      };
    });
    if (Object.keys(tokens.palette).length === 0) delete tokens.palette;
  }

  // Spacing
  if (rawTokens.base.spacing) {
    tokens.spacing = {};
    Object.entries(rawTokens.base.spacing).forEach(([key, value]) => {
      tokens.spacing[key] = {
        "$type": "dimension",
        "$value": value
      };
    });
    if (Object.keys(tokens.spacing).length === 0) delete tokens.spacing;
  }

  // Border Radius
  if (rawTokens.base.shape?.borderRadius) {
    tokens.borderRadius = {
      "default": {
        "$type": "borderRadius",
        "$value": rawTokens.base.shape.borderRadius
      }
    };
  }

  // Box Shadow
  if (rawTokens.base.shadows) {
    tokens.boxShadow = {};
    Object.entries(rawTokens.base.shadows).forEach(([key, value]) => {
      tokens.boxShadow[key] = {
        "$type": "boxShadow",
        "$value": value
      };
    });
    if (Object.keys(tokens.boxShadow).length === 0) delete tokens.boxShadow;
  }

  // Opacity (if available)
  if (rawTokens.base.opacity) {
    tokens.opacity = {};
    Object.entries(rawTokens.base.opacity).forEach(([key, value]) => {
      tokens.opacity[key] = {
        "$type": "opacity",
        "$value": value
      };
    });
    if (Object.keys(tokens.opacity).length === 0) delete tokens.opacity;
  }

  // Composite Typography
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

  // Duration (Transitions)
  if (rawTokens.base.transitions?.duration) {
    tokens.duration = {};
    Object.entries(rawTokens.base.transitions.duration).forEach(([key, value]) => {
      tokens.duration[key] = {
        "$type": "duration",
        "$value": `${value}ms`
      };
    });
    if (Object.keys(tokens.duration).length === 0) delete tokens.duration;
  }

  // Easing (Transitions)
  if (rawTokens.base.transitions?.easing) {
    tokens.easing = {};
    Object.entries(rawTokens.base.transitions.easing).forEach(([key, value]) => {
      tokens.easing[key] = {
        "$type": "cubicBezier",
        "$value": value
      };
    });
    if (Object.keys(tokens.easing).length === 0) delete tokens.easing;
  }

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
  console.log('Successfully transformed tokens to Tokens.Studio format with all major categories.');
} catch (error) {
  console.error('Error transforming tokens:', error);
}
