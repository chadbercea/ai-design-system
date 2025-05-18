# Build Commands Documentation

## Overview

This document outlines the commands used to build and process design tokens in our design system. These commands are critical for generating the necessary output files for various platforms and ensuring that the build process is efficient and reliable.

## Commands

### 1. Build Tokens

**Command:**
```sh
node scripts/build-tokens.mjs
```

**Purpose:**
- This command processes the design tokens defined in the `tokens/**/*.json` files.
- It generates output files in various formats (JavaScript, CSS, SCSS) based on the configuration specified in the build script.
- The build process utilizes a caching system to improve performance by avoiding unnecessary rebuilds.

### 2. Watch Mode

**Command:**
```sh
node scripts/build-tokens.mjs --watch
```

**Purpose:**
- This command runs the build process in watch mode, which monitors the token files for changes.
- When a change is detected, the build process is automatically triggered to regenerate the output files.
- This is useful during development to ensure that the latest changes are reflected in the output without manual intervention.

## How It Works

- **Token Processing:** The build script uses Style Dictionary to process the tokens and generate the necessary output files.
- **Caching:** The build process includes a caching mechanism to store the results of previous builds, allowing for faster rebuilds when no changes are detected.
- **Watch Mode:** The watch mode utilizes the `chokidar` library to monitor file changes and trigger the build process accordingly.

## Conclusion

Understanding and utilizing these commands is essential for maintaining and updating the design system effectively. They ensure that the design tokens are processed correctly and that the output files are generated efficiently. 