import fs from 'fs';
import path from 'path';

// Read shadcn-variables.css
const shadcnVars = fs.readFileSync(path.join(process.cwd(), 'build/css/shadcn-variables.css'), 'utf8');

// Extract all CSS variables from shadcn-variables.css
function extractCssVariables(css) {
  const varRegex = /--([^:]+):\s*([^;]+);(?:\s*\/\*\*\s*([^*]+)\s*\*\/)?/g;
  const variables = {};
  let match;

  while ((match = varRegex.exec(css))) {
    const [, name, value, comment] = match;
    variables[name] = {
      value: value.trim(),
      comment: comment ? comment.trim() : ''
    };
  }

  return variables;
}

const designTokens = extractCssVariables(shadcnVars);

// Convert hsl() to space-separated values and handle edge cases
function processHslValue(hsl) {
  // If already space-separated, return as is
  if (!hsl.includes('hsl(')) {
    return hsl;
  }
  
  // Extract values from hsl()
  const match = hsl.match(/hsl\(([^)]+)\)/);
  if (!match) return hsl;
  
  // Return just the space-separated values
  return match[1].trim();
}

const globalCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@layer base {
  :root {
    /* Typography tokens */
    --font-sans: "${designTokens.fontFamiliesInter.value}", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-display: "${designTokens.fontFamiliesPoppins.value}", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: "${designTokens.fontFamiliesRobotoMono.value}", ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace;

    /* Color tokens */
    --background: ${processHslValue(designTokens.colorGrey50.value)};
    --foreground: ${processHslValue(designTokens.colorGrey900.value)};
    --card: ${processHslValue(designTokens.colorGrey50.value)};
    --card-foreground: ${processHslValue(designTokens.colorGrey900.value)};
    --popover: ${processHslValue(designTokens.colorGrey50.value)};
    --popover-foreground: ${processHslValue(designTokens.colorGrey900.value)};
    --primary: ${processHslValue(designTokens.colorBlue500.value)};
    --primary-foreground: ${processHslValue(designTokens.colorGrey50.value)};
    --secondary: ${processHslValue(designTokens.colorGrey100.value)};
    --secondary-foreground: ${processHslValue(designTokens.colorGrey900.value)};
    --muted: ${processHslValue(designTokens.colorGrey100.value)};
    --muted-foreground: ${processHslValue(designTokens.colorGrey600.value)};
    --accent: ${processHslValue(designTokens.colorGrey100.value)};
    --accent-foreground: ${processHslValue(designTokens.colorGrey900.value)};
    --destructive: ${processHslValue(designTokens.colorRed500.value)};
    --destructive-foreground: ${processHslValue(designTokens.colorGrey50.value)};
    --border: ${processHslValue(designTokens.colorGrey200.value)};
    --input: ${processHslValue(designTokens.colorGrey200.value)};
    --ring: ${processHslValue(designTokens.colorBlue500.value)};
    --radius: ${designTokens.borderRadiusMd.value};
  }

  .dark {
    --background: ${processHslValue(designTokens.colorGrey900.value)};
    --foreground: ${processHslValue(designTokens.colorGrey50.value)};
    --card: ${processHslValue(designTokens.colorGrey900.value)};
    --card-foreground: ${processHslValue(designTokens.colorGrey50.value)};
    --popover: ${processHslValue(designTokens.colorGrey900.value)};
    --popover-foreground: ${processHslValue(designTokens.colorGrey50.value)};
    --primary: ${processHslValue(designTokens.colorBlue500.value)};
    --primary-foreground: ${processHslValue(designTokens.colorGrey50.value)};
    --secondary: ${processHslValue(designTokens.colorGrey800.value)};
    --secondary-foreground: ${processHslValue(designTokens.colorGrey50.value)};
    --muted: ${processHslValue(designTokens.colorGrey800.value)};
    --muted-foreground: ${processHslValue(designTokens.colorGrey400.value)};
    --accent: ${processHslValue(designTokens.colorGrey800.value)};
    --accent-foreground: ${processHslValue(designTokens.colorGrey50.value)};
    --destructive: ${processHslValue(designTokens.colorRed700.value)};
    --destructive-foreground: ${processHslValue(designTokens.colorGrey50.value)};
    --border: ${processHslValue(designTokens.colorGrey800.value)};
    --input: ${processHslValue(designTokens.colorGrey800.value)};
    --ring: ${processHslValue(designTokens.colorBlue500.value)};
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}`;

// Write the globals.css file
fs.writeFileSync(path.join(process.cwd(), 'build/v0/globals.css'), globalCss, 'utf8');

export default {
  globalCss
};
