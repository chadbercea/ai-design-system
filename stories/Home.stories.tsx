import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MUIShowcase } from '../src/demo-components/MUIShowcase';
import { ShadcnShowcase } from '../src/demo-components/ShadcnShowcase';
import { TailwindShowcase } from '../src/demo-components/TailwindShowcase';

// This is the HOME VIEW - 3 columns showing all libraries with in-page theme toggle
const ThreeColumnComparison = () => {
  const [useDDSTheme, setUseDDSTheme] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      {/* IN-PAGE THEME TOGGLE */}
      <div style={{ 
        marginBottom: '2rem', 
        padding: '1rem', 
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Design Token Pipeline Demo</h1>
          <p style={{ margin: '0.5rem 0 0 0', color: '#666' }}>
            {useDDSTheme ? (
              <><strong>DDS Tokens Active:</strong> All libraries using matching colors from token pipeline</>
            ) : (
              <><strong>Library Defaults:</strong> Each library using its own stock theme</>
            )}
          </p>
        </div>
        <button
          onClick={() => setUseDDSTheme(!useDDSTheme)}
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 600,
            backgroundColor: useDDSTheme ? '#10b981' : '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          {useDDSTheme ? 'Switch to Library Defaults' : 'Apply DDS Tokens'}
        </button>
      </div>

      {/* 3-COLUMN LAYOUT */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* COLUMN 1: MUI */}
        <div style={{ border: '2px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem' }}>
          <MUIShowcase useDDSTheme={useDDSTheme} />
        </div>

        {/* COLUMN 2: shadcn */}
        <div style={{ border: '2px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem' }}>
          <ShadcnShowcase useDDSTheme={useDDSTheme} />
        </div>

        {/* COLUMN 3: Tailwind */}
        <div style={{ border: '2px solid #e0e0e0', borderRadius: '8px', padding: '1.5rem' }}>
          <TailwindShowcase useDDSTheme={useDDSTheme} />
        </div>
      </div>

      {/* EXPLANATION */}
      <div style={{ 
        padding: '1.5rem', 
        backgroundColor: '#e3f2fd', 
        borderRadius: '8px',
        border: '2px solid #2196f3'
      }}>
        <h3 style={{ marginTop: 0 }}>🎯 What This Proves</h3>
        <p style={{ margin: '0.5rem 0' }}>
          All three columns above are using <strong>STOCK components</strong> from their respective libraries:
        </p>
        <ul style={{ margin: '0.5rem 0', paddingLeft: '1.5rem' }}>
          <li><strong>MUI:</strong> @mui/material Button, Card, TextField</li>
          <li><strong>shadcn:</strong> shadcn/ui Button component</li>
          <li><strong>Tailwind:</strong> Pure Tailwind CSS utility classes</li>
        </ul>
        <p style={{ margin: '0.5rem 0 0 0' }}>
          They all use colors, spacing, and typography from the <strong>same design token source</strong> 
          (<code>token-studio-sync-provider/DDS Foundations.json</code>). Click "Switch Theme" above to see all three update simultaneously.
        </p>
      </div>
    </div>
  );
};

const meta: Meta<typeof ThreeColumnComparison> = {
  title: 'Home/Token Pipeline Demo',
  component: ThreeColumnComparison,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof ThreeColumnComparison>;

export const Default: Story = {};
