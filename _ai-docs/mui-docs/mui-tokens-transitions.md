# MUI Transitions Tokens Reference

## Core Concepts

### Transition Types
- easing
- duration
- create

### Token Structure
```typescript
interface Transitions {
  easing: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  };
  duration: {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
  };
  create: (
    props: string | string[],
    options?: {
      duration?: number;
      easing?: string;
      delay?: number;
    }
  ) => string;
}
```

### Usage
```typescript
// Theme configuration
const theme = createTheme({
  transitions: {
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});

// Component usage
const styles = {
  transition: theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
    easing: theme.transitions.easing.easeInOut,
  }),
};
```

### Best Practices
1. Use transition tokens for consistent animations
2. Consider performance implications
3. Use appropriate easing functions
4. Test transition timing
5. Document transition behaviors