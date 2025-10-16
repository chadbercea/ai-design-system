import type { Preview } from '@storybook/react';
import '../build/css/tokens.css';
import '../src/app/globals.css'; // Stock shadcn New York theme
import '../build/shadcn/variables.css'; // DDS-generated shadcn theme
import '../src/index.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['DDS Token Pipeline', ['Home', 'MUI Library', 'Tailwind Library', 'Shadcn Library'], 'DDS:NEXT'],
      },
    },
  },
};

export default preview;
