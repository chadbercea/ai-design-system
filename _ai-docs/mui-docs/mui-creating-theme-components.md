# MUI Themed Components Reference

## Core Concepts

### Component Slots
- Use `styled` API with `name` and `slot` parameters
- Recommended slot names:
  - `root`: Outermost container element
  - Custom slots for component parts

### Basic Component Structure
```typescript
// 1. Define component slots
const ComponentRoot = styled('div', {
  name: 'MuiComponent',
  slot: 'root',
})(({ theme }) => ({
  // styles
}));

// 2. Create component
const Component = React.forwardRef(function Component(props, ref) {
  const { value, ...other } = props;
  return (
    <ComponentRoot ref={ref} {...other}>
      {/* component content */}
    </ComponentRoot>
  );
});
```

### Theme Integration
```typescript
// Theme configuration
const theme = createTheme({
  components: {
    MuiComponent: {
      styleOverrides: {
        root: {
          // styles
        },
        // other slots
      },
    },
  },
});
```

### TypeScript Support
```typescript
// Props interface
interface ComponentProps {
  value: string | number;
  // other props
}

// OwnerState interface
interface ComponentOwnerState extends ComponentProps {
  // internal state
}

// Theme type augmentation
declare module '@mui/material/styles' {
  interface ComponentNameToClassKey {
    MuiComponent: 'root' | 'otherSlots';
  }
  interface ComponentsPropsList {
    MuiComponent: Partial<ComponentProps>;
  }
}
```

### Best Practices
1. Use `useThemeProps` for default props
2. Pass `ownerState` to slots for prop-based styling
3. Keep slot names consistent with MUI conventions
4. Use TypeScript for type safety
5. Extend theme types for custom components

### Common Patterns
1. Component slots for customization
2. Theme integration via styleOverrides
3. Prop-based styling with ownerState
4. Default props configuration
5. TypeScript type definitions