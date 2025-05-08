const fs = require('fs');

function buildFlatAtomicTokens(rawTokens) {
  const flat = {};
  // Colors
  const colors = rawTokens.base.color;
  Object.entries(colors).forEach(([key, value]) => {
    const tokenName = key.replace(/^palette\./, '').replace(/\./g, '-');
    flat[`color-${tokenName}`] = {
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
          flat[`typography-${styleKey}-fontFamily`] = {
            "$type": "fontFamily",
            "$value": styleValue.fontFamily
          };
        }
        if (styleValue.fontSize) {
          flat[`typography-${styleKey}-fontSize`] = {
            "$type": "dimension",
            "$value": styleValue.fontSize
          };
        }
        if (styleValue.fontWeight) {
          flat[`typography-${styleKey}-fontWeight`] = {
            "$type": "fontWeight",
            "$value": styleValue.fontWeight
          };
        }
        if (styleValue.lineHeight) {
          flat[`typography-${styleKey}-lineHeight`] = {
            "$type": "dimension",
            "$value": styleValue.lineHeight
          };
        }
        if (styleValue.letterSpacing) {
          flat[`typography-${styleKey}-letterSpacing`] = {
            "$type": "dimension",
            "$value": styleValue.letterSpacing
          };
        }
        if (styleValue.textTransform) {
          flat[`typography-${styleKey}-textCase`] = {
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
      flat[`spacing-${key}`] = {
        "$type": "dimension",
        "$value": value
      };
    });
  }
  // BorderRadius
  if (rawTokens.base.shape?.borderRadius) {
    flat['borderRadius-default'] = {
      "$type": "dimension",
      "$value": rawTokens.base.shape.borderRadius
    };
  }
  // Shadows
  if (rawTokens.base.shadows) {
    Object.entries(rawTokens.base.shadows).forEach(([key, value]) => {
      flat[`shadow-${key}`] = {
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
        flat[`duration-${key}`] = {
          "$type": "duration",
          "$value": `${value}ms`
        };
      });
    }
    if (easing) {
      Object.entries(easing).forEach(([key, value]) => {
        flat[`easing-${key}`] = {
          "$type": "cubicBezier",
          "$value": value
        };
      });
    }
  }
  return flat;
}

try {
  const rawTokens = require('./mui-tokens-raw.json');
  const flat = buildFlatAtomicTokens(rawTokens);
  const output = {
    MUI: flat,
    $metadata: {
      tokenSetOrder: ["MUI"]
    }
  };
  fs.writeFileSync(
    'tokens-studio-format.json',
    JSON.stringify(output, null, 2)
  );
  console.log('Successfully transformed tokens to flat atomic Tokens.Studio format under MUI set');
} catch (error) {
  console.error('Error transforming tokens:', error);
}
