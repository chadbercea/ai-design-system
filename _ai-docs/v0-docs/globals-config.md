@tailwind base;
@tailwind components;
@tailwind utilities;

/*
===========================================
SHADCN/UI GLOBAL STYLES & DESIGN TOKENS
===========================================

PURPOSE: This file defines your entire design system through CSS custom properties.
These variables control the look and feel of ALL shadcn/ui components automatically.

WHAT THIS FILE DOES:
- Sets up Tailwind CSS base, components, and utilities
- Defines color tokens that work with light/dark themes
- Provides consistent spacing, typography, and visual hierarchy
- Controls component defaults across your entire application

HOW TO USE:
- Modify the CSS custom properties (--variables) to change your design
- Colors use HSL format: hue saturation lightness
- Changes here affect ALL components automatically
- Test changes by modifying values and seeing instant results

DOS:
✅ Use HSL color format (easier to adjust saturation/lightness)
✅ Test both light and dark themes when making changes
✅ Keep color contrast ratios accessible (4.5:1 minimum)
✅ Use semantic color names (primary, secondary, destructive)
✅ Maintain consistent spacing scale

DON'TS:
❌ Don't use RGB or hex colors (breaks the theming system)
❌ Don't add component-specific styles here (use Tailwind classes instead)
❌ Don't remove the @tailwind directives
❌ Don't change variable names (will break components)
❌ Don't forget to update both light and dark theme values
*/

@layer base {
  :root {
    /* 
    BACKGROUND & SURFACE COLORS
    - background: Main page background
    - foreground: Primary text color
    - card: Component backgrounds (cards, modals, etc.)
    - popover: Floating element backgrounds
    - muted: Subtle backgrounds and disabled states
    */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 98%;
    --muted-foreground: 215.4 16.3% 46.9%;

    /* 
    INTERACTIVE COLORS
    - primary: Main brand color (buttons, links, focus states)
    - secondary: Secondary actions and accents
    - accent: Hover states and highlights
    */
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;

    /* 
    FEEDBACK COLORS
    - destructive: Error states, delete actions
    - warning: Caution states (you can add this)
    - success: Success states (you can add this)
    */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    /* 
    BORDER & VISUAL HIERARCHY
    - border: Default border color
    - input: Form input borders
    - ring: Focus ring color
    */
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 47.4% 11.2%;

    /* 
    CHART COLORS
    These are used by the chart components for data visualization
    */
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;

    /* 
    BORDER RADIUS
    Controls the roundedness of components
    */
    --radius: 0.5rem;
  }

  /* 
  DARK THEME
  Automatically applied when dark mode is active
  */
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
  }
}

/*
BASE ELEMENT STYLES
These provide sensible defaults for HTML elements
*/
@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
  }
}

/*
EXAMPLE CUSTOMIZATIONS YOU CAN ADD:

1. CUSTOM COLORS:
:root {
  --success: 142 76% 36%;
  --success-foreground: 355.7 100% 97.3%;
  --warning: 32 95% 44%;
  --warning-foreground: 355.7 100% 97.3%;
}

2. CUSTOM FONTS:
body {
  font-family: 'Inter', system-ui, sans-serif;
}

3. CUSTOM ANIMATIONS:
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
*/
