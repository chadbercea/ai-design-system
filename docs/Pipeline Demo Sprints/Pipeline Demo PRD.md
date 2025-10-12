DESIGN TOKEN PIPELINE - THEME VERIFICATION & VISUAL DIFFERENTIATION
PROBLEM STATEMENT
All three library columns look too similar, indicating:

SD-generated themes may not be applied correctly in DDS mode
Stock themes may not be actual library defaults

OBJECTIVE
Define and verify the complete token pipeline from Sync Provider through Style Dictionary to themed components in Storybook.

PART 1: PIPELINE ARCHITECTURE DEFINITION
Token Flow
Sync Provider (Tokens Studio/Figma)
    ↓
tokens/design-tokens.json (single source of truth)
    ↓
Style Dictionary Build
    ↓
Generated Outputs:
    ├── build/tokens.css (CSS variables)
    ├── build/mui-tokens.js (JavaScript object)
    ├── build/shadcn-tokens.css (CSS variables)
    └── build/tailwind-tokens.js (JavaScript object)
    ↓
Theme Configs:
    ├── src/themes/mui-theme.ts (imports mui-tokens.js)
    ├── shadcn uses shadcn-tokens.css directly
    └── tailwind.config.js (imports tailwind-tokens.js)
    ↓
Storybook Stories
    ├── Toggle OFF: Library defaults (no SD)
    └── Toggle ON: SD-generated themes
Acceptance Criteria - Pipeline Understanding

✅ tokens/design-tokens.json is single source
✅ Style Dictionary reads this file only
✅ Style Dictionary outputs 4 files
✅ Theme configs import from SD outputs
✅ Toggle switches between library defaults and SD themes


PART 2: STYLE DICTIONARY CONFIGURATION VERIFICATION
Requirements
Style Dictionary config must:

Read from tokens/design-tokens.json
Generate 4 distinct output files
Transform tokens appropriately for each platform
Output files contain all token values from source

Verification Steps

Check style-dictionary.config.js exists
Verify source points to tokens/**/*.json
Confirm 4 platforms defined
Run build command
Verify 4 files generated
Open each file and confirm token values present

Expected Outputs
build/tokens.css:

Contains :root { --color-primary-500: #2196f3; }
All tokens as CSS custom properties

build/mui-tokens.js:

JavaScript object with nested structure
export default { color: { primary: { 500: { value: "#2196f3" } } } }

build/shadcn-tokens.css:

CSS variables for shadcn
May use different naming convention

build/tailwind-tokens.js:

JavaScript object for Tailwind config
Same structure as mui-tokens.js

Acceptance Criteria - SD Configuration

✅ Config file valid
✅ Build runs without errors
✅ 4 files generated
✅ All files contain token values
✅ Token values match source JSON


PART 3: THEME IMPLEMENTATION VERIFICATION
MUI Theme
Requirements:

Theme file imports from build/mui-tokens.js
Uses createTheme() from MUI
Defines palette using token values
Exported as muiTheme

Verification:

File exists at src/themes/mui-theme.ts
Import statement references build/mui-tokens.js
palette.primary.main uses tokens.color.primary[500].value
File compiles without errors

Acceptance Criteria - MUI Theme:

✅ Imports SD-generated tokens
✅ Creates valid MUI theme object
✅ Compiles successfully

shadcn Theme
Requirements:

Uses build/shadcn-tokens.css for styling
CSS file imported in Storybook preview or component
Button component uses CSS variable classes

Verification:

shadcn-tokens.css imported somewhere
Button component uses token-based classes
Styles apply to shadcn components

Acceptance Criteria - shadcn Theme:

✅ CSS file imported
✅ Components use token variables

Tailwind Theme
Requirements:

tailwind.config.js imports build/tailwind-tokens.js
Config extends theme with token values
Classes resolve to token values

Verification:

Config file imports token file
theme.extend contains token mappings
Tailwind compiles successfully

Acceptance Criteria - Tailwind Theme:

✅ Config imports SD tokens
✅ Classes use token values


PART 4: TOGGLE IMPLEMENTATION
Stock Mode (Toggle OFF)
Requirements:

MUI: Uses default MUI theme (Material Design blue)
shadcn: Uses default shadcn styling (zinc/slate palette)
Tailwind: Uses default Tailwind classes (default blue)
NO SD-generated themes applied

Implementation Pattern:
if (isDDS) {
  // Use SD-generated themes
} else {
  // Use library defaults - NO SD imports
}
Acceptance Criteria - Stock Mode:

✅ MUI shows Material Design default colors
✅ shadcn shows default shadcn styling
✅ Tailwind shows default Tailwind colors
✅ All three look visually distinct from each other

DDS Mode (Toggle ON)
Requirements:

MUI: Uses muiTheme from src/themes/mui-theme.ts
shadcn: Uses shadcn-tokens.css variables
Tailwind: Uses token-based Tailwind classes
ALL use SD-generated themes from same source

Implementation Pattern:
if (isDDS) {
  // MUI: <ThemeProvider theme={muiTheme}>
  // shadcn: className includes DDS CSS variables
  // Tailwind: className uses token classes
} else {
  // Stock implementations
}
Acceptance Criteria - DDS Mode:

✅ All three use SD-generated themes
✅ Primary color identical across all three (#2196f3)
✅ Secondary color identical across all three (#f50057)
✅ Spacing consistent across libraries


PART 5: VISUAL VERIFICATION
Stock Mode Visual Check
MUI Column:

Primary button: Material Design blue (#1976d2)
Secondary button: Material Design pink (#f50057 or similar)
Distinct Material Design appearance

shadcn Column:

Primary button: Black or dark gray
Secondary button: Light gray
Minimal, flat design aesthetic

Tailwind Column:

Primary button: Tailwind blue (#3b82f6)
Secondary button: Tailwind gray
Utility-first styling appearance

Expected Result: All three columns look DIFFERENT from each other
DDS Mode Visual Check
All Three Columns:

Primary button: Same blue (#2196f3)
Secondary button: Same pink (#f50057)
Spacing feels consistent
Border radius similar

Expected Result: All three columns look SIMILAR to each other (same colors/spacing)
Acceptance Criteria - Visual Differentiation

✅ Stock mode: Columns visually distinct
✅ DDS mode: Columns visually similar
✅ Toggle changes appearance dramatically
✅ Colors change in all components simultaneously


PART 6: DEBUGGING CHECKLIST
If Stock Mode Looks Too Similar:
Check 1: Are SD themes being imported in stock mode?

Look for imports of build/.js or build/.css in stock code path
Remove any SD imports from stock implementation

Check 2: Is MUI using a custom theme in stock mode?

Stock MUI should have NO ThemeProvider or use createTheme() with no args
DDS MUI should wrap in <ThemeProvider theme={muiTheme}>

Check 3: Is shadcn using token CSS in stock mode?

Stock shadcn should use default classes
DDS shadcn should include token-based CSS classes

Check 4: Is Tailwind using token classes in stock mode?

Stock Tailwind should use standard Tailwind colors (bg-blue-500)
DDS Tailwind should use token classes (bg-primary)

If DDS Mode Colors Don't Match:
Check 1: Verify token source

Open tokens/design-tokens.json
Confirm primary-500 is #2196f3
Confirm secondary-500 is #f50057

Check 2: Verify SD build outputs

Open build/mui-tokens.js - check values
Open build/shadcn-tokens.css - check variables
Open build/tailwind-tokens.js - check values

Check 3: Verify theme configs

MUI theme: palette.primary.main uses correct token
Tailwind config: colors.primary uses correct token
shadcn CSS: --primary variable defined correctly

Check 4: Verify toggle implementation

Toggle state actually switches between implementations
No caching issues
All three columns react to toggle


PART 7: FINAL ACCEPTANCE CRITERIA
Pipeline Verification

✅ tokens/design-tokens.json contains all tokens
✅ Style Dictionary builds successfully
✅ 4 output files generated with correct values
✅ Theme configs import from SD outputs
✅ Storybook can access all themes

Visual Verification

✅ Stock mode: MUI looks like Material Design
✅ Stock mode: shadcn looks minimal/flat
✅ Stock mode: Tailwind looks like Tailwind defaults
✅ DDS mode: All three share same primary color
✅ DDS mode: All three share same secondary color
✅ Toggle switches immediately without errors

Functional Verification

✅ No console errors in either mode
✅ Components render in both modes
✅ Toggle state persists during interaction
✅ All buttons, cards, inputs visible


PART 8: IMPLEMENTATION REQUIREMENTS
Code Requirements
Stock Mode Implementation:

MUI: Render components directly, no custom theme
shadcn: Use default shadcn Button component as-is
Tailwind: Use standard Tailwind utility classes

DDS Mode Implementation:

MUI: Wrap in <ThemeProvider theme={muiTheme}>
shadcn: Apply DDS CSS class or import token CSS
Tailwind: Use token-mapped classes

Toggle Component:

Button visible above columns
Click toggles state
State controls which implementation renders
No page reload required

File Structure Requirements
tokens/
  └── design-tokens.json (source)
build/
  ├── tokens.css (generated)
  ├── mui-tokens.js (generated)
  ├── shadcn-tokens.css (generated)
  └── tailwind-tokens.js (generated)
src/
  ├── themes/
  │   └── mui-theme.ts (imports mui-tokens.js)
  └── stories/
      └── Home.stories.tsx (toggle implementation)
Acceptance Criteria - Implementation

✅ Clear separation between stock and DDS code paths
✅ No SD imports in stock implementation
✅ All SD themes imported in DDS implementation
✅ Toggle controls which path executes


PART 9: SUCCESS METRICS
Technical Success

Style Dictionary builds without errors
All 4 theme files generated correctly
Themes applied correctly in both modes
No console errors

Visual Success

Stock mode shows three distinct visual styles
DDS mode shows three similar visual styles (same colors)
Toggle creates obvious visual change
Colors match token source values

User Success

Demo clearly shows token pipeline working
Visual difference proves theme system works
Anyone can understand stock vs DDS immediately


DELIVERABLES

Verified Style Dictionary configuration
Verified theme implementations for all three libraries
Working toggle between stock and DDS modes
Visual proof that SD-generated themes work correctly
Documentation of pipeline flow

DEFINITION OF DONE
Project is complete when:

Toggle OFF shows three distinct library defaults
Toggle ON shows three similar DDS-themed libraries
Primary and secondary colors match across all three in DDS mode
No console errors in either mode
Visual inspection confirms correct theme application