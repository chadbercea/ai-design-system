import fs from 'fs';
import path from 'path';
import StyleDictionary from 'style-dictionary';
import { transform } from '@tokens-studio/sd-transforms';

const inputPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../w3c-tokens.json');
const input = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

const output = await transform(input, { expandTypography: true, expandShadow: true });

const outputPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../../token-studio-sync-provider/core.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log('Transformed tokens written to token-studio-sync-provider/core.json');
