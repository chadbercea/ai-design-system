// Validation utility for DDS <-> MUI theme mapping
// Reads mapping table from Dev Notes:, checks build/tokens.mjs for each mapped key

const fs = require('fs');
const path = require('path');

// --- 1. Read Dev Notes mapping table ---
const devNotesPath = path.join(__dirname, 'Dev Notes:');
const devNotes = fs.readFileSync(devNotesPath, 'utf8');

// Extract mapping table from markdown
const mappingTableRegex = /\| MUI Theme Key\s*\|[^\n]+\n((?:\|[^\n]+\n)+)/m;
const match = devNotes.match(mappingTableRegex);
if (!match) {
  console.error('Mapping table not found in Dev Notes:');
  process.exit(1);
}
const tableRows = match[1].trim().split('\n');
const mappings = tableRows.map(row => {
  const cols = row.split('|').map(s => s.trim());
  return {
    muiKey: cols[1],
    ddsToken: cols[2],
    notes: cols[3]
  };
});

// --- 2. Load built tokens ---
const tokensPath = path.join(__dirname, 'build', 'tokens.mjs');
let tokens;
try {
  // Use dynamic import for .mjs
  tokens = require(tokensPath);
  if (tokens.default) tokens = tokens.default;
} catch (e) {
  console.error('Failed to load build/tokens.mjs:', e);
  process.exit(1);
}

// --- 3. Validate mappings ---
let missing = [];
console.log('DDS <-> MUI Theme Mapping Validation Report\n');
mappings.forEach(({ muiKey, ddsToken }) => {
  if (!tokens.hasOwnProperty(ddsToken.replace(/"/g, ''))) {
    missing.push({ muiKey, ddsToken });
    console.log(`❌ MISSING: ${muiKey} → ${ddsToken}`);
  } else {
    console.log(`✅ FOUND:   ${muiKey} → ${ddsToken}`);
  }
});

if (missing.length === 0) {
  console.log('\nAll mappings are present!');
  process.exit(0);
} else {
  console.log(`\n${missing.length} mappings missing.`);
  process.exit(1);
} 