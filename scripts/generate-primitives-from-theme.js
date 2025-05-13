const fs = require('fs');
const path = require('path');

const themePath = path.join(__dirname, '../token-studio-sync-provider/theme.json');
const outputPath = path.join(__dirname, '../token-studio-sync-provider/core.w3c.json');

const theme = JSON.parse(fs.readFileSync(themePath, 'utf8'));

// Recursively find all {token.references} in an object
function findReferences(obj, refs = []) {
  if (typeof obj === 'string') {
    const matches = obj.match(/\{([^}]+)\}/g);
    if (matches) {
      matches.forEach(m => refs.push(m.slice(1, -1)));
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(item => findReferences(item, refs));
  } else if (typeof obj === 'object' && obj !== null) {
    Object.values(obj).forEach(v => findReferences(v, refs));
  }
  return refs;
}

function setNested(obj, pathArr, value) {
  let curr = obj;
  for (let i = 0; i < pathArr.length; i++) {
    const part = pathArr[i];
    if (i === pathArr.length - 1) {
      curr[part] = value;
    } else {
      if (!curr[part]) curr[part] = {};
      curr = curr[part];
    }
  }
}

const allRefs = findReferences(theme);
const uniqueRefs = Array.from(new Set(allRefs));
const primitives = {};

uniqueRefs.forEach(ref => {
  const pathArr = ref.split('.');
  setNested(primitives, pathArr, {
    "$type": "color",
    "$value": "#000000",
    "$description": `Placeholder for {${ref}}`
  });
});

fs.writeFileSync(outputPath, JSON.stringify(primitives, null, 2));
console.log(`Generated ${uniqueRefs.length} tokens in core.w3c.json`); 