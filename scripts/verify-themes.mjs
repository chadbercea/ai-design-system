import { readFileSync } from 'fs';

console.log('🔍 Verifying theme completeness...\n');

// Read MUI theme
const muiTheme = readFileSync('build/mui/theme.js', 'utf8');

// Check MUI requirements
const muiChecks = {
  'fontFamily with Inter': muiTheme.includes('Inter'),
  'shadows array': muiTheme.includes('"shadows"'),
  'borderRadius from tokens': muiTheme.includes('"borderRadius": 8'),
  'letterSpacing': muiTheme.includes('"letterSpacing"'),
  'spacing from tokens': muiTheme.includes('"spacing": 4')
};

// Read Tailwind theme  
const twTheme = readFileSync('build/tailwind/theme.js', 'utf8');

// Check Tailwind requirements
const twChecks = {
  'fontFamily object': twTheme.includes('"fontFamily"'),
  'fontFamily.sans with Inter': twTheme.includes('"Inter"'),
  'fontFamily.display with Poppins': twTheme.includes('"Poppins"'),
  'boxShadow from elevations': twTheme.includes('"boxShadow"'),
  'borderRadius': twTheme.includes('"borderRadius"'),
  'borderWidth': twTheme.includes('"borderWidth"'),
  'opacity tokens': twTheme.includes('"opacity"'),
  'lineHeight': twTheme.includes('"lineHeight"'),
  'letterSpacing': twTheme.includes('"letterSpacing"')
};

// Report results
console.log('MUI Theme:');
Object.entries(muiChecks).forEach(([check, pass]) => {
  console.log(`  ${pass ? '✅' : '❌'} ${check}`);
});

console.log('\nTailwind Theme:');
Object.entries(twChecks).forEach(([check, pass]) => {
  console.log(`  ${pass ? '✅' : '❌'} ${check}`);
});

const allPassed = Object.values({...muiChecks, ...twChecks}).every(Boolean);
console.log(`\n${allPassed ? '✅ All checks passed!' : '❌ Some checks failed'}`);
process.exit(allPassed ? 0 : 1);

