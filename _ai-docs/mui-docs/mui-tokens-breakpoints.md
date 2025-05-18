# MUI Breakpoints Tokens Reference

## Core Concepts

### Default Breakpoints
- xs: 0px
- sm: 600px
- md: 900px
- lg: 1200px
- xl: 1536px

### Token Structure
```typescript
interface Breakpoints {
  keys: string[];
  values: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  up: (key: string | number) => string;
  down: (key: string | number) => string;
  between: (start: string | number, end: string | number) => string;
  only: (key: string) => string;
  not: (key: string) => string;
}
```

### Usage
```typescript
// Theme configuration
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Component usage
const styles = {
  [theme.breakpoints.up('sm')]: {
    // styles for sm and up
  },
  [theme.breakpoints.down('md')]: {
    // styles for md and down
  },
  [theme.breakpoints.between('sm', 'md')]: {
    // styles between sm and md
  },
  [theme.breakpoints.only('lg')]: {
    // styles only for lg
  },
};
```

### Best Practices
1. Use breakpoint tokens instead of hardcoded values
2. Follow mobile-first approach
3. Consider content-based breakpoints
4. Use consistent breakpoint values
5. Test across all breakpoints