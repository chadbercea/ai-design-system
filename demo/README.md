# Design System Pipeline Demo

## Purpose

This demo proves the **core value proposition** of the design system pipeline:

**One design system source (Figma) → Multiple framework outputs, updated automatically**

## What This Demonstrates

1. **Multi-Framework Support**: Same design tokens generate themes for MUI, Tailwind, and Shadcn
2. **Before/After Comparison**: See stock components vs. DDS-themed components side-by-side
3. **Live Token Updates**: Change a token in Figma → rebuild → all frameworks update

## Running the Demo

### Option 1: Open Directly
```bash
# From project root
open demo/index.html
```

The demo uses file:// protocol and loads tokens from `../build/`

### Option 2: With Local Server
```bash
# Install a simple server if needed
npm install -g serve

# From project root
serve demo
```

Then open `http://localhost:3000`

## Testing the End-to-End Pipeline

### Simulate a Figma Change

1. **Edit the source tokens:**
   ```bash
   # Open the source file
   open token-studio-sync-provider/DDS\ Foundations.json
   ```

2. **Find and change Blue.500:**
   ```json
   "Blue": {
     "500": {
       "$type": "color",
       "$value": "#2560ff"  // ← Change this (try #ff0000 for red)
     }
   }
   ```

3. **Rebuild the tokens:**
   ```bash
   npm run build:tokens
   ```

4. **Refresh the demo:**
   - Reload `demo/index.html` in your browser
   - All "Using Blue.500" buttons will show your new color
   - All three frameworks (MUI, Tailwind, Shadcn) update together

### Expected Result

✅ **All themed buttons change color**  
✅ **Token values update in the code blocks**  
✅ **Proves: One source → Multiple outputs**

## What Each Framework Shows

### Material-UI (MUI)
- **Output**: `build/mui/theme.js`
- **Usage**: Import into MUI's `createTheme()`
- **Comparison**: MUI default blue (#1976d2) vs DDS Blue.500

### Tailwind CSS
- **Output**: `build/tailwind/theme.js`
- **Usage**: Drop into `tailwind.config.js`
- **Comparison**: Tailwind blue-500 (#3b82f6) vs DDS Blue.500

### Shadcn/UI
- **Outputs**: 
  - `build/shadcn/variables.css` (CSS custom properties)
  - `build/shadcn/tailwind.config.js` (Tailwind config)
- **Usage**: Import variables.css + use tailwind.config.js
- **Comparison**: Shadcn default (black) vs DDS Blue.500 (converted to HSL)

## The Value Proposition

This demo proves to stakeholders:

1. **Efficiency**: Design once, deploy to multiple frameworks
2. **Consistency**: All frameworks use the exact same token values
3. **Automation**: Token changes propagate automatically
4. **Flexibility**: Developers can use their preferred framework

## Next Steps

After seeing the demo:

1. **Connect to Figma**: Set up Token Studio plugin for real Figma sync
2. **Integrate into projects**: Import the generated themes into actual applications
3. **Expand tokens**: Add more design decisions (spacing, shadows, typography)
4. **CI/CD**: Automate the build process when tokens change in GitHub

## Troubleshooting

**Demo doesn't load:**
- Check that `build/` directory exists and contains token files
- Run `npm run build:tokens` to generate outputs

**Token values don't update after rebuild:**
- Hard refresh the browser (Cmd+Shift+R or Ctrl+Shift+R)
- Check that the JSON file in `build/json/tokens.json` has your changes

**Buttons look wrong:**
- Make sure you're opening the demo from the project root
- File paths are relative to `../build/`

## Files in This Demo

```
demo/
├── index.html      - Main comparison page
└── README.md       - This file
```

Simple, single-file demo with no build step required.

