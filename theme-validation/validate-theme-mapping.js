// Main entry: loads mapping, tokens, runs validation, prints report
import { loadTokens } from './token-loader.js';
import { validateMapping } from './validator.js';
import { printReport } from './report.js';
import fs from 'fs';

const mapping = JSON.parse(fs.readFileSync(new URL('./mapping-table.json', import.meta.url), 'utf-8'));

const tokens = await loadTokens();
const result = validateMapping(mapping, tokens);
printReport(result);

if (result.missing.length > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
