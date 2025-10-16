import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MUIShowcase } from '../src/demo-components/MUIShowcase';

const MUILibrary = () => (
  <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
    <MUIShowcase />
  </div>
);

const meta: Meta<typeof MUILibrary> = {
  title: 'DDS Token Pipeline/MUI Library',
  component: MUILibrary,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof MUILibrary>;

export const AllComponents: Story = {};
