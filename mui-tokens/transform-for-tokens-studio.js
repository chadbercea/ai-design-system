const fs = require('fs');

function transformTokensForTokensStudio(rawTokens) {
  const tokensStudioFormat = {
    MUI: {},
    $metadata: {
      tokenSetOrder: ["MUI"]
    }
  };

  // Transform colors
  const colors = rawTokens.base.color;
  Object.entries(colors).forEach(([key, value]) => {
    // Remove only the 'palette.' prefix but keep the rest of the dot notation
    const tokenName = key.replace(/^palette\./, '');
    
    tokensStudioFormat.MUI[tokenName] = {
      "$type": "color",
      "$value": value,
      "$description": getColorDescription(key)
    };
  });

  // Transform typography
  if (rawTokens.base.typography?.typography) {
    const typographyStyles = rawTokens.base.typography.typography;
    Object.entries(typographyStyles).forEach(([key, value]) => {
      if (typeof value === 'object') {
        // Create composite typography token with properties in description
        const propertyDescriptions = [];
        if (value.fontFamily) propertyDescriptions.push(`Font Family: ${value.fontFamily}`);
        if (value.fontSize) propertyDescriptions.push(`Font Size: ${value.fontSize}`);
        if (value.fontWeight) propertyDescriptions.push(`Font Weight: ${value.fontWeight}`);
        if (value.lineHeight) propertyDescriptions.push(`Line Height: ${value.lineHeight}`);
        if (value.letterSpacing) propertyDescriptions.push(`Letter Spacing: ${value.letterSpacing}`);
        if (value.textTransform) propertyDescriptions.push(`Text Transform: ${value.textTransform}`);

        tokensStudioFormat.MUI[`typography.${key}`] = {
          "$type": "typography",
          "$value": {
            "fontFamily": value.fontFamily,
            "fontSize": value.fontSize,
            "fontWeight": value.fontWeight,
            "lineHeight": value.lineHeight,
            "letterSpacing": value.letterSpacing,
            ...(value.textTransform && { "textCase": value.textTransform })
          },
          "$description": `Typography style for ${key}. Properties:\n${propertyDescriptions.join('\n')}`
        };
      }
    });
  }

  // Transform spacing
  if (rawTokens.base.spacing) {
    Object.entries(rawTokens.base.spacing).forEach(([key, value]) => {
      tokensStudioFormat.MUI[`spacing.${key}`] = {
        "$type": "dimension",
        "$value": value,
        "$description": "Spacing unit"
      };
    });
  }

  // Transform borderRadius
  if (rawTokens.base.shape?.borderRadius) {
    tokensStudioFormat.MUI['shape.borderRadius'] = {
      "$type": "dimension",
      "$value": rawTokens.base.shape.borderRadius,
      "$description": "Default border radius"
    };
  }

  // Transform shadows
  if (rawTokens.base.shadows) {
    Object.entries(rawTokens.base.shadows).forEach(([key, value]) => {
      tokensStudioFormat.MUI[`elevation.${key}`] = {
        "$type": "shadow",
        "$value": value,
        "$description": `Elevation shadow level ${key}`
      };
    });
  }

  // Transform transitions
  if (rawTokens.base.transitions) {
    const { duration, easing } = rawTokens.base.transitions;
    
    // Transform durations
    if (duration) {
      Object.entries(duration).forEach(([key, value]) => {
        tokensStudioFormat.MUI[`duration.${key}`] = {
          "$type": "duration",
          "$value": `${value}ms`,
          "$description": `Animation duration for ${key}`
        };
      });
    }

    // Transform easing functions
    if (easing) {
      Object.entries(easing).forEach(([key, value]) => {
        tokensStudioFormat.MUI[`easing.${key}`] = {
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
