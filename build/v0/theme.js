import fs from 'fs';
import path from 'path';

// Read shadcn-variables.css
const shadcnVars = fs.readFileSync(path.join(process.cwd(), 'build/css/shadcn-variables.css'), 'utf8');

// Default semantic tokens that shadcn/ui needs
const defaultSemanticTokens = new Set([
  'background',
  'foreground',
  'card',
  'card-foreground',
  'popover',
  'popover-foreground',
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'muted',
  'muted-foreground',
  'accent',
  'accent-foreground',
  'destructive',
  'destructive-foreground',
  'border',
  'input',
  'ring',
  'radius'
]);

// Font family mapping for shadcn
const fontMapping = {
  'sans': 'fontFamiliesInter',      // Inter for UI
  'display': 'fontFamiliesPoppins', // Poppins for marketing/display
  'mono': 'fontFamiliesRobotoMono', // Roboto Mono for code
  'content': 'fontFamiliesRoboto'   // Roboto for content
};

// Semantic token mapping
const semanticMapping = {
  'border': ['borderweight', 'borderWidth'],
  'radius': ['borderradius'],
};

// Try to read globals.css but don't fail if it doesn't exist
function getExistingSemanticTokens() {
  try {
    const globalsContent = fs.readFileSync(path.join(process.cwd(), 'build/v0/globals.css'), 'utf8');
    const rootRegex = /:root\s*{([^}]+)}/;
    const varRegex = /--([^:]+):\s*([^;]+);/g;
    const rootMatch = rootRegex.exec(globalsContent);
    
    if (!rootMatch) return defaultSemanticTokens;
    
    const tokens = new Set();
    let match;
    
    while ((match = varRegex.exec(rootMatch[1]))) {
      tokens.add(match[1].trim());
    }
    
    return tokens;
  } catch (error) {
    // If file doesn't exist or can't be read, return default tokens
    return defaultSemanticTokens;
  }
}

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

// Find matching design token for a semantic token
function findMatchingDesignToken(semanticToken, designTokens) {
  // Check if we have a semantic mapping for this token
  const mappings = semanticMapping[semanticToken] || [];
  
  // Look through our mapped design token categories first
  for (const mapping of mappings) {
    const matchingToken = Object.entries(designTokens).find(([key]) => 
      key.toLowerCase().startsWith(mapping.toLowerCase())
    );
    if (matchingToken) return matchingToken[1];
  }

  // Fallback to direct matching if no mapping found
  const directMatch = Object.entries(designTokens).find(([key]) => 
    key.toLowerCase().includes(semanticToken.toLowerCase())
  );
  
  return directMatch ? directMatch[1] : null;
}

const semanticTokens = getExistingSemanticTokens();
const designTokens = extractCssVariables(shadcnVars);

const globalCss = `/* Font declarations - MUST come before Tailwind imports */
@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Regular.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsRegular.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Medium.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsSemibold.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Bold.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsBold.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Inter";
  src: url("/fonts/Inter-Black.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsBlack.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Regular.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsRegular.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Medium.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsSemibold.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Bold.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsBold.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Poppins";
  src: url("/fonts/Poppins-Black.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsBlack.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto Mono";
  src: url("/fonts/RobotoMono-Regular.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsRegular.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto Mono";
  src: url("/fonts/RobotoMono-Bold.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsBold.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("/fonts/Roboto-Regular.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsRegular.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("/fonts/Roboto-Medium.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsSemibold.value};
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: "Roboto";
  src: url("/fonts/Roboto-Bold.ttf") format("truetype");
  font-weight: ${designTokens.fontWeightsBold.value};
  font-style: normal;
  font-display: swap;
}

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
}

@layer base {
  :root {
    /* Font families mapped to shadcn's expectations but using our semantic naming */
    --font-sans: ${designTokens[fontMapping.sans].value}, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-display: ${designTokens[fontMapping.display].value}, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    --font-mono: ${designTokens[fontMapping.mono].value}, ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
    --font-content: ${designTokens[fontMapping.content].value}, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

    /* Color system */
    --background: ${designTokens.colorGrey50.value};
    --foreground: ${designTokens.colorGrey900.value};
    --card: ${designTokens.colorGrey50.value};
    --card-foreground: ${designTokens.colorGrey900.value};
    --popover: ${designTokens.colorGrey50.value};
    --popover-foreground: ${designTokens.colorGrey900.value};
    --primary: ${designTokens.colorBlue500.value};
    --primary-foreground: ${designTokens.colorGrey50.value};
    --secondary: ${designTokens.colorGrey100.value};
    --secondary-foreground: ${designTokens.colorGrey900.value};
    --muted: ${designTokens.colorGrey100.value};
    --muted-foreground: ${designTokens.colorGrey600.value};
    --accent: ${designTokens.colorGrey100.value};
    --accent-foreground: ${designTokens.colorGrey900.value};
    --destructive: ${designTokens.colorRed500.value};
    --destructive-foreground: ${designTokens.colorGrey50.value};
    --border: ${designTokens.colorGrey200.value};
    --input: ${designTokens.colorGrey200.value};
    --ring: ${designTokens.colorBlue500.value};
    --radius: ${designTokens.borderRadiusMd.value};
  }
 
  .dark {
    --background: ${designTokens.colorGrey900.value};
    --foreground: ${designTokens.colorGrey50.value};
    --card: ${designTokens.colorGrey900.value};
    --card-foreground: ${designTokens.colorGrey50.value};
    --popover: ${designTokens.colorGrey900.value};
    --popover-foreground: ${designTokens.colorGrey50.value};
    --primary: ${designTokens.colorBlue500.value};
    --primary-foreground: ${designTokens.colorGrey50.value};
    --secondary: ${designTokens.colorGrey800.value};
    --secondary-foreground: ${designTokens.colorGrey50.value};
    --muted: ${designTokens.colorGrey800.value};
    --muted-foreground: ${designTokens.colorGrey400.value};
    --accent: ${designTokens.colorGrey800.value};
    --accent-foreground: ${designTokens.colorGrey50.value};
    --destructive: ${designTokens.colorRed700.value};
    --destructive-foreground: ${designTokens.colorGrey50.value};
    --border: ${designTokens.colorGrey800.value};
    --input: ${designTokens.colorGrey800.value};
    --ring: ${designTokens.colorBlue500.value};
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans);
  }
}`;

// Write the globals.css file
fs.writeFileSync(path.join(process.cwd(), 'build/v0/globals.css'), globalCss, 'utf8');

export default {
  globalCss
};
