import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/card';

export const ShadcnShowcase: React.FC<{ useDDSTheme?: boolean }> = ({ useDDSTheme = false }) => {
  return (
    <div className={useDDSTheme ? 'dds-theme' : ''}>
      <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-primary text-foreground">
        shadcn/ui Components
      </h2>
      <div className="flex flex-col gap-4">
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
          className="px-4 py-2 border border-input rounded text-base bg-background text-foreground"
        />
      </div>
    </div>
  );
};

