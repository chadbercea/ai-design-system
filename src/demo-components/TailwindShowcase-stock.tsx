import React from 'react';

// Stock Tailwind using default Tailwind colors
export const TailwindShowcaseStock: React.FC = () => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 pb-2 border-b-2 border-blue-500">
        Tailwind Components
      </h2>
      <div className="flex flex-col gap-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Primary Button
        </button>
        <button className="bg-slate-500 text-white px-4 py-2 rounded-md hover:bg-slate-600 transition">
          Secondary Button
        </button>
        <button className="border-2 border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition">
          Outlined Button
        </button>

        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mt-0 mb-2">Card Component</h3>
          <p className="text-sm text-gray-600 m-0">
            This card uses design tokens
          </p>
        </div>

        <input 
          type="text" 
          placeholder="Text Input"
          className="px-4 py-2 border border-gray-300 rounded text-sm"
        />
      </div>
    </>
  );
};

