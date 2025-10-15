# Context

# Chief Aim
- The system's purpose is to PROVE that ANY UI library can be aligned to a single source of truth.
- All actions no matter the sequence, should result in supporting this principle first. 
- Discrepancy in outcome is evidence of deviation from the onus.

## System Limitations (Honesty Clause)
- **Goal:** 100% visual identity across frameworks when using DDS tokens
- **Reality:** Some discrepancies may be technically unavoidable due to framework constraints
- **Rule:** Document WHY a limitation exists, don't hide it with hacks
- **Test:** If we CAN'T achieve identity, prove it's the framework's constraint, not our pipeline

**Examples of acceptable limitations:**
- MUI button has ripple effect, Tailwind doesn't (framework behavior difference)
- shadcn uses HSL color format internally (acceptable format conversion)

**Examples of UNACCEPTABLE limitations:**
- "MUI can't use tokens for borderRadius" → FALSE, MUI accepts numbers
- "Tailwind doesn't support shadows" → FALSE, Tailwind has boxShadow config
- "Close enough" → NOT ACCEPTABLE without proving why 100% is impossible 

## You
- When you are rigorus, I can have fun. 

## Communication Contract (AI Operating Rules)

**REQUIRED: Every response must include:**
- Technical evidence (code, grep output, build logs)
- Logical flow (if X then Y because Z)
- Verification command (how to prove the claim)

**FORBIDDEN:**
- "It should work" without verification
- "I'm sorry" without a fix
- Placating agreement without investigation
- Defensive explanations without proof

**Pre-Response Test:**
- Can I prove this claim with a command?
- Did I verify, or am I guessing?
- Am I avoiding conflict or solving the problem?

**Enforcement:** If caught violating this contract, user will reference this section. Pattern violations may result in context reset.

---

## Project Purpose

This repository is a **token transformation pipeline** that converts primitive design tokens from Figma into framework-specific theme files for MUI, shadcn, and Tailwind.

**Flow:** Figma → Tokens Studio → token-studio-sync-provider/DDS Foundations.json → Style Dictionary → Framework Themes → Storybook Demo

## Sacred Rules

1. **NEVER modify token-studio-sync-provider/DDS Foundations.json manually** - This file is automatically synced from Figma via Tokens Studio. Any manual changes will be overwritten.

2. **Source of truth:** token-studio-sync-provider/DDS Foundations.json contains all primitive design tokens exported from Figma's DDS Foundations set.

3. **Style Dictionary uses custom formatters** - 4 custom formatters transform flat tokens into framework-specific structures. See docs/SD-ACTUAL-SYSTEM.md for details.

4. **Hardcoded fallback values present** - 44 hex codes exist as safety net in custom formatters. All values trace back to token-studio-sync-provider/DDS Foundations.json.

5. **Primitives only** - This pipeline transforms primitive tokens only.

## Critical Realization: ALL Tokens MUST Transform

**Source contains 59 tokens. ALL 59 MUST transform to framework outputs.**

### The Problem That Was Missed
For extended periods, Style Dictionary config was only transforming ~20% of available tokens:
- **Colors:** Partial (Blue, Grey, Black, White only - ignoring Green, Red, Orange, Yellow, Pink, Teal, Violet)
- **Box Shadows:** NONE (elevation-1 through elevation-4 missing)
- **Border Radius:** NONE (pill, rounded missing)
- **Border Width:** NONE (sm, md, lg, xl, xxl missing)
- **Font Families:** NONE (marketing, product, code missing - hardcoded instead)
- **Font Weights:** NONE (light, regular, semibold, bold, extrabold missing - hardcoded instead)
- **Opacity States:** NONE (hover, selected, focus, disabled missing - hardcoded instead)
- **Letter Spacing:** NONE
- **Spacing Scale:** Hardcoded values instead of token-driven

**Result:** 80% of tokens ignored, replaced with hardcoded values.

### Why This Is Catastrophic
1. **Breaks the token pipeline** - Changes in Figma don't propagate if tokens aren't transformed
2. **Defeats the entire purpose** - System exists to transform ALL tokens, not cherry-pick
3. **Creates maintenance burden** - Hardcoded values must be manually updated when tokens change
4. **Incomplete deliverable** - User has 59 tokens in Figma, expects all 59 to work

### The Fix
**Standard Operating Procedure:** `docs/SD-SOP.md`

Before ANY Style Dictionary work:
1. Read `docs/SD-SOP.md` Pre-Flight Checklist
2. Read `docs/TOKEN-MAPPING-COMPLETE.md` (maps all 59 tokens to framework properties)
3. Research Style Dictionary built-in transforms FIRST
4. Transform ALL tokens, not just some

After ANY Style Dictionary work:
1. Run `docs/SD-SOP.md` Post-Flight Checklist
2. Verify ALL 59 tokens present in outputs
3. No hardcoded values (except fallbacks)
4. Storybook integration verified

**Zero tolerance for incomplete transformation.**

### Reference Documents
- `docs/SD-SOP.md` - Standard Operating Procedure for all SD work
- `docs/TOKEN-MAPPING-COMPLETE.md` - Maps all 59 tokens to framework properties
- `docs/TOKEN-AUDIT.md` - Documents token inventory and current state
- `docs/SD-ACTUAL-SYSTEM.md` - Documents current SD implementation
- `docs/METAPLAN.md` - Enforces SD-SOP compliance in sprint work

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