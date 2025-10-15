# AI Design System

**Production-Ready Design Token Pipeline**

A complete design token transformation pipeline that converts Figma design tokens into framework-specific themes for Material-UI, shadcn/ui, and Tailwind CSS, with live interactive demos.

## 🎯 What This Does

This repository proves that **one source of design tokens can theme multiple frameworks identically**. Change a color in Figma, rebuild, and see it update across MUI, shadcn, and Tailwind simultaneously.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Build tokens from Figma source
npm run build:tokens

# Launch interactive demo
npm run storybook
```

Visit `http://localhost:6006` and click the **"Apply DDS Tokens"** toggle to see all three frameworks transform from their stock themes to your unified design system.

## 📊 Pipeline Flow

```
Figma Design
    ↓
Token Studio Plugin
    ↓
token-studio-sync-provider/DDS Foundations.json (W3C DTCG format)
    ↓
Style Dictionary (config/style-dictionary.config.mjs)
    ↓
┌─────────────────┬──────────────────┬─────────────────┐
│   MUI Theme     │  shadcn/ui CSS   │  Tailwind Theme │
│ build/mui/      │ build/shadcn/    │ build/tailwind/ │
│   theme.js      │   variables.css  │    theme.js     │
└─────────────────┴──────────────────┴─────────────────┘
    ↓
Storybook Demo (localhost:6006)
```

## 🎨 Interactive Demo

### Home Story - Token Pipeline Proof

The **Home** story demonstrates the core value proposition:

- **Toggle OFF**: All three frameworks show their stock themes (all look different)
- **Toggle ON**: All three frameworks show DDS-generated themes (all look identical)

This proves that Style Dictionary correctly transforms your design tokens into framework-specific formats.

### Individual Library Stories

- **MUI-Library**: Material-UI components using `@mui/material`
- **Shadcn-Library**: shadcn/ui components using stock New York theme
- **Tailwind-Library**: Tailwind CSS utility classes

Each story showcases buttons, cards, inputs, and typography.

## 📁 Generated Outputs

Running `npm run build:tokens` generates:

```
build/
├── css/
│   └── tokens.css              # Universal CSS variables
├── js/
│   └── tokens.mjs              # JavaScript/TypeScript module
├── json/
│   └── tokens.json             # Raw token inspection
├── mui/
│   └── theme.js                # MUI createTheme() config object
├── shadcn/
│   ├── variables.css           # shadcn CSS variables (HSL format)
│   └── tailwind.config.js      # shadcn + Tailwind hybrid config
└── tailwind/
    └── theme.js                # Tailwind theme config
```

## 🔧 Configuration

### Style Dictionary (`config/style-dictionary.config.mjs`)

Defines transformations for each framework:

- **CSS Platform**: Generates `tokens.css` with CSS custom properties
- **MUI Platform**: Generates `theme.js` with palette, typography, spacing
- **shadcn Platform**: Generates `variables.css` with HSL colors in `.dds-theme` class
- **Tailwind Platform**: Generates `theme.js` with Tailwind v3 config

### Token Source (`token-studio-sync-provider/DDS Foundations.json`)

**⚠️ SACRED RULE: NEVER manually modify this directory**

This directory is automatically synced from Figma via the Token Studio plugin. Any manual changes will be overwritten on the next sync.

## 🎯 Design Token Format (W3C DTCG)

Tokens follow the W3C Design Token Community Group specification:

```json
{
  "Blue": {
    "500": {
      "$type": "color",
      "$value": "#2560ff",
      "$description": "Primary brand color"
    }
  },
  "Grey": {
    "500": {
      "$type": "color",
      "$value": "#6c7e9d"
    }
  }
}
```

## 🏗️ Project Structure

```
ai-design-system/
├── token-studio-sync-provider/     # Figma sync (DO NOT MODIFY)
│   ├── DDS Foundations.json        # Source of truth - all design tokens
│   ├── $themes.json                # Theme configurations
│   └── $metadata.json              # Token Studio metadata
│
├── config/
│   └── style-dictionary.config.mjs # Transformation rules
│
├── build/                          # Generated files (committed for demo)
│   ├── css/tokens.css
│   ├── mui/theme.js
│   ├── shadcn/variables.css
│   └── tailwind/theme.js
│
├── src/
│   ├── demo-components/            # Shared showcase components
│   │   ├── MUIShowcase.tsx
│   │   ├── ShadcnShowcase.tsx
│   │   └── TailwindShowcase.tsx
│   │
│   ├── themes/                     # Theme provider wrappers
│   │   ├── mui-theme.ts            # MUI theme setup
│   │   └── mui-stock-theme.ts      # MUI default theme
│   │
│   ├── components/ui/              # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   │
│   └── app/
│       └── globals.css             # shadcn stock theme (New York)
│
├── stories/
│   ├── Home.stories.tsx            # Main demo with toggle
│   ├── MUI-Library.stories.tsx     # MUI-only showcase
│   ├── Shadcn-Library.stories.tsx  # shadcn/ui showcase
│   └── Tailwind-Library.stories.tsx # Tailwind showcase
│
├── docs/
│   ├── context.md                  # Architecture & AI instructions
│   ├── METAPLAN.md                 # Sprint execution methodology
│   ├── PRESENTATION_BRIEF.md       # Presentation guide & business case
│   └── Style Dictionary PRD (Active)/  # Technical documentation
│       ├── SD-SOP.md               # Style Dictionary Standard Operating Procedure
│       ├── TOKEN-MAPPING-COMPLETE.md # Source token → framework mapping
│       ├── VISUAL-DISCREPANCIES.md # Resolved visual issues
│       ├── COMPONENT-CONSUMPTION.md # How components use tokens
│       └── [12 other technical docs]
│
└── .storybook/
    ├── main.ts                     # Storybook configuration
    └── preview.tsx                 # Global decorators & styles
```

## 🧪 Testing & Verification

This project uses a **sprint-based verification methodology** documented in `docs/METAPLAN.md`.

**Current Status:** Production-Ready ✅

### Token Pipeline Verification (Complete)

All hardcoded values have been eliminated from the Style Dictionary configuration:

- ✅ **Spacing**: Uses `xs: 4px` token (no hardcoded `8`)
- ✅ **Font Weights**: `semibold: 500` from token (not hardcoded `600`)
- ✅ **Border Widths**: Uses `sm`, `md`, `lg`, `xl`, `xxl` tokens
- ✅ **Border Radius**: Uses `rounded: 8px`, `pill: 200px` tokens
- ✅ **Border Colors**: Uses `Grey.300` token (visible, not invisible)
- ✅ **Shadows**: Uses `elevation-0` through `elevation-4` tokens
- ✅ **All 58 Tokens Transform**: No fabricated values, no math, no generation

### Success Criteria Verified

Per `/component-token-consumption-mapping.plan.md`:
1. ✅ MUI spacing = 4 (from xs token)
2. ✅ Tailwind spacing = ONLY source tokens (no fabricated scale)
3. ✅ Tailwind semibold = 500 (correct token value)
4. ✅ MUI border uses borderWidth.sm token
5. ✅ Zero fabricated values
6. ✅ Zero math/generation
7. ✅ All 58 source tokens transform
8. ✅ Visual consistency in Storybook

See `docs/Style Dictionary PRD (Active)/` for detailed technical documentation.

## 📖 Using Generated Tokens

### In MUI Projects

```typescript
import { createTheme, ThemeProvider } from '@mui/material/styles';
import muiThemeConfig from './build/mui/theme.js';

const theme = createTheme(muiThemeConfig);

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* Your MUI components */}
    </ThemeProvider>
  );
}
```

### In shadcn/ui Projects

```tsx
// Import the DDS theme CSS
import './build/shadcn/variables.css';

// Apply the .dds-theme class to your root element
function App() {
  return (
    <div className="dds-theme">
      {/* Your shadcn/ui components */}
    </div>
  );
}
```

### In Tailwind Projects

```javascript
// tailwind.config.js
import { theme as ddsTheme } from './build/tailwind/theme.js';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: ddsTheme,
  },
};
```

### In Plain CSS/JavaScript

```html
<link rel="stylesheet" href="build/css/tokens.css">

<style>
.my-button {
  background-color: var(--blue-500);
  color: var(--grey-50);
  padding: var(--spacing-md);
}
</style>
```

## 🔄 Development Workflow

### 1. Make Token Changes in Figma

Use the Token Studio plugin to modify your design tokens in Figma.

### 2. Sync to Repository

Token Studio automatically pushes changes to `token-studio-sync-provider/`.

### 3. Rebuild Tokens

```bash
npm run build:tokens
```

Or use watch mode for automatic rebuilding:

```bash
npm run watch:tokens
```

### 4. Verify in Storybook

```bash
npm run storybook
```

Toggle between stock and DDS themes to see your changes applied across all frameworks.

## 🛠️ Available Scripts

```bash
npm run build:tokens      # Build all framework themes from tokens
npm run watch:tokens      # Watch mode - rebuild on token changes
npm run storybook         # Launch Storybook demo on :6006
npm run build-storybook   # Build static Storybook for deployment
npm run verify:themes     # Verify token propagation (CI/CD)
```

## 📚 Documentation

### Core Documentation
- **`docs/context.md`** - Architecture decisions, sacred rules, and system limitations
- **`docs/METAPLAN.md`** - Sprint methodology and verification approach
- **`docs/PRESENTATION_BRIEF.md`** - Presentation guide for sharing this system

### Technical Documentation (Style Dictionary PRD)
- **`SD-SOP.md`** - Standard Operating Procedure for all Style Dictionary work
- **`TOKEN-MAPPING-COMPLETE.md`** - Complete mapping of all 58 source tokens
- **`SD-ACTUAL-SYSTEM.md`** - Current Style Dictionary implementation details
- **`COMPONENT-CONSUMPTION.md`** - How each component consumes design tokens
- **`VISUAL-DISCREPANCIES.md`** - Documented visual issues and resolutions
- **`MUI-API-REQUIREMENTS.md`** - MUI theme API requirements
- **`TAILWIND-API-REQUIREMENTS.md`** - Tailwind config API requirements
- **`SHADCN-API-REQUIREMENTS.md`** - shadcn/ui CSS variable requirements

### Key Principles
1. **NEVER modify `token-studio-sync-provider/`** - Auto-synced from Figma
2. **ALL tokens must transform** - No cherry-picking, no fabrication
3. **Zero hardcoded values** - Only token lookups with fallbacks
4. **Verify before claiming completion** - Run commands, show evidence

## 🤝 Contributing

This is a token transformation pipeline with a strict rule:

**✅ DO**: Modify configuration, formatters, Storybook stories, showcase components

**❌ DON'T**: Manually edit `token-studio-sync-provider/` or `build/` outputs

### Git Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes
3. Commit: `git commit -m "feat: your changes"`
4. Push: `git push origin feature/your-feature`
5. Create PR on GitHub
6. Merge on GitHub (NOT locally)
7. Pull main to sync: `git checkout main && git pull`

## 🎓 Key Learnings

This project demonstrates:

1. **Single Source of Truth**: One JSON file themes three different frameworks
2. **Style Dictionary Power**: Transforms tokens into any format with custom formatters
3. **Framework Parity**: MUI, shadcn/ui, and Tailwind can share identical color palettes
4. **Interactive Verification**: Storybook toggle proves the pipeline works
5. **Sprint-Based Development**: Metaplan approach ensures nothing is "close enough"

## 🐛 Known Issues

See `docs/MVP Sprints (Completed)/` for documented bugs and their resolutions:

- `BUG_SPRINT3_CSF_ERROR.md` - Transient CSF parsing warning (non-blocking)
- `BUG_SPRINT6_MUI_COMPILATION.md` - TypeScript errors in MUI type definitions (external)

## 📦 Key Dependencies

- **style-dictionary** (^4.2.0) - Token transformation engine
- **@tokens-studio/sd-transforms** (^1.3.0) - Token Studio format support
- **@storybook/react-vite** (^9.1.10) - Interactive component demos
- **@mui/material** (^6.3.1) - Material-UI framework
- **tailwindcss** (^3.4.18) - Tailwind CSS framework
- **shadcn/ui** - Component library (CLI-installed)

## 📄 License

MIT © Chad Bercea

## 🙏 Acknowledgments

Built with:
- [Style Dictionary](https://amzn.github.io/style-dictionary/) by Amazon
- [Token Studio](https://tokens.studio/) for Figma
- [Storybook](https://storybook.js.org/) for interactive demos
- [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/) for the DTCG specification

---

**Questions?** Contact @ChadBercea

**View Demo:** `npm run storybook`
