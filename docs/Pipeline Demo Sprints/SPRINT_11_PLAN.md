# Sprint 11 Plan: VISUAL CHECK - STOCK MODE

## Requirement
Verify stock mode shows distinct library defaults.

## Acceptance Criteria (from PRD)
1. MUI primary button is Material Design blue (#1976d2 or similar)
2. shadcn primary button is black or dark gray
3. Tailwind primary button is Tailwind blue (#3b82f6 or similar)
4. All three columns look visually DIFFERENT

## Exit Criteria
Stock mode visually distinct.

---

## Verification Plan

### Criterion 1: MUI primary button is Material Design blue

**Manual verification:**
- Open http://localhost:6006/?path=/story/home-token-pipeline-demo--default
- Ensure toggle is OFF (default state)
- Inspect MUI primary button color
- Expected: Blue (#1976d2 or MUI default blue)

**Automated check:**
```bash
cat src/themes/mui-stock-theme.ts | grep "primary" || echo "Using default MUI theme"
```

---

### Criterion 2: shadcn primary button is black or dark gray

**Manual verification:**
- Check shadcn column with toggle OFF
- Inspect primary button color
- Expected: Black or dark gray (shadcn "New York" theme default)

---

### Criterion 3: Tailwind primary button is distinct color

**Check Tailwind stock colors:**
```bash
cat src/demo-components/TailwindShowcase-stock.tsx | grep "bg-"
```
Expected: bg-green-500, bg-purple-500, or other distinct colors (NOT DDS blue)

---

### Criterion 4: All three columns look visually DIFFERENT

**Manual verification:**
- View all three columns with toggle OFF
- Compare button colors
- Expected: Each column has distinctly different primary button color

---

## Status

- [ ] Criterion 1: MUI primary button is Material Design blue
- [ ] Criterion 2: shadcn primary button is black or dark gray
- [ ] Criterion 3: Tailwind primary button is distinct color
- [ ] Criterion 4: All three columns look visually DIFFERENT

**Sprint 11 Status:** NOT VERIFIED

**Next Action:** Manual browser verification required.


