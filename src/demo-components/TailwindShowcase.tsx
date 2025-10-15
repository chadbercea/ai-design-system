import React from 'react';

// Single Tailwind component that uses theme switching via CSS class
export const TailwindShowcase: React.FC<{ useDDSTheme?: boolean }> = ({ useDDSTheme = false }) => {
  return (
    <div className={useDDSTheme ? 'dds-theme' : ''}>
      <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-primary text-foreground">
        Tailwind Components
      </h2>
      <div className="flex flex-col gap-4">
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded text-base hover:opacity-90 transition">
          Primary Button
        </button>
        <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded text-base hover:opacity-90 transition">
          Secondary Button
        </button>
        <button className="border border-primary text-primary px-4 py-2 rounded text-base hover:bg-primary hover:text-primary-foreground transition">
          Outlined Button
        </button>

        <div className="border border-border rounded-lg p-4 bg-card">
          <h3 className="text-lg font-semibold mt-0 mb-2 text-card-foreground">Card Component</h3>
          <p className="text-base text-muted-foreground m-0">
            This card uses design tokens
          </p>
        </div>

        <input 
          type="text" 
          placeholder="Text Input"
          className="px-4 py-2 border border-input rounded text-base bg-background text-foreground"
        />
      </div>
    </div>
  );
};

