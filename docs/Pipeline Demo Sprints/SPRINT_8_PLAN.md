# Sprint 8 Plan: ISOLATE STOCK MODE IMPLEMENTATION

## Requirement
Ensure stock mode uses NO SD-generated themes.

## Acceptance Criteria (from PRD)
1. Stock MUI code path has no ThemeProvider with custom theme
2. Stock shadcn code path has no DDS CSS classes
3. Stock Tailwind code path uses standard classes (bg-blue-500, not bg-primary)
4. No imports from build/ in stock code paths

## Exit Criteria
Stock mode isolated from SD themes.

---

## Verification Plan

### Criterion 1: Stock MUI has no custom ThemeProvider

**Check MUI showcase for stock theme:**
```bash
cat src/demo-components/MUIShowcase.tsx | grep -A5 "useDDSTheme.*false\|!useDDSTheme"
```
Expected: Stock path uses no custom theme or uses muiStockTheme (not from build/)

---

### Criterion 2: Stock shadcn has no DDS CSS classes

**Check shadcn showcase for stock classes:**
```bash
cat src/demo-components/ShadcnShowcase.tsx | grep -B3 -A3 "useDDSTheme.*false\|!useDDSTheme"
```
Expected: Stock path doesn't apply dds-theme class

---

### Criterion 3: Stock Tailwind uses standard classes

**Check Tailwind showcase for stock implementation:**
```bash
cat src/demo-components/TailwindShowcase-stock.tsx | grep "className" | head -5
```
Expected: Uses bg-green-500, bg-purple-500, etc. (NOT bg-primary or token classes)

---

### Criterion 4: No imports from build/ in stock code paths

**Check for build/ imports in showcase components:**
```bash
grep -r "import.*build/" src/demo-components/ | grep -v "DDS"
```
Expected: No imports from build/ in stock implementations

---

## Status

- [ ] Criterion 1: Stock MUI has no custom ThemeProvider
- [ ] Criterion 2: Stock shadcn has no DDS CSS classes
- [ ] Criterion 3: Stock Tailwind uses standard classes
- [ ] Criterion 4: No imports from build/ in stock code paths

**Sprint 8 Status:** NOT VERIFIED

**Next Action:** Execute verification commands.


