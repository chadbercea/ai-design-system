# 🔤 Complete Font Setup Guide for Next.js + shadcn/ui

## 📋 Table of Contents
1. [Understanding Font Loading in Next.js](#understanding-font-loading)
2. [Method 1: Google Fonts (Recommended)](#method-1-google-fonts)
3. [Method 2: Self-Hosted Fonts](#method-2-self-hosted-fonts)
4. [Method 3: Font Files in Repository](#method-3-font-files-in-repo)
5. [Configuring Fonts in Your Design System](#configuring-fonts)
6. [Troubleshooting Common Issues](#troubleshooting)
7. [Performance Best Practices](#performance-tips)

---

## 🎯 Understanding Font Loading in Next.js

Next.js has a built-in font optimization system that:
- **Automatically optimizes fonts** for performance
- **Eliminates layout shift** during font loading
- **Preloads fonts** for better user experience
- **Self-hosts Google Fonts** automatically

### How Fonts Work in Our Stack:
\`\`\`
1. Font Declaration (app/layout.tsx or globals.css)
     ↓
2. Tailwind Configuration (tailwind.config.ts)
     ↓
3. CSS Classes (font-sans, font-serif, etc.)
     ↓
4. Component Usage (className="font-sans")
\`\`\`

---

## 🌐 Method 1: Google Fonts (Recommended)

**✅ PROS:** Easy setup, automatic optimization, no file management
**❌ CONS:** Requires internet connection, limited to Google's catalog

### Step 1: Install and Configure Google Fonts

Add this to your `app/layout.tsx`:

\`\`\`typescript
import { Inter, Roboto_Mono, Playfair_Display } from 'next/font/google'

// Configure your fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={\`\${inter.variable} \${robotoMono.variable} \${playfair.variable}\`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
\`\`\`

### Step 2: Update Tailwind Config

Add the fonts to your `tailwind.config.ts`:

\`\`\`typescript
extend: {
  fontFamily: {
    sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    mono: ['var(--font-roboto-mono)', 'monospace'],
    serif: ['var(--font-playfair)', 'serif'],
  },
}
\`\`\`

### Step 3: Use in Components

\`\`\`tsx
<h1 className="font-sans">This uses Inter</h1>
<code className="font-mono">This uses Roboto Mono</code>
<h2 className="font-serif">This uses Playfair Display</h2>
\`\`\`

---

## 💾 Method 2: Self-Hosted Fonts

**✅ PROS:** Full control, works offline, any font you want
**❌ CONS:** Manual optimization, file management, licensing concerns

### Step 1: Add Font Files to Your Project

Create this structure:
\`\`\`
public/
  fonts/
    inter/
      Inter-Regular.woff2
      Inter-Medium.woff2
      Inter-Bold.woff2
    custom-font/
      CustomFont-Regular.woff2
      CustomFont-Bold.woff2
\`\`\`

### Step 2: Create Font Declarations

Add to your `app/globals.css`:

\`\`\`css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-font/CustomFont-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
\`\`\`

### Step 3: Update Tailwind Config

\`\`\`typescript
extend: {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    custom: ['CustomFont', 'system-ui', 'sans-serif'],
  },
}
\`\`\`

### Step 4: Preload Critical Fonts

Add to your `app/layout.tsx`:

\`\`\`tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/inter/Inter-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/inter/Inter-Medium.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
\`\`\`

---

## 📁 Method 3: Font Files in Repository

**✅ PROS:** Version controlled, guaranteed availability
**❌ CONS:** Larger repository size, manual updates

### Step 1: Add Fonts to Your Codebase

\`\`\`
src/
  assets/
    fonts/
      inter/
        Inter-Regular.woff2
        Inter-Medium.woff2
        Inter-Bold.woff2
\`\`\`

### Step 2: Use Next.js Local Fonts

\`\`\`typescript
import localFont from 'next/font/local'

const inter = localFont({
  src: [
    {
      path: '../assets/fonts/inter/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/inter/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/inter/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
\`\`\`

---

## ⚙️ Configuring Fonts in Your Design System

### Update Your globals.css

\`\`\`css
@layer base {
  body {
    @apply bg-background text-foreground font-sans;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-serif; /* Use serif for headings */
  }
  
  code, pre {
    @apply font-mono; /* Use mono for code */
  }
}
\`\`\`

### Update Your Tailwind Config

\`\`\`typescript
extend: {
  fontFamily: {
    sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
    serif: ['var(--font-playfair)', 'Georgia', 'serif'],
    mono: ['var(--font-roboto-mono)', 'Consolas', 'monospace'],
    display: ['var(--font-display)', 'system-ui', 'sans-serif'], // For special headings
  },
  fontSize: {
    'xs': ['0.75rem', { lineHeight: '1rem' }],
    'sm': ['0.875rem', { lineHeight: '1.25rem' }],
    'base': ['1rem', { lineHeight: '1.5rem' }],
    'lg': ['1.125rem', { lineHeight: '1.75rem' }],
    'xl': ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
}
\`\`\`

---

## 🔧 Troubleshooting Common Issues

### ❌ Problem: Fonts Not Loading

**Symptoms:** Text appears in fallback fonts
**Solutions:**
1. Check file paths are correct
2. Verify font files exist and are accessible
3. Check browser network tab for 404 errors
4. Ensure \`font-display: swap\` is set

### ❌ Problem: Layout Shift During Font Load

**Symptoms:** Text jumps when custom font loads
**Solutions:**
1. Use \`font-display: swap\`
2. Preload critical fonts
3. Use Next.js font optimization
4. Match fallback font metrics

### ❌ Problem: Fonts Not Applying in Components

**Symptoms:** Tailwind font classes don't work
**Solutions:**
1. Check Tailwind config is correct
2. Verify CSS variables are defined
3. Restart development server
4. Check for CSS specificity issues

### ❌ Problem: Poor Performance

**Symptoms:** Slow font loading, high bandwidth usage
**Solutions:**
1. Use WOFF2 format (best compression)
2. Subset fonts to needed characters
3. Preload only critical fonts
4. Use Google Fonts for automatic optimization

---

## 🚀 Performance Best Practices

### 1. Font Format Priority
\`\`\`css
@font-face {
  font-family: 'MyFont';
  src: url('font.woff2') format('woff2'),    /* Best compression */
       url('font.woff') format('woff'),      /* Good fallback */
       url('font.ttf') format('truetype');   /* Last resort */
}
\`\`\`

### 2. Preload Critical Fonts Only
\`\`\`html
<!-- Only preload fonts used above the fold -->
<link rel="preload" href="/fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>
\`\`\`

### 3. Font Subsetting
Use tools like \`glyphhanger\` to include only needed characters:
\`\`\`bash
# Install glyphhanger
npm install -g glyphhanger

# Subset a font to Latin characters only
glyphhanger --latin --formats=woff2 --subset=font.ttf
\`\`\`

### 4. Font Loading Strategy
\`\`\`css
@font-face {
  font-family: 'MyFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately, swap when loaded */
}
\`\`\`

---

## 📝 Quick Reference Commands

### For Google Fonts:
\`\`\`bash
# Install a Google Font
npm install next/font
\`\`\`

### For Self-Hosted Fonts:
\`\`\`bash
# Convert fonts to WOFF2 (best compression)
# Use online tools or fonttools:
pip install fonttools
fonttools ttLib.woff2 compress font.ttf
\`\`\`

### For Font Analysis:
\`\`\`bash
# Analyze what characters your site uses
npx glyphhanger http://localhost:3000
\`\`\`

---

## 🎯 Recommendations for Your Project

**For Most Projects:** Use Google Fonts (Method 1)
- Easy setup and maintenance
- Automatic optimization
- Great performance out of the box

**For Custom Branding:** Use Self-Hosted Fonts (Method 2)
- Full control over font loading
- Works with any font file
- Better for unique brand fonts

**For Enterprise/Offline:** Use Repository Fonts (Method 3)
- Version controlled fonts
- No external dependencies
- Guaranteed availability

---

## 🔗 Helpful Resources

- [Next.js Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)
- [Google Fonts](https://fonts.google.com/)
- [Font Squirrel (Free Fonts)](https://www.fontsquirrel.com/)
- [Glyphhanger (Font Subsetting)](https://github.com/zachleat/glyphhanger)
- [WOFF2 Converter](https://cloudconvert.com/ttf-to-woff2)

---

**💡 Pro Tip:** Start with Google Fonts for prototyping, then switch to self-hosted fonts if you need specific branding or offline capabilities!
