#!/usr/bin/env node

// Diagnose why toggle barely changes visuals - find what tokens are missing

import { readFileSync } from 'fs';
import { theme as muiTheme } from '../build/mui/theme.js';
import { theme as tailwindTheme } from '../build/tailwind/theme.js';

console.log('='.repeat(70));
console.log('TOGGLE GAP DIAGNOSIS - Why DDS tokens barely change visuals');
console.log('='.repeat(70));

// Read source tokens
const sourceTokens = JSON.parse(readFileSync('token-studio-sync-provider/DDS Foundations.json', 'utf-8'));

console.log('\n1. SOURCE TOKENS INVENTORY');
console.log('-'.repeat(70));

// Count tokens by type
const tokenTypes = {};
const tokenPaths = [];

function walkTokens(obj, path = []) {
  for (const [key, value] of Object.entries(obj)) {
    if (value && typeof value === 'object' && '$type' in value) {
      const type = value.$type;
      tokenTypes[type] = (tokenTypes[type] || 0) + 1;
      tokenPaths.push({ path: [...path, key].join('.'), type, value: value.$value });
    } else if (value && typeof value === 'object') {
      walkTokens(value, [...path, key]);
    }
  }
}

walkTokens(sourceTokens);

console.log('Token types in source:');
Object.entries(tokenTypes).forEach(([type, count]) => {
  console.log(`  ${type}: ${count} tokens`);
});

// Read build outputs
const shadcnCSS = readFileSync('build/shadcn/variables.css', 'utf-8');

console.log('\n2. CARD BACKGROUND COLORS');
console.log('-'.repeat(70));

// Check if background color tokens exist
const bgTokens = tokenPaths.filter(t => t.path.toLowerCase().includes('background') || t.path.toLowerCase().includes('surface'));
console.log(`Source has ${bgTokens.length} background/surface tokens:`);
bgTokens.forEach(t => console.log(`  ${t.path}: ${t.value}`));

// Check MUI paper background
console.log('\nMUI palette.background:');
console.log(`  paper: ${muiTheme.palette?.background?.paper || 'NOT DEFINED'}`);
console.log(`  default: ${muiTheme.palette?.background?.default || 'NOT DEFINED'}`);

// Check shadcn background
const shadcnBgMatch = shadcnCSS.match(/--background:\s*([^;]+);/);
const shadcnCardMatch = shadcnCSS.match(/--card:\s*([^;]+);/);
console.log('\nshadcn CSS variables:');
console.log(`  --background: ${shadcnBgMatch ? shadcnBgMatch[1].trim() : 'NOT DEFINED'}`);
console.log(`  --card: ${shadcnCardMatch ? shadcnCardMatch[1].trim() : 'NOT DEFINED'}`);

// Check Tailwind background
console.log('\nTailwind colors:');
console.log(`  Has 'background' key: ${!!tailwindTheme.colors?.background}`);
console.log(`  Has 'surface' key: ${!!tailwindTheme.colors?.surface}`);
console.log(`  Has 'card' key: ${!!tailwindTheme.colors?.card}`);

console.log('\n3. FONT FAMILIES');
console.log('-'.repeat(70));

const fontTokens = tokenPaths.filter(t => t.type === 'fontFamilies');
console.log(`Source has ${fontTokens.length} font family tokens:`);
fontTokens.forEach(t => console.log(`  ${t.path}: ${t.value}`));

console.log('\nMUI typography.fontFamily:');
console.log(`  ${muiTheme.typography?.fontFamily || 'NOT DEFINED'}`);

console.log('\nTailwind fontFamily:');
const twFonts = tailwindTheme.fontFamily || {};
Object.entries(twFonts).forEach(([key, value]) => {
  console.log(`  ${key}: ${Array.isArray(value) ? value[0] : value}`);
});

console.log('\nshadcn font families:');
const shadcnFonts = [];
const fontMatches = shadcnCSS.matchAll(/--font-([^:]+):\s*([^;]+);/g);
for (const match of fontMatches) {
  shadcnFonts.push(`${match[1]}: ${match[2].trim()}`);
}
if (shadcnFonts.length === 0) {
  console.log('  NO FONT FAMILY VARIABLES DEFINED');
} else {
  shadcnFonts.forEach(f => console.log(`  ${f}`));
}

console.log('\n4. OUTLINED BUTTON BORDER TOKENS');
console.log('-'.repeat(70));

const borderWidthTokens = tokenPaths.filter(t => t.type === 'borderWidth');
console.log(`Source has ${borderWidthTokens.length} border width tokens:`);
borderWidthTokens.forEach(t => console.log(`  ${t.path}: ${t.value}`));

console.log('\nMUI - no direct borderWidth in palette (uses CSS)');
console.log(`\nTailwind borderWidth:`);
const twBorders = tailwindTheme.borderWidth || {};
console.log(`  Keys: ${Object.keys(twBorders).join(', ') || 'NONE'}`);

console.log('\nshadcn border width:');
const borderWidthMatches = shadcnCSS.matchAll(/--border-width-([^:]+):\s*([^;]+);/g);
let found = false;
for (const match of borderWidthMatches) {
  console.log(`  --border-width-${match[1]}: ${match[2].trim()}`);
  found = true;
}
if (!found) console.log('  NO BORDER WIDTH VARIABLES');

console.log('\n5. DIAGNOSIS SUMMARY');
console.log('-'.repeat(70));

const issues = [];

// Check for missing card backgrounds
if (!muiTheme.palette?.background?.paper) {
  issues.push('MUI palette.background.paper not defined - Card uses default grey');
}
if (!shadcnCardMatch) {
  issues.push('shadcn --card variable not defined - Card uses default');
}

// Check font consistency
if (!muiTheme.typography?.fontFamily?.includes('Inter')) {
  issues.push('MUI not using consistent font family');
}

// Check border widths
if (Object.keys(twBorders).length === 0) {
  issues.push('Tailwind borderWidth not populated from tokens');
}

if (issues.length === 0) {
  console.log('✅ No obvious gaps found');
  console.log('\nIssue is likely in COMPONENT IMPLEMENTATION:');
  console.log('- Components not using theme values');
  console.log('- Hardcoded styles overriding tokens');
} else {
  console.log(`❌ ${issues.length} GAPS FOUND IN TOKEN PIPELINE:`);
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. ${issue}`);
  });
}

console.log('\n' + '='.repeat(70));

