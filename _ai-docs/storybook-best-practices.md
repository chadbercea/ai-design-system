# Storybook Best Practices

## Overview
This document outlines our standards for writing, organizing, and maintaining Storybook stories in our design system, with a focus on MUI components and typography. Based on [Storybook's official documentation](https://storybook.js.org/docs).

---

## 1. Type Safety & Meta Pattern
- Use one story file per component, named `<Component>.stories.tsx`
- Follow [Storybook's TypeScript guide](https://storybook.js.org/docs/react/configure/typescript) for proper typing
- Always use real MUI components and their prop types:
  ```ts
  import { Button } from '@mui/material';
  import type { ButtonProps } from '@mui/material';
  import type { Meta, StoryObj } from '@storybook/react';

  const meta: Meta<ButtonProps> = {
    title: 'Components/Button',
    component: Button,
    tags: ['autodocs'], // Enables automatic documentation
    parameters: {
      layout: 'centered', // Controls story layout
    },
    // ... other meta
  };
  export default meta;
  type Story = StoryObj<ButtonProps>;
  ```

---

## 2. Font Loading
- Use `@fontsource` for all required fonts
- Import fonts in `.storybook/preview.ts`:
  ```ts
  // Font imports
  import '@fontsource/roboto/400.css';
  import '@fontsource/roboto/700.css';
  import '@fontsource/roboto-mono/400.css';
  import '@fontsource/roboto-mono/700.css';
  import '@fontsource/inter/400.css';
  import '@fontsource/inter/700.css';
  import '@fontsource/poppins/400.css';
  import '@fontsource/poppins/700.css';

  // Preview configuration
  export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" }, // Automatically match action handlers
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  };
  ```

---

## 3. Controls & Args
- Follow [Storybook's Args documentation](https://storybook.js.org/docs/react/writing-stories/args) for proper control setup
- Define `argTypes` for all relevant props:
  ```ts
  const meta: Meta<ButtonProps> = {
    // ... other meta
    argTypes: {
      variant: {
        control: 'select',
        options: ['text', 'contained', 'outlined'],
        description: 'The variant to use',
        table: {
          defaultValue: { summary: 'text' },
          type: { summary: 'string' },
          category: 'Appearance',
        }
      },
      // ... other props
    }
  };
  ```
- Use default values in `args` for the most common use case
- Document each prop in the `argTypes` description

---

## 4. Story Structure
- Follow [Storybook's story organization guide](https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy)
- Include a playground story with controls:
  ```ts
  export const Playground: Story = {
    args: {
      children: 'Button Text',
      variant: 'contained',
      // ... other default props
    },
    parameters: {
      docs: {
        description: {
          story: 'Interactive playground for the Button component',
        },
      },
    },
  };
  ```
- Add an "All" story to showcase all variants:
  ```ts
  export const All: Story = {
    render: () => (
      <Stack spacing={2}>
        <Button variant="text">Text Button</Button>
        <Button variant="contained">Contained Button</Button>
        <Button variant="outlined">Outlined Button</Button>
      </Stack>
    ),
    parameters: {
      docs: {
        description: {
          story: 'All available button variants',
        },
      },
    },
  };
  ```

---

## 5. Theme Integration
- Use a global `<ThemeProvider>` in `.storybook/preview.ts`:
  ```ts
  import { ThemeProvider } from '@mui/material/styles';
  import { theme } from '../src/theme';

  export const decorators = [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    )
  ];
  ```
- Follow [Storybook's theming guide](https://storybook.js.org/docs/react/configure/theming) for additional customization

---

## 6. Accessibility
- Follow [Storybook's accessibility testing guide](https://storybook.js.org/docs/react/writing-tests/accessibility-testing)
- Use semantic HTML and ARIA attributes
- Test with Storybook's accessibility addon
- Prefer real user flows and keyboard navigation

---

## 7. Documentation
- Enable [autodocs](https://storybook.js.org/docs/react/writing-docs/autodocs) for automatic documentation
- Use [MDX](https://storybook.js.org/docs/react/writing-docs/mdx) for custom documentation
- Include component descriptions and usage guidelines
- Document props, variants, and examples

---

## 8. References
- [Storybook Documentation](https://storybook.js.org/docs)
- [MUI Docs](https://mui.com/material-ui/getting-started/overview/)
- [@fontsource Documentation](https://fontsource.org/)
- [Storybook Testing Guide](https://storybook.js.org/docs/react/writing-tests/introduction)

---

## 9. Summary
- Type-safe MUI stories with proper Meta typing
- Global font loading with @fontsource
- Comprehensive controls and documentation
- Consistent story structure with playground and variant examples
- Theme integration and accessibility testing
- Automatic documentation generation 