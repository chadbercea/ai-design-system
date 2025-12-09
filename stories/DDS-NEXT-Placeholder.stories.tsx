import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const ComingSoon = () => (
  <div style={{ 
    padding: '4rem', 
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto'
  }}>
    <h1 style={{ 
      fontSize: '3rem', 
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
      DDS:NEXT Coming Soon
    </h1>
    <p style={{ 
      fontSize: '1.25rem', 
      color: '#666',
      marginBottom: '2rem'
    }}>
      The next evolution of the Design Token Pipeline
    </p>
    <div style={{
      padding: '2rem',
      backgroundColor: '#f8f9fa',
      borderRadius: '12px',
      textAlign: 'left'
    }}>
      <h3 style={{ marginTop: 0 }}>What's Coming:</h3>
      <ul style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
        <li><strong>Docker Next Theme</strong> - Modern, elevated aesthetic with purple/cyan palette</li>
        <li><strong>Multi-Theme System</strong> - Switch between themes via dropdown</li>
        <li><strong>Token Editor</strong> - Live token editing in Storybook</li>
        <li><strong>More Frameworks</strong> - Ant Design, Chakra UI, and beyond</li>
      </ul>
    </div>
    <p style={{ 
      marginTop: '2rem',
      fontSize: '0.9rem',
      color: '#999'
    }}>
      See <code>docs/DOCKER-NEXT-THEME-PLAN.md</code> for full roadmap
    </p>
  </div>
);

const meta: Meta<typeof ComingSoon> = {
  title: 'DDS:NEXT/Coming Soon',
  component: ComingSoon,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ComingSoon>;

export const Default: Story = {};

