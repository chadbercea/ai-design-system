https://styledictionary.com/reference/utils/

https://styledictionary.com/reference/utils/references/

https://styledictionary.com/reference/utils/tokens/

https://styledictionary.com/reference/utils/format-helpers/

# Style Dictionary Utilities Guide

## Format Helpers

### 1. Basic Format Helpers

```javascript
const { formatHelpers } = require('style-dictionary');

// Create a file header
const fileHeader = formatHelpers.fileHeader({
  file: 'variables.scss',
  commentStyle: 'short'
});

// Format a property
const formattedProperty = formatHelpers.createPropertyFormatter({
  outputReferences: true,
  dictionary: dictionary,
  format: 'scss'
});
```

### 2. Custom Format Helpers

```javascript
const { formatHelpers } = require('style-dictionary');

// Custom file header
const customHeader = formatHelpers.fileHeader({
  file: 'custom.scss',
  commentStyle: 'long',
  comment: 'Custom design tokens'
});

// Custom property formatter
const customFormatter = formatHelpers.createPropertyFormatter({
  outputReferences: true,
  dictionary: dictionary,
  format: 'custom',
  formatting: {
    prefix: '$',
    suffix: ';'
  }
});
```

### 3. Format Options

```javascript
const { formatHelpers } = require('style-dictionary');

// Format with options
const formattedOutput = formatHelpers.createPropertyFormatter({
  outputReferences: true,
  dictionary: dictionary,
  format: 'scss',
  options: {
    showFileHeader: true,
    showComments: true,
    showTypes: true
  }
});
```

## Reference Utilities

### 1. Basic References

```javascript
const { references } = require('style-dictionary');

// Check if property has references
const hasRefs = references.hasReference(property);

// Get reference value
const refValue = references.getReference(property, dictionary);
```

### 2. Reference Resolution

```javascript
const { references } = require('style-dictionary');

// Resolve all references
const resolved = references.resolveReferences(dictionary);

// Check reference validity
const isValid = references.validateReferences(dictionary);
```

### 3. Custom Reference Handling

```javascript
const { references } = require('style-dictionary');

// Custom reference resolver
const customResolver = references.createReferenceResolver({
  dictionary: dictionary,
  options: {
    allowCircular: false,
    maxDepth: 5
  }
});
```

## Token Utilities

### 1. Token Manipulation

```javascript
const { tokens } = require('style-dictionary');

// Get all tokens
const allTokens = tokens.getAllTokens(dictionary);

// Get tokens by type
const colorTokens = tokens.getTokensByType(dictionary, 'color');

// Get tokens by category
const typographyTokens = tokens.getTokensByCategory(dictionary, 'typography');
```

### 2. Token Filtering

```javascript
const { tokens } = require('style-dictionary');

// Filter tokens by attribute
const filteredTokens = tokens.filterTokens(dictionary, {
  attributes: {
    category: 'color',
    type: 'base'
  }
});

// Filter tokens by path
const pathTokens = tokens.getTokensByPath(dictionary, 'color.base');
```

### 3. Token Transformation

```javascript
const { tokens } = require('style-dictionary');

// Transform token values
const transformedTokens = tokens.transformTokens(dictionary, {
  transform: (token) => ({
    ...token,
    value: token.value.toUpperCase()
  })
});

// Group tokens by attribute
const groupedTokens = tokens.groupTokensByAttribute(dictionary, 'category');
```

## Common Use Cases

### 1. Custom Format Creation

```javascript
const { formatHelpers } = require('style-dictionary');

module.exports = {
  name: 'custom/format',
  formatter: (dictionary, config) => {
    const header = formatHelpers.fileHeader({
      file: config.file,
      commentStyle: 'long'
    });

    const properties = dictionary.allProperties
      .map(prop => formatHelpers.createPropertyFormatter({
        outputReferences: true,
        dictionary: dictionary,
        format: 'custom'
      })(prop))
      .join('\n');

    return `${header}\n${properties}`;
  }
};
```

### 2. Reference Management

```javascript
const { references } = require('style-dictionary');

module.exports = {
  name: 'custom/references',
  formatter: (dictionary, config) => {
    const resolved = references.resolveReferences(dictionary);
    const valid = references.validateReferences(dictionary);

    if (!valid) {
      throw new Error('Invalid references found');
    }

    return resolved.allProperties
      .map(prop => `${prop.name}: ${prop.value}`)
      .join('\n');
  }
};
```

### 3. Token Processing

```javascript
const { tokens } = require('style-dictionary');

module.exports = {
  name: 'custom/processing',
  formatter: (dictionary, config) => {
    const allTokens = tokens.getAllTokens(dictionary);
    const filteredTokens = tokens.filterTokens(dictionary, {
      attributes: config.filter
    });

    return filteredTokens
      .map(token => tokens.transformTokens(dictionary, {
        transform: config.transform
      }))
      .join('\n');
  }
};
```

## Best Practices

### 1. Format Helpers

- Use appropriate file headers
- Format properties consistently
- Handle references properly
- Document custom formats

### 2. Reference Utilities

- Validate references
- Handle circular references
- Document reference chains
- Test reference resolution

### 3. Token Utilities

- Use appropriate filters
- Transform tokens efficiently
- Group tokens logically
- Document token processing

## Resources

### Documentation
- [Style Dictionary Documentation](https://styledictionary.com)
- [Format Helpers Reference](https://styledictionary.com/reference/utils/format-helpers/)
- [Reference Utilities](https://styledictionary.com/reference/utils/references/)
- [Token Utilities](https://styledictionary.com/reference/utils/tokens/)

### Community
- [GitHub Repository](https://github.com/amzn/style-dictionary)
- [Example Projects](https://styledictionary.com/examples/)
- [Community Examples](https://github.com/amzn/style-dictionary/tree/main/examples/community)