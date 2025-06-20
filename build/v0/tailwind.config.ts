import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      borderWidth: {
        DEFAULT: "var(--border-width)",
      },
      fontFamily: {
        sans: ["var(--font-family-sans)"],
        heading: ["var(--font-family-heading)"],
        mono: ["var(--font-family-mono)"],
      },
      fontSize: {
        "10": "calc(var(--font-10) * 1px)",
        "12": "calc(var(--font-12) * 1px)",
        "14": "calc(var(--font-14) * 1px)",
        "16": "calc(var(--font-16) * 1px)",
        "18": "calc(var(--font-18) * 1px)",
        "21": "calc(var(--font-21) * 1px)",
        "24": "calc(var(--font-24) * 1px)",
        "32": "calc(var(--font-32) * 1px)",
        "40": "calc(var(--font-40) * 1px)",
        "48": "calc(var(--font-48) * 1px)",
      },
      fontWeight: {
        light: "var(--font-light)",
        regular: "var(--font-regular)",
        semibold: "var(--font-semibold)",
        bold: "var(--font-bold)",
        extrabold: "var(--font-extrabold)",
      },
      spacing: {
        xs: "var(--xs)",
        "lg-border": "var(--lg)",
        "xl-border": "var(--xl)",
        "xxl-border": "var(--xxl)",
      },
      width: {
        "icon-xxs": "calc(var(--icon-xxs) * 1px)",
        "icon-xs": "calc(var(--icon-xs) * 1px)",
        "icon-sm": "calc(var(--icon-sm) * 1px)",
        "icon-md": "calc(var(--icon-md) * 1px)",
        "icon-lg": "calc(var(--icon-lg) * 1px)",
      },
      height: {
        "icon-xxs": "calc(var(--icon-xxs) * 1px)",
        "icon-xs": "calc(var(--icon-xs) * 1px)",
        "icon-sm": "calc(var(--icon-sm) * 1px)",
        "icon-md": "calc(var(--icon-md) * 1px)",
        "icon-lg": "calc(var(--icon-lg) * 1px)",
      },
      opacity: {
        hover: "var(--hover)",
        selected: "var(--selected)",
        focus: "var(--focus)",
        "focus-visible": "var(--focusvisible)",
        "outlined-border": "var(--outlinedborder)",
        active: "var(--active)",
        disabled: "var(--disabled)",
      },
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
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config