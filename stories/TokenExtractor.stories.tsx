import type { Meta, StoryObj } from '@storybook/react';
import TokenExtractor from './TokenExtractor';

const meta = {
  title: 'Utility/TokenExtractor',
  component: TokenExtractor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A utility component that extracts and converts Material-UI theme tokens into various formats including raw tokens, W3C format, and token relationships.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    // No props to control as this is a utility component
  },
} satisfies Meta<typeof TokenExtractor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'The TokenExtractor provides a UI for extracting and downloading Material-UI theme tokens in different formats. The extracted tokens are automatically saved to localStorage and can be downloaded as JSON files.',
      },
    },
  },
}; 