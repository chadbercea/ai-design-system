import muiThemeFormat from './formats/mui-theme.js';

StyleDictionary.registerFormat(muiThemeFormat);

StyleDictionary.registerFormat({
  name: 'javascript/mui',
  formatter: ({ dictionary, file, options }) => {
    console.log('formatter running');
    console.log('Dictionary:', dictionary);
    console.log('File:', file);
    console.log('Options:', options);
    // do stuff...
    return `export default ${JSON.stringify(dictionary.tokens, null, 2)}`;
  }
}); 