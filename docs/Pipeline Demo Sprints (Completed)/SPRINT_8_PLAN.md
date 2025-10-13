# Sprint 8 Plan: ISOLATE STOCK MODE IMPLEMENTATION

## Requirement
Ensure stock mode uses NO SD-generated themes.

## Work
Ensure stock mode uses NO SD-generated themes.

## Acceptance Criteria (from PRD)
1. ✅ Stock MUI code path has no ThemeProvider with custom theme
2. ✅ Stock shadcn code path has no DDS CSS classes
3. ✅ Stock Tailwind code path uses standard classes (bg-blue-500, not bg-primary)
4. ✅ No imports from build/ in stock code paths

## Exit Criteria
Stock mode isolated from SD themes.

---

## Verification Plan

### Criterion 1: Stock MUI has no custom ThemeProvider
```bash
cat src/demo-components/MUIShowcase.tsx | grep -A5 "useDDSTheme.*false\|!useDDSTheme"
```
Expected: Stock path uses no custom theme or default MUI

### Criterion 2: Stock shadcn has no DDS CSS classes
```bash
cat src/demo-components/ShadcnShowcase.tsx | grep -B3 -A3 "useDDSTheme.*false\|!useDDSTheme"
```
Expected: Stock path has no dds-theme class

### Criterion 3: Stock Tailwind uses standard classes
```bash
cat src/demo-components/TailwindShowcase-stock.tsx | grep "className" | head -5 || cat src/demo-components/TailwindShowcase.tsx | grep -A20 "!useDDSTheme"
```
Expected: Uses standard Tailwind colors (not token classes)

### Criterion 4: No imports from build/ in stock code paths
```bash
grep -r "import.*build/" src/demo-components/ | grep -v "DDS\|dds" || echo "No stock imports from build/"
```
Expected: No build/ imports in stock implementations

---

## Status
- [ ] Criterion 1: Stock MUI has no custom ThemeProvider
- [ ] Criterion 2: Stock shadcn has no DDS CSS classes
- [ ] Criterion 3: Stock Tailwind uses standard classes
- [ ] Criterion 4: No imports from build/ in stock code paths

**Sprint 8 Status:** NOT VERIFIED

