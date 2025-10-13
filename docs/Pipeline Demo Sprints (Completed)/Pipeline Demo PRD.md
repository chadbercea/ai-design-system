DESIGN TOKEN PIPELINE - THEME VERIFICATION & VISUAL DIFFERENTIATION
PROBLEM STATEMENT
All three library columns look too similar, indicating:

SD-generated themes may not be applied correctly in DDS mode
Stock themes may not be actual library defaults

OBJECTIVE
Define and verify the complete token pipeline from Tokens Studio (Figma) through Style Dictionary to themed components in Storybook.

PART 1: PIPELINE ARCHITECTURE DEFINITION
Token Flow
Tokens Studio for Figma (DDS Foundations set active)
    ↓
Export to GitHub
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
Token Categories from Figma
Required categories in tokens/design-tokens.json:

Sizing
Icon
Spacing
Color
Border Radius
Border Width
Opacity
Box Shadow
Font Family
Font Weight
Line Height
Font Size
Letter Spacing
Paragraph Spacing
Text Case
Text Decoration
Text

Acceptance Criteria - Pipeline Understanding

✅ Tokens Studio exports DDS Foundations set to GitHub
✅ tokens/design-tokens.json contains all token categories from Figma
✅ Style Dictionary reads this file only
✅ Style Dictionary outputs 4 files
✅ Theme configs import from SD outputs
✅ Toggle switches between library defaults and SD themes


PART 2: STYLE DICTIONARY CONFIGURATION VERIFICATION
Requirements
Style Dictionary config must:

Read from tokens/design-tokens.json
Generate 4 distinct output files
Transform all token categories appropriately for each platform
Output files contain all token values from source

Verification Steps

Check style-dictionary.config.js exists
Verify source points to tokens/**/*.json
Confirm 4 platforms defined
Run build command
Verify 4 files generated
Open each file and confirm all token categories present

Expected Outputs
build/tokens.css:

Contains :root with CSS custom properties for all categories
All token values from source JSON

build/mui-tokens.js:

JavaScript object with nested structure
All token categories represented
Values match source JSON

build/shadcn-tokens.css:

CSS variables for all token categories
May use different naming convention

build/tailwind-tokens.js:

JavaScript object for Tailwind config
All token categories available
Values match source JSON

Acceptance Criteria - SD Configuration

✅ Config file valid
✅ Build runs without errors
✅ 4 files generated
✅ All token categories present in outputs
✅ Token values match source JSON exactly


PART 3: THEME IMPLEMENTATION VERIFICATION
MUI Theme
Requirements:

Theme file imports from build/mui-tokens.js
Uses createTheme() from MUI
Defines palette using token color values
Defines spacing using token spacing values
Defines typography using token font values
Defines shape using token border radius values
Exported as muiTheme

Verification:

File exists at src/themes/mui-theme.ts
Import statement references build/mui-tokens.js
All relevant token categories mapped to MUI theme structure
File compiles without errors

Acceptance Criteria - MUI Theme:

✅ Imports SD-generated tokens
✅ Creates valid MUI theme object
✅ Maps color tokens to palette
✅ Maps spacing tokens to spacing
✅ Maps font tokens to typography
✅ Maps border radius to shape
✅ Compiles successfully

shadcn Theme
Requirements:

Uses build/shadcn-tokens.css for styling
CSS file imported in Storybook preview or component
All token categories available as CSS variables
Components use CSS variable classes

Verification:

shadcn-tokens.css imported somewhere
CSS variables defined for all categories
Components can access token variables
Styles apply to shadcn components

Acceptance Criteria - shadcn Theme:

✅ CSS file imported
✅ All token categories as CSS variables
✅ Components use token variables

Tailwind Theme
Requirements:

tailwind.config.js imports build/tailwind-tokens.js
Config extends theme with all relevant token categories
Classes resolve to token values
All token categories mapped to Tailwind structure

Verification:

Config file imports token file
theme.extend contains mappings for:

colors (from Color tokens)
spacing (from Spacing tokens)
fontSize (from Font Size tokens)
borderRadius (from Border Radius tokens)
fontFamily (from Font Family tokens)
fontWeight (from Font Weight tokens)
lineHeight (from Line Height tokens)
letterSpacing (from Letter Spacing tokens)
opacity (from Opacity tokens)
boxShadow (from Box Shadow tokens)


Tailwind compiles successfully

Acceptance Criteria - Tailwind Theme:

✅ Config imports SD tokens
✅ All applicable token categories mapped
✅ Classes use token values
✅ Compiles without errors


PART 4: TOGGLE IMPLEMENTATION
Stock Mode (Toggle OFF)
Requirements:

MUI: Uses default MUI theme
shadcn: Uses default shadcn styling
Tailwind: Uses default Tailwind classes
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
ALL use SD-generated themes from same Figma source

Implementation Pattern:
if (isDDS) {
  // MUI: <ThemeProvider theme={muiTheme}>
  // shadcn: className includes DDS CSS variables
  // Tailwind: className uses token classes
} else {
  // Stock implementations
}
Acceptance Criteria - DDS Mode:

✅ All three use SD-generated themes from Figma tokens
✅ Primary color identical across all three
✅ Secondary color identical across all three
✅ Spacing consistent across libraries
✅ Typography consistent across libraries
✅ Border radius consistent across libraries


PART 5: VISUAL VERIFICATION
Stock Mode Visual Check
MUI Column:

Uses Material Design default colors
Distinct Material Design appearance

shadcn Column:

Uses default shadcn colors
Minimal, flat design aesthetic

Tailwind Column:

Uses default Tailwind colors
Utility-first styling appearance

Expected Result: All three columns look DIFFERENT from each other
DDS Mode Visual Check
All Three Columns:

Use colors from DDS Foundations token set
Use spacing from DDS Foundations token set
Use typography from DDS Foundations token set
Use border radius from DDS Foundations token set

Expected Result: All three columns look SIMILAR to each other (same design language)
Acceptance Criteria - Visual Differentiation

✅ Stock mode: Columns visually distinct
✅ DDS mode: Columns visually similar
✅ Toggle changes appearance dramatically
✅ All token categories reflected in visual change


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
Confirm all token categories present
Verify values match Figma export

Check 2: Verify SD build outputs

Open build/mui-tokens.js - check all categories present
Open build/shadcn-tokens.css - check all variables defined
Open build/tailwind-tokens.js - check all categories present

Check 3: Verify theme configs

MUI theme: all token categories mapped
Tailwind config: all token categories mapped
shadcn CSS: all variables accessible

Check 4: Verify toggle implementation

Toggle state actually switches between implementations
No caching issues
All three columns react to toggle


PART 7: FINAL ACCEPTANCE CRITERIA
Pipeline Verification

✅ Tokens Studio exports DDS Foundations set
✅ tokens/design-tokens.json contains all token categories
✅ Style Dictionary builds successfully
✅ 4 output files generated with all token categories
✅ Theme configs import from SD outputs
✅ Storybook can access all themes

Token Category Coverage

✅ Sizing tokens available
✅ Icon tokens available
✅ Spacing tokens available
✅ Color tokens available
✅ Border Radius tokens available
✅ Border Width tokens available
✅ Opacity tokens available
✅ Box Shadow tokens available
✅ Font Family tokens available
✅ Font Weight tokens available
✅ Line Height tokens available
✅ Font Size tokens available
✅ Letter Spacing tokens available
✅ Paragraph Spacing tokens available
✅ Text Case tokens available
✅ Text Decoration tokens available
✅ Text tokens available

Visual Verification

✅ Stock mode: MUI looks like Material Design
✅ Stock mode: shadcn looks minimal/flat
✅ Stock mode: Tailwind looks like Tailwind defaults
✅ DDS mode: All three share same design language
✅ DDS mode: Colors consistent across libraries
✅ DDS mode: Spacing consistent across libraries
✅ DDS mode: Typography consistent across libraries
✅ Toggle switches immediately without errors

Functional Verification

✅ No console errors in either mode
✅ Components render in both modes
✅ Toggle state persists during interaction
✅ All buttons, cards, inputs visible
✅ All token categories reflected in visual output


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
  └── design-tokens.json (exported from Figma - all categories)
build/
  ├── tokens.css (generated - all categories)
  ├── mui-tokens.js (generated - all categories)
  ├── shadcn-tokens.css (generated - all categories)
  └── tailwind-tokens.js (generated - all categories)
src/
  ├── themes/
  │   └── mui-theme.ts (imports mui-tokens.js, maps all categories)
  └── stories/
      └── Home.stories.tsx (toggle implementation)
tailwind.config.js (imports tailwind-tokens.js, maps all categories)
Acceptance Criteria - Implementation

✅ Clear separation between stock and DDS code paths
✅ No SD imports in stock implementation
✅ All SD themes imported in DDS implementation
✅ Toggle controls which path executes
✅ All token categories from Figma represented in outputs


PART 9: SUCCESS METRICS
Technical Success

Style Dictionary builds without errors
All 4 theme files generated correctly with all token categories
Themes applied correctly in both modes
No console errors

Visual Success

Stock mode shows three distinct visual styles
DDS mode shows unified design language from Figma tokens
Toggle creates obvious visual change
All token categories visible in rendered output

User Success

Demo clearly shows token pipeline working
Visual difference proves theme system works
Anyone can understand stock vs DDS immediately
All Figma token categories represented


DELIVERABLES

Verified Style Dictionary configuration including all Figma token categories
Verified theme implementations for all three libraries using all token categories
Working toggle between stock and DDS modes
Visual proof that SD-generated themes work correctly with all token categories
Documentation of pipeline flow from Figma to Storybook

DEFINITION OF DONE
Project is complete when:

Toggle OFF shows three distinct library defaults
Toggle ON shows unified design language using all Figma token categories
All token categories from Figma visible in rendered output
No console errors in either mode
Visual inspection confirms correct theme application
All 17 token categories represented in theme outputs


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

Contains :root { --color-primary-500: value from tokens/design-tokens.json; }
All tokens as CSS custom properties

build/mui-tokens.js:

JavaScript object with nested structure
export default { color: { primary: { 500: { value: "value from tokens/design-tokens.json" } } } }

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
✅ Primary color identical across all three (value from tokens/design-tokens.json)
✅ Secondary color identical across all three (value from tokens/design-tokens.json)
✅ Spacing consistent across libraries


PART 5: VISUAL VERIFICATION
Stock Mode Visual Check
MUI Column:

Primary button: Material Design blue (Material Design default)
Secondary button: Material Design pink (value from tokens/design-tokens.json or similar)
Distinct Material Design appearance

shadcn Column:

Primary button: Black or dark gray
Secondary button: Light gray
Minimal, flat design aesthetic

Tailwind Column:

Primary button: Tailwind blue (Tailwind default)
Secondary button: Tailwind gray
Utility-first styling appearance

Expected Result: All three columns look DIFFERENT from each other
DDS Mode Visual Check
All Three Columns:

Primary button: Same blue (value from tokens/design-tokens.json)
Secondary button: Same pink (value from tokens/design-tokens.json)
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
Confirm primary-500 is value from tokens/design-tokens.json
Confirm secondary-500 is value from tokens/design-tokens.json

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