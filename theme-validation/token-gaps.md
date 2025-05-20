# DDS Token Gaps

This document lists the MUI theme keys that currently have no DDS token mapping. These gaps should be addressed in order of priority.

## High Priority

### Palette Contrast Text
- `palette.primary.contrastText`
- `palette.secondary.contrastText`
- `palette.error.contrastText`
- `palette.warning.contrastText`
- `palette.info.contrastText`
- `palette.success.contrastText`

### Text Colors
- `palette.text.primary`
- `palette.text.secondary`
- `palette.text.disabled`
- `palette.divider`

### Action States
- `palette.action.active`
- `palette.action.hover`
- `palette.action.selected`
- `palette.action.disabled`
- `palette.action.disabledBackground`
- `palette.action.focus`

## Medium Priority

### Typography
- `typography.fontFamily`
- `typography.fontSize`
- `typography.fontWeightLight`
- `typography.fontWeightRegular`
- `typography.fontWeightMedium`
- `typography.fontWeightBold`

### Shape
- `shape.borderRadius`

## Low Priority

### Breakpoints
- `breakpoints.values.xs`
- `breakpoints.values.sm`
- `breakpoints.values.md`
- `breakpoints.values.lg`
- `breakpoints.values.xl`
- `breakpoints.unit`

### Transitions
- `transitions.easing.easeInOut`
- `transitions.easing.easeOut`
- `transitions.easing.easeIn`
- `transitions.easing.sharp`
- `transitions.duration.shortest`
- `transitions.duration.shorter`
- `transitions.duration.short`
- `transitions.duration.standard`
- `transitions.duration.complex`
- `transitions.duration.enteringScreen`
- `transitions.duration.leavingScreen`

### Z-Index
- `zIndex.mobileStepper`
- `zIndex.fab`
- `zIndex.speedDial`
- `zIndex.appBar`
- `zIndex.drawer`
- `zIndex.modal`
- `zIndex.snackbar`
- `zIndex.tooltip`

## Notes
1. High priority items affect core UI elements and should be addressed first
2. Medium priority items affect typography and basic shape, which are important for consistency
3. Low priority items are either system-level concerns or have sensible defaults
4. All gaps should be documented with their intended DDS token mapping before implementation

# Token Mapping Gaps

## Typography Gaps

### Font Weight Mapping
- **MUI Key**: `typography.fontWeightLight`
- **Expected Token Type**: fontWeights
- **Closest Token**: `fontWeights.regular`
- **Resolution Plan**: Create new `fontWeights.light` token with value "300" to match MUI's default

### Line Height Mapping
- **MUI Key**: All typography line heights
- **Expected Token Type**: lineHeights
- **Current Token**: `lineHeights.100`
- **Resolution Plan**: Create additional line height tokens to match MUI's default values (1.2 for body, 1.75 for headings)

### Letter Spacing Mapping
- **MUI Key**: All typography letter spacing
- **Expected Token Type**: letterSpacings
- **Current Token**: `letterSpacings.default`
- **Resolution Plan**: Create specific letter spacing tokens for different typography variants to match MUI's defaults

### Font Family Mapping
- **MUI Key**: All typography font families
- **Expected Token Type**: fontFamilies
- **Current Token**: `fontFamilies.roboto`
- **Resolution Plan**: Consider adding system font fallbacks to match MUI's default behavior

## Notes
1. All typography mappings are currently using the closest available tokens, but may need refinement to match MUI's default behavior exactly
2. Consider creating a more granular set of typography tokens to better match MUI's default theme
3. Some mappings (like font weights) are using the closest available token but may need new tokens created

## Action Color Gaps

### Opacity Values
- **MUI Keys**: 
  - `palette.action.hoverOpacity`
  - `palette.action.selectedOpacity`
  - `palette.action.disabledOpacity`
  - `palette.action.focusOpacity`
  - `palette.action.activatedOpacity`
- **Expected Values**:
  - hoverOpacity: 0.04
  - selectedOpacity: 0.08
  - disabledOpacity: 0.38
  - focusOpacity: 0.12
  - activatedOpacity: 0.12
- **Resolution Plan**: Create new opacity tokens in DDS to match MUI's default values

### Action Color Refinements
- **Current Mappings**:
  - active: `color.grey.700`
  - hover: `color.grey.200`
  - selected: `color.grey.200`
  - disabled: `color.grey.400`
  - disabledBackground: `color.grey.200`
  - focus: `color.blue.200`
- **Resolution Plan**: 
  1. Consider creating semi-transparent variants of these colors
  2. Review if current mappings match MUI's default behavior exactly
  3. Consider creating specific action color tokens for better semantic meaning 

## Structural Token Gaps

### Breakpoint Unit
- **MUI Key**: `breakpoints.unit`
- **Expected Value**: "px"
- **Resolution Plan**: Add new primitive `breakpoints.unit` with value "px"

### Toolbar Mixins
- **MUI Keys**:
  - `mixins.toolbar.minHeight`
  - `mixins.toolbar.@media (min-width:0px).@media (orientation: landscape).minHeight`
  - `mixins.toolbar.@media (min-width:600px).minHeight`
- **Expected Type**: Spacing values
- **Resolution Plan**: Consider adding toolbar-specific spacing tokens

### Shadows
- **MUI Key**: `shadows`
- **Expected Type**: Array of box-shadow values
- **Resolution Plan**: Create shadow tokens for different elevation levels

### Transitions
- **MUI Keys**:
  - `transitions.easing.*`
  - `transitions.duration.*`
- **Expected Type**: Timing functions and duration values
- **Resolution Plan**: Create transition token system for easing and duration

### Z-Index
- **MUI Keys**:
  - `zIndex.mobileStepper`
  - `zIndex.fab`
  - `zIndex.speedDial`
  - `zIndex.appBar`
  - `zIndex.drawer`
  - `zIndex.modal`
  - `zIndex.snackbar`
  - `zIndex.tooltip`
- **Expected Type**: Numeric values
- **Resolution Plan**: Create z-index token system for different component layers

### Theme Configuration
- **MUI Keys**:
  - `palette.mode`
  - `direction`
  - `palette.contrastThreshold`
  - `palette.tonalOffset`
- **Expected Type**: Various (string, number)
- **Resolution Plan**: Consider adding theme configuration tokens 