<!-- 3c47038e-8481-4d49-88f2-097ae24fa3c6 c6112a2d-fb68-4b3b-8b6f-e43fc1f533fa -->
# Remove Storybook - Clean Approach

## Goal

Remove all Storybook code and dependencies while protecting the token sync provider, using proper branch workflow.

## Sacred Rule

**NEVER touch `token-studio-sync-provider/`** - this directory is synced from Figma and must remain untouched.

## Workflow

Work in a branch → Push to GitHub → Create PR → Merge on GitHub (no local merges to main)

## Steps

### 1. Create New Branch

```bash
git checkout -b remove-storybook
```

### 2. Remove Storybook Directories

- Delete `.storybook/` (all config)
- Delete `stories/` (all stories and assets)
- Delete `dist/` (Storybook build artifacts if present)

### 3. Clean package.json

Remove from `devDependencies`:

- All `@storybook/*` packages
- `eslint-plugin-storybook`
- `prop-types` (if only used by Storybook)
- `react-docgen-typescript` (if only used by Storybook)
- `ts-loader` (if only used by Storybook)
- `webpack` (if only used by Storybook)

Remove from `scripts`:

- `"storybook"` script
- `"build-storybook"` script

Remove from `eslintConfig.extends`:

- `"plugin:storybook/recommended"`

### 4. Update .gitignore

Add `storybook-static` if not already there

### 5. Run npm install

Clean up node_modules after removing dependencies

### 6. Update README.md

Ensure README reflects the project's true purpose: token transformation pipeline

### 7. Commit and Push

```bash
git add -A
git commit -m "chore: remove Storybook completely - refocus on token pipeline"
git push origin remove-storybook
```

### 8. Create PR on GitHub

- Go to GitHub
- Create PR from `remove-storybook` → `main`
- Wait for checks
- Check bypass box if needed
- Merge on GitHub (NOT locally)

### 9. Sync Local Main

```bash
git checkout main
git pull origin main
git branch -d remove-storybook
```

## What Gets Protected

✅ `token-studio-sync-provider/` - Never touched

✅ `config/style-dictionary.config.mjs` - Kept as-is

✅ `build/` outputs - Kept as-is

✅ Token transformation pipeline - Fully intact

## What Gets Deleted

❌ `.storybook/` directory

❌ `stories/` directory

❌ Storybook dependencies

❌ Storybook scripts

❌ `dist/` if it exists

## Result

Clean repository focused on: **Figma → Style Dictionary → Framework Themes**

### To-dos

- [ ] Delete .storybook/ and stories/ directories
- [ ] Remove all Storybook dependencies and scripts from package.json
- [ ] Delete dist/ directory (Storybook build artifacts)
- [ ] Run npm install to clean up node_modules
- [ ] Update README.md to reflect token pipeline focus
- [ ] Commit the cleanup with clear message