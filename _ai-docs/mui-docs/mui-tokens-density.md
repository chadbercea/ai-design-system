# MUI Density Tokens Reference

## Core Concepts

### Density Variants
- compact
- standard (default)
- comfortable

### Token Structure
```typescript
interface Density {
  compact: {
    spacing: number;
    borderRadius: number;
    // other density-specific values
  };
  standard: {
    spacing: number;
    borderRadius: number;
    // other density-specific values
  };
  comfortable: {
    spacing: number;
    borderRadius: number;
    // other density-specific values
  };
}
```

### Usage
```typescript
// Theme configuration
const theme = createTheme({
  density: {
    compact: {
      spacing: 4,
      borderRadius: 2,
    },
    standard: {
      spacing: 8,
      borderRadius: 4,
    },
    comfortable: {
      spacing: 12,
      borderRadius: 6,
    },
  },
});

// Component usage
const styles = {
  padding: theme.density[theme.densityMode].spacing,
  borderRadius: theme.density[theme.densityMode].borderRadius,
};
```

### Best Practices
1. Use density tokens for consistent spacing
2. Consider user preferences
3. Maintain accessibility at all densities
4. Test different density modes
5. Document density-specific behaviors