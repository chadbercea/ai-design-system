# Sprint 14 Plan: THEME TOGGLE BUTTON

## Requirement
In-page button that switches between two themes.

## Toggle Behavior (from PRD)
- Button visible above columns
- Click switches all three columns to alternate theme
- All components update simultaneously

## Acceptance Criteria (from PRD)
1. Toggle button renders
2. Clicking changes visual appearance
3. All three columns update together
4. No errors on toggle
5. Theme state persists during interaction

## Exit Criteria
Toggle switches themes for all columns.

---

## Verification Plan

### Criterion 1: Toggle button renders

**Check Home story has toggle:**
```bash
cat stories/Home.stories.tsx | grep -E "toggle|Toggle|button.*theme|Theme.*button"
```
Expected: Toggle button defined

**Verify button renders:**
```bash
curl -s "http://localhost:6006/iframe.html?id=home-token-pipeline-demo--default" | grep -E "toggle|Toggle|theme|Theme" | grep "button"
```
Expected: Toggle button present in HTML

**Manual verification:**
- Open Home story
- Verify toggle button visible above columns

---

### Criterion 2: Clicking changes visual appearance

**Check for state management:**
```bash
cat stories/Home.stories.tsx | grep "useState"
```
Expected: React state for theme toggle

**Check for click handler:**
```bash
cat stories/Home.stories.tsx | grep "onClick"
```
Expected: Click handler defined

**Manual verification:**
- Click toggle button
- Verify visual change occurs (colors shift)

---

### Criterion 3: All three columns update together

**Check state is passed to all showcases:**
```bash
cat stories/Home.stories.tsx | grep -E "MUIShowcase.*useDDSTheme|ShadcnShowcase.*useDDSTheme|TailwindShowcase.*useDDSTheme"
```
Expected: All three showcases receive theme state prop

**Manual verification:**
- Toggle button
- Verify all three columns change colors simultaneously
- MUI: blue → default blue
- shadcn: blue → black/white
- Tailwind: blue → green/purple (or vice versa)

---

### Criterion 4: No errors on toggle

**Manual verification (browser console):**
- Open Home story
- Open browser console
- Click toggle multiple times
- Verify no errors logged

**Check for error boundaries (optional):**
```bash
cat stories/Home.stories.tsx | grep "ErrorBoundary"
```
Expected: Error handling present (nice to have)

---

### Criterion 5: Theme state persists during interaction

**Check state management:**
```bash
cat stories/Home.stories.tsx | grep -A10 "useState"
```
Expected: State variable for theme

**Manual verification:**
- Toggle to alternate theme
- Interact with components (hover, click buttons)
- Verify theme remains in selected state
- Toggle back
- Verify theme persists after interactions

---

## Status

- [ ] Criterion 1: Toggle button renders
- [ ] Criterion 2: Clicking changes visual appearance
- [ ] Criterion 3: All three columns update together
- [ ] Criterion 4: No errors on toggle
- [ ] Criterion 5: Theme state persists during interaction

**Sprint 14 Status:** NOT VERIFIED

**Next Action:** Execute verification commands and manual browser testing.

