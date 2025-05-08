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
    Object.entries(typographyStyles).forEach(([styleKey, styleValue]) => {
      if (typeof styleValue === 'object') {
        tokensStudioFormat.MUI.typography[styleKey] = {};
        if (styleValue.fontFamily) {
          tokensStudioFormat.MUI.typography[styleKey]["fontFamily"] = {
            "$type": "fontFamily",
            "$value": styleValue.fontFamily,
            "$description": `Font family for ${styleKey}`
          };
        }
        if (styleValue.fontSize) {
          tokensStudioFormat.MUI.typography[styleKey]["fontSize"] = {
            "$type": "dimension",
            "$value": styleValue.fontSize,
            "$description": `Font size for ${styleKey}`
          };
        }
        if (styleValue.fontWeight) {
          tokensStudioFormat.MUI.typography[styleKey]["fontWeight"] = {
            "$type": "fontWeight",
            "$value": styleValue.fontWeight,
            "$description": `Font weight for ${styleKey}`
          };
        }
        if (styleValue.lineHeight) {
          tokensStudioFormat.MUI.typography[styleKey]["lineHeight"] = {
            "$type": "dimension",
            "$value": styleValue.lineHeight,
            "$description": `Line height for ${styleKey}`
          };
        }
        if (styleValue.letterSpacing) {
          tokensStudioFormat.MUI.typography[styleKey]["letterSpacing"] = {
            "$type": "dimension",
            "$value": styleValue.letterSpacing,
            "$description": `Letter spacing for ${styleKey}`
          };
        }
        if (styleValue.textTransform) {
          tokensStudioFormat.MUI.typography[styleKey]["textCase"] = {
            "$type": "textCase",
            "$value": styleValue.textTransform,
            "$description": `Text transform for ${styleKey}`
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
