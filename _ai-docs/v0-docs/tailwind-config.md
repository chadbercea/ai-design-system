import type { Config } from "tailwindcss"

/*
===========================================
TAILWIND CSS CONFIGURATION
===========================================

PURPOSE: This file configures Tailwind CSS to work with shadcn/ui and your design system.
It maps the CSS custom properties from globals.css to Tailwind utility classes.

WHAT THIS FILE DOES:
- Extends Tailwind's default theme with your custom colors
- Sets up the color system to use CSS custom properties
- Configures animations, spacing, and other design tokens
- Enables dark mode support
- Sets up content paths for purging unused styles

HOW TO USE:
- Add new colors by extending the colors object
- Customize spacing, fonts, animations in the extend section
- Modify content paths if you add new directories
- Add plugins for additional functionality

DOS:
✅ Use the extend object to add custom values (preserves defaults)
✅ Keep color names semantic (primary, secondary, success, etc.)
✅ Test that your content paths include all files with Tailwind classes
✅ Use hsl() function for colors to work with CSS custom properties
✅ Add custom animations and utilities in the extend section

DON'TS:
❌ Don't override the entire theme (use extend instead)
❌ Don't hardcode color values (use CSS custom properties)
❌ Don't forget to add new file paths to content array
❌ Don't remove the tailwindcss-animate plugin
❌ Don't change the darkMode setting unless you know what you're doing
*/

const config: Config = {
  // DARK MODE CONFIGURATION
  // Uses class-based dark mode (add 'dark' class to enable)
  darkMode: ["class"],

  // CONTENT PATHS
  // Tells Tailwind where to look for classes to avoid purging them
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],

  // THEME CONFIGURATION
  theme: {
    // CONTAINER SETTINGS
    // Centers containers and adds responsive padding
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    // THEME EXTENSIONS
    // Adds custom values while preserving Tailwind defaults
    extend: {
      // COLOR SYSTEM
      // Maps CSS custom properties to Tailwind color utilities
      colors: {
        // Base colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Component colors
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Chart colors for data visualization
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },

      // BORDER RADIUS
      // Consistent rounded corners throughout the app
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ANIMATIONS
      // Custom keyframes and animations
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },

      /*
      EXAMPLE EXTENSIONS YOU CAN ADD:
      
      // Custom fonts
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // Custom breakpoints
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      
      // Custom colors (add to colors object above)
      colors: {
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
      },
      */
    },
  },

  // PLUGINS
  // Extends Tailwind with additional utilities
  plugins: [
    // Provides animation utilities (required for shadcn/ui)
    require("tailwindcss-animate"),

    /*
    EXAMPLE PLUGINS YOU CAN ADD:
    
    // Typography plugin for rich text
    require('@tailwindcss/typography'),
    
    // Forms plugin for better form styling
    require('@tailwindcss/forms'),
    
    // Container queries
    require('@tailwindcss/container-queries'),
    */
  ],
}

export default config

/*
COMMON CUSTOMIZATION EXAMPLES:

1. CHANGE PRIMARY COLOR:
In globals.css, modify:
--primary: 262 83% 58%; (purple)
--primary: 142 76% 36%; (green)
--primary: 221 83% 53%; (blue)

2. ADD SUCCESS/WARNING COLORS:
In globals.css:
--success: 142 76% 36%;
--success-foreground: 355.7 100% 97.3%;

In this file, add to colors:
success: {
  DEFAULT: "hsl(var(--success))",
  foreground: "hsl(var(--success-foreground))",
},

3. CHANGE BORDER RADIUS:
In globals.css:
--radius: 0.75rem; (more rounded)
--radius: 0.25rem; (less rounded)
--radius: 0rem; (no rounding)

4. ADD CUSTOM FONT:
In this file, add to extend:
fontFamily: {
  sans: ['Your Font', 'system-ui', 'sans-serif'],
},
*/
