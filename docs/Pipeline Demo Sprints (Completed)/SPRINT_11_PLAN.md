# Sprint 11 Plan: VISUAL CHECK - STOCK MODE

## Requirement
Verify stock mode shows distinct library defaults.

## Work
Verify stock mode shows distinct library defaults.

## Acceptance Criteria (from PRD)
1. ✅ MUI primary button uses Material Design default color
2. ✅ shadcn primary button uses default shadcn color
3. ✅ Tailwind primary button uses distinct stock color (NOT DDS tokens)
4. ✅ All three columns look visually DIFFERENT

## Exit Criteria
Stock mode visually distinct.

---

## Verification Plan

### Criterion 1: MUI primary button uses Material Design default
**Manual verification:**
- Open http://localhost:6006/?path=/story/home-token-pipeline-demo--default
- Ensure toggle is OFF
- Inspect MUI primary button color
- Expected: Material Design blue (MUI default theme)

### Criterion 2: shadcn primary button uses default shadcn color
**Manual verification:**
- Check shadcn column with toggle OFF
- Inspect primary button color
- Expected: Black or dark gray (shadcn New York theme default)

### Criterion 3: Tailwind primary button is distinct color
**Check Tailwind stock colors:**
```bash
cat src/demo-components/TailwindShowcase-stock.tsx | grep "bg-" || cat src/demo-components/TailwindShowcase.tsx | grep -A20 "!useDDSTheme"
```
Expected: Distinct colors (green/purple or similar, NOT DDS blue)

### Criterion 4: All three columns look visually DIFFERENT
**Manual verification:**
- View all three columns with toggle OFF
- Compare button colors
- Expected: Each column distinctly different

---

## Status
- [ ] Criterion 1: MUI primary button uses Material Design default
- [ ] Criterion 2: shadcn primary button uses default shadcn color
- [ ] Criterion 3: Tailwind primary button uses distinct stock color
- [ ] Criterion 4: All three columns look visually DIFFERENT

**Sprint 11 Status:** NOT VERIFIED
**Note:** Requires manual browser verification

