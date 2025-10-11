import React from 'react';
import tailwindTheme from '../../build/tailwind/theme.js';

export default {
  title: 'Tailwind/Button',
};

export const StockTailwind = () => {
  const buttonStyle = {
    backgroundColor: '#3b82f6', // Tailwind's default blue-500
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Stock Tailwind Buttons</h3>
      <p>Using Tailwind's default color palette.</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button style={{...buttonStyle, backgroundColor: '#3b82f6'}}>Primary (blue-500)</button>
        <button style={{...buttonStyle, backgroundColor: '#6b7280'}}>Secondary (gray-500)</button>
        <button style={{...buttonStyle, backgroundColor: '#ef4444'}}>Error (red-500)</button>
        <button style={{...buttonStyle, backgroundColor: '#f59e0b'}}>Warning (amber-500)</button>
      </div>
    </div>
  );
};

export const WithDDSTheme = () => {
  const buttonStyle = {
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: tailwindTheme.fontWeight.medium,
    fontSize: tailwindTheme.fontSize.base
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Buttons with DDS Theme</h3>
      <p>Using your design system tokens.</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button style={{...buttonStyle, backgroundColor: tailwindTheme.colors.primary}}>
          Primary
        </button>
        <button style={{...buttonStyle, backgroundColor: tailwindTheme.colors.secondary}}>
          Secondary
        </button>
        <button style={{...buttonStyle, backgroundColor: tailwindTheme.colors.blue[500]}}>
          Blue.500
        </button>
        <button style={{...buttonStyle, backgroundColor: tailwindTheme.colors.green[500]}}>
          Green.500
        </button>
      </div>
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Tailwind Theme Tokens:</strong>
        <pre style={{ fontSize: '12px', overflow: 'auto', backgroundColor: '#fff', padding: '12px', borderRadius: '4px' }}>
{`colors: {
  primary: "${tailwindTheme.colors.primary}",
  secondary: "${tailwindTheme.colors.secondary}",
  blue: { 50-950 shades },
  grey: { 50-950 shades },
  // ... full color palette
}
fontSize: {
  xs: "${tailwindTheme.fontSize.xs}",
  sm: "${tailwindTheme.fontSize.sm}",
  base: "${tailwindTheme.fontSize.base}",
  // ... full scale
}`}
        </pre>
      </div>
    </div>
  );
};

