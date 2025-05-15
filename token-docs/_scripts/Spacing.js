const fs = require('fs');
const path = require('path');

// Canonical spacing primitives from Figma table
const spacings = {
  spacings: {
    1: { $type: 'spacing', value: 8 },
    2: { $type: 'spacing', value: 16 },
    3: { $type: 'spacing', value: 24 },
    4: { $type: 'spacing', value: 32 },
    5: { $type: 'spacing', value: 40 },
    6: { $type: 'spacing', value: 48 },
    7: { $type: 'spacing', value: 56 },
    8: { $type: 'spacing', value: 64 },
    9: { $type: 'spacing', value: 72 },
    10: { $type: 'spacing', value: 80 },
    11: { $type: 'spacing', value: 88 },
    12: { $type: 'spacing', value: 96 }
  }
};

const outputDir = path.resolve(__dirname, '../_json');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const outputPath = path.join(outputDir, 'spacings.generated.json');
fs.writeFileSync(outputPath, JSON.stringify(spacings, null, 2));

console.log(`Canonical spacing primitives exported to ${outputPath}`); 