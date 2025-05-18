import * as tokens from '../build/tokens.js';
import { mapTokensToTailwindConfig } from '../adapters/mapTokensToTailwindConfig.js';
import fs from 'fs';

const tailwindTheme = mapTokensToTailwindConfig(tokens);
const output = 'export default ' + JSON.stringify(tailwindTheme, null, 2) + ';\n';

fs.mkdirSync('./build/tailwind', { recursive: true });
fs.writeFileSync('./build/tailwind/theme.js', output);

console.log('Tailwind theme generated at build/tailwind/theme.js'); 