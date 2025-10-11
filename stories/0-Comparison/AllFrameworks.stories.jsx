import React, { useState } from 'react';
import { 
  Button as MuiButton, 
  Card as MuiCard, 
  CardContent as MuiCardContent,
  Typography as MuiTypography,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { theme as ddsTheme } from '../../build/mui/theme';
import tailwindTheme from '../../build/tailwind/theme.js';

// Stock MUI theme
const stockMuiTheme = createTheme();

// MUI Section Component
const MUISection = ({ useDDS }) => {
  const theme = useDDS ? ddsTheme : stockMuiTheme;
  
  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: '20px', border: '1px solid #e0e0e0' }}>
        <h3 style={{ marginTop: 0 }}>MUI Components</h3>
        <p style={{ fontSize: '14px', color: '#666' }}>
          {useDDS ? 'Using DDS Theme' : 'Stock MUI Theme'}
        </p>
        
        <div style={{ marginBottom: '16px' }}>
          <MuiButton variant="contained" color="primary" style={{ marginRight: '8px' }}>
            Primary Button
          </MuiButton>
          <MuiButton variant="contained" color="secondary">
            Secondary Button
          </MuiButton>
        </div>
        
        <MuiCard style={{ marginBottom: '16px' }}>
          <MuiCardContent>
            <MuiTypography variant="h5" component="div">
              Card Title
            </MuiTypography>
            <MuiTypography variant="body2" color="text.secondary">
              This card demonstrates how MUI components look with {useDDS ? 'your design system' : 'stock MUI defaults'}.
            </MuiTypography>
          </MuiCardContent>
        </MuiCard>
        
        <div>
          <MuiTypography variant="h6">Typography</MuiTypography>
          <MuiTypography variant="body1">Body text example</MuiTypography>
          <MuiTypography variant="caption" display="block">
            Caption text
          </MuiTypography>
        </div>
      </div>
    </ThemeProvider>
  );
};

// Tailwind Section Component (styled with inline styles)
const TailwindSection = ({ useDDS }) => {
  
  const buttonStyle = useDDS ? {
    backgroundColor: tailwindTheme.colors.primary,
    color: '#ffffff',
    padding: tailwindTheme.spacing[2] + ' ' + tailwindTheme.spacing[4],
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '8px',
    fontSize: tailwindTheme.fontSize.base,
    fontWeight: tailwindTheme.fontWeight.medium
  } : {
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '8px',
    fontSize: '14px',
    fontWeight: '500'
  };
  
  const secondaryButtonStyle = useDDS ? {
    backgroundColor: tailwindTheme.colors.secondary,
    color: '#ffffff',
    padding: tailwindTheme.spacing[2] + ' ' + tailwindTheme.spacing[4],
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: tailwindTheme.fontSize.base,
    fontWeight: tailwindTheme.fontWeight.medium
  } : {
    backgroundColor: '#6b7280',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  };
  
  const h3Style = useDDS ? {
    marginTop: 0,
    fontSize: tailwindTheme.fontSize['2xl'],
    fontWeight: tailwindTheme.fontWeight.semibold
  } : {
    marginTop: 0,
    fontSize: '24px',
    fontWeight: '600'
  };
  
  const h4Style = useDDS ? {
    marginTop: 0,
    fontSize: tailwindTheme.fontSize.xl,
    fontWeight: tailwindTheme.fontWeight.semibold
  } : {
    marginTop: 0,
    fontSize: '20px',
    fontWeight: '600'
  };
  
  const h5Style = useDDS ? {
    marginTop: 0,
    fontSize: tailwindTheme.fontSize.lg,
    fontWeight: tailwindTheme.fontWeight.medium
  } : {
    marginTop: 0,
    fontSize: '18px',
    fontWeight: '500'
  };
  
  const bodyStyle = useDDS ? {
    fontSize: tailwindTheme.fontSize.md,
    fontWeight: tailwindTheme.fontWeight.normal
  } : {
    fontSize: '16px',
    fontWeight: '400'
  };
  
  const captionStyle = useDDS ? {
    fontSize: tailwindTheme.fontSize.sm,
    color: tailwindTheme.colors.grey[600],
    margin: 0,
    fontWeight: tailwindTheme.fontWeight.normal
  } : {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
    fontWeight: '400'
  };
  
  const cardStyle = useDDS ? {
    border: `1px solid ${tailwindTheme.colors.grey[200]}`,
    borderRadius: '8px',
    padding: tailwindTheme.spacing[4],
    marginBottom: tailwindTheme.spacing[4],
    backgroundColor: tailwindTheme.colors.white
  } : {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#ffffff'
  };
  
  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0' }}>
      <h3 style={h3Style}>Tailwind Components</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>
        {useDDS ? 'Using DDS Theme' : 'Stock Tailwind Theme'}
      </p>
      
      <div style={{ marginBottom: '16px' }}>
        <button style={buttonStyle}>
          Primary Button
        </button>
        <button style={secondaryButtonStyle}>
          Secondary Button
        </button>
      </div>
      
      <div style={cardStyle}>
        <h4 style={h4Style}>Card Title</h4>
        <p style={{ ...bodyStyle, color: useDDS ? tailwindTheme.colors.grey[700] : '#6b7280', margin: 0 }}>
          This card demonstrates how Tailwind components look with {useDDS ? 'your design system' : 'stock Tailwind defaults'}.
        </p>
      </div>
      
      <div>
        <h5 style={h5Style}>Typography</h5>
        <p style={{ ...bodyStyle, marginBottom: '8px' }}>Body text example</p>
        <p style={captionStyle}>
          Caption text
        </p>
      </div>
    </div>
  );
};

// Shadcn Section Component (using DDS tokens)
const ShadcnSection = ({ useDDS }) => {
  const buttonStyle = useDDS ? {
    backgroundColor: tailwindTheme.colors.primary,
    color: tailwindTheme.colors.white,
    padding: tailwindTheme.spacing[2] + ' ' + tailwindTheme.spacing[4],
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '8px',
    fontSize: tailwindTheme.fontSize.base,
    fontWeight: tailwindTheme.fontWeight.medium
  } : {
    backgroundColor: '#09090b',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    marginRight: '8px',
    fontSize: '14px',
    fontWeight: '500'
  };
  
  const secondaryButtonStyle = useDDS ? {
    backgroundColor: tailwindTheme.colors.secondary,
    color: tailwindTheme.colors.white,
    padding: tailwindTheme.spacing[2] + ' ' + tailwindTheme.spacing[4],
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: tailwindTheme.fontSize.base,
    fontWeight: tailwindTheme.fontWeight.medium
  } : {
    backgroundColor: '#71717a',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  };
  
  const h3Style = useDDS ? {
    marginTop: 0,
    fontSize: tailwindTheme.fontSize['2xl'],
    fontWeight: tailwindTheme.fontWeight.semibold
  } : {
    marginTop: 0,
    fontSize: '24px',
    fontWeight: '600'
  };
  
  const h4Style = useDDS ? {
    marginTop: 0,
    fontSize: tailwindTheme.fontSize.xl,
    fontWeight: tailwindTheme.fontWeight.semibold
  } : {
    marginTop: 0,
    fontSize: '20px',
    fontWeight: '600'
  };
  
  const h5Style = useDDS ? {
    marginTop: 0,
    fontSize: tailwindTheme.fontSize.lg,
    fontWeight: tailwindTheme.fontWeight.medium
  } : {
    marginTop: 0,
    fontSize: '18px',
    fontWeight: '500'
  };
  
  const bodyStyle = useDDS ? {
    fontSize: tailwindTheme.fontSize.md,
    fontWeight: tailwindTheme.fontWeight.normal
  } : {
    fontSize: '16px',
    fontWeight: '400'
  };
  
  const captionStyle = useDDS ? {
    fontSize: tailwindTheme.fontSize.sm,
    color: tailwindTheme.colors.grey[600],
    margin: 0,
    fontWeight: tailwindTheme.fontWeight.normal
  } : {
    fontSize: '12px',
    color: '#71717a',
    margin: 0,
    fontWeight: '400'
  };
  
  const cardStyle = useDDS ? {
    border: `1px solid ${tailwindTheme.colors.grey[200]}`,
    borderRadius: '8px',
    padding: tailwindTheme.spacing[4],
    marginBottom: tailwindTheme.spacing[4],
    backgroundColor: tailwindTheme.colors.white
  } : {
    border: '1px solid #e4e4e7',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#ffffff'
  };
  
  return (
    <div style={{ padding: '20px', border: '1px solid #e0e0e0' }}>
      <h3 style={h3Style}>Shadcn Components</h3>
      <p style={{ fontSize: '14px', color: '#666' }}>
        {useDDS ? 'Using DDS Theme' : 'Stock Shadcn Theme'}
      </p>
      
      <div style={{ marginBottom: '16px' }}>
        <button style={buttonStyle}>
          Primary Button
        </button>
        <button style={secondaryButtonStyle}>
          Secondary Button
        </button>
      </div>
      
      <div style={cardStyle}>
        <h4 style={h4Style}>Card Title</h4>
        <p style={{ ...bodyStyle, color: useDDS ? tailwindTheme.colors.grey[700] : '#71717a', margin: 0 }}>
          This card demonstrates how Shadcn components look with {useDDS ? 'your design system' : 'stock Shadcn defaults'}.
        </p>
      </div>
      
      <div>
        <h5 style={h5Style}>Typography</h5>
        <p style={{ ...bodyStyle, marginBottom: '8px' }}>Body text example</p>
        <p style={captionStyle}>
          Caption text
        </p>
      </div>
    </div>
  );
};

export default {
  title: 'Comparison/All Frameworks',
  parameters: {
    layout: 'fullscreen'
  }
};

export const BeforeAndAfter = () => {
  const [useDDS, setUseDDS] = useState(false);
  
  return (
    <div style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1>Design System Pipeline Demo</h1>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '24px' }}>
          {useDDS 
            ? '✨ One design system driving all three frameworks from a single source of truth' 
            : '⚠️ Each framework using its own defaults - inconsistent and hard to maintain'}
        </p>
        <label style={{ fontSize: '16px', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={useDDS}
            onChange={(e) => setUseDDS(e.target.checked)}
            style={{ marginRight: '8px', cursor: 'pointer', width: '18px', height: '18px' }}
          />
          <strong>Use DDS Theme</strong>
        </label>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '24px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <MUISection useDDS={useDDS} />
        <TailwindSection useDDS={useDDS} />
        <ShadcnSection useDDS={useDDS} />
      </div>
      
      <div style={{ marginTop: '40px', textAlign: 'center', maxWidth: '800px', margin: '40px auto 0' }}>
        <h3>Try the Live Pipeline</h3>
        <ol style={{ textAlign: 'left', lineHeight: '1.8' }}>
          <li>Change a color in Figma (e.g., Blue.500 to purple)</li>
          <li>Token Studio syncs the change to <code>token-studio-sync-provider/DDS Foundations.json</code></li>
          <li>Run <code>npm run build:tokens</code> in your terminal</li>
          <li>Refresh this page</li>
          <li>All DDS-themed components update automatically! ✨</li>
        </ol>
      </div>
    </div>
  );
};

