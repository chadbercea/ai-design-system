import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TailwindShowcase } from '../src/demo-components/TailwindShowcase';

const TailwindLibrary = () => (
  <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
    <TailwindShowcase />
  </div>
);

const meta: Meta<typeof TailwindLibrary> = {
  title: 'DDS Token Pipeline/Tailwind Library',
  component: TailwindLibrary,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof TailwindLibrary>;

export const AllComponents: Story = {};

