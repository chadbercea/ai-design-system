const fs = require('fs');

function buildTokens(rawTokens) {
  const tokens = {};

  // Colors: flatten, use semantic/brand nesting only
  if (rawTokens.base.color) {
    Object.entries(rawTokens.base.color).forEach(([key, value]) => {
      const parts = key.split('.');
      let current = tokens;
      for (let i = 0; i < parts.length - 1; i++) {
        if (!current[parts[i]]) current[parts[i]] = {};
        current = current[parts[i]];
      }
      current[parts[parts.length - 1]] = {
        "$type": "color",
        "$value": value
      };
    });
  }

  // Spacing: direct children, no wrapper
  if (rawTokens.base.spacing) {
    Object.entries(rawTokens.base.spacing).forEach(([key, value]) => {
      tokens[`spacing-${key}`] = {
        "$type": "dimension",
        "$value": value
      };
    });
  }

  // Border Radius: direct child, no wrapper
  if (rawTokens.base.shape?.borderRadius) {
    tokens["borderRadius-default"] = {
      "$type": "borderRadius",
      "$value": rawTokens.base.shape.borderRadius
    };
  }

  // Box Shadow: direct children, no wrapper
  if (rawTokens.base.shadows) {
    Object.entries(rawTokens.base.shadows).forEach(([key, value]) => {
      tokens[`boxShadow-${key}`] = {
        "$type": "boxShadow",
        "$value": value
      };
    });
  }

  // Opacity: direct children, no wrapper
  if (rawTokens.base.opacity) {
    Object.entries(rawTokens.base.opacity).forEach(([key, value]) => {
      tokens[`opacity-${key}`] = {
        "$type": "opacity",
        "$value": value
      };
    });
  }

  // Composite Typography: direct children, no wrapper
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

  // Duration (Transitions): direct children, no wrapper
  if (rawTokens.base.transitions?.duration) {
    Object.entries(rawTokens.base.transitions.duration).forEach(([key, value]) => {
      tokens[`duration-${key}`] = {
        "$type": "duration",
        "$value": `${value}ms`
      };
    });
  }

  // Easing (Transitions): direct children, no wrapper
  if (rawTokens.base.transitions?.easing) {
    Object.entries(rawTokens.base.transitions.easing).forEach(([key, value]) => {
      tokens[`easing-${key}`] = {
        "$type": "cubicBezier",
        "$value": value
      };
    });
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
  console.log('Successfully transformed tokens to flat, spec-compliant Tokens.Studio format.');
} catch (error) {
  console.error('Error transforming tokens:', error);
}
