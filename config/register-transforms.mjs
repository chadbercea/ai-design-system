import StyleDictionary from 'style-dictionary';

StyleDictionary.registerTransform({
  name: 'name/cti/prefix-numeric',
  type: 'name',
  transformer: function(token) {
    const { category, type, item } = token.path;
    const parts = [category, type, item].filter(Boolean).map(function(part) {
      return /^\d/.test(part) ? `${token.type}-${part}` : part;
    });
    return parts.join('-').toLowerCase();
  }
}); 