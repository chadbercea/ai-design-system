# Sprint 9 Plan: ISOLATE DDS MODE IMPLEMENTATION

## Requirement
Ensure DDS mode uses ONLY SD-generated themes.

## Work
Ensure DDS mode uses ONLY SD-generated themes.

## Acceptance Criteria (from PRD)
1. ✅ DDS MUI wrapped in <ThemeProvider theme={muiTheme}>
2. ✅ DDS shadcn uses token CSS classes
3. ✅ DDS Tailwind uses token-mapped classes (bg-primary)
4. ✅ All three import from build/ in DDS code paths

## Exit Criteria
DDS mode uses SD themes exclusively.

---

## Verification Plan

### Criterion 1: DDS MUI wrapped in ThemeProvider with SD theme
```bash
cat src/demo-components/MUIShowcase.tsx | grep -A5 "useDDSTheme.*true\|useDDSTheme ?"
```
Expected: Uses muiTheme from src/themes/mui-theme.ts

### Criterion 2: DDS shadcn uses token CSS classes
```bash
cat src/demo-components/ShadcnShowcase.tsx | grep -A3 "useDDSTheme.*true\|dds-theme"
```
Expected: Applies dds-theme class when toggle ON

### Criterion 3: DDS Tailwind uses token-mapped classes
```bash
cat src/demo-components/TailwindShowcase.tsx | grep "bg-blue\|bg-grey"
```
Expected: Uses token-based classes from build/tailwind

### Criterion 4: All three import from build/
```bash
cat src/themes/mui-theme.ts | grep "build/" && cat .storybook/preview.tsx | grep "build/shadcn" && cat tailwind.config.js | grep "build/tailwind"
```
Expected: All import from build/ outputs

---

## Status
- [ ] Criterion 1: DDS MUI wrapped in ThemeProvider with SD theme
- [ ] Criterion 2: DDS shadcn uses token CSS classes
- [ ] Criterion 3: DDS Tailwind uses token-mapped classes
- [ ] Criterion 4: All three import from build/

**Sprint 9 Status:** NOT VERIFIED

