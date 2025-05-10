const fs = require('fs');
const path = require('path');

function toPascalCase(str) {
  return str.replace(/(^|[._-])(\w)/g, (_, __, c) => c ? c.toUpperCase() : '').replace(/\W/g, '');
}

function buildColorPrimitives(raw) {
  const primitives = {};
  // Only include base color primitives (e.g., blue.500, red.100)
  for (const [flatKey, value] of Object.entries(raw.base.color)) {
    // Skip semantic tokens (those containing 'palette', 'common', etc.)
    if (flatKey.includes('palette') || flatKey.includes('common')) {
      continue;
    }
    const [color, shade] = flatKey.split('.');
    primitives[flatKey] = {
      $value: value,
      $type: 'color',
      $description: `${color} ${shade}`
    };
  }
  return primitives;
}

function buildTypographyPrimitives(raw) {
  const primitives = {};
  if (raw.base.typography) {
    for (const [key, value] of Object.entries(raw.base.typography)) {
      primitives[key] = {
        $value: value,
        $type: 'typography',
        $description: `Typography style for ${key}`
      };
    }
  }
  return primitives;
}

function buildSpacingPrimitives(raw) {
  const primitives = {};
  if (raw.base.spacing) {
    for (const [key, value] of Object.entries(raw.base.spacing)) {
      primitives[key] = {
        $value: value,
        $type: 'spacing',
        $description: `Spacing value for ${key}`
      };
    }
  }
  return primitives;
}

function buildSemanticTokens(raw) {
  const semantic = {};
  
  // Handle palette tokens
  if (raw.base.color) {
    semantic.palette = {
      primary: {
        main: {
          $value: raw.base.color['blue.700'],
          $type: 'color',
          $description: 'MUI palette.primary.main'
        },
        light: {
          $value: raw.base.color['blue.400'],
          $type: 'color',
          $description: 'MUI palette.primary.light'
        },
        dark: {
          $value: raw.base.color['blue.800'],
          $type: 'color',
          $description: 'MUI palette.primary.dark'
        },
        contrastText: {
          $value: '#fff',
          $type: 'color',
          $description: 'MUI palette.primary.contrastText'
        }
      },
      secondary: {
        main: {
          $value: raw.base.color['purple.500'],
          $type: 'color',
          $description: 'MUI palette.secondary.main'
        },
        light: {
          $value: raw.base.color['purple.300'],
          $type: 'color',
          $description: 'MUI palette.secondary.light'
        },
        dark: {
          $value: raw.base.color['purple.700'],
          $type: 'color',
          $description: 'MUI palette.secondary.dark'
        },
        contrastText: {
          $value: '#fff',
          $type: 'color',
          $description: 'MUI palette.secondary.contrastText'
        }
      },
      error: {
        main: {
          $value: raw.base.color['red.700'],
          $type: 'color',
          $description: 'MUI palette.error.main'
        },
        light: {
          $value: raw.base.color['red.400'],
          $type: 'color',
          $description: 'MUI palette.error.light'
        },
        dark: {
          $value: raw.base.color['red.800'],
          $type: 'color',
          $description: 'MUI palette.error.dark'
        },
        contrastText: {
          $value: '#fff',
          $type: 'color',
          $description: 'MUI palette.error.contrastText'
        }
      },
      warning: {
        main: {
          $value: raw.base.color['orange.700'],
          $type: 'color',
          $description: 'MUI palette.warning.main'
        },
        light: {
          $value: raw.base.color['orange.400'],
          $type: 'color',
          $description: 'MUI palette.warning.light'
        },
        dark: {
          $value: raw.base.color['orange.800'],
          $type: 'color',
          $description: 'MUI palette.warning.dark'
        },
        contrastText: {
          $value: '#fff',
          $type: 'color',
          $description: 'MUI palette.warning.contrastText'
        }
      },
      info: {
        main: {
          $value: raw.base.color['lightBlue.700'],
          $type: 'color',
          $description: 'MUI palette.info.main'
        },
        light: {
          $value: raw.base.color['lightBlue.400'],
          $type: 'color',
          $description: 'MUI palette.info.light'
        },
        dark: {
          $value: raw.base.color['lightBlue.800'],
          $type: 'color',
          $description: 'MUI palette.info.dark'
        },
        contrastText: {
          $value: '#fff',
          $type: 'color',
          $description: 'MUI palette.info.contrastText'
        }
      },
      success: {
        main: {
          $value: raw.base.color['green.700'],
          $type: 'color',
          $description: 'MUI palette.success.main'
        },
        light: {
          $value: raw.base.color['green.400'],
          $type: 'color',
          $description: 'MUI palette.success.light'
        },
        dark: {
          $value: raw.base.color['green.800'],
          $type: 'color',
          $description: 'MUI palette.success.dark'
        },
        contrastText: {
          $value: '#fff',
          $type: 'color',
          $description: 'MUI palette.success.contrastText'
        }
      },
      grey: {
        50: {
          $value: raw.base.color['grey.50'],
          $type: 'color',
          $description: 'MUI palette.grey.50'
        },
        100: {
          $value: raw.base.color['grey.100'],
          $type: 'color',
          $description: 'MUI palette.grey.100'
        },
        200: {
          $value: raw.base.color['grey.200'],
          $type: 'color',
          $description: 'MUI palette.grey.200'
        },
        300: {
          $value: raw.base.color['grey.300'],
          $type: 'color',
          $description: 'MUI palette.grey.300'
        },
        400: {
          $value: raw.base.color['grey.400'],
          $type: 'color',
          $description: 'MUI palette.grey.400'
        },
        500: {
          $value: raw.base.color['grey.500'],
          $type: 'color',
          $description: 'MUI palette.grey.500'
        },
        600: {
          $value: raw.base.color['grey.600'],
          $type: 'color',
          $description: 'MUI palette.grey.600'
        },
        700: {
          $value: raw.base.color['grey.700'],
          $type: 'color',
          $description: 'MUI palette.grey.700'
        },
        800: {
          $value: raw.base.color['grey.800'],
          $type: 'color',
          $description: 'MUI palette.grey.800'
        },
        900: {
          $value: raw.base.color['grey.900'],
          $type: 'color',
          $description: 'MUI palette.grey.900'
        }
      },
      text: {
        primary: {
          $value: 'rgba(0, 0, 0, 0.87)',
          $type: 'color',
          $description: 'MUI palette.text.primary'
        },
        secondary: {
          $value: 'rgba(0, 0, 0, 0.6)',
          $type: 'color',
          $description: 'MUI palette.text.secondary'
        },
        disabled: {
          $value: 'rgba(0, 0, 0, 0.38)',
          $type: 'color',
          $description: 'MUI palette.text.disabled'
        }
      },
      divider: {
        $value: 'rgba(0, 0, 0, 0.12)',
        $type: 'color',
        $description: 'MUI palette.divider'
      },
      background: {
        paper: {
          $value: '#fff',
          $type: 'color',
          $description: 'MUI palette.background.paper'
        },
        default: {
          $value: '#fff',
          $type: 'color',
          $description: 'MUI palette.background.default'
        }
      },
      action: {
        active: {
          $value: 'rgba(0, 0, 0, 0.54)',
          $type: 'color',
          $description: 'MUI palette.action.active'
        },
        hover: {
          $value: 'rgba(0, 0, 0, 0.04)',
          $type: 'color',
          $description: 'MUI palette.action.hover'
        },
        selected: {
          $value: 'rgba(0, 0, 0, 0.08)',
          $type: 'color',
          $description: 'MUI palette.action.selected'
        },
        disabled: {
          $value: 'rgba(0, 0, 0, 0.26)',
          $type: 'color',
          $description: 'MUI palette.action.disabled'
        },
        disabledBackground: {
          $value: 'rgba(0, 0, 0, 0.12)',
          $type: 'color',
          $description: 'MUI palette.action.disabledBackground'
        },
        focus: {
          $value: 'rgba(0, 0, 0, 0.12)',
          $type: 'color',
          $description: 'MUI palette.action.focus'
        }
      }
    };
  }

  // Handle common tokens
  semantic.common = {
    black: {
      $value: '#000',
      $type: 'color',
      $description: 'MUI common.black'
    },
    white: {
      $value: '#fff',
      $type: 'color',
      $description: 'MUI common.white'
    }
  };

  return semantic;
}

function main() {
  const raw = JSON.parse(fs.readFileSync('./mui-tokens-raw.json', 'utf8'));
  
  // Build primitive tokens (only raw color values)
  const Primitives = buildColorPrimitives(raw);

  // Build semantic tokens (palette, common, etc.)
  const MUI = buildSemanticTokens(raw);

  const output = {
    "$schema": "https://design-tokens.github.io/design-tokens/schema.json",
    Primitives,
    MUI,
    "$metadata": {
      "tokenSetOrder": ["Primitives", "MUI"]
    }
  };

  // Validate output structure
  validateOutput(output);

  fs.writeFileSync(
    path.join(__dirname, 'tokens-studio-format.json'),
    JSON.stringify(output, null, 2)
  );
  console.log('Generated tokens-studio-format.json with properly separated primitive and semantic tokens.');
}

function validateOutput(output) {
  // Basic validation
  if (!output.$schema) {
    throw new Error('Missing $schema in output');
  }
  if (!output.Primitives) {
    throw new Error('Missing Primitives in output');
  }
  if (!output.MUI) {
    throw new Error('Missing MUI in output');
  }
  if (!output.$metadata?.tokenSetOrder) {
    throw new Error('Missing tokenSetOrder in metadata');
  }

  // Validate that Primitives only contains raw color values
  for (const [key, value] of Object.entries(output.Primitives)) {
    if (key.includes('palette') || key.includes('common')) {
      throw new Error(`Primitives set incorrectly contains semantic token: ${key}`);
    }
  }
}

main();
