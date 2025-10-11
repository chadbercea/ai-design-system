import React from 'react';

export default {
  title: 'Shadcn/Button',
};

export const StockShadcn = () => {
  const buttonStyle = {
    backgroundColor: '#09090b', // Shadcn's default dark
    color: '#fafafa',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '14px'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Stock Shadcn Buttons</h3>
      <p>Using Shadcn/UI's default styling.</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button style={{...buttonStyle}}>Default</button>
        <button style={{...buttonStyle, backgroundColor: 'transparent', color: '#09090b', border: '1px solid #e4e4e7'}}>
          Outline
        </button>
        <button style={{...buttonStyle, backgroundColor: '#ef4444'}}>Destructive</button>
        <button style={{...buttonStyle, backgroundColor: '#71717a'}}>Secondary</button>
      </div>
    </div>
  );
};

export const WithDDSTheme = () => {
  const buttonStyle = {
    backgroundColor: '#2560ff', // Your primary from DDS
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
      <h3>Buttons with DDS Theme</h3>
      <p>Using your design system colors.</p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button style={buttonStyle}>Primary</button>
        <button style={{...buttonStyle, backgroundColor: '#6c7e9d'}}>Secondary</button>
        <button style={{...buttonStyle, backgroundColor: 'transparent', color: '#2560ff', border: '1px solid #2560ff'}}>
          Outline
        </button>
        <button style={{...buttonStyle, backgroundColor: '#ff5757'}}>Destructive</button>
      </div>
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Note:</strong>
        <p style={{ fontSize: '14px', margin: '8px 0' }}>
          Shadcn/UI components would consume your design tokens through CSS variables or through a configuration file.
          This demo shows the concept of how your design system colors can be applied to Shadcn-style components.
        </p>
      </div>
    </div>
  );
};

