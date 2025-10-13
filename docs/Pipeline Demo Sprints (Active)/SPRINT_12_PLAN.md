# Sprint 12 Plan: VISUAL CHECK - DDS MODE

## Requirement
Verify DDS mode shows consistent SD-themed styling.

## Work
Verify DDS mode shows consistent SD-themed styling.

## Acceptance Criteria (from PRD)
1. ✅ MUI primary button uses DDS primary color
2. ✅ shadcn primary button uses DDS primary color
3. ✅ Tailwind primary button uses DDS primary color
4. ✅ All three columns look visually SIMILAR (same colors)

## Exit Criteria
DDS mode visually consistent.

---

## Verification Plan

### Criterion 1: MUI primary button uses DDS primary color
**Check MUI theme has token value:**
```bash
SOURCE=$(cat token-studio-sync-provider/DDS\ Foundations.json | jq -r '.Blue["500"].$value')
echo "DDS Primary: $SOURCE"
cat build/mui/theme.js | grep -A2 "primary" | grep "main"
```
Expected: MUI theme contains source token value

**Manual verification:**
- Toggle ON, inspect MUI primary button
- Expected: Matches DDS primary color from source

### Criterion 2: shadcn primary button uses DDS primary color
**Check shadcn CSS has token value:**
```bash
cat build/shadcn/variables.css | grep "\-\-primary:"
```
Expected: Primary variable defined

**Manual verification:**
- Toggle ON, inspect shadcn primary button
- Expected: Same color as MUI

### Criterion 3: Tailwind primary button uses DDS primary color
**Check Tailwind theme has token value:**
```bash
SOURCE=$(cat token-studio-sync-provider/DDS\ Foundations.json | jq -r '.Blue["500"].$value')
cat build/tailwind/theme.js | grep "$SOURCE"
```
Expected: Tailwind theme contains source token value

**Manual verification:**
- Toggle ON, inspect Tailwind primary button
- Expected: Same color as MUI and shadcn

### Criterion 4: All three columns look visually SIMILAR
**Manual verification:**
- View all three with toggle ON
- Compare side-by-side
- Expected: All primary buttons same blue

---

## Status
- [ ] Criterion 1: MUI primary button uses DDS primary color
- [ ] Criterion 2: shadcn primary button uses DDS primary color
- [ ] Criterion 3: Tailwind primary button uses DDS primary color
- [ ] Criterion 4: All three columns look visually SIMILAR

**Sprint 12 Status:** NOT VERIFIED
**Note:** Requires manual browser verification

