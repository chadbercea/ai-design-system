import React from 'react';
import tailwindTheme from '../../build/tailwind/theme.js';

export default {
  title: 'Tailwind/Card',
};

const stockCardStyle = {
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '24px',
  backgroundColor: '#ffffff',
  maxWidth: '400px'
};

export const StockTailwind = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3>Stock Tailwind Card</h3>
      <div style={stockCardStyle}>
        <h4 style={{ marginTop: 0, fontSize: '20px', fontWeight: '600' }}>Card Title</h4>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
          This card uses Tailwind's default colors and spacing. The gray-400 border and gray-500 text are from Tailwind's standard palette.
        </p>
        <button style={{
          backgroundColor: '#3b82f6',
          color: '#ffffff',
          padding: '8px 16px',
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px'
        }}>
          Action Button
        </button>
      </div>
    </div>
  );
};

export const WithDDSTheme = () => {
  const ddsCardStyle = {
    border: `1px solid ${tailwindTheme.colors.grey[200]}`,
    borderRadius: '8px',
    padding: tailwindTheme.spacing[6],
    backgroundColor: tailwindTheme.colors.white,
    maxWidth: '400px'
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Card with DDS Theme</h3>
      <div style={ddsCardStyle}>
        <h4 style={{ 
          marginTop: 0, 
          fontSize: tailwindTheme.fontSize['2xl'], 
          fontWeight: tailwindTheme.fontWeight.semibold,
          color: tailwindTheme.colors.grey[900]
        }}>
          Card Title
        </h4>
        <p style={{ 
          color: tailwindTheme.colors.grey[600], 
          fontSize: tailwindTheme.fontSize.base, 
          marginBottom: tailwindTheme.spacing[4]
        }}>
          This card uses your design system colors and spacing. All values come from your Figma tokens, ensuring consistency across your application.
        </p>
        <button style={{
          backgroundColor: tailwindTheme.colors.primary,
          color: tailwindTheme.colors.white,
          padding: `${tailwindTheme.spacing[2]} ${tailwindTheme.spacing[4]}`,
          borderRadius: '6px',
          border: 'none',
          cursor: 'pointer',
          fontSize: tailwindTheme.fontSize.base,
          fontWeight: tailwindTheme.fontWeight.medium
        }}>
          Action Button
        </button>
      </div>
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f5f5f5', borderRadius: '4px', maxWidth: '400px' }}>
        <strong>Tokens Applied:</strong>
        <ul style={{ margin: '8px 0', paddingLeft: '20px', fontSize: '12px' }}>
          <li>Border: grey[200]</li>
          <li>Padding: spacing[6]</li>
          <li>Button: primary color</li>
          <li>Typography: fontSize and fontWeight scales</li>
        </ul>
      </div>
    </div>
  );
};

