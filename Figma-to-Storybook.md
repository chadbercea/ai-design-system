# Figma to Storybook Token Flow

## Overview
This document outlines the end-to-end flow of design tokens from Figma to Storybook, including the Style Dictionary transformation process.

## Flow Steps

### 1. Figma → Sync Provider
- Make changes in Figma design system
- Changes are automatically synced to `token-studio-sync-provider/DDS Foundations.json`
- Verify the JSON file contains the updated token values

### 2. Style Dictionary Processing
- Run the token build process:
  ```bash
  npm run build:tokens
  ```
- Style Dictionary:
  - Reads `DDS Foundations.json`
  - Processes tokens through the MUI adapter
  - Outputs to `build/tokens.js`

### 3. Storybook Integration
- Start Storybook:
  ```bash
  npm run storybook
  ```
- Navigate to "MUI/Theme Comparison"
- Use the theme toggle in the toolbar to switch between:
  - MUI Default
  - DDS Foundations
- Verify that Figma changes are reflected in the DDS Foundations theme

## Testing the Flow
1. Make a change in Figma
2. Verify the change in `token-studio-sync-provider/DDS Foundations.json`
3. Run `npm run build:tokens`
4. Start Storybook and toggle themes
5. Confirm the change is visible in the DDS Foundations theme

## Common Issues
- If changes aren't appearing:
  - Check the sync provider JSON for updates
  - Verify the token build completed successfully
  - Ensure Storybook is using the latest token build
  - Clear Storybook cache if needed

## Next Steps
- [ ] Document specific token changes to test
- [ ] Add visual regression testing
- [ ] Set up automated token build in CI
