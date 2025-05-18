export default {
  name: 'json/mui-theme',
  format: (dictionary, config) => {
    const tokens = dictionary.allProperties.reduce((acc, prop) => {
      const path = prop.path.join('.');
      const value = prop.value;
      
      // Create nested object structure
      let current = acc;
      const parts = path.split('.');
      
      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        if (!current[part]) {
          current[part] = {};
        }
        current = current[part];
      }
      
      current[parts[parts.length - 1]] = value;
      return acc;
    }, {});

    // Apply transforms to create MUI theme structure
    const theme = {
      palette: config.transform.palette(tokens),
      typography: config.transform.typography(tokens),
      spacing: config.transform.spacing(tokens),
      breakpoints: config.transform.breakpoints(tokens),
      shape: config.transform.shape(tokens),
      transitions: config.transform.transitions(tokens),
      zIndex: config.transform.zIndex(tokens),
    };

    return JSON.stringify(theme, null, 2);
  }
}; 