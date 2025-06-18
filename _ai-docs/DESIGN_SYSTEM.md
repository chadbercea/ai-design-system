# Design System Documentation

## Overview
This design system provides a unified set of design tokens and components that can be used across multiple frameworks (MUI, Tailwind, Shadcn). It uses Style Dictionary with Token Studio transforms to maintain a single source of truth for design tokens.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation
```bash
# Install dependencies
npm install

# Build tokens
npm run build:tokens
```

## Token Management

### Source
Design tokens are sourced from `token-studio-sync-provider/DDS Foundations.json`. This file contains the raw design tokens that are transformed into various framework-specific formats.

### Build Process
The build process transforms the raw tokens into multiple formats:

- **DTCG JSON**: `build/json/tokens.json`
- **MUI Theme**: `build/mui/mui-theme.js`
- **Tailwind Config**: `build/tailwind/tailwind-theme.js`
- **Shadcn Config**: `build/shadcn/shadcn-theme.js`

To build tokens:
```bash
npm run build:tokens
```

To watch for token changes:
```bash
npm run watch:tokens
```

### Validation
The MUI theme is validated to ensure all required properties are present and filled. Run the validation with:
```bash
npm run validate:theme
```

## Framework Integration

### MUI Integration
The MUI theme is generated in `build/mui/mui-theme.js`. To use it:

```javascript
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './build/mui/mui-theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

### Tailwind Integration
The Tailwind configuration is generated in `build/tailwind/tailwind-theme.js`. To use it:

```javascript
// tailwind.config.js
import { theme } from './build/tailwind/tailwind-theme';

export default {
  theme: {
    extend: theme
  }
};
```

### Shadcn Integration
The Shadcn configuration is generated in `build/shadcn/shadcn-theme.js`. To use it:

```javascript
// components.json
import { theme } from './build/shadcn/shadcn-theme';

export default {
  style: theme
};
```

## Development

### Adding New Tokens
1. Add new tokens to `token-studio-sync-provider/DDS Foundations.json`
2. Run `npm run build:tokens` to generate updated framework configurations
3. Run `npm run validate:theme` to ensure MUI theme compatibility

### Component Development
Components should be developed using the generated theme configurations. This ensures consistency across the design system.

## Storybook Setup

### Installation
```bash
npm install --save-dev @storybook/react @storybook/builder-webpack5 @storybook/manager-webpack5 @storybook/addon-essentials @storybook/addon-interactions @storybook/addon-links @storybook/blocks @storybook/testing-library
```

### Configuration
1. Create `.storybook/main.js`:
```javascript
const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {}
  },
  docs: {
    autodocs: true
  },
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@tokens': path.resolve(__dirname, '../build')
    };
    return config;
  }
};
```

2. Create `.storybook/preview.js`:
```javascript
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../build/mui/mui-theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
```

### Running Storybook
```bash
npm run storybook
```

## Best Practices

1. **Token Usage**
   - Always use design tokens instead of hardcoded values
   - Reference tokens through the generated theme configurations
   - Maintain token hierarchy and relationships

2. **Component Development**
   - Use MUI as the base component library
   - Follow MUI's component API patterns
   - Document component props and usage

3. **Theme Customization**
   - Extend the base theme rather than overriding it
   - Use the provided theme structure for consistency
   - Validate theme changes using the validation script

## Troubleshooting

### Common Issues

1. **Token Build Failures**
   - Ensure `DDS Foundations.json` is valid JSON
   - Check for missing required properties
   - Verify token paths and relationships

2. **Theme Validation Errors**
   - Run `npm run validate:theme` to identify issues
   - Check for missing or empty theme properties
   - Verify token mappings in the Style Dictionary config

3. **Storybook Issues**
   - Clear Storybook cache: `npm run storybook -- --no-manager-cache`
   - Verify theme provider setup
   - Check component imports and exports

## Contributing

1. Create a new branch for your changes
2. Make your changes
3. Run token build and validation
4. Submit a pull request

## License
[Your License Here] 