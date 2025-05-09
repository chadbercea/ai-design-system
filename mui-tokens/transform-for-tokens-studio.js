const fs = require('fs');

function setNestedToken(obj, key, value) {
  const parts = key.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

function buildTokens(rawTokens) {
  const tokens = {};

  // Colors
  if (rawTokens.base.color) {
    Object.entries(rawTokens.base.color).forEach(([key, value]) => {
      setNestedToken(tokens, key, {
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
            ...(styleValue.textTransform && { "textTransform": styleValue.textTransform }),
            ...(styleValue.paragraphSpacing && { "paragraphSpacing": styleValue.paragraphSpacing }),
            ...(styleValue.paragraphIndent && { "paragraphIndent": styleValue.paragraphIndent }),
            ...(styleValue.textDecoration && { "textDecoration": styleValue.textDecoration }),
            ...(styleValue.textCase && { "textCase": styleValue.textCase })
          },
          ...(styleValue.$description && { "$description": styleValue.$description })
        };
      }
    });
  }

  // Spacing, Sizing, Padding, Margin, BorderRadius, BoxShadow, Opacity, etc.
  const otherTokenTypes = [
    { key: 'spacing', type: 'dimension' },
    { key: 'borderRadius', type: 'borderRadius' },
    { key: 'boxShadow', type: 'boxShadow' },
    { key: 'opacity', type: 'opacity' },
    { key: 'borderWidth', type: 'borderWidth' },
    { key: 'sizing', type: 'dimension' },
    { key: 'zIndex', type: 'number' },
    { key: 'breakpoints', type: 'dimension' },
    { key: 'duration', type: 'duration' },
    { key: 'easing', type: 'cubicBezier' }
  ];

  otherTokenTypes.forEach(({ key, type }) => {
    if (rawTokens.base[key] && typeof rawTokens.base[key] === 'object') {
      Object.entries(rawTokens.base[key]).forEach(([k, v]) => {
        setNestedToken(tokens, `${key}.${k}`, {
          "$type": type,
          "$value": v
        });
      });
    }
    if (rawTokens.other && typeof rawTokens.other === 'object') {
      Object.entries(rawTokens.other).forEach(([ok, ov]) => {
        if (ok.startsWith(`${key}.`)) {
          setNestedToken(tokens, ok, {
            "$type": type,
            "$value": ov
          });
        }
      });
    }
  });

  // Shadows/Elevation from array in 'other'
  if (rawTokens.other?.shadows && Array.isArray(rawTokens.other.shadows)) {
    rawTokens.other.shadows.forEach((value, idx) => {
      setNestedToken(tokens, `boxShadow.elevation${idx}`, {
        "$type": "boxShadow",
        "$value": value
      });
    });
  }

  // Transitions (duration, easing) from 'other'
  if (rawTokens.other && typeof rawTokens.other === 'object') {
    Object.entries(rawTokens.other).forEach(([ok, ov]) => {
      if (ok.startsWith('transitions.')) {
        if (ok.includes('easing')) {
          setNestedToken(tokens, ok, {
            "$type": "cubicBezier",
            "$value": ov
          });
        } else if (ok.includes('duration')) {
          setNestedToken(tokens, ok, {
            "$type": "duration",
            "$value": `${ov}ms`
          });
        }
      }
    });
  }

  // Direction, mode, etc. (as text or other)
  if (rawTokens.other && typeof rawTokens.other === 'object') {
    Object.entries(rawTokens.other).forEach(([ok, ov]) => {
      if (typeof ov === 'string' && (ok === 'direction' || ok.endsWith('.mode'))) {
        setNestedToken(tokens, ok, {
          "$type": "text",
          "$value": ov
        });
      }
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
  console.log('Successfully transformed tokens to nested, spec-compliant Tokens.Studio format.');
} catch (error) {
  console.error('Error transforming tokens:', error);
}
