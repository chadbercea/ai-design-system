import fs from 'fs';
import { normalize } from '@tokens-studio/sd-transforms';

const inputPath = 'token-studio-sync-provider/DDS Foundations.json';
const outputPath = 'token-studio-sync-provider/DDS Foundations.normalized.json';

const raw = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
const normalized = normalize(raw);
fs.writeFileSync(outputPath, JSON.stringify(normalized, null, 2));

console.log(`Normalized tokens written to ${outputPath}`); 