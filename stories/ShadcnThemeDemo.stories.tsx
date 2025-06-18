import React from 'react';
import { Button } from './Button';

export default {
  title: 'shadcn/DDS Theme Demo',
  parameters: {
    layout: 'centered',
  },
};

export const ThemeShowcase = () => (
  <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, background: 'var(--background)', color: 'var(--foreground)', borderRadius: 'var(--radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
    <h2 style={{ fontFamily: 'var(--font-marketing)', fontWeight: 700, fontSize: '1.5rem', marginBottom: 16 }}>DDS Theme (shadcn/ui)</h2>
    <div style={{ marginBottom: 16, padding: 16, background: 'var(--card)', borderRadius: 'var(--radius)' }}>
      <p style={{ marginBottom: 12 }}>This is a demo using DDS theme tokens with the local Button component.</p>
      <span style={{ marginRight: 8, display: 'inline-block' }}><Button primary label="Primary" /></span>
      <span style={{ marginRight: 8, display: 'inline-block' }}><Button label="Secondary" /></span>
      <span style={{ display: 'inline-block' }}><Button label="Destructive" backgroundColor="hsl(0 100% 50%)" /></span>
    </div>
    <div style={{ marginTop: 24, textAlign: 'center' }}>
      <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
        Try toggling dark mode in Storybook to see the DDS theme in action.
      </span>
    </div>
  </div>
); 