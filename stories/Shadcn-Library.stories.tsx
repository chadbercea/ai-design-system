import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ShadcnShowcase } from '../src/demo-components/ShadcnShowcase';

const ShadcnLibrary = () => (
  <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
    <ShadcnShowcase />
  </div>
);

const meta: Meta<typeof ShadcnLibrary> = {
  title: 'DDS Token Pipeline/Shadcn Library',
  component: ShadcnLibrary,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ShadcnLibrary>;

export const AllComponents: Story = {};
