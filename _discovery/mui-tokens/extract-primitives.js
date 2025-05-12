const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');
const colors = require('@mui/material/colors');

// Helper function to convert string to PascalCase
function toPascalCase(str) {
  return str
    .split(/[-_. ]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

// Create the default MUI theme
const theme = createTheme();

// Initialize the primitives object
const primitives = {
  $schema: "https://design-tokens.github.io/design-tokens/schema.json",
  Primitives: {}
};

// 1. Extract Colors
const colorNames = [
  'blue', 'red', 'green', 'purple', 'orange', 'yellow', 'pink', 'indigo', 'teal', 'cyan',
  'amber', 'deepOrange', 'deepPurple', 'lightBlue', 'lightGreen', 'lime', 'brown', 'grey', 'blueGrey'
];

for (const colorName of colorNames) {
  if (colors[colorName]) {
    primitives.Primitives[colorName] = {};
    for (const shade in colors[colorName]) {
      primitives.Primitives[colorName][shade] = {
        $type: 'color',
        $value: colors[colorName][shade]
      };
    }
  }
}

// 2. Extract Typography
// Font Family
primitives.Primitives.fontFamilies = {
  Primary: {
    $type: 'fontFamilies',
    $value: theme.typography.fontFamilies,
    $description: 'Primary font family'
  }
};

// Font Weights
primitives.Primitives.fontWeights = {
  Light: {
    $type: 'fontWeights',
    $value: theme.typography.fontWeightsLight.toString(),
    $description: 'Light font weight'
  },
  Regular: {
    $type: 'fontWeights',
    $value: theme.typography.fontWeightsRegular.toString(),
    $description: 'Regular font weight'
  },
  Medium: {
    $type: 'fontWeights',
    $value: theme.typography.fontWeightsMedium.toString(),
    $description: 'Medium font weight'
  },
  Bold: {
    $type: 'fontWeights',
    $value: theme.typography.fontWeightsBold.toString(),
    $description: 'Bold font weight'
  }
};

// Font Sizes
primitives.Primitives.FontSize = {
  Base: {
    $type: 'fontSize',
    $value: theme.typography.fontSize.toString(),
    $description: 'Base font size'
  }
};

// Add per-style font sizes
const typographyStyles = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'subtitle1', 'subtitle2',
  'body1', 'body2',
  'button', 'caption', 'overline'
];

typographyStyles.forEach(style => {
  if (theme.typography[style]?.fontSize) {
    primitives.Primitives.FontSize[toPascalCase(style)] = {
      $type: 'fontSize',
      $value: theme.typography[style].fontSize.toString(),
      $description: `${toPascalCase(style)} font size`
    };
  }
});

// Line Heights
primitives.Primitives.LineHeight = {};
typographyStyles.forEach(style => {
  if (theme.typography[style]?.lineHeight) {
    primitives.Primitives.LineHeight[toPascalCase(style)] = {
      $type: 'lineHeight',
      $value: theme.typography[style].lineHeight.toString(),
      $description: `${toPascalCase(style)} line height`
    };
  }
});

// Letter Spacing
primitives.Primitives.LetterSpacing = {
  Base: {
    $type: 'letterSpacing',
    $value: theme.typography.letterSpacing.toString(),
    $description: 'Base letter spacing'
  }
};

typographyStyles.forEach(style => {
  if (theme.typography[style]?.letterSpacing) {
    primitives.Primitives.LetterSpacing[toPascalCase(style)] = {
      $type: 'letterSpacing',
      $value: theme.typography[style].letterSpacing.toString(),
      $description: `${toPascalCase(style)} letter spacing`
    };
  }
});

// Text Case
primitives.Primitives.TextCase = {
  None: {
    $type: 'textCase',
    $value: 'none',
    $description: 'No text case transformation'
  },
  Uppercase: {
    $type: 'textCase',
    $value: 'uppercase',
    $description: 'Uppercase text transformation'
  },
  Lowercase: {
    $type: 'textCase',
    $value: 'lowercase',
    $description: 'Lowercase text transformation'
  },
  Capitalize: {
    $type: 'textCase',
    $value: 'capitalize',
    $description: 'Capitalize text transformation'
  }
};

// Text Decoration
primitives.Primitives.TextDecoration = {
  None: {
    $type: 'textDecoration',
    $value: 'none',
    $description: 'No text decoration'
  },
  Underline: {
    $type: 'textDecoration',
    $value: 'underline',
    $description: 'Underline text decoration'
  },
  LineThrough: {
    $type: 'textDecoration',
    $value: 'line-through',
    $description: 'Line through text decoration'
  }
};

// 3. Extract Spacing
primitives.Primitives.Spacing = {
  Base: {
    $type: 'spacing',
    $value: '8' // MUI's default base spacing unit
  }
};

// Add scale values (0-10)
for (let i = 0; i <= 10; i++) {
  primitives.Primitives.Spacing[i.toString()] = {
    $type: 'spacing',
    $value: theme.spacing(i).toString()
  };
}

// 4. Extract Border Radius
primitives.Primitives.BorderRadius = {};
const shapeKeys = Object.keys(theme.shape);
if (shapeKeys.length === 1 && shapeKeys[0] === 'borderRadius') {
  primitives.Primitives.BorderRadius.Default = {
    $type: 'borderRadius',
    $value: theme.shape.borderRadius
  };
} else {
  for (const key of shapeKeys) {
    primitives.Primitives.BorderRadius[key] = {
      $type: 'borderRadius',
      $value: theme.shape[key]
    };
  }
}

// 5. Extract Opacity
primitives.Primitives.Opacity = {};
if (theme.palette && theme.palette.action) {
  for (const key in theme.palette.action) {
    if (
      typeof theme.palette.action[key] === 'number' ||
      (typeof theme.palette.action[key] === 'string' && theme.palette.action[key].match(/^\d*\.?\d+$/))
    ) {
      primitives.Primitives.Opacity[key] = {
        $type: 'opacity',
        $value: theme.palette.action[key].toString()
      };
    }
  }
}

// 6. Extract Z-Index
primitives.Primitives.ZIndex = {};
if (theme.zIndex) {
  for (const key in theme.zIndex) {
    primitives.Primitives.ZIndex[key] = {
      $type: 'zIndex',
      $value: theme.zIndex[key].toString()
    };
  }
}

// 7. Extract Breakpoints
primitives.Primitives.Breakpoints = {};
if (theme.breakpoints && theme.breakpoints.values) {
  for (const key in theme.breakpoints.values) {
    primitives.Primitives.Breakpoints[key] = {
      $type: 'breakpoints',
      $value: theme.breakpoints.values[key].toString()
    };
  }
}

// Write to JSON file
const outPath = path.join(__dirname, 'primitives.json');
fs.writeFileSync(outPath, JSON.stringify(primitives, null, 2));
console.log('Generated primitives.json with all MUI tokens.'); 