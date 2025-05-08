const fs = require('fs');

function buildTrueAtomicTokens(rawTokens) {
  const atomic = {};
  // Colors
  const colors = rawTokens.base.color;
  Object.entries(colors).forEach(([key, value]) => {
    const tokenName = key.replace(/^palette\./, '').replace(/\./g, '-');
    atomic[`color-${tokenName}`] = {
      "$type": "color",
      "$value": value
    };
  });
  // Typography
  if (rawTokens.base.typography?.typography) {
    const typographyStyles = rawTokens.base.typography.typography;
    Object.entries(typographyStyles).forEach(([styleKey, styleValue]) => {
      if (typeof styleValue === 'object') {
        if (styleValue.fontFamily) {
          atomic[`font-family-${styleKey}`] = {
            "$type": "fontFamily",
            "$value": styleValue.fontFamily
          };
        }
        if (styleValue.fontSize) {
          atomic[`font-size-${styleKey}`] = {
            "$type": "dimension",
            "$value": styleValue.fontSize
          };
        }
        if (styleValue.fontWeight) {
          atomic[`font-weight-${styleKey}`] = {
            "$type": "fontWeight",
            "$value": styleValue.fontWeight
          };
        }
        if (styleValue.lineHeight) {
          atomic[`line-height-${styleKey}`] = {
            "$type": "dimension",
            "$value": styleValue.lineHeight
          };
        }
        if (styleValue.letterSpacing) {
          atomic[`letter-spacing-${styleKey}`] = {
            "$type": "dimension",
            "$value": styleValue.letterSpacing
          };
        }
        if (styleValue.textTransform) {
          atomic[`text-case-${styleKey}`] = {
            "$type": "textCase",
            "$value": styleValue.textTransform
          };
        }
      }
    });
  }
  // Spacing
  if (rawTokens.base.spacing) {
    Object.entries(rawTokens.base.spacing).forEach(([key, value]) => {
      atomic[`spacing-${key}`] = {
        "$type": "dimension",
        "$value": value
      };
    });
  }
  // BorderRadius
  if (rawTokens.base.shape?.borderRadius) {
    atomic['border-radius-default'] = {
      "$type": "dimension",
      "$value": rawTokens.base.shape.borderRadius
    };
  }
  // Shadows
  if (rawTokens.base.shadows) {
    Object.entries(rawTokens.base.shadows).forEach(([key, value]) => {
      atomic[`shadow-${key}`] = {
        "$type": "shadow",
        "$value": value
      };
    });
  }
  // Transitions
  if (rawTokens.base.transitions) {
    const { duration, easing } = rawTokens.base.transitions;
    if (duration) {
      Object.entries(duration).forEach(([key, value]) => {
        atomic[`duration-${key}`] = {
          "$type": "duration",
          "$value": `${value}ms`
        };
      });
    }
    if (easing) {
      Object.entries(easing).forEach(([key, value]) => {
        atomic[`easing-${key}`] = {
          "$type": "cubicBezier",
          "$value": value
        };
      });
    }
  }
  return atomic;
}

try {
  const rawTokens = require('./mui-tokens-raw.json');
  const atomic = buildTrueAtomicTokens(rawTokens);
  const output = {
    MUI: atomic,
    $metadata: {
      tokenSetOrder: ["MUI"]
    }
  };
  fs.writeFileSync(
    'tokens-studio-format.json',
    JSON.stringify(output, null, 2)
  );
  console.log('Successfully transformed tokens to true atomic Tokens.Studio format under MUI set');
} catch (error) {
  console.error('Error transforming tokens:', error);
}
