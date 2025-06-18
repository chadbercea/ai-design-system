import React from 'react';
// Replace these imports with the actual shadcn/ui import paths in your project
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default {
  title: 'shadcn/DDS Theme Demo',
  parameters: {
    layout: 'centered',
  },
};

export const ThemeShowcase = () => (
  <div style={{ maxWidth: 400, margin: '2rem auto', padding: 24, background: 'var(--background)', color: 'var(--foreground)', borderRadius: 'var(--radius)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
    <h2 style={{ fontFamily: 'var(--font-marketing)', fontWeight: 700, fontSize: '1.5rem', marginBottom: 16 }}>DDS Theme (shadcn/ui)</h2>
    <Card style={{ marginBottom: 16 }}>
      <CardHeader>Card Header</CardHeader>
      <CardContent>
        <p>This is a card using DDS theme tokens.</p>
        <Input placeholder="Type here..." style={{ marginTop: 8, marginBottom: 8 }} />
        <Button style={{ marginRight: 8 }}>Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </CardContent>
    </Card>
    <div style={{ marginTop: 24, textAlign: 'center' }}>
      <Button variant="destructive">Destructive</Button>
    </div>
    <div style={{ marginTop: 24, textAlign: 'center' }}>
      <span style={{ fontFamily: 'var(--font-code)', fontSize: '0.9rem', color: 'var(--muted-foreground)' }}>
        Try toggling dark mode in Storybook to see the DDS theme in action.
      </span>
    </div>
  </div>
); 