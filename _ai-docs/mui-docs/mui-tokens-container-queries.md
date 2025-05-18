# MUI Container Queries Tokens Reference

## Core Concepts

### Container Query Breakpoints
- sm: 600px
- md: 900px
- lg: 1200px
- xl: 1536px

### Token Structure
```typescript
interface ContainerQueries {
  values: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  up: (key: string | number) => string;
  down: (key: string | number) => string;
  between: (start: string | number, end: string | number) => string;
  only: (key: string) => string;
}
```

### Usage
```typescript
// Theme configuration
const theme = createTheme({
  containerQueries: {
    values: {
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Component usage
const styles = {
  '@container (min-width: 600px)': {
    // styles for container width >= 600px
  },
  '@container (max-width: 900px)': {
    // styles for container width <= 900px
  },
};
```

### Best Practices
1. Use container queries for component-level responsiveness
2. Consider component context
3. Use appropriate breakpoint values
4. Test container query behavior
5. Combine with media queries when needed