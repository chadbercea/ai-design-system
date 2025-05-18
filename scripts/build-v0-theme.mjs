import * as tokens from '../build/tokens.js';
import { mapTokensToV0Theme } from '../adapters/mapTokensToV0Theme.js';
import fs from 'fs';

const v0Theme = mapTokensToV0Theme(tokens);
const output = 'export default ' + JSON.stringify(v0Theme, null, 2) + ';\n';

fs.mkdirSync('./build/v0', { recursive: true });
fs.writeFileSync('./build/v0/theme.js', output);

console.log('v0 theme generated at build/v0/theme.js'); 