import React from 'react';
import { Button } from '../components/ui/button';

export const ShadcnShowcase: React.FC<{ useDDSTheme?: boolean }> = ({ useDDSTheme = false }) => {
  return (
    <div className={useDDSTheme ? 'dds-theme' : ''}>
      <h2 style={{ marginTop: 0, marginBottom: '1rem', fontSize: '1.25rem', fontWeight: 600, borderBottom: '2px solid hsl(var(--primary))', paddingBottom: '0.5rem' }}>
        shadcn/ui Components
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Button variant="default">
          Primary Button
        </Button>
        <Button variant="secondary">
          Secondary Button
        </Button>
        <Button variant="outline">
          Outlined Button
        </Button>

        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          padding: '1rem',
          backgroundColor: '#f5f5f5'
        }}>
          <h3 style={{ marginTop: 0, fontSize: '1.1rem' }}>Card Component</h3>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#666' }}>
            This card uses design tokens
          </p>
        </div>

        <input 
          type="text" 
          placeholder="Text Input"
          style={{
            padding: '0.5rem',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            fontSize: '0.875rem'
          }}
        />
      </div>
    </div>
  );
};

