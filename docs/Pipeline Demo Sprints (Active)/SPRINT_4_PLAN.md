# Sprint 4 Plan: VERIFY TOKEN VALUES IN OUTPUTS

## Requirement
Confirm generated files contain correct token values.

## Work
Confirm generated files contain correct token values.

## Acceptance Criteria (from PRD)
1. ✅ build/tokens.css contains primary color from source
2. ✅ build/mui-tokens.js contains primary color from source
3. ✅ build/shadcn-tokens.css contains token variables
4. ✅ build/tailwind-tokens.js contains primary color from source

## Exit Criteria
Token values correct in all outputs.

---

## Verification Plan

### Criterion 1: build/tokens.css contains primary color from source
```bash
SOURCE=$(cat token-studio-sync-provider/DDS\ Foundations.json | jq -r '.Blue["500"].$value')
echo "Source primary: $SOURCE"
cat build/css/tokens.css | grep "$SOURCE" || cat build/tokens.css | grep "$SOURCE"
```
Expected: Source color value appears in CSS output

### Criterion 2: build/mui-tokens.js contains primary color from source
```bash
SOURCE=$(cat token-studio-sync-provider/DDS\ Foundations.json | jq -r '.Blue["500"].$value')
cat build/mui/theme.js | grep "$SOURCE" || cat build/mui-tokens.js | grep "$SOURCE"
```
Expected: Source color value appears in MUI output

### Criterion 3: build/shadcn-tokens.css contains token variables
```bash
cat build/shadcn/variables.css | grep "\-\-" | head -10 || cat build/shadcn-tokens.css | grep "\-\-" | head -10
```
Expected: CSS variables defined

### Criterion 4: build/tailwind-tokens.js contains primary color from source
```bash
SOURCE=$(cat token-studio-sync-provider/DDS\ Foundations.json | jq -r '.Blue["500"].$value')
cat build/tailwind/theme.js | grep "$SOURCE" || cat build/tailwind-tokens.js | grep "$SOURCE"
```
Expected: Source color value appears in Tailwind output

---

## Status
- [ ] Criterion 1: build/tokens.css contains primary color
- [ ] Criterion 2: build/mui-tokens.js contains primary color
- [ ] Criterion 3: build/shadcn-tokens.css contains token variables
- [ ] Criterion 4: build/tailwind-tokens.js contains primary color

**Sprint 4 Status:** NOT VERIFIED

