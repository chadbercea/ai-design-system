import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransform({
  name: 'fontSize/number',
  type: 'value',
  matcher: (prop) => prop.attributes.category === 'fontSizes' || prop.path.includes('fontSize'),
  transformer: (prop) => {
    if (typeof prop.value === 'string' && prop.value.endsWith('px')) {
      return parseFloat(prop.value);
    }
    return prop.value;
  }
}); 