#!/usr/bin/env node

// Audit script to identify visual discrepancies in toggle ON state
// Goal: All 3 frameworks must be IDENTICAL when DDS tokens active

import { theme as muiThemeConfig } from '../build/mui/theme.js';
import { theme as tailwindTheme } from '../build/tailwind/theme.js';
import { readFileSync } from 'fs';

console.log('='.repeat(70));
console.log('VISUAL IDENTITY AUDIT - Finding Discrepancies');
console.log('='.repeat(70));

const issues = [];

// ============================================================================
// 1. Card Border Radius Comparison
// ============================================================================
console.log('\n1. CARD BORDER RADIUS');
console.log('-'.repeat(70));

const muiBorderRadius = muiThemeConfig.shape.borderRadius; // Should be 8
const tailwindBorderRadius = tailwindTheme.borderRadius.DEFAULT; // Should be "8px"
const shadcnCSS = readFileSync('build/shadcn/variables.css', 'utf-8');
const shadcnRadiusMatch = shadcnCSS.match(/--radius-rounded:\s*([^;]+);/);
const shadcnBorderRadius = shadcnRadiusMatch ? shadcnRadiusMatch[1].trim() : 'NOT FOUND';

console.log(`MUI:      ${muiBorderRadius} (number, MUI interprets as ${muiBorderRadius}px)`);
console.log(`Tailwind: ${tailwindBorderRadius}`);
console.log(`shadcn:   ${shadcnBorderRadius}`);

// Convert to common unit for comparison
const muiPx = muiBorderRadius;
const tailwindPx = parseInt(tailwindBorderRadius);
const shadcnPx = parseInt(shadcnBorderRadius);

if (muiPx === tailwindPx && tailwindPx === shadcnPx) {
  console.log('✅ All use 8px border radius');
} else {
  console.log(`❌ MISMATCH: MUI=${muiPx}px, Tailwind=${tailwindPx}px, shadcn=${shadcnPx}px`);
  issues.push('Border radius values differ across frameworks');
}

// ============================================================================
// 2. Card Shadows Comparison
// ============================================================================
console.log('\n2. CARD BOX SHADOWS');
console.log('-'.repeat(70));

const muiShadow1 = muiThemeConfig.shadows[1];
const tailwindShadowSm = tailwindTheme.boxShadow.sm;
const shadcnShadowMatch = shadcnCSS.match(/--elevation-1:\s*([^;]+);/);
const shadcnShadow = shadcnShadowMatch ? shadcnShadowMatch[1].trim() : 'NOT FOUND';

console.log(`MUI shadows[1]:      ${muiShadow1}`);
console.log(`Tailwind boxShadow.sm: ${tailwindShadowSm}`);
console.log(`shadcn --elevation-1:  ${shadcnShadow}`);

if (muiShadow1 === tailwindShadowSm && tailwindShadowSm === shadcnShadow) {
  console.log('✅ All use identical shadow values');
} else {
  console.log('❌ MISMATCH: Shadow values differ');
  issues.push('Shadow values differ across frameworks');
}

// ============================================================================
// 3. Primary Color Comparison
// ============================================================================
console.log('\n3. PRIMARY COLOR');
console.log('-'.repeat(70));

const muiPrimary = muiThemeConfig.palette.primary.main;
const tailwindPrimary = tailwindTheme.colors.primary;
const shadcnPrimaryMatch = shadcnCSS.match(/--primary:\s*([^;]+);/);
const shadcnPrimary = shadcnPrimaryMatch ? shadcnPrimaryMatch[1].trim() : 'NOT FOUND';

console.log(`MUI primary.main:    ${muiPrimary}`);
console.log(`Tailwind primary:    ${tailwindPrimary}`);
console.log(`shadcn --primary:    ${shadcnPrimary} (HSL format)`);

// Note: shadcn uses HSL, others use hex - this is expected
if (muiPrimary === '#2560ff' && tailwindPrimary === '#2560ff') {
  console.log('✅ MUI and Tailwind use same hex color');
  console.log('ℹ️  shadcn uses HSL (expected difference in format)');
} else {
  console.log('❌ MISMATCH: MUI and Tailwind colors differ');
  issues.push('Primary colors differ between MUI and Tailwind');
}

// ============================================================================
// 4. Font Size Comparison
// ============================================================================
console.log('\n4. BASE FONT SIZE');
console.log('-'.repeat(70));

const muiBaseFontSize = muiThemeConfig.typography.fontSize; // Should be 14
const tailwindBaseFontSize = tailwindTheme.fontSize.base; // Should be "14px"
const shadcnText14Match = shadcnCSS.match(/--text-14:\s*([^;]+);/);
const shadcnText14 = shadcnText14Match ? shadcnText14Match[1].trim() : 'NOT FOUND';

console.log(`MUI typography.fontSize: ${muiBaseFontSize} (interpreted as ${muiBaseFontSize}px)`);
console.log(`Tailwind fontSize.base:  ${tailwindBaseFontSize}`);
console.log(`shadcn --text-14:        ${shadcnText14}`);

const muiFontPx = muiBaseFontSize;
const tailwindFontPx = parseInt(tailwindBaseFontSize);
const shadcnFontPx = parseInt(shadcnText14);

if (muiFontPx === tailwindFontPx && tailwindFontPx === shadcnFontPx) {
  console.log('✅ All use 14px base font size');
} else {
  console.log(`❌ MISMATCH: MUI=${muiFontPx}px, Tailwind=${tailwindFontPx}px, shadcn=${shadcnFontPx}px`);
  issues.push('Base font sizes differ');
}

// ============================================================================
// 5. Component Implementation Check
// ============================================================================
console.log('\n5. COMPONENT IMPLEMENTATION');
console.log('-'.repeat(70));

const muiShowcase = readFileSync('src/demo-components/MUIShowcase.tsx', 'utf-8');

// Check if MUI Card has elevation prop
if (muiShowcase.includes('elevation=')) {
  console.log('✅ MUI Card has elevation prop (shadows will show)');
} else {
  console.log('⚠️  MUI Card missing elevation prop (shadows may not show)');
  issues.push('MUI Card needs explicit elevation prop to show shadows');
}

// Check if MUI Card has explicit borderRadius styling
if (muiShowcase.includes('borderRadius') || muiShowcase.includes('sx={{')) {
  console.log('ℹ️  MUI Card has explicit styling');
} else {
  console.log('ℹ️  MUI Card relies on theme defaults');
}

// Check shadcn Card
const shadcnShowcase = readFileSync('src/demo-components/ShadcnShowcase.tsx', 'utf-8');
if (shadcnShowcase.includes('className=')) {
  console.log('✅ shadcn Card has className');
} else {
  console.log('⚠️  shadcn Card may be missing styling');
}

// Check Tailwind Card
const tailwindShowcase = readFileSync('src/demo-components/TailwindShowcase.tsx', 'utf-8');
if (tailwindShowcase.includes('rounded') || tailwindShowcase.includes('shadow')) {
  console.log('✅ Tailwind Card has utility classes');
} else {
  console.log('⚠️  Tailwind Card missing utility classes');
  issues.push('Tailwind Card needs rounded and shadow classes');
}

// ============================================================================
// Summary
// ============================================================================
console.log('\n' + '='.repeat(70));
if (issues.length === 0) {
  console.log('✅ NO DISCREPANCIES FOUND - Themes are identical');
  console.log('='.repeat(70));
  console.log('\nIf visual differences exist, they are in component implementation,');
  console.log('not in the token pipeline.');
  process.exit(0);
} else {
  console.log(`❌ ${issues.length} DISCREPANCIES FOUND`);
  console.log('='.repeat(70));
  issues.forEach((issue, i) => {
    console.log(`${i + 1}. ${issue}`);
  });
  console.log('\n🎯 NEXT STEPS:');
  console.log('- Fix component implementations to use theme values consistently');
  console.log('- Add explicit props where frameworks need them (MUI elevation, etc.)');
  console.log('- Verify visual identity after fixes');
  process.exit(1);
}

