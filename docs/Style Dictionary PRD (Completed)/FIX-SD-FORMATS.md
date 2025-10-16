# Fix Style Dictionary Format Gaps - Implementation Plan

**Reference:** `docs/SD-FORMAT-GAPS.md` (gap analysis)  
**Follow:** `docs/METAPLAN.md` principles (one step at a time, verify each)

## Fix 1: MUI fontSize - Remove + 'px', Use parseInt()

**File:** `config/style-dictionary.config.mjs`  
**Lines:** 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 221

**Current Code (11 instances):**
```javascript
h1: {
  fontSize: fontSizes['48'] + 'px' || '48px',
  ...
}
```

**Required Change:**
```javascript
h1: {
  fontSize: parseInt(fontSizes['48']) || 48,
  ...
}
```

**Verification:**
```bash
npm run build:tokens
node -e "const t=require('./build/mui/theme.js').theme; console.log('h1.fontSize type:', typeof t.typography.h1.fontSize); console.log('h1.fontSize value:', t.typography.h1.fontSize)"
```

**Expected Output:**
```
h1.fontSize type: number
h1.fontSize value: 48
```

**Exit Criteria:**
- [ ] All 11 typography variant fontSize values are typeof `number`
- [ ] Build completes with exit code 0
- [ ] No console errors

---

## Fix 2: MUI borderRadius - Use parseInt()

**File:** `config/style-dictionary.config.mjs`  
**Lines:** 242-243

**Current Code:**
```javascript
shape: {
  borderRadius: borderRadii.rounded || '4px',
  pill: borderRadii.pill || '200px'
}
```

**Required Change:**
```javascript
shape: {
  borderRadius: parseInt(borderRadii.rounded) || 8,
  pill: parseInt(borderRadii.pill) || 200
}
```

**Verification:**
```bash
npm run build:tokens
node -e "const t=require('./build/mui/theme.js').theme; console.log('borderRadius type:', typeof t.shape.borderRadius); console.log('borderRadius value:', t.shape.borderRadius); console.log('pill type:', typeof t.shape.pill); console.log('pill value:', t.shape.pill)"
```

**Expected Output:**
```
borderRadius type: number
borderRadius value: 8
pill type: number
pill value: 200
```

**Exit Criteria:**
- [ ] `shape.borderRadius` is typeof `number`
- [ ] `shape.pill` is typeof `number`
- [ ] Build completes with exit code 0

---

## Fix 3: MUI Shadows - Add px Units

**File:** `config/style-dictionary.config.mjs`  
**Line:** 131

**Current Code:**
```javascript
const css = `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
```

**Required Change:**
```javascript
const css = `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
```

**Verification:**
```bash
npm run build:tokens
node -e "const t=require('./build/mui/theme.js').theme; console.log('shadows[1]:', t.shadows[1]); console.log('Has px:', t.shadows[1].includes('px'))"
```

**Expected Output:**
```
shadows[1]: 0px 2px 4px 4px #00000026
Has px: true
```

**Exit Criteria:**
- [ ] All shadow strings include "px" units
- [ ] Build completes with exit code 0

---

## Fix 4: Tailwind boxShadow - Add px Units

**File:** `config/style-dictionary.config.mjs`  
**Tailwind formatter** (approximately line 400-500)

**Find the boxShadow section that builds shadow strings**

**Required Change:** Same as Fix 3 - add 'px' to shadow x/y/blur/spread values

**Verification:**
```bash
npm run build:tokens
node -e "const t=require('./build/tailwind/theme.js').theme; console.log('boxShadow.sm:', t.boxShadow.sm); console.log('Has px:', t.boxShadow.sm.includes('px'))"
```

**Expected Output:**
```
boxShadow.sm: 0px 2px 4px 4px #00000026
Has px: true
```

**Exit Criteria:**
- [ ] All boxShadow strings include "px" units
- [ ] Build completes with exit code 0

---

## Fix 5: Tailwind borderRadius.DEFAULT - Add DEFAULT Key

**File:** `config/style-dictionary.config.mjs`  
**Tailwind formatter** borderRadius section

**Current Code Pattern:**
```javascript
const borderRadii = {};
borderRadiusTokens.forEach(token => {
  const name = token.path[token.path.length - 1];
  borderRadii[name] = token.$value;
});
```

**Required Change:**
```javascript
const borderRadii = {};
borderRadiusTokens.forEach(token => {
  const name = token.path[token.path.length - 1];
  if (name === 'rounded') {
    borderRadii['DEFAULT'] = token.$value;
  }
  borderRadii[name] = token.$value;
});
```

**Verification:**
```bash
npm run build:tokens
node -e "const t=require('./build/tailwind/theme.js').theme; console.log('borderRadius.DEFAULT:', t.borderRadius.DEFAULT); console.log('borderRadius.rounded:', t.borderRadius.rounded)"
```

**Expected Output:**
```
borderRadius.DEFAULT: 8px
borderRadius.rounded: 8px
```

**Exit Criteria:**
- [ ] `borderRadius.DEFAULT` exists and equals "8px"
- [ ] `borderRadius.rounded` still exists
- [ ] Build completes with exit code 0

---

## Fix 6: shadcn Shadow Variables - Add px Units

**File:** `config/style-dictionary.config.mjs`  
**shadcn formatter** boxShadow section

**Required Change:** Same as Fix 3 - add 'px' to shadow x/y/blur/spread values when generating CSS variables

**Verification:**
```bash
npm run build:tokens
cat build/shadcn/variables.css | grep elevation-1
```

**Expected Output:**
```
--elevation-1: 0px 2px 4px 4px #00000026;
```

**Exit Criteria:**
- [ ] All `--elevation-*` variables include "px" units
- [ ] Build completes with exit code 0

---

## Final Verification: All Fixes Complete

**Run all verification commands together:**

```bash
npm run build:tokens

echo "=== MUI Verification ==="
node -e "const t=require('./build/mui/theme.js').theme; console.log('fontSize type:', typeof t.typography.h1.fontSize, 'value:', t.typography.h1.fontSize); console.log('borderRadius type:', typeof t.shape.borderRadius, 'value:', t.shape.borderRadius); console.log('shadows[1]:', t.shadows[1], 'has px:', t.shadows[1].includes('px'))"

echo "=== Tailwind Verification ==="
node -e "const t=require('./build/tailwind/theme.js').theme; console.log('boxShadow.sm:', t.boxShadow.sm, 'has px:', t.boxShadow.sm.includes('px')); console.log('borderRadius.DEFAULT:', t.borderRadius.DEFAULT)"

echo "=== shadcn Verification ==="
cat build/shadcn/variables.css | grep -E "elevation-1"
```

**Expected Output:**
```
=== MUI Verification ===
fontSize type: number value: 48
borderRadius type: number value: 8
shadows[1]: 0px 2px 4px 4px #00000026 has px: true

=== Tailwind Verification ===
boxShadow.sm: 0px 2px 4px 4px #00000026 has px: true
borderRadius.DEFAULT: 8px

=== shadcn Verification ===
--elevation-1: 0px 2px 4px 4px #00000026;
```

**Exit Criteria:**
- [ ] ALL MUI format checks pass
- [ ] ALL Tailwind format checks pass
- [ ] ALL shadcn format checks pass
- [ ] Build exits with code 0
- [ ] No errors in build output

---

## Implementation Order

**CRITICAL: Follow METAPLAN - Complete each fix and verify before moving to next**

1. Fix 1 (MUI fontSize) → Verify → Must PASS before proceeding
2. Fix 2 (MUI borderRadius) → Verify → Must PASS before proceeding
3. Fix 3 (MUI shadows) → Verify → Must PASS before proceeding
4. Fix 4 (Tailwind shadows) → Verify → Must PASS before proceeding
5. Fix 5 (Tailwind DEFAULT) → Verify → Must PASS before proceeding
6. Fix 6 (shadcn shadows) → Verify → Must PASS before proceeding
7. Final Verification → ALL must PASS

**DO NOT proceed to next fix if current fix verification fails**

**DO NOT claim "complete" until Final Verification shows ALL PASS**

