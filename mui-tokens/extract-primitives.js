const fs = require('fs');
const path = require('path');
const { createTheme } = require('@mui/material/styles');
const colors = require('@mui/material/colors');

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
primitives.Primitives.FontFamily = {
  Primary: {
    $type: 'fontFamily',
    $value: theme.typography.fontFamily
  }
};

// Font Weights
primitives.Primitives.FontWeight = {
  Light: {
    $type: 'fontWeight',
    $value: theme.typography.fontWeightLight.toString()
  },
  Regular: {
    $type: 'fontWeight',
    $value: theme.typography.fontWeightRegular.toString()
  },
  Medium: {
    $type: 'fontWeight',
    $value: theme.typography.fontWeightMedium.toString()
  },
  Bold: {
    $type: 'fontWeight',
    $value: theme.typography.fontWeightBold.toString()
  }
};

// Font Sizes
primitives.Primitives.FontSize = {
  Base: {
    $type: 'fontSize',
    $value: theme.typography.fontSize.toString()
  }
};

// Add per-style font sizes
for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].fontSize
  ) {
    primitives.Primitives.FontSize[key] = {
      $type: 'fontSize',
      $value: theme.typography[key].fontSize.toString()
    };
  }
}

// Line Heights
primitives.Primitives.LineHeight = {};
for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].lineHeight
  ) {
    primitives.Primitives.LineHeight[key] = {
      $type: 'lineHeight',
      $value: theme.typography[key].lineHeight.toString()
    };
  }
}

// Letter Spacing
primitives.Primitives.LetterSpacing = {};
for (const key in theme.typography) {
  if (
    theme.typography[key] &&
    typeof theme.typography[key] === 'object' &&
    theme.typography[key].letterSpacing
  ) {
    primitives.Primitives.LetterSpacing[key] = {
      $type: 'letterSpacing',
      $value: theme.typography[key].letterSpacing.toString()
    };
  }
}

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