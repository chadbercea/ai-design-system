# Sprint 9 Plan: ISOLATE DDS MODE IMPLEMENTATION

## Requirement
Ensure DDS mode uses ONLY SD-generated themes.

## Acceptance Criteria (from PRD)
1. DDS MUI wrapped in <ThemeProvider theme={muiTheme}>
2. DDS shadcn uses token CSS classes
3. DDS Tailwind uses token-mapped classes (bg-primary)
4. All three import from build/ in DDS code paths

## Exit Criteria
DDS mode uses SD themes exclusively.

---

## Verification Plan

### Criterion 1: DDS MUI wrapped in ThemeProvider with SD theme

**Check MUI showcase for DDS theme:**
```bash
cat src/demo-components/MUIShowcase.tsx | grep -A5 "useDDSTheme.*true\|useDDSTheme ?"
```
Expected: Uses muiTheme imported from src/themes/mui-theme.ts (which imports from build/)

---

### Criterion 2: DDS shadcn uses token CSS classes

**Check shadcn showcase for DDS classes:**
```bash
cat src/demo-components/ShadcnShowcase.tsx | grep -A3 "useDDSTheme.*true\|dds-theme"
```
Expected: Applies dds-theme class when toggle is ON

---

### Criterion 3: DDS Tailwind uses token-mapped classes

**Check Tailwind showcase for token classes:**
```bash
cat src/demo-components/TailwindShowcase.tsx | grep "bg-blue\|bg-grey"
```
Expected: Uses token-based classes (bg-blue-500, bg-grey-500) from build/tailwind/theme.js

---

### Criterion 4: All three import from build/

**Check for build/ imports:**
```bash
cat src/themes/mui-theme.ts | grep "build/"
cat .storybook/preview.tsx | grep "build/shadcn"
cat tailwind.config.js | grep "build/tailwind"
```
Expected: All three import from their respective build/ outputs

---

## Status

- [ ] Criterion 1: DDS MUI wrapped in ThemeProvider with SD theme
- [ ] Criterion 2: DDS shadcn uses token CSS classes
- [ ] Criterion 3: DDS Tailwind uses token-mapped classes
- [ ] Criterion 4: All three import from build/

**Sprint 9 Status:** NOT VERIFIED

**Next Action:** Execute verification commands.


