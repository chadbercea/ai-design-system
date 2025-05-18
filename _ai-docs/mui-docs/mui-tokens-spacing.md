# MUI Spacing Tokens Reference

## Core Concepts

### Spacing System
- Based on 8px unit (default)
- Multiplier-based system
- Consistent spacing scale

### Token Structure
```typescript
interface Spacing {
  (value: number): number;
  unit: number;
}

// Default spacing function
const spacing = (factor: number): number => 8 * factor;
```

### Usage
```typescript
// Theme configuration
const theme = createTheme({
  spacing: 8, // base unit in pixels
});

// Component usage
const styles = {
  padding: theme.spacing(2),    // 16px
  margin: theme.spacing(1, 2),  // 8px 16px
  gap: theme.spacing(3),        // 24px
};
```

### Common Spacing Values
- 0: 0px
- 1: 8px
- 2: 16px
- 3: 24px
- 4: 32px
- 5: 40px
- 6: 48px
- 7: 56px
- 8: 64px
- 9: 72px
- 10: 80px

### Best Practices
1. Use spacing function instead of hardcoded values
2. Maintain consistent spacing scale
3. Use appropriate spacing for different UI elements
4. Consider responsive spacing
5. Follow design system guidelines