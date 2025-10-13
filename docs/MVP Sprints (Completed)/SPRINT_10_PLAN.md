# Sprint 10 Plan: MUI LIBRARY STORY

## Requirement
Story showing stock MUI components with DDS theme.

## Components Required (from PRD)
- Button
- Card
- TextField
- Typography

## Acceptance Criteria (from PRD)
1. Story file exists
2. Appears in Storybook sidebar under Libraries/MUI
3. Uses real MUI imports
4. Wrapped in ThemeProvider
5. Components show token colors
6. No errors

## Exit Criteria
MUI story displays themed stock components.

---

## Verification Plan

### Criterion 1: Story file exists

**Check for MUI story:**
```bash
find stories -name "*MUI*.stories.*" -o -name "*mui*.stories.*"
```
Expected: Story file exists

**Verify location:**
```bash
ls -la stories/MUI-Library.stories.tsx
```
Expected: File exists

---

### Criterion 2: Appears in Storybook sidebar under Libraries/MUI

**Check story meta title:**
```bash
cat stories/MUI-Library.stories.tsx | grep "title:"
```
Expected: title: 'Libraries/MUI' or similar

**Check Storybook index:**
```bash
curl -s http://localhost:6006/index.json | jq '.entries | to_entries[] | select(.value.title | contains("MUI"))'
```
Expected: MUI story indexed

---

### Criterion 3: Uses real MUI imports

**Check for MUI imports:**
```bash
cat stories/MUI-Library.stories.tsx | grep "from '@mui/material'"
```
Expected: Imports from @mui/material

**Verify Button, Card, TextField, Typography imports:**
```bash
cat stories/MUI-Library.stories.tsx | grep -E "Button|Card|TextField|Typography"
```
Expected: All required components imported

---

### Criterion 4: Wrapped in ThemeProvider

**Check for ThemeProvider:**
```bash
cat stories/MUI-Library.stories.tsx | grep "ThemeProvider"
```
Expected: ThemeProvider used

**Verify theme import:**
```bash
cat stories/MUI-Library.stories.tsx | grep -E "muiTheme|from.*themes/mui"
```
Expected: DDS theme imported and used

---

### Criterion 5: Components show token colors

**Check story renders:**
```bash
curl -s "http://localhost:6006/iframe.html?id=libraries-mui--all-components" | grep -E "Button|Card|TextField" | head -5
```
Expected: MUI components present in rendered HTML

**Manual verification required:**
- Open story in browser
- Verify colors match DDS tokens (blue primary, grey secondary)

---

### Criterion 6: No errors

**Check browser console (manual):**
- Open http://localhost:6006/?path=/story/libraries-mui
- Check console for errors

**Check Storybook log:**
```bash
tail -50 /tmp/storybook.log | grep -i error || echo "No errors"
```
Expected: No errors

---

## Status

- [ ] Criterion 1: Story file exists
- [ ] Criterion 2: Appears in Storybook sidebar under Libraries/MUI
- [ ] Criterion 3: Uses real MUI imports
- [ ] Criterion 4: Wrapped in ThemeProvider
- [ ] Criterion 5: Components show token colors
- [ ] Criterion 6: No errors

**Sprint 10 Status:** NOT VERIFIED

**Next Action:** Execute verification commands.

