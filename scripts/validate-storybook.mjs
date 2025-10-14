#!/usr/bin/env node

// Validation script to verify Storybook implementation correctness
// Based on docs/context.md, docs/METAPLAN.md, docs/SD-FORMAT-GAPS.md

import { theme as muiThemeConfig } from '../build/mui/theme.js';
import { theme as tailwindTheme } from '../build/tailwind/theme.js';
import { readFileSync } from 'fs';

console.log('='.repeat(60));
console.log('STORYBOOK VALIDATION - Implementation Correctness');
console.log('='.repeat(60));

let allPassed = true;

// ============================================================================
// 1. MUI Theme Validation
// ============================================================================
console.log('\n1. MUI THEME VALIDATION');
console.log('-'.repeat(60));

try {
  // Check fontSize is number
  const h1FontSize = muiThemeConfig.typography.h1.fontSize;
  const h1FontSizeType = typeof h1FontSize;
  if (h1FontSizeType === 'number') {
    console.log(`✅ typography.h1.fontSize is number: ${h1FontSize}`);
  } else {
    console.log(`❌ typography.h1.fontSize is ${h1FontSizeType}: ${h1FontSize} (should be number)`);
    allPassed = false;
  }
  
  // Check borderRadius is number
  const borderRadius = muiThemeConfig.shape.borderRadius;
  const borderRadiusType = typeof borderRadius;
  if (borderRadiusType === 'number') {
    console.log(`✅ shape.borderRadius is number: ${borderRadius}`);
  } else {
    console.log(`❌ shape.borderRadius is ${borderRadiusType}: ${borderRadius} (should be number)`);
    allPassed = false;
  }
  
  // Check shadows have px units
  const shadow1 = muiThemeConfig.shadows[1];
  if (shadow1 && shadow1.includes('px')) {
    console.log(`✅ shadows[1] has px units: ${shadow1}`);
  } else {
    console.log(`❌ shadows[1] missing px units: ${shadow1}`);
    allPassed = false;
  }
  
  // Check hoverOpacity is decimal
  const hoverOpacity = muiThemeConfig.palette.action.hoverOpacity;
  if (hoverOpacity < 1) {
    console.log(`✅ palette.action.hoverOpacity is decimal: ${hoverOpacity}`);
  } else {
    console.log(`❌ palette.action.hoverOpacity not decimal: ${hoverOpacity}`);
    allPassed = false;
  }
  
} catch (e) {
  console.log(`❌ MUI theme validation failed: ${e.message}`);
  allPassed = false;
}

// ============================================================================
// 2. Tailwind Theme Validation
// ============================================================================
console.log('\n2. TAILWIND THEME VALIDATION');
console.log('-'.repeat(60));

try {
  // Check borderRadius.DEFAULT exists
  const borderRadiusDefault = tailwindTheme.borderRadius.DEFAULT;
  if (borderRadiusDefault) {
    console.log(`✅ borderRadius.DEFAULT exists: ${borderRadiusDefault}`);
  } else {
    console.log(`❌ borderRadius.DEFAULT is undefined`);
    allPassed = false;
  }
  
  // Check boxShadow has px units
  const boxShadowSm = tailwindTheme.boxShadow.sm;
  if (boxShadowSm && boxShadowSm.includes('px')) {
    console.log(`✅ boxShadow.sm has px units: ${boxShadowSm}`);
  } else {
    console.log(`❌ boxShadow.sm missing px units: ${boxShadowSm}`);
    allPassed = false;
  }
  
  // Check fontSize has units
  const fontSizeBase = tailwindTheme.fontSize.base;
  if (fontSizeBase && fontSizeBase.includes('px')) {
    console.log(`✅ fontSize.base has px units: ${fontSizeBase}`);
  } else {
    console.log(`❌ fontSize.base missing px units: ${fontSizeBase}`);
    allPassed = false;
  }
  
} catch (e) {
  console.log(`❌ Tailwind theme validation failed: ${e.message}`);
  allPassed = false;
}

// ============================================================================
// 3. shadcn CSS Variables Validation
// ============================================================================
console.log('\n3. SHADCN CSS VARIABLES VALIDATION');
console.log('-'.repeat(60));

try {
  const shadcnCSS = readFileSync('build/shadcn/variables.css', 'utf-8');
  
  // Check elevation variables have px units
  const elevation1Match = shadcnCSS.match(/--elevation-1:\s*([^;]+);/);
  if (elevation1Match) {
    const elevation1Value = elevation1Match[1].trim();
    if (elevation1Value.includes('px')) {
      console.log(`✅ --elevation-1 has px units: ${elevation1Value}`);
    } else {
      console.log(`❌ --elevation-1 missing px units: ${elevation1Value}`);
      allPassed = false;
    }
  } else {
    console.log(`❌ --elevation-1 not found in CSS`);
    allPassed = false;
  }
  
  // Check radius variables have units
  const radiusRoundedMatch = shadcnCSS.match(/--radius-rounded:\s*([^;]+);/);
  if (radiusRoundedMatch) {
    const radiusRoundedValue = radiusRoundedMatch[1].trim();
    if (radiusRoundedValue.includes('px') || radiusRoundedValue.includes('rem')) {
      console.log(`✅ --radius-rounded has units: ${radiusRoundedValue}`);
    } else {
      console.log(`❌ --radius-rounded missing units: ${radiusRoundedValue}`);
      allPassed = false;
    }
  } else {
    console.log(`❌ --radius-rounded not found in CSS`);
    allPassed = false;
  }
  
  // Check text variables have px units
  const text14Match = shadcnCSS.match(/--text-14:\s*([^;]+);/);
  if (text14Match) {
    const text14Value = text14Match[1].trim();
    if (text14Value.includes('px')) {
      console.log(`✅ --text-14 has px units: ${text14Value}`);
    } else {
      console.log(`❌ --text-14 missing px units: ${text14Value}`);
      allPassed = false;
    }
  } else {
    console.log(`❌ --text-14 not found in CSS`);
    allPassed = false;
  }
  
} catch (e) {
  console.log(`❌ shadcn CSS validation failed: ${e.message}`);
  allPassed = false;
}

// ============================================================================
// 4. Implementation Validation
// ============================================================================
console.log('\n4. IMPLEMENTATION VALIDATION');
console.log('-'.repeat(60));

try {
  // Check Home.stories.tsx implementation
  const homeStory = readFileSync('stories/Home.stories.tsx', 'utf-8');
  
  if (homeStory.includes('useDDSTheme={useDDSTheme}')) {
    console.log('✅ Home story passes useDDSTheme prop to all showcases');
  } else {
    console.log('❌ Home story missing useDDSTheme prop');
    allPassed = false;
  }
  
  if (homeStory.includes('useState')) {
    console.log('✅ Home story uses React state for toggle');
  } else {
    console.log('❌ Home story missing state management');
    allPassed = false;
  }
  
  // Check MUIShowcase implementation
  const muiShowcase = readFileSync('src/demo-components/MUIShowcase.tsx', 'utf-8');
  
  if (muiShowcase.includes('useDDSTheme ? muiTheme : muiStockTheme')) {
    console.log('✅ MUIShowcase switches between DDS and stock themes');
  } else {
    console.log('❌ MUIShowcase not switching themes correctly');
    allPassed = false;
  }
  
  if (muiShowcase.includes('<Card>') || muiShowcase.includes('<Card ')) {
    console.log('✅ MUIShowcase includes Card (will show borderRadius/shadows)');
  } else {
    console.log('⚠️  MUIShowcase missing Card component');
  }
  
  // Check ShadcnShowcase implementation
  const shadcnShowcase = readFileSync('src/demo-components/ShadcnShowcase.tsx', 'utf-8');
  
  if (shadcnShowcase.includes("useDDSTheme ? 'dds-theme' : ''")) {
    console.log('✅ ShadcnShowcase applies dds-theme class conditionally');
  } else {
    console.log('❌ ShadcnShowcase not applying dds-theme class');
    allPassed = false;
  }
  
} catch (e) {
  console.log(`❌ Implementation validation failed: ${e.message}`);
  allPassed = false;
}

// ============================================================================
// Final Result
// ============================================================================
console.log('\n' + '='.repeat(60));
if (allPassed) {
  console.log('✅ ALL VALIDATIONS PASSED');
  console.log('='.repeat(60));
  console.log('\nStorybook implementation is correct:');
  console.log('- Style Dictionary outputs have correct formats');
  console.log('- MUI theme uses number values (not strings)');
  console.log('- Tailwind theme has DEFAULT key and px units');
  console.log('- shadcn CSS variables have px units');
  console.log('- Component implementations switch themes correctly');
  console.log('\n✅ Ready for visual verification at http://localhost:6006');
  process.exit(0);
} else {
  console.log('❌ VALIDATION FAILED - See errors above');
  console.log('='.repeat(60));
  process.exit(1);
}

