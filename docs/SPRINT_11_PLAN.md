# Sprint 11 Plan: SHADCN LIBRARY STORY

## Requirement
Story showing shadcn Button component with DDS theme.

## Acceptance Criteria (from PRD)
1. Story file exists
2. Appears under Libraries/shadcn
3. Imports shadcn Button
4. Shows variants and sizes
5. Uses token colors
6. No errors

## Exit Criteria
shadcn story displays themed Button.

---

## Verification Plan

### Criterion 1: Story file exists

**Check for shadcn story:**
```bash
find stories -name "*Shadcn*.stories.*" -o -name "*shadcn*.stories.*"
```
Expected: Story file exists

**Verify location:**
```bash
ls -la stories/Shadcn-Library.stories.tsx
```
Expected: File exists

---

### Criterion 2: Appears under Libraries/shadcn

**Check story meta title:**
```bash
cat stories/Shadcn-Library.stories.tsx | grep "title:"
```
Expected: title: 'Libraries/shadcn' or similar

**Check Storybook index:**
```bash
curl -s http://localhost:6006/index.json | jq '.entries | to_entries[] | select(.value.title | contains("shadcn"))'
```
Expected: shadcn story indexed

---

### Criterion 3: Imports shadcn Button

**Check for Button import:**
```bash
cat stories/Shadcn-Library.stories.tsx | grep "from.*components/ui/button"
```
Expected: Import from shadcn Button component

---

### Criterion 4: Shows variants and sizes

**Check for variant usage:**
```bash
cat stories/Shadcn-Library.stories.tsx | grep -E 'variant="(default|outline|secondary|ghost)"'
```
Expected: Multiple variants demonstrated

**Check for size usage:**
```bash
cat stories/Shadcn-Library.stories.tsx | grep -E 'size="(default|sm|lg|icon)"'
```
Expected: Multiple sizes demonstrated (if applicable)

---

### Criterion 5: Uses token colors

**Check story applies DDS theme:**
```bash
cat stories/Shadcn-Library.stories.tsx | grep "dds-theme"
```
Expected: DDS theme class applied

**Verify story renders:**
```bash
curl -s "http://localhost:6006/iframe.html?id=libraries-shadcn--all-components" | grep "button" | head -5
```
Expected: Button elements present

**Manual verification:**
- Open story in browser
- Verify buttons show DDS blue/grey colors

---

### Criterion 6: No errors

**Check browser console (manual):**
- Open http://localhost:6006/?path=/story/libraries-shadcn
- Check console for errors

**Check Storybook log:**
```bash
tail -50 /tmp/storybook.log | grep -i error || echo "No errors"
```
Expected: No errors

---

## Status

- [ ] Criterion 1: Story file exists
- [ ] Criterion 2: Appears under Libraries/shadcn
- [ ] Criterion 3: Imports shadcn Button
- [ ] Criterion 4: Shows variants and sizes
- [ ] Criterion 5: Uses token colors
- [ ] Criterion 6: No errors

**Sprint 11 Status:** NOT VERIFIED

**Next Action:** Execute verification commands.

