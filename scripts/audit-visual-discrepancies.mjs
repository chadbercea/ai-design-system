#!/usr/bin/env node

// Systematic audit of visual discrepancies when DDS tokens active
// Tests: Token defined → SD transforms → Component uses → Framework supports

import { readFileSync } from 'fs';
import { theme as muiTheme } from '../build/mui/theme.js';
import { theme as tailwindTheme } from '../build/tailwind/theme.js';

console.log('='.repeat(80));
console.log('VISUAL DISCREPANCY AUDIT - DDS Token Alignment');
console.log('='.repeat(80));

// Load source tokens
const sourceTokens = JSON.parse(readFileSync('token-studio-sync-provider/DDS Foundations.json', 'utf-8'));
const shadcnCSS = readFileSync('build/shadcn/variables.css', 'utf-8');
const muiShowcase = readFileSync('src/demo-components/MUIShowcase.tsx', 'utf-8');
const tailwindShowcase = readFileSync('src/demo-components/TailwindShowcase.tsx', 'utf-8');
const shadcnShowcase = readFileSync('src/demo-components/ShadcnShowcase.tsx', 'utf-8');

const issues = [];
const limitations = [];

// Helper to check if token exists in source
function hasToken(path) {
  const parts = path.split('.');
  let obj = sourceTokens;
  for (const part of parts) {
    if (!obj[part]) return null;
    obj = obj[part];
  }
  return obj.$value || null;
}

console.log('\n1. OUTLINED BUTTON BORDER WIDTH');
console.log('-'.repeat(80));

// Check source
const borderWidthSm = hasToken('sm');
const borderWidthMd = hasToken('md');
console.log('Source tokens:');
console.log(`  sm: ${borderWidthSm || 'NOT DEFINED'}`);
console.log(`  md: ${borderWidthMd || 'NOT DEFINED'}`);

// Check SD outputs
console.log('\nSD outputs:');
console.log(`  MUI: No direct borderWidth in palette (uses CSS)`);
console.log(`  Tailwind borderWidth.sm: ${tailwindTheme.borderWidth?.sm || 'NOT DEFINED'}`);
const borderWidthMatch = shadcnCSS.match(/--border-width-sm:\s*([^;]+);/);
console.log(`  shadcn --border-width-sm: ${borderWidthMatch ? borderWidthMatch[1].trim() : 'NOT DEFINED'}`);

// Check component usage
console.log('\nComponent usage:');
const muiUsesBorder = muiShowcase.includes('borderWidth') || muiShowcase.includes('border:');
const tailwindUsesBorder = tailwindShowcase.includes('border-') && !tailwindShowcase.includes('border-blue');
const shadcnUsesBorder = shadcnShowcase.includes('variant="outline"');
console.log(`  MUI: ${muiUsesBorder ? 'Uses border styling' : 'No explicit borderWidth'}`);
console.log(`  Tailwind: ${tailwindUsesBorder ? 'Uses border classes' : 'Hardcoded border-2'}`);
console.log(`  shadcn: ${shadcnUsesBorder ? 'Uses variant="outline"' : 'No outlined button'}`);

// Analysis
if (!borderWidthSm) {
  issues.push('Border width tokens missing from source');
} else if (!tailwindTheme.borderWidth?.sm) {
  issues.push('Tailwind SD formatter not outputting borderWidth tokens');
} else if (tailwindShowcase.includes('border-2')) {
  issues.push('Tailwind component hardcodes border-2 instead of using token');
}

console.log('\n2. PRIMARY BUTTON COLORS');
console.log('-'.repeat(80));

const blue500 = hasToken('Blue.500');
console.log('Source token:');
console.log(`  Blue.500: ${blue500 || 'NOT DEFINED'}`);

console.log('\nSD outputs:');
console.log(`  MUI primary.main: ${muiTheme.palette.primary.main}`);
console.log(`  Tailwind colors.blue.500: ${tailwindTheme.colors.blue['500']}`);
console.log(`  Tailwind colors.primary: ${tailwindTheme.colors.primary}`);
const primaryMatch = shadcnCSS.match(/--primary:\s*([^;]+);/);
console.log(`  shadcn --primary: ${primaryMatch ? primaryMatch[1].trim() : 'NOT DEFINED'}`);

console.log('\nComponent usage:');
const muiUsesColor = muiShowcase.includes('color="primary"');
const tailwindUsesColor = tailwindShowcase.includes('bg-blue-500');
const shadcnUsesColor = shadcnShowcase.includes('variant="default"');
console.log(`  MUI: ${muiUsesColor ? 'Uses color="primary"' : 'Hardcoded color'}`);
console.log(`  Tailwind: ${tailwindUsesColor ? 'Uses bg-blue-500' : 'Different color class'}`);
console.log(`  shadcn: ${shadcnUsesColor ? 'Uses variant="default"' : 'Different variant'}`);

// Check if all resolve to same hex
const allSameBlue = (
  muiTheme.palette.primary.main === blue500 &&
  tailwindTheme.colors.blue['500'] === blue500 &&
  tailwindTheme.colors.primary === blue500
);
console.log(`\nColor alignment: ${allSameBlue ? '✅ All use same blue' : '❌ Colors differ'}`);

console.log('\n3. CARD BORDER RADIUS');
console.log('-'.repeat(80));

const borderRadiusRounded = hasToken('rounded');
console.log('Source token:');
console.log(`  rounded: ${borderRadiusRounded || 'NOT DEFINED'}`);

console.log('\nSD outputs:');
console.log(`  MUI shape.borderRadius: ${muiTheme.shape.borderRadius} (type: ${typeof muiTheme.shape.borderRadius})`);
console.log(`  Tailwind borderRadius.DEFAULT: ${tailwindTheme.borderRadius.DEFAULT}`);
console.log(`  Tailwind borderRadius.rounded: ${tailwindTheme.borderRadius.rounded}`);
const radiusMatch = shadcnCSS.match(/--radius-rounded:\s*([^;]+);/);
console.log(`  shadcn --radius-rounded: ${radiusMatch ? radiusMatch[1].trim() : 'NOT DEFINED'}`);

// Check if values match (8px = 8 for MUI)
const muiPx = muiTheme.shape.borderRadius;
const tailwindPx = parseInt(tailwindTheme.borderRadius.rounded);
const shadcnPx = parseInt(radiusMatch ? radiusMatch[1] : '0');
const allSameRadius = (muiPx === tailwindPx && tailwindPx === shadcnPx);
console.log(`\nRadius alignment: ${allSameRadius ? '✅ All use 8px' : `❌ Differ: MUI=${muiPx}px, Tailwind=${tailwindPx}px, shadcn=${shadcnPx}px`}`);

console.log('\n4. CARD BOX SHADOWS');
console.log('-'.repeat(80));

const elevation1 = hasToken('elevation-1');
console.log('Source token:');
console.log(`  elevation-1: ${elevation1 ? 'DEFINED (boxShadow object)' : 'NOT DEFINED'}`);

console.log('\nSD outputs:');
console.log(`  MUI shadows[1]: ${muiTheme.shadows[1]}`);
console.log(`  MUI shadows[2]: ${muiTheme.shadows[2]}`);
console.log(`  Tailwind boxShadow.sm: ${tailwindTheme.boxShadow.sm}`);
const shadowMatch = shadcnCSS.match(/--elevation-1:\s*([^;]+);/);
console.log(`  shadcn --elevation-1: ${shadowMatch ? shadowMatch[1].trim() : 'NOT DEFINED'}`);

// Check if all have px units
const allHavePx = (
  muiTheme.shadows[1].includes('px') &&
  tailwindTheme.boxShadow.sm.includes('px') &&
  (shadowMatch ? shadowMatch[1].includes('px') : false)
);
console.log(`\nShadow format: ${allHavePx ? '✅ All have px units' : '❌ Some missing px units'}`);

// Check if values match
const allSameShadow = (
  muiTheme.shadows[2] === tailwindTheme.boxShadow.DEFAULT
);
console.log(`Shadow alignment: ${allSameShadow ? '✅ Values match' : '❌ Values differ'}`);

console.log('\n5. FONT FAMILY');
console.log('-'.repeat(80));

const fontProduct = hasToken('product');
console.log('Source token:');
console.log(`  product: ${fontProduct || 'NOT DEFINED'}`);

console.log('\nSD outputs:');
console.log(`  MUI fontFamily: ${muiTheme.typography.fontFamily}`);
const twFonts = Object.keys(tailwindTheme.fontFamily || {});
console.log(`  Tailwind fontFamily keys: ${twFonts.join(', ')}`);
console.log(`  Tailwind fontFamily.product: ${tailwindTheme.fontFamily?.product ? tailwindTheme.fontFamily.product[0] : 'NOT DEFINED'}`);
const fontMatch = shadcnCSS.match(/--font-product:\s*([^;]+);/);
console.log(`  shadcn --font-product: ${fontMatch ? fontMatch[1].trim() : 'NOT DEFINED'}`);

// Check if all use Inter
const allUseInter = (
  muiTheme.typography.fontFamily.includes('Inter') &&
  (tailwindTheme.fontFamily?.product ? tailwindTheme.fontFamily.product[0] === 'Inter' : false)
);
console.log(`\nFont alignment: ${allUseInter ? '✅ All use Inter' : '❌ Fonts differ'}`);

console.log('\n' + '='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));

if (issues.length === 0 && limitations.length === 0) {
  console.log('✅ NO PIPELINE ISSUES FOUND');
  console.log('\nAll discrepancies (if any) are component implementation or framework behavior.');
} else {
  if (issues.length > 0) {
    console.log(`❌ ${issues.length} PIPELINE ISSUES:`);
    issues.forEach((issue, i) => console.log(`${i + 1}. ${issue}`));
  }
  if (limitations.length > 0) {
    console.log(`\n⚠️  ${limitations.length} FRAMEWORK LIMITATIONS:`);
    limitations.forEach((limit, i) => console.log(`${i + 1}. ${limit}`));
  }
}

console.log('\n' + '='.repeat(80));

