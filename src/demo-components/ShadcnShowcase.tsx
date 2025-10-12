import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';

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

        <Card>
          <CardHeader>
            <CardTitle>Card Component</CardTitle>
            <CardDescription>
              This card uses design tokens
            </CardDescription>
          </CardHeader>
        </Card>

        <input 
          type="text" 
          placeholder="Text Input"
          className="px-4 py-2 border border-input rounded text-sm bg-background"
        />
      </div>
    </div>
  );
};

