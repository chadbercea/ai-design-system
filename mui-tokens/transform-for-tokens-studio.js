const fs = require('fs');
const path = require('path');

function getMuiValueByPath(muiTokens, pathArr) {
  // Try to find a value in muiTokens.base or muiTokens.other by path
  let current = muiTokens.base;
  for (let i = 0; i < pathArr.length; i++) {
    if (current && typeof current === 'object' && pathArr[i] in current) {
      current = current[pathArr[i]];
    } else {
      current = undefined;
      break;
    }
  }
  if (current !== undefined) return current;
  // Try dot notation in color
  if (muiTokens.base.color) {
    const dotKey = pathArr.join('.');
    if (dotKey in muiTokens.base.color) return muiTokens.base.color[dotKey];
  }
  // Try in other
  current = muiTokens.other;
  for (let i = 0; i < pathArr.length; i++) {
    if (current && typeof current === 'object' && pathArr[i] in current) {
      current = current[pathArr[i]];
    } else {
      current = undefined;
      break;
    }
  }
  return current;
}

function fillTemplateWithMui(template, muiTokens, pathArr = []) {
  if (typeof template !== 'object' || template === null) return template;
  if ('$type' in template && '$value' in template) {
    // Try to fill $value from MUI tokens
    const muiValue = getMuiValueByPath(muiTokens, [...pathArr]);
    let newValue = muiValue !== undefined ? muiValue : template['$value'];
    // If the template value is an object (e.g., border, boxShadow), try to map each property
    if (typeof template['$value'] === 'object' && template['$value'] !== null) {
      newValue = {};
      for (const k in template['$value']) {
        if (typeof template['$value'][k] === 'string') {
          // Try to map each property from MUI
          const propValue = getMuiValueByPath(muiTokens, [...pathArr, k]);
          newValue[k] = propValue !== undefined ? propValue : template['$value'][k];
        } else {
          newValue[k] = template['$value'][k];
        }
      }
    }
    return {
      ...template,
      '$value': newValue
    };
  }
  // Recurse for nested objects
  const out = Array.isArray(template) ? [] : {};
  for (const k in template) {
    out[k] = fillTemplateWithMui(template[k], muiTokens, [...pathArr, k]);
  }
  return out;
}

try {
  const template = JSON.parse(fs.readFileSync(path.join(__dirname, 'tokens-studio-format.json'), 'utf8'));
  const muiTokens = require('./mui-tokens-raw.json');
  const filled = fillTemplateWithMui(template, muiTokens);
  fs.writeFileSync(
    'tokens-studio-mapped-from-mui.json',
    JSON.stringify(filled, null, 2)
  );
  console.log('Successfully mapped MUI tokens to the TS structure. Output: tokens-studio-mapped-from-mui.json');
} catch (error) {
  console.error('Error mapping tokens:', error);
}
