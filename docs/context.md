# Context

## Project Purpose

This repository is a **token transformation pipeline** that converts primitive design tokens from Figma into framework-specific theme files for MUI, shadcn, and Tailwind.

**Flow:** Figma → Tokens Studio → token-studio-sync-provider/DDS Foundations.json → Style Dictionary → Framework Themes → Storybook Demo

## Sacred Rules

1. **NEVER modify token-studio-sync-provider/DDS Foundations.json manually** - This file is automatically synced from Figma via Tokens Studio. Any manual changes will be overwritten.

2. **Source of truth:** token-studio-sync-provider/DDS Foundations.json contains all primitive design tokens exported from Figma's DDS Foundations set.

3. **Style Dictionary uses custom formatters** - 4 custom formatters transform flat tokens into framework-specific structures. See docs/SD-ACTUAL-SYSTEM.md for details.

4. **Hardcoded fallback values present** - 44 hex codes exist as safety net in custom formatters. All values trace back to token-studio-sync-provider/DDS Foundations.json.

5. **Primitives only** - This pipeline transforms primitive tokens only.

## Output Requirements

The pipeline must generate framework-specific outputs that match what each library expects:

- **MUI** - Format compatible with Material-UI's createTheme()
- **Tailwind** - Format compatible with Tailwind's config structure  
- **shadcn** - CSS custom properties compatible with shadcn components

Each output uses custom Style Dictionary formatters to match the target framework's requirements.

## Build Process

```bash
npm run build:tokens
```

Runs Style Dictionary to transform primitive tokens into framework-specific outputs.

## Storybook Demo

Demonstrates all three libraries using generated themes:

- **Toggle OFF:** Each library uses its default theme
- **Toggle ON:** All three libraries use themes generated from Style Dictionary

Purpose: Prove that one set of primitive tokens can theme multiple UI libraries.

## Git Workflow

1. Work in feature branches
2. Push to GitHub
3. Create PR on GitHub
4. Merge on GitHub (NOT locally)
5. Pull main to sync

**NEVER force push to main/master.**

## System Architecture

### Style Dictionary Configuration
- Uses tokens-studio transformGroup for token parsing
- Uses 4 custom formatters for framework-specific output (mui/theme, tailwind/theme, shadcn/css, shadcn/tailwind)
- Custom formatters documented in docs/SD-ACTUAL-SYSTEM.md
- Hardcoded fallback values present as safety net (44 hex codes)

### Theme Files
- Import from Style Dictionary outputs
- All values trace back to token-studio-sync-provider/DDS Foundations.json
- Values may have hardcoded fallbacks in formatters

### Verification Requirements
- All output files generate successfully
- All values trace to token-studio-sync-provider/DDS Foundations.json
- All three libraries render in Storybook
- Toggle switches between stock and DDS themes
- System documented in docs/SD-ACTUAL-SYSTEM.md

## Current Implementation Notes

### Custom Formatters
The system uses 4 custom Style Dictionary formatters because:
- MUI requires nested palette structure (palette.primary.main, palette.secondary.light, etc.)
- Tailwind requires color scale organization (colors.blue.500, colors.grey.300, etc.)
- shadcn requires HSL format and specific variable names (--primary, --card, --border, etc.)
- Built-in SD formats generate flat token lists insufficient for framework requirements

See docs/SD-ACTUAL-SYSTEM.md for complete documentation.

### Hardcoded Fallbacks
Custom formatters include hardcoded hex codes as fallbacks (e.g., `findToken('Blue.500') || '#2560ff'`).
These ensure builds succeed even if token lookup fails. In practice, lookups always succeed.

## Definition of Done

A change is complete when:

1. Style Dictionary config builds successfully (`npm run build:tokens` exit code 0)
2. All framework outputs generate (build/mui/, build/tailwind/, build/shadcn/)
3. All values trace to token-studio-sync-provider/DDS Foundations.json
4. All three libraries render correctly in Storybook
5. Toggle works correctly (switches between stock and DDS themes)
6. Changes documented (update relevant docs)