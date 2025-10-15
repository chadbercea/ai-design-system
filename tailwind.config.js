import { theme as ddsTheme } from './build/tailwind/theme.js';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,jsx,ts,tsx}',
    './.storybook/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Override Tailwind defaults with DDS tokens
      borderRadius: {
        ...ddsTheme.borderRadius,
        // Map all Tailwind classes to token values
        'none': '0',
        'sm': ddsTheme.borderRadius.rounded,
        'md': ddsTheme.borderRadius.rounded,
        'lg': ddsTheme.borderRadius.rounded,
        'xl': ddsTheme.borderRadius.rounded,
        '2xl': ddsTheme.borderRadius.rounded,
        '3xl': ddsTheme.borderRadius.rounded,
        'full': ddsTheme.borderRadius.pill
      },
      borderWidth: ddsTheme.borderWidth,
      fontSize: ddsTheme.fontSize,
      fontFamily: {
        ...ddsTheme.fontFamily,
        sans: ddsTheme.fontFamily.product
      },
      fontWeight: ddsTheme.fontWeight,
      spacing: ddsTheme.spacing,
      // Import ALL DDS token properties
      colors: {
        ...ddsTheme.colors,
        // shadcn semantic colors use CSS variables
        border: 'hsl(var(--border, 217 20% 72%))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
      },
      // Import remaining DDS theme properties
      boxShadow: {
        ...ddsTheme.boxShadow,
        // Use elevation-0 token for all shadow classes (flat design)
        DEFAULT: ddsTheme.boxShadow.none || 'none',
        sm: ddsTheme.boxShadow.none || 'none',
        md: ddsTheme.boxShadow.none || 'none',
        lg: ddsTheme.boxShadow.none || 'none'
      },
      opacity: ddsTheme.opacity
    }
  },
  plugins: [],
}
