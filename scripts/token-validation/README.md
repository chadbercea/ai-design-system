# Token Validation System

## Overview
This system provides real-time validation for design tokens in the `token-studio-sync-provider` directory. It runs as a file watcher, validating tokens as they are saved, without blocking Git operations or Figma Tokens Studio sync.

## Directory Structure
```
scripts/token-validation/
├── README.md           # This file
├── watcher.js         # Main file watcher script
├── config.js          # Configuration for validation
└── rules/             # Validation rules
    ├── structure.js   # Token structure rules
    ├── reference.js   # Reference validation rules
    └── enforcement.js # Enforcement rules
```

## How It Works
1. The watcher monitors the `token-studio-sync-provider` directory for changes to JSON files
2. When a file changes, it triggers the validation process
3. Validation results are displayed in real-time in the terminal
4. The system does NOT block Git operations or Figma Tokens Studio sync

## Usage

### Starting the Watcher
```bash
npm run watch:tokens
```

### Stopping the Watcher
Press `Ctrl+C` in the terminal where the watcher is running

### Validation Rules
The system enforces:
- Token structure compliance
- Reference format validation
- Design tool compatibility (Figma, Tokens Studio)
- Unit normalization
- Type validation

## Workflow Integration
1. **Development Flow**:
   - Start the watcher in a separate terminal
   - Make changes to token files
   - See validation results in real-time
   - Fix any issues before committing

2. **Figma Tokens Studio Integration**:
   - The watcher runs independently of the Figma plugin
   - Token syncs from Figma will be validated but not blocked
   - Validation results help maintain token quality

3. **Git Workflow**:
   - No pre-commit hooks blocking operations
   - Clean Git history
   - Manual validation through the watcher

## Configuration
Edit `config.js` to modify:
- Watched directories
- File patterns
- Validation rules
- Output format

## Troubleshooting
1. If validation errors appear:
   - Check the token structure
   - Verify reference formats
   - Ensure design tool compatibility

2. If the watcher isn't responding:
   - Restart the watcher
   - Check file permissions
   - Verify directory structure

## Best Practices
1. Keep the watcher running during token development
2. Address validation issues before committing
3. Use the watcher as a development tool, not a blocker
4. Regular validation helps maintain token quality 