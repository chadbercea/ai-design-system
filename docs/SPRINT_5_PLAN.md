# Sprint 5 Plan: TOKEN BUILD WORKS

## Requirement
Style Dictionary generates 4 output files.

## Required Outputs (from PRD)
1. CSS variables file
2. MUI JavaScript tokens
3. shadcn CSS variables
4. Tailwind JavaScript tokens

## Acceptance Criteria (from PRD)
1. Config file exists
2. Build command runs
3. 4 files generated in build folder
4. Files contain token values

## Exit Criteria
Build generates all outputs.

---

## Verification Plan

### Criterion 1: Config file exists

**Check for Style Dictionary config:**
```bash
ls -la config/style-dictionary.config.mjs
```
Expected: Config file exists

**Verify config is valid JavaScript:**
```bash
node -e "import('./config/style-dictionary.config.mjs')" 2>&1
```
Expected: No syntax errors

---

### Criterion 2: Build command runs

**Check package.json for build script:**
```bash
cat package.json | grep "build:tokens"
```
Expected: Build script defined

**Run build command:**
```bash
npm run build:tokens
```
Expected: Command completes with exit code 0

---

### Criterion 3: 4 files generated in build folder

**Check for CSS variables file:**
```bash
ls -la build/css/tokens.css
```
Expected: File exists

**Check for MUI JavaScript tokens:**
```bash
ls -la build/mui/theme.js
```
Expected: File exists

**Check for shadcn CSS variables:**
```bash
ls -la build/shadcn/variables.css
```
Expected: File exists

**Check for Tailwind JavaScript tokens:**
```bash
ls -la build/tailwind/theme.js
```
Expected: File exists

**Count build outputs:**
```bash
find build -name "*.css" -o -name "*.js" | wc -l
```
Expected: At least 4 files

---

### Criterion 4: Files contain token values

**Verify CSS file has variables:**
```bash
cat build/css/tokens.css | grep -E "^\\s*--" | head -5
```
Expected: CSS custom properties present

**Verify MUI file has theme values:**
```bash
cat build/mui/theme.js | grep -E "palette|primary|secondary" | head -5
```
Expected: Theme configuration present

**Verify shadcn file has CSS vars:**
```bash
cat build/shadcn/variables.css | grep -E "^\\s*--" | head -5
```
Expected: CSS variables present

**Verify Tailwind file has colors:**
```bash
cat build/tailwind/theme.js | grep -E "colors|blue|grey" | head -5
```
Expected: Color definitions present

---

## Status

- [ ] Criterion 1: Config file exists
- [ ] Criterion 2: Build command runs
- [ ] Criterion 3: 4 files generated in build folder
- [ ] Criterion 4: Files contain token values

**Sprint 5 Status:** NOT VERIFIED

**Next Action:** Execute verification commands.

