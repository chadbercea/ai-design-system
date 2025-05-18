# MUI Z-Index Tokens Reference

## Core Concepts

### Default Z-Index Values
- mobileStepper: 1000
- speedDial: 1050
- appBar: 1100
- drawer: 1200
- modal: 1300
- snackbar: 1400
- tooltip: 1500

### Token Structure
```typescript
interface ZIndex {
  mobileStepper: number;
  speedDial: number;
  appBar: number;
  drawer: number;
  modal: number;
  snackbar: number;
  tooltip: number;
}
```

### Usage
```typescript
// Theme configuration
const theme = createTheme({
  zIndex: {
    mobileStepper: 1000,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
});

// Component usage
const styles = {
  zIndex: theme.zIndex.modal,
};
```

### Best Practices
1. Use z-index tokens instead of hardcoded values
2. Maintain consistent layering
3. Consider component stacking context
4. Document z-index dependencies
5. Test overlapping components