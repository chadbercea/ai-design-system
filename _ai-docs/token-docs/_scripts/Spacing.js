const fs = require('fs');
const path = require('path');

// Canonical spacing primitives from Figma table
const spacings = {
  spacings: {
    0: { $type: 'spacing', $value: '0px', $description: '0px spacing' },
    1: { $type: 'spacing', $value: '8px', $description: '8px spacing' },
    2: { $type: 'spacing', $value: '16px', $description: '16px spacing' },
    3: { $type: 'spacing', $value: '24px', $description: '24px spacing' },
    4: { $type: 'spacing', $value: '32px', $description: '32px spacing' },
    5: { $type: 'spacing', $value: '40px', $description: '40px spacing' },
    6: { $type: 'spacing', $value: '48px', $description: '48px spacing' },
    7: { $type: 'spacing', $value: '56px', $description: '56px spacing' },
    8: { $type: 'spacing', $value: '64px', $description: '64px spacing' },
    9: { $type: 'spacing', $value: '72px', $description: '72px spacing' },
    10: { $type: 'spacing', $value: '80px', $description: '80px spacing' },
    11: { $type: 'spacing', $value: '88px', $description: '88px spacing' },
    12: { $type: 'spacing', $value: '96px', $description: '96px spacing' }
  }
};

const outputDir = path.resolve(__dirname, '../_json');
const outputFile = path.join(outputDir, 'spacings.generated.json');

fs.writeFileSync(outputFile, JSON.stringify(spacings, null, 2));
console.log('spacings.generated.json updated with $value as string with px units.'); 