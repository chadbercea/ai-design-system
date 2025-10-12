# Sprint 12 Plan: VISUAL CHECK - DDS MODE

## Requirement
Verify DDS mode shows consistent SD-themed styling.

## Acceptance Criteria (from PRD)
1. MUI primary button is #2196f3
2. shadcn primary button is #2196f3
3. Tailwind primary button is #2196f3
4. All three columns look visually SIMILAR (same colors)

## Exit Criteria
DDS mode visually consistent.

---

## Verification Plan

### Criterion 1: MUI primary button is #2196f3 (or #2560ff)

**Check MUI theme output:**
```bash
cat build/mui/theme.js | grep -A2 "primary" | grep "main"
```
Expected: "#2560ff" or "#2196f3"

**Manual verification:**
- Open Home story
- Click toggle ON (Apply DDS Tokens)
- Inspect MUI primary button color
- Expected: Matches DDS blue

---

### Criterion 2: shadcn primary button is #2196f3 (or #2560ff)

**Check shadcn CSS variables:**
```bash
cat build/shadcn/variables.css | grep "\-\-primary:"
```
Expected: HSL value equivalent to #2560ff or #2196f3

**Manual verification:**
- With toggle ON, inspect shadcn primary button
- Expected: Same blue as MUI

---

### Criterion 3: Tailwind primary button is #2196f3 (or #2560ff)

**Check Tailwind theme:**
```bash
cat build/tailwind/theme.js | grep "500.*2560ff\|500.*2196f3"
```
Expected: blue-500 = "#2560ff" or "#2196f3"

**Manual verification:**
- With toggle ON, inspect Tailwind primary button
- Expected: Same blue as MUI and shadcn

---

### Criterion 4: All three columns look visually SIMILAR

**Manual verification:**
- View all three columns with toggle ON
- Compare button colors side-by-side
- Expected: All primary buttons are the same shade of blue

---

## Status

- [ ] Criterion 1: MUI primary button is DDS blue
- [ ] Criterion 2: shadcn primary button is DDS blue
- [ ] Criterion 3: Tailwind primary button is DDS blue
- [ ] Criterion 4: All three columns look visually SIMILAR

**Sprint 12 Status:** NOT VERIFIED

**Next Action:** Manual browser verification required.


