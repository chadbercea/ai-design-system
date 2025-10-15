# Style Dictionary Format Gaps

## MUI Gaps

### Gap 1: typography variant fontSize values

**Expected:** `number`  
**Actual:** `string` (e.g., `"48px"`, `"40px"`, `"32px"`)  
**Example from build/mui/theme.js:**
```javascript
// Line 190
"h1": {
  "fontSize": "48px",  // ❌ WRONG - MUI needs number 48
  "fontWeight": 700,
  "lineHeight": 1.2
},
// Lines 194, 199, 204, 209, 215, 219, 224, 229, 235, 240 - all have same issue
```

**Gap:** Formatter is adding `+ 'px'` to fontSize values, converting numbers to strings with units  

**Location:** `config/style-dictionary.config.mjs` lines 170, 175, 180, 185, 190, 195, 200, 205, 210, 215, 220, 221

**Current code pattern:**
```javascript
h1: {
  fontSize: fontSizes['48'] + 'px' || '48px',
  fontWeight: fontWeights.bold || 700,
  lineHeight: 1.2
}
```

**Required fix:**
```javascript
h1: {
  fontSize: parseInt(fontSizes['48']) || 48,
  fontWeight: fontWeights.bold || 700,
  lineHeight: 1.2
}
```

**Why this fixes it:** MUI's createTheme() expects fontSize as a number (not string). MUI interprets the number as pixels internally. By using parseInt() and removing the + 'px', we output the correct type.

---

### Gap 2: shape.borderRadius value

**Expected:** `number`  
**Actual:** `string` (e.g., `"8px"`)  
**Example from build/mui/theme.js:**
```javascript
// Line 256
"shape": {
  "borderRadius": "8px",  // ❌ WRONG - MUI needs number 8
  "pill": "200px"
}
```

**Gap:** Formatter is outputting borderRadius token value as-is (string with units)

**Location:** `config/style-dictionary.config.mjs` line 242

**Current code:**
```javascript
shape: {
  borderRadius: borderRadii.rounded || '4px',
  pill: borderRadii.pill || '200px'
}
```

**Required fix:**
```javascript
shape: {
  borderRadius: parseInt(borderRadii.rounded) || 8,
  pill: parseInt(borderRadii.pill) || 200
}
```

**Why this fixes it:** MUI expects borderRadius as a number (interpreted as pixels). By using parseInt() to strip units, we output the correct type.

---

### Gap 3: shadows array missing px units

**Expected:** `string` with px units (e.g., `"0px 2px 4px 4px rgba(...)"`)  
**Actual:** `string` without px units (e.g., `"0 2 4 4 #00000026"`)  
**Example from build/mui/theme.js:**
```javascript
// Lines 247-253
"shadows": [
  "none",
  "0 2 4 4 #00000026",      // ❌ WRONG - needs "0px 2px 4px 4px #00000026"
  "0 4 8 4 #00000033",
  "0 4 12 4 #00000033",
  "0 4 16 4 #00000033"
]
```

**Gap:** Formatter is not adding "px" units to shadow x, y, blur, spread values

**Location:** `config/style-dictionary.config.mjs` line 131

**Current code:**
```javascript
shadowTokens.forEach(token => {
  const name = token.path.join('.');
  if (name.includes('elevation')) {
    const level = parseInt(name.match(/\d+/)?.[0]);
    if (level) {
      const shadow = token.$value;
      const css = `${shadow.x} ${shadow.y} ${shadow.blur} ${shadow.spread} ${shadow.color}`;
      shadows[level] = css;
    }
  }
});
```

**Required fix:**
```javascript
shadowTokens.forEach(token => {
  const name = token.path.join('.');
  if (name.includes('elevation')) {
    const level = parseInt(name.match(/\d+/)?.[0]);
    if (level) {
      const shadow = token.$value;
      const css = `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
      shadows[level] = css;
    }
  }
});
```

**Why this fixes it:** CSS box-shadow syntax requires units (px) for offset-x, offset-y, blur-radius, and spread-radius values. Without units, the shadow string is invalid CSS.

---

### Gap 4: palette.action.hoverOpacity ✅ CORRECT

**Expected:** `number` decimal (0.12)  
**Actual:** `number` 0.12  
**Status:** ✅ NO GAP - Already correct

---

## Tailwind Gaps

### Gap 1: borderRadius.DEFAULT missing

**Expected:** `borderRadius.DEFAULT: "8px"`  
**Actual:** `borderRadius.rounded: "8px"` (no DEFAULT key)  
**Example from build/tailwind/theme.js:**
```javascript
// Lines 169-172
"borderRadius": {
  "rounded": "8px",   // ❌ Should also have DEFAULT: "8px"
  "pill": "200px"
}
```

**Gap:** Formatter uses token names directly ('rounded', 'pill') instead of mapping 'rounded' to 'DEFAULT'

**Location:** `config/style-dictionary.config.mjs` (Tailwind formatter, approximately line 400-500)

**Current code pattern:**
```javascript
const borderRadii = {};
borderRadiusTokens.forEach(token => {
  const name = token.path[token.path.length - 1];
  borderRadii[name] = token.$value;
});
// Outputs: { rounded: "8px", pill: "200px" }
```

**Required fix:**
```javascript
const borderRadii = {};
borderRadiusTokens.forEach(token => {
  const name = token.path[token.path.length - 1];
  if (name === 'rounded') {
    borderRadii['DEFAULT'] = token.$value;  // Map 'rounded' to DEFAULT
  }
  borderRadii[name] = token.$value;  // Keep named key too
});
// Outputs: { DEFAULT: "8px", rounded: "8px", pill: "200px" }
```

**Why this fixes it:** Tailwind expects a `DEFAULT` key for the base borderRadius value used by the `rounded` utility class.

---

### Gap 2: boxShadow missing px units

**Expected:** `string` with px units (e.g., `"0px 2px 4px 4px rgba(...)"`)  
**Actual:** `string` without px units (e.g., `"0 2 4 4 #00000026"`)  
**Example from build/tailwind/theme.js:**
```javascript
// Lines 163-168
"boxShadow": {
  "sm": "0 2 4 4 #00000026",       // ❌ WRONG - needs "0px 2px 4px 4px..."
  "DEFAULT": "0 4 8 4 #00000033",
  "md": "0 4 12 4 #00000033",
  "lg": "0 4 16 4 #00000033"
}
```

**Gap:** Same as MUI Gap 3 - formatter not adding px units to shadow values

**Location:** `config/style-dictionary.config.mjs` (Tailwind formatter boxShadow section)

**Required fix:** Same as MUI fix - add 'px' to shadow x/y/blur/spread values in formatter

---

### Gap 3: fontSize.base ✅ CORRECT

**Expected:** `string` with px ("14px")  
**Actual:** `"14px"`  
**Status:** ✅ NO GAP - Already correct

---

### Gap 4: colors.blue.500 ✅ CORRECT

**Expected:** `string` hex ("#2560ff")  
**Actual:** `"#2560ff"`  
**Status:** ✅ NO GAP - Already correct

---

## shadcn Gaps

### Gap 1: shadow variables missing px units

**Expected:** `--elevation-1: 0px 2px 4px 4px rgba(...);`  
**Actual:** `--elevation-1: 0 2 4 4 #00000026;`  
**Example from build/shadcn/variables.css:**
```css
/* Lines 34-38 */
--elevation-1: 0 2 4 4 #00000026;  /* ❌ WRONG - needs px units */
--elevation-2: 0 4 8 4 #00000033;
--elevation-3: 0 4 12 4 #00000033;
--elevation-4: 0 4 16 4 #00000033;
```

**Gap:** Same as MUI Gap 3 and Tailwind Gap 2 - formatter not adding px units to shadow values

**Location:** `config/style-dictionary.config.mjs` (shadcn formatter boxShadow section)

**Required fix:** Same as MUI fix - add 'px' to shadow x/y/blur/spread values in formatter

---

### Gap 2: --radius ✅ CORRECT

**Expected:** With units (e.g., `0.5rem` or `8px`)  
**Actual:** `0.5rem`  
**Status:** ✅ NO GAP - Already correct

---

### Gap 3: --text-* variables ✅ CORRECT

**Expected:** With px units  
**Actual:** All have px units (e.g., `--text-14: 14px;`)  
**Status:** ✅ NO GAP - Already correct

---

## Summary

### Critical Fixes Required (3 issues, affecting 3 formatters):

1. **MUI fontSize values** - Remove `+ 'px'`, use `parseInt()` (affects 11 lines)
2. **MUI/Tailwind/shadcn shadows** - Add 'px' units to x/y/blur/spread (affects 3 formatters)
3. **MUI borderRadius values** - Use `parseInt()` to strip units (affects 2 lines)

### Secondary Fix:

4. **Tailwind borderRadius** - Add DEFAULT key mapping (affects 1 formatter section)

### Already Correct (no changes needed):

- ✅ MUI palette.action.hoverOpacity
- ✅ Tailwind fontSize values
- ✅ Tailwind colors
- ✅ shadcn --radius variables
- ✅ shadcn --text-* variables

