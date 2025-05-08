const fs = require('fs');

function buildAtomicTokens(rawTokens) {
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
          atomic[`typography-${styleKey}-fontFamily`] = {
            "$type": "fontFamily",
            "$value": styleValue.fontFamily
          };
        }
        if (styleValue.fontSize) {
          atomic[`typography-${styleKey}-fontSize`] = {
            "$type": "dimension",
            "$value": styleValue.fontSize
          };
        }
        if (styleValue.fontWeight) {
          atomic[`typography-${styleKey}-fontWeight`] = {
            "$type": "fontWeight",
            "$value": styleValue.fontWeight
          };
        }
        if (styleValue.lineHeight) {
          atomic[`typography-${styleKey}-lineHeight`] = {
            "$type": "dimension",
            "$value": styleValue.lineHeight
          };
        }
        if (styleValue.letterSpacing) {
          atomic[`typography-${styleKey}-letterSpacing`] = {
            "$type": "dimension",
            "$value": styleValue.letterSpacing
          };
        }
        if (styleValue.textTransform) {
          atomic[`typography-${styleKey}-textCase`] = {
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
    atomic['borderRadius-default'] = {
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

function buildCompositeTokens(rawTokens, atomic) {
  const composite = { typography: {} };
  // Typography composite tokens
  if (rawTokens.base.typography?.typography) {
    const typographyStyles = rawTokens.base.typography.typography;
    Object.entries(typographyStyles).forEach(([styleKey, styleValue]) => {
      if (typeof styleValue === 'object') {
        const value = {};
        if (styleValue.fontFamily) value.fontFamily = `{Atomic.typography-${styleKey}-fontFamily}`;
        if (styleValue.fontSize) value.fontSize = `{Atomic.typography-${styleKey}-fontSize}`;
        if (styleValue.fontWeight) value.fontWeight = `{Atomic.typography-${styleKey}-fontWeight}`;
        if (styleValue.lineHeight) value.lineHeight = `{Atomic.typography-${styleKey}-lineHeight}`;
        if (styleValue.letterSpacing) value.letterSpacing = `{Atomic.typography-${styleKey}-letterSpacing}`;
        if (styleValue.textTransform) value.textCase = `{Atomic.typography-${styleKey}-textCase}`;
        composite.typography[styleKey] = {
          "$type": "typography",
          "$value": value,
          "$description": `Composite typography token for ${styleKey}`
        };
      }
    });
  }
  // Add more composite categories as needed
  return composite;
}

try {
  const rawTokens = require('./mui-tokens-raw.json');
  const atomic = buildAtomicTokens(rawTokens);
  const composite = buildCompositeTokens(rawTokens, atomic);
  const output = {
    MUI: composite,
    Atomic: atomic,
    $metadata: {
      tokenSetOrder: ["MUI", "Atomic"]
    }
  };
  fs.writeFileSync(
    'tokens-studio-format.json',
    JSON.stringify(output, null, 2)
  );
  console.log('Successfully transformed tokens to Tokens.Studio format with MUI and Atomic sets');
} catch (error) {
  console.error('Error transforming tokens:', error);
}
