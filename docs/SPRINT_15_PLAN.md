# Sprint 15 Plan: FINAL VERIFICATION

## Requirement
Complete demo meets all specifications.

## Required Functionality (from PRD)
- 4 stories total (Home + 3 library stories)
- Home page shows 3 columns with toggle
- Individual stories show detailed library views
- All use stock library components
- All use DDS-generated themes
- Toggle works without errors

## Acceptance Criteria (from PRD)
1. All stories render
2. No console errors
3. Colors match across libraries
4. Toggle affects all columns
5. Token changes propagate after rebuild

## Exit Criteria
Demo complete and functional.

---

## Verification Plan

### Criterion 1: All stories render

**Check story count:**
```bash
find stories -name "*.stories.tsx" -type f | wc -l
```
Expected: At least 4 story files

**List all stories:**
```bash
find stories -name "*.stories.tsx" -type f
```
Expected: Home, MUI-Library, Shadcn-Library, Tailwind-Library

**Check Storybook index:**
```bash
curl -s http://localhost:6006/index.json | jq '.entries | keys | length'
```
Expected: At least 4 stories indexed

**Verify each story loads:**
```bash
for story in "home-token-pipeline-demo--default" "libraries-mui--all-components" "libraries-shadcn--all-components" "libraries-tailwind--all-components"; do
  curl -s "http://localhost:6006/iframe.html?id=$story" | head -20 | grep -q "html" && echo "✓ $story renders" || echo "✗ $story fails";
done
```
Expected: All stories render

---

### Criterion 2: No console errors

**Check Storybook startup log:**
```bash
tail -200 /tmp/storybook.log | grep -i "error" || echo "No startup errors"
```
Expected: No errors

**Manual browser verification required:**
- Open each story (Home, MUI, shadcn, Tailwind)
- Check browser console for errors
- Interact with components (click buttons, toggle)
- Verify no errors logged

---

### Criterion 3: Colors match across libraries

**Manual visual verification:**
- Open Home story
- Enable DDS theme (toggle ON)
- Verify all three columns show:
  - Primary buttons: Same blue (#2560ff or hsl(224 100% 57%))
  - Secondary buttons: Same grey (#6c7e9d or hsl(218 20% 52%))
  - Card backgrounds: Same white
  - Borders: Same grey
- Toggle OFF
- Verify all three columns show DIFFERENT colors (stock themes)

**Check token values in outputs:**
```bash
echo "=== MUI Primary ===" && cat build/mui/theme.js | grep -A2 "primary"
echo "=== shadcn Primary ===" && cat build/shadcn/variables.css | grep "primary:"
echo "=== Tailwind Primary ===" && cat build/tailwind/theme.js | grep "primary"
```
Expected: Same color values across all three

---

### Criterion 4: Toggle affects all columns

**Manual verification:**
- Open Home story
- Click toggle button
- Verify all three columns change simultaneously:
  - MUI buttons change color
  - shadcn buttons change color
  - Tailwind elements change color
- Click toggle again
- Verify all three columns revert together

---

### Criterion 5: Token changes propagate after rebuild

**Test token pipeline end-to-end:**

**Step 1: Note current primary color:**
```bash
cat token-studio-sync-provider/DDS\ Foundations.json | jq '.Blue["500"]'
```

**Step 2: Rebuild tokens:**
```bash
npm run build:tokens
```

**Step 3: Restart Storybook (if needed):**
```bash
# Kill existing process
pkill -f storybook
# Restart
npm run storybook > /tmp/storybook.log 2>&1 &
```

**Step 4: Verify color appears in all builds:**
```bash
echo "=== CSS ===" && cat build/css/tokens.css | grep "blue-500"
echo "=== MUI ===" && cat build/mui/theme.js | grep -A2 "primary"
echo "=== shadcn ===" && cat build/shadcn/variables.css | grep "primary:"
echo "=== Tailwind ===" && cat build/tailwind/theme.js | grep "primary"
```
Expected: Same token value in all outputs

**Step 5: Visual verification:**
- Open Storybook
- Check that all components show the current token color
- This proves pipeline works: Figma → Token Studio → SD → Themes → Storybook

---

## Final Status

- [ ] Criterion 1: All stories render (Home, MUI, shadcn, Tailwind)
- [ ] Criterion 2: No console errors in any story
- [ ] Criterion 3: Colors match across libraries when DDS theme active
- [ ] Criterion 4: Toggle affects all columns simultaneously
- [ ] Criterion 5: Token changes propagate through full pipeline

**Sprint 15 Status:** NOT VERIFIED

**Exit Criteria:** Demo complete and functional.

---

## Completion Checklist

### Technical Verification
- [ ] 4 story files exist
- [ ] Storybook running without errors
- [ ] All stories indexed and accessible
- [ ] No browser console errors
- [ ] Toggle button functional
- [ ] Theme state management working

### Visual Verification
- [ ] Home page shows 3 columns
- [ ] Toggle changes all columns together
- [ ] DDS theme: all columns show matching blue/grey
- [ ] Stock themes: all columns show different colors
- [ ] MUI components styled correctly
- [ ] shadcn components styled correctly
- [ ] Tailwind components styled correctly

### Pipeline Verification
- [ ] Token source file exists and valid
- [ ] Style Dictionary build runs successfully
- [ ] 4 output files generated (CSS, MUI, shadcn, Tailwind)
- [ ] Themes import from build outputs
- [ ] Token changes propagate to all libraries

**Final Status:** INCOMPLETE

**Remaining Work:** Execute all verification steps and mark PASS/FAIL.

