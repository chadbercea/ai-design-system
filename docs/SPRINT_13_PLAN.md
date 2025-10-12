# Sprint 13 Plan: HOME PAGE - 3 COLUMN LAYOUT

## Requirement
Home story with side-by-side comparison of all three libraries.

## Layout Required (from PRD)
- 3 columns: MUI | shadcn | Tailwind
- Each column shows stock components from that library
- MUI column uses same components as MUI Library story
- shadcn column uses same component as shadcn Library story
- Tailwind column uses same markup as Tailwind Library story

## Acceptance Criteria (from PRD)
1. Story file exists
2. Appears under Home in Storybook
3. Three columns visible
4. MUI column shows MUI components with ThemeProvider
5. shadcn column shows shadcn Button
6. Tailwind column shows Tailwind-styled elements
7. All use DDS token colors
8. No errors

## Exit Criteria
Home page displays 3-column comparison.

---

## Verification Plan

### Criterion 1: Story file exists

**Check for Home story:**
```bash
find stories -name "Home.stories.*"
```
Expected: Story file exists

**Verify location:**
```bash
ls -la stories/Home.stories.tsx
```
Expected: File exists

---

### Criterion 2: Appears under Home in Storybook

**Check story meta title:**
```bash
cat stories/Home.stories.tsx | grep "title:"
```
Expected: title: 'Home/...' or similar

**Check Storybook index:**
```bash
curl -s http://localhost:6006/index.json | jq '.entries | to_entries[] | select(.value.title | contains("Home"))'
```
Expected: Home story indexed

---

### Criterion 3: Three columns visible

**Check for grid/column layout:**
```bash
cat stories/Home.stories.tsx | grep -E "grid|columns|flex"
```
Expected: 3-column layout defined

**Verify 3 distinct sections:**
```bash
cat stories/Home.stories.tsx | grep -c "column\|Column" || cat stories/Home.stories.tsx | grep -E "MUI|shadcn|Tailwind" | wc -l
```
Expected: 3 columns/sections

---

### Criterion 4: MUI column shows MUI components with ThemeProvider

**Check for MUI showcase component:**
```bash
cat stories/Home.stories.tsx | grep "MUIShowcase"
```
Expected: MUI showcase component used

**Verify ThemeProvider:**
```bash
cat stories/Home.stories.tsx | grep "ThemeProvider" || cat src/demo-components/MUIShowcase.tsx | grep "ThemeProvider"
```
Expected: ThemeProvider present

---

### Criterion 5: shadcn column shows shadcn Button

**Check for shadcn showcase component:**
```bash
cat stories/Home.stories.tsx | grep "ShadcnShowcase"
```
Expected: shadcn showcase component used

**Verify Button usage:**
```bash
cat src/demo-components/ShadcnShowcase.tsx | grep "Button"
```
Expected: shadcn Button used

---

### Criterion 6: Tailwind column shows Tailwind-styled elements

**Check for Tailwind showcase component:**
```bash
cat stories/Home.stories.tsx | grep "TailwindShowcase"
```
Expected: Tailwind showcase component used

**Verify Tailwind classes:**
```bash
cat src/demo-components/TailwindShowcase.tsx | grep "className"
```
Expected: Tailwind utility classes present

---

### Criterion 7: All use DDS token colors

**Check story renders all three:**
```bash
curl -s "http://localhost:6006/iframe.html?id=home-token-pipeline-demo--default" | grep -E "MUI|shadcn|Tailwind" | head -10
```
Expected: All three library sections present

**Manual verification:**
- Open Home story in browser
- Verify all three columns show matching colors (blue/grey from DDS)

---

### Criterion 8: No errors

**Check browser console (manual):**
- Open http://localhost:6006/?path=/story/home
- Check console for errors

**Check Storybook log:**
```bash
tail -50 /tmp/storybook.log | grep -i error || echo "No errors"
```
Expected: No errors

---

## Status

- [ ] Criterion 1: Story file exists
- [ ] Criterion 2: Appears under Home in Storybook
- [ ] Criterion 3: Three columns visible
- [ ] Criterion 4: MUI column shows MUI components with ThemeProvider
- [ ] Criterion 5: shadcn column shows shadcn Button
- [ ] Criterion 6: Tailwind column shows Tailwind-styled elements
- [ ] Criterion 7: All use DDS token colors
- [ ] Criterion 8: No errors

**Sprint 13 Status:** NOT VERIFIED

**Next Action:** Execute verification commands.

