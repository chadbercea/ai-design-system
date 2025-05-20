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