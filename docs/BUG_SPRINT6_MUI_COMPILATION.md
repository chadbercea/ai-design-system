# Bug Report: Sprint 6 - MUI Theme Compilation Errors

## Issue
TypeScript compilation and Node import fail for MUI theme, but theme works successfully in Storybook/Vite environment.

## Discovery
- **Sprint:** 6 (MUI Theme Exists)
- **Criterion:** 4 (No compilation errors)
- **Source:** `npx tsc --noEmit src/themes/mui-theme.ts` and `node -e "import(...)"`

## Error Details

### TypeScript Compilation Errors
```
node_modules/@mui/system/*/index.d.ts: error TS2305: Module has no exported member 'default'
node_modules/@mui/utils/*/: error TS1259: Module can only be default-imported using the 'esModuleInterop' flag
```

16 total errors in MUI type definitions (not in our code).

### Node Runtime Error
```
Error [ERR_UNSUPPORTED_DIR_IMPORT]: Directory import '/node_modules/@mui/material/styles' is not supported
```

ES module resolution issue with MUI's directory imports.

## Current State

**Works:**
- ✅ Theme compiles and runs in Storybook
- ✅ Vite handles MUI imports correctly
- ✅ Theme is used successfully in `MUIShowcase` component
- ✅ No runtime errors in browser

**Fails:**
- ❌ Direct TypeScript compilation (`tsc --noEmit`)
- ❌ Node ES module import (`node -e "import(...)"`)

## Root Cause Analysis

**Hypothesis 1: TypeScript Config Missing Flags**
- `esModuleInterop` flag needed for MUI imports
- `skipLibCheck` might hide type definition errors
- `moduleResolution` may need adjustment

**Hypothesis 2: Package.json Missing "type": "module"**
- Module type warning appears in logs
- May affect how Node resolves imports

**Hypothesis 3: MUI v6 + Node v23 Compatibility**
- MUI v6.5.0 installed
- Node v23.11.0 may have stricter ES module handling
- Directory imports deprecated in newer Node versions

## Investigation Plan

### Step 1: Check tsconfig.json
```bash
cat tsconfig.json | jq -r '.compilerOptions | {esModuleInterop, skipLibCheck, moduleResolution}'
```

### Step 2: Test with tsconfig flags
```bash
npx tsc --noEmit --esModuleInterop --skipLibCheck src/themes/mui-theme.ts
```

### Step 3: Check if issue affects Storybook build
```bash
npm run build-storybook 2>&1 | grep -i error
```

### Step 4: Verify MUI version compatibility
```bash
npm info @mui/material versions | tail -5
cat package.json | grep "@mui/material"
```

## Proposed Fix

### Option A: Update tsconfig.json (Preferred)
Add missing compiler options:
```json
{
  "compilerOptions": {
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler"
  }
}
```

### Option B: Add "type": "module" to package.json
```json
{
  "type": "module"
}
```

### Option C: Update MUI import paths
Change:
```typescript
import { createTheme } from '@mui/material/styles';
```
To:
```typescript
import { createTheme } from '@mui/material/node/styles/index.js';
```

## Priority
**LOW** - Does not block demo functionality. Theme works in actual usage (Storybook). Only fails in standalone TypeScript/Node testing.

## Status
- [x] Bug identified
- [ ] Root cause confirmed
- [ ] Fix implemented
- [ ] Verification passed

## Notes
- This is a tooling/configuration issue, not a code logic issue
- Vite (Storybook's bundler) handles these imports correctly
- May revisit if production builds are affected
- Current workaround: Use Vite/Storybook environment (already working)

