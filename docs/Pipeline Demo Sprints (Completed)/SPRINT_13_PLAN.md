# Sprint 13 Plan: VERIFY COLOR CONSISTENCY IN DDS

## Requirement
Confirm all components in DDS mode use correct token colors.

## Work
Confirm all components in DDS mode use correct token colors.

## Acceptance Criteria (from PRD)
1. ✅ All primary buttons use same DDS color across all three libraries
2. ✅ All secondary buttons use same DDS color across all three libraries
3. ✅ No color variations between libraries in DDS mode
4. ✅ Colors match token source (DDS Foundations.json)

## Exit Criteria
DDS colors consistent across libraries.

---

## Verification Plan

### Criterion 1: All primary buttons use same DDS color
**Check all outputs reference same source value:**
```bash
SOURCE=$(cat token-studio-sync-provider/DDS\ Foundations.json | jq -r '.Blue["500"].$value')
echo "Source Primary: $SOURCE"
echo "=== MUI ===" && cat build/mui/theme.js | grep "$SOURCE"
echo "=== shadcn ===" && cat build/shadcn/variables.css | grep "\-\-primary:"
echo "=== Tailwind ===" && cat build/tailwind/theme.js | grep "$SOURCE"
```
Expected: Source value appears in all outputs

### Criterion 2: All secondary buttons use same DDS color
**Check secondary colors reference same source:**
```bash
SOURCE=$(cat token-studio-sync-provider/DDS\ Foundations.json | jq -r '.Violet["500"].$value')
echo "Source Secondary: $SOURCE"
echo "=== MUI ===" && cat build/mui/theme.js | grep "$SOURCE" || cat build/mui/theme.js | grep -A2 "secondary"
echo "=== shadcn ===" && cat build/shadcn/variables.css | grep "\-\-secondary:"
echo "=== Tailwind ===" && cat build/tailwind/theme.js | grep "$SOURCE"
```
Expected: Source value appears in all outputs

### Criterion 3: No color variations
**Manual verification:**
- Toggle ON, inspect all buttons
- Use DevTools color picker
- Expected: Exact RGB match

### Criterion 4: Colors match token source
**Check source:**
```bash
cat token-studio-sync-provider/DDS\ Foundations.json | jq '.Blue["500"], .Violet["500"]'
```
Expected: Source matches outputs

---

## Status
- [ ] Criterion 1: All primary buttons use same DDS color
- [ ] Criterion 2: All secondary buttons use same DDS color
- [ ] Criterion 3: No color variations in DDS mode
- [ ] Criterion 4: Colors match token source

**Sprint 13 Status:** NOT VERIFIED

