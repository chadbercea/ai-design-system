# Sprint 9 Plan: STORYBOOK STYLED

## Requirement
Storybook has access to all generated styles.

## Acceptance Criteria (from PRD)
1. Preview imports all CSS files
2. Storybook restarts without errors
3. Styles available to stories

## Exit Criteria
Storybook has styles.

---

## Verification Plan

### Criterion 1: Preview imports all CSS files

**Check preview file exists:**
```bash
ls -la .storybook/preview.tsx
```
Expected: Preview file exists

**Check for CSS token import:**
```bash
cat .storybook/preview.tsx | grep "build/css/tokens.css"
```
Expected: Import statement present

**Check for shadcn globals import:**
```bash
cat .storybook/preview.tsx | grep "src/app/globals.css"
```
Expected: Import present

**Check for shadcn variables import:**
```bash
cat .storybook/preview.tsx | grep "build/shadcn/variables.css"
```
Expected: Import present

**Check for Tailwind import:**
```bash
cat .storybook/preview.tsx | grep "src/index.css"
```
Expected: Import present

---

### Criterion 2: Storybook restarts without errors

**Check Storybook log for errors:**
```bash
tail -100 /tmp/storybook.log | grep -i "error\|failed" || echo "No errors"
```
Expected: No errors

**Verify Storybook process running:**
```bash
ps aux | grep storybook | grep -v grep
```
Expected: Process running

---

### Criterion 3: Styles available to stories

**Check CSS is served:**
```bash
curl -s http://localhost:6006/build/css/tokens.css | head -10
```
Expected: CSS content returned

**Verify Storybook preview head includes styles:**
```bash
curl -s http://localhost:6006/iframe.html | grep -E "tokens.css|globals.css|index.css"
```
Expected: Style imports visible in preview iframe

---

## Status

- [ ] Criterion 1: Preview imports all CSS files
- [ ] Criterion 2: Storybook restarts without errors
- [ ] Criterion 3: Styles available to stories

**Sprint 9 Status:** NOT VERIFIED

**Next Action:** Execute verification commands.

