import React from 'react';
import { TailwindShowcaseStock } from './TailwindShowcase-stock';

// DDS-themed Tailwind showcase
const TailwindShowcaseDDS: React.FC = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-blue-500">
        Tailwind Components
      </h2>
      <div className="flex flex-col gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">
          Primary Button
        </button>
        <button className="bg-grey-500 text-white px-4 py-2 rounded-md hover:opacity-90 transition">
          Secondary Button
        </button>
        <button className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition">
          Outlined Button
        </button>

        <div className="border border-grey-300 rounded-lg p-4 bg-grey-50">
          <h3 className="text-lg font-semibold mt-0 mb-2">Card Component</h3>
          <p className="text-sm text-grey-600 m-0">
            This card uses design tokens
          </p>
        </div>

        <input 
          type="text" 
          placeholder="Text Input"
          className="px-4 py-2 border border-grey-300 rounded text-sm"
        />
      </div>
    </>
  );
};

export const TailwindShowcase: React.FC<{ useDDSTheme?: boolean }> = ({ useDDSTheme = false }) => {
  return useDDSTheme ? <TailwindShowcaseDDS /> : <TailwindShowcaseStock />;
};

