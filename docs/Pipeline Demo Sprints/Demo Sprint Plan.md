THEME PIPELINE - SPRINT BREAKDOWN
SPRINT 1: VERIFY TOKEN SOURCE
Work: Confirm design token JSON file is correct source of truth.
Acceptance Criteria:

✅ tokens/design-tokens.json exists
✅ Valid JSON syntax
✅ Contains color.primary.500 = #2196f3
✅ Contains color.secondary.500 = #f50057
✅ Contains spacing, fontSize, borderRadius

Exit: Token source validated.

SPRINT 2: VERIFY STYLE DICTIONARY CONFIG
Work: Confirm SD configuration is correct.
Acceptance Criteria:

✅ style-dictionary.config.js exists
✅ source points to tokens/**/*.json
✅ 4 platforms defined (css, muiJs, shadcnCss, tailwindJs)
✅ buildPath is build/
✅ 4 destination files specified

Exit: SD config valid.

SPRINT 3: VERIFY SD BUILD OUTPUTS
Work: Confirm Style Dictionary generates all required files.
Acceptance Criteria:

✅ npm run build:tokens runs without errors
✅ build/tokens.css exists
✅ build/mui-tokens.js exists
✅ build/shadcn-tokens.css exists
✅ build/tailwind-tokens.js exists

Exit: All 4 files generated.

SPRINT 4: VERIFY TOKEN VALUES IN OUTPUTS
Work: Confirm generated files contain correct token values.
Acceptance Criteria:

✅ build/tokens.css contains --color-primary-500: #2196f3
✅ build/mui-tokens.js contains color.primary['500'].value = "#2196f3"
✅ build/shadcn-tokens.css contains token variables
✅ build/tailwind-tokens.js contains color.primary['500'].value = "#2196f3"

Exit: Token values correct in all outputs.

SPRINT 5: VERIFY MUI THEME CONFIG
Work: Confirm MUI theme imports and uses SD tokens.
Acceptance Criteria:

✅ src/themes/mui-theme.ts exists
✅ Imports from build/mui-tokens.js
✅ Uses createTheme() from @mui/material
✅ palette.primary.main references tokens.color.primary['500'].value
✅ File compiles without errors

Exit: MUI theme correctly configured.

SPRINT 6: VERIFY TAILWIND CONFIG
Work: Confirm Tailwind imports and uses SD tokens.
Acceptance Criteria:

✅ tailwind.config.js imports from build/tailwind-tokens.js
✅ theme.extend.colors.primary references tokens.color.primary['500'].value
✅ File exports valid Tailwind config
✅ Tailwind compiles without errors

Exit: Tailwind correctly configured.

SPRINT 7: VERIFY SHADCN CSS IMPORT
Work: Confirm shadcn token CSS is imported and accessible.
Acceptance Criteria:

✅ build/shadcn-tokens.css imported in preview or component
✅ CSS variables defined
✅ No import errors

Exit: shadcn CSS accessible.

SPRINT 8: ISOLATE STOCK MODE IMPLEMENTATION
Work: Ensure stock mode uses NO SD-generated themes.
Acceptance Criteria:

✅ Stock MUI code path has no ThemeProvider with custom theme
✅ Stock shadcn code path has no DDS CSS classes
✅ Stock Tailwind code path uses standard classes (bg-blue-500, not bg-primary)
✅ No imports from build/ in stock code paths

Exit: Stock mode isolated from SD themes.

SPRINT 9: ISOLATE DDS MODE IMPLEMENTATION
Work: Ensure DDS mode uses ONLY SD-generated themes.
Acceptance Criteria:

✅ DDS MUI wrapped in <ThemeProvider theme={muiTheme}>
✅ DDS shadcn uses token CSS classes
✅ DDS Tailwind uses token-mapped classes (bg-primary)
✅ All three import from build/ in DDS code paths

Exit: DDS mode uses SD themes exclusively.

SPRINT 10: VERIFY TOGGLE SWITCHES CODE PATHS
Work: Confirm toggle controls which implementation renders.
Acceptance Criteria:

✅ Toggle state variable exists
✅ Toggle button changes state on click
✅ Stock mode renders when toggle OFF
✅ DDS mode renders when toggle ON
✅ All three columns respond to toggle

Exit: Toggle controls rendering.

SPRINT 11: VISUAL CHECK - STOCK MODE
Work: Verify stock mode shows distinct library defaults.
Acceptance Criteria:

✅ MUI primary button is Material Design blue (#1976d2 or similar)
✅ shadcn primary button is black or dark gray
✅ Tailwind primary button is Tailwind blue (#3b82f6 or similar)
✅ All three columns look visually DIFFERENT

Exit: Stock mode visually distinct.

SPRINT 12: VISUAL CHECK - DDS MODE
Work: Verify DDS mode shows consistent SD-themed styling.
Acceptance Criteria:

✅ MUI primary button is #2196f3
✅ shadcn primary button is #2196f3
✅ Tailwind primary button is #2196f3
✅ All three columns look visually SIMILAR (same colors)

Exit: DDS mode visually consistent.

SPRINT 13: VERIFY COLOR CONSISTENCY IN DDS
Work: Confirm all components in DDS mode use correct token colors.
Acceptance Criteria:

✅ All primary buttons are #2196f3 across all three libraries
✅ All secondary buttons are #f50057 across all three libraries
✅ No color variations between libraries
✅ Colors match tokens/design-tokens.json

Exit: DDS colors consistent across libraries.

SPRINT 14: VERIFY TOGGLE VISUAL IMPACT
Work: Confirm toggle creates obvious visual change.
Acceptance Criteria:

✅ Clicking toggle changes appearance immediately
✅ Color change visible in all three columns
✅ No delay or flicker
✅ No console errors on toggle

Exit: Toggle creates clear visual change.

SPRINT 15: ERROR CHECK
Work: Verify no errors in either mode.
Acceptance Criteria:

✅ Stock mode: No console errors
✅ DDS mode: No console errors
✅ Toggle action: No console errors
✅ All components render in both modes

Exit: No errors in any state.

SPRINT 16: FINAL VISUAL VALIDATION
Work: Complete visual inspection of demo.
Acceptance Criteria:

✅ Stock mode shows three distinct visual styles
✅ DDS mode shows unified visual style with same colors
✅ Toggle creates dramatic visual difference
✅ Demo clearly demonstrates token pipeline working

Exit: Visual validation complete.

COMPLETION CHECKLIST
All sprints pass when:

 Token source validated
 SD config validated
 SD outputs generated correctly
 Token values correct in all outputs
 MUI theme configured
 Tailwind configured
 shadcn CSS accessible
 Stock mode isolated from SD
 DDS mode uses only SD themes
 Toggle switches implementations
 Stock mode visually distinct
 DDS mode visually consistent
 Colors match across libraries in DDS
 Toggle creates visual change
 No errors in any state
 Final visual validation passes

PROJECT COMPLETE WHEN ALL 16 SPRINTS PASS.