const fs = require('fs');

function transformTokensForTokensStudio(rawTokens) {
  const tokensStudioFormat = {
    MUI: {
      color: {},
      typography: {},
      spacing: {},
      borderRadius: {},
      shadow: {},
      duration: {},
      easing: {}
    },
    $metadata: {
      tokenSetOrder: ["MUI"]
    }
  };

  // Transform colors
  const colors = rawTokens.base.color;
  Object.entries(colors).forEach(([key, value]) => {
    // Convert nested paths to semantic names
    const tokenName = key
      .replace(/^palette\./, '')
      .split('.')
      .join('-');
    
    // Create color token under color category
    tokensStudioFormat.MUI.color[tokenName] = {
      "$type": "color",
      "$value": value,
      "$description": getColorDescription(tokenName)
    };
  });

  // Transform typography
  if (rawTokens.base.typography?.typography) {
    const typographyStyles = rawTokens.base.typography.typography;
    Object.entries(typographyStyles).forEach(([key, value]) => {
      if (typeof value === 'object') {
        // Break down typography into individual tokens under typography category
        if (value.fontFamily) {
          tokensStudioFormat.MUI.typography[`${key}-fontFamily`] = {
            "$type": "fontFamily",
            "$value": value.fontFamily,
            "$description": `Font family for ${key} style`
          };
        }
        if (value.fontSize) {
          tokensStudioFormat.MUI.typography[`${key}-fontSize`] = {
            "$type": "dimension",
            "$value": value.fontSize,
            "$description": `Font size for ${key} style`
          };
        }
        if (value.fontWeight) {
          tokensStudioFormat.MUI.typography[`${key}-fontWeight`] = {
            "$type": "fontWeight",
            "$value": value.fontWeight,
            "$description": `Font weight for ${key} style`
          };
        }
        if (value.lineHeight) {
          tokensStudioFormat.MUI.typography[`${key}-lineHeight`] = {
            "$type": "dimension",
            "$value": value.lineHeight,
            "$description": `Line height for ${key} style`
          };
        }
        if (value.letterSpacing) {
          tokensStudioFormat.MUI.typography[`${key}-letterSpacing`] = {
            "$type": "dimension",
            "$value": value.letterSpacing,
            "$description": `Letter spacing for ${key} style`
          };
        }
        if (value.textTransform) {
          tokensStudioFormat.MUI.typography[`${key}-textCase`] = {
            "$type": "textCase",
            "$value": value.textTransform,
            "$description": `Text transform for ${key} style`
          };
        }
      }
    });
  }

  // Transform spacing
  if (rawTokens.base.spacing) {
    Object.entries(rawTokens.base.spacing).forEach(([key, value]) => {
      tokensStudioFormat.MUI.spacing[key] = {
        "$type": "dimension",
        "$value": value,
        "$description": `Spacing unit ${key}`
      };
    });
  }

  // Transform borderRadius
  if (rawTokens.base.shape?.borderRadius) {
    tokensStudioFormat.MUI.borderRadius['default'] = {
      "$type": "dimension",
      "$value": rawTokens.base.shape.borderRadius,
      "$description": "Default border radius"
    };
  }

  // Transform shadows
  if (rawTokens.base.shadows) {
    Object.entries(rawTokens.base.shadows).forEach(([key, value]) => {
      tokensStudioFormat.MUI.shadow[key] = {
        "$type": "shadow",
        "$value": value,
        "$description": `Elevation shadow level ${key}`
      };
    });
  }

  // Transform transitions
  if (rawTokens.base.transitions) {
    const { duration, easing } = rawTokens.base.transitions;
    
    // Transform durations into individual tokens
    if (duration) {
      Object.entries(duration).forEach(([key, value]) => {
        tokensStudioFormat.MUI.duration[key] = {
          "$type": "duration",
          "$value": `${value}ms`,
          "$description": `Animation duration for ${key}`
        };
      });
    }

    // Transform easing functions into individual tokens
    if (easing) {
      Object.entries(easing).forEach(([key, value]) => {
        tokensStudioFormat.MUI.easing[key] = {
          "$type": "cubicBezier",
          "$value": value,
          "$description": `Easing function for ${key}`
        };
      });
    }
  }

  return tokensStudioFormat;
}

function getColorDescription(key) {
  if (key.includes('primary')) return 'Primary brand color';
  if (key.includes('secondary')) return 'Secondary brand color';
  if (key.includes('error')) return 'Error color';
  if (key.includes('warning')) return 'Warning color';
  if (key.includes('info')) return 'Info color';
  if (key.includes('success')) return 'Success color';
  if (key.includes('grey')) return 'Grey scale color';
  if (key.includes('text')) return 'Text color';
  if (key.includes('background')) return 'Background color';
  if (key.includes('action')) return 'Interactive state color';
  if (key.includes('common')) return 'Common color';
  return 'Base color';
}

// Main execution
try {
  const rawTokens = require('./mui-tokens-raw.json');
  const tokensStudioFormat = transformTokensForTokensStudio(rawTokens);

  // Write the output in a pretty format
  fs.writeFileSync(
    'tokens-studio-format.json',
    JSON.stringify(tokensStudioFormat, null, 2)
  );

  console.log('Successfully transformed tokens to Tokens.Studio format');
} catch (error) {
  console.error('Error transforming tokens:', error);
}
