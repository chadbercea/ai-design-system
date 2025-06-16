# Style Dictionary Pipeline

A pipeline for transforming design tokens from `DDS Foundations.json` into various formats using Style Dictionary.

## Overview
This project uses Style Dictionary to transform design tokens from `DDS Foundations.json` into various output formats. It's a pure token transformation pipeline with no UI components or stories.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation
```bash
# Install dependencies
npm install

# Build tokens
npm run build:tokens
```

## Project Structure
- `config/`: Style Dictionary configuration
- `token-studio-sync-provider/`: Source design tokens
- `build/`: Generated design tokens

## Design Token Management
The project uses Style Dictionary to transform design tokens from `DDS Foundations.json` into various formats. Run `npm run build:tokens` to generate the latest token files.

## Known Issues

### HSL Color Output
The `ts/color/modifiers` transform from `@tokens-studio/sd-transforms` only outputs HSL color values if color tokens include the `$extensions.studio.tokens.modify` property with `space: "hsl"`.

For more details, see the [@tokens-studio/sd-transforms documentation](https://www.npmjs.com/package/@tokens-studio/sd-transforms).

## Contributing
Contact @ChadBercea for questions or contributions.