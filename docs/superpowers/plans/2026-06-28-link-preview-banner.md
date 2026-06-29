# Link-Preview Banner (OG Image) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a custom 1200×630 link-preview card to `randyren.org` so URLs unfurl with a dark warm card showing a pixel-art astronaut, the wordmark "Randy." (sage period), and a description, across iMessage, Slack, Twitter/X, Discord, LinkedIn, Facebook, and Telegram.

**Architecture:** Three additions to the Next.js App Router project. (1) Replace the minimal `metadata` in `app/layout.tsx` with full Open Graph + Twitter Card tags. (2) Add `app/opengraph-image.tsx` — a route that returns a PNG generated at request time by Next's `ImageResponse` (Satori under the hood), rendering the approved card as JSX with inline styles. (3) Add `app/twitter-image.tsx` re-exporting the same image so Next auto-populates `<meta name="twitter:image">`. The astronaut sprite renders as a grid of absolutely-positioned `<div>`s (not SVG, because Satori's SVG support is limited and `<div>` rendering is the well-trodden path). Fonts (Playfair Display 500 + Geist Mono) ship as TTF Buffers loaded at request time.

**Tech Stack:** Next.js 15.3.6, React 19, TypeScript, `next/og` `ImageResponse` (built into Next, no new deps), Playfair Display + Geist Mono (TTF files in `public/fonts/`).

## Global Constraints

- Canonical site URL is `https://randyren.org` (NOT `.dev`). Use this in `metadataBase`, `og:url`, and the card footer text.
- Card canvas is exactly 1200×630 px. No corner radius in the export.
- Palette is fixed: `#14130f` warm-bg, `#0a0908` cool-bg, `#f1ece3` bone-fg, `#7a766e` muted-fg, `#c8d2b8` sage-accent, `#e8c7b8` blush, `#d4a89a` dusty-rose, `#5a6478` soft-navy, `#bfb6a8` taupe.
- Wordmark serif must be Playfair Display weight 500. A CSS fallback is not acceptable — Satori has no system font access, so the TTF must be passed via the `fonts` option or the wordmark renders as default sans.
- Title: `Randy Ren — Portfolio`. Description: `Randy Ren — building agents and the interfaces around them.` Both strings are used verbatim in OG, Twitter, and HTML `<title>`/`<meta>`.
- No third-party dependencies added to `package.json`. Everything uses Next.js built-ins.
- No changes to `InteractivePortfolio.tsx` or any other component. The implementation is metadata + two new route files + one font asset.
- Existing favicon (`/images/favicon.ico`) is preserved unchanged.

---

## File Structure

| Path                                         | Status   | Responsibility                                                                  |
| -------------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| `app/layout.tsx`                             | Modified | Replace minimal `metadata` with full OG/Twitter tag set                         |
| `app/opengraph-image.tsx`                    | New      | Renders 1200×630 PNG via `ImageResponse`; default export + `alt`/`size`/`contentType` |
| `app/twitter-image.tsx`                      | New      | Re-export of opengraph-image for Twitter Card auto-wiring                       |
| `app/og/card.tsx`                            | New      | Shared JSX of the card (chassis, left column, sprite host) — kept off the route file to keep it readable |
| `app/og/sprite.tsx`                          | New      | `<Astronaut />` component — the pixel grid as absolutely-positioned `<div>`s    |
| `app/og/sprite-data.ts`                      | New      | Pure data — array of pixel rectangles `{x, y, w, h, fill, opacity?}`            |
| `app/og/fonts.ts`                            | New      | Loads `PlayfairDisplay-Medium.ttf` and `GeistMono-Regular.ttf` as `ArrayBuffer`s |
| `public/fonts/PlayfairDisplay-Medium.ttf`    | New      | Serif wordmark font asset (downloaded from Google Fonts at install time)        |
| `public/fonts/GeistMono-Regular.ttf`         | New      | Mono font for tag and footer                                                    |

Splitting the card into `card.tsx` + `sprite.tsx` + `sprite-data.ts` is deliberate: the route file (`opengraph-image.tsx`) stays small and obvious, the sprite is reusable for `twitter-image.tsx`, and the 80 pixel rectangles live as plain data so visual tweaks are one-line edits.

---

## Task 1: Download font assets

**Files:**
- Create: `public/fonts/PlayfairDisplay-Medium.ttf`
- Create: `public/fonts/GeistMono-Regular.ttf`

**Interfaces:**
- Consumes: (none)
- Produces: Two TTF files on disk that later tasks load via `fs.readFile`.

- [ ] **Step 1: Verify `public/fonts/` doesn't yet exist**

Run: `ls /Users/randyren/Developer/randy-new-portfolio/public/fonts 2>&1`
Expected: `ls: ... No such file or directory` (or empty). If a `fonts` directory already exists, skip the mkdir in step 2.

- [ ] **Step 2: Create the fonts directory**

Run: `mkdir -p /Users/randyren/Developer/randy-new-portfolio/public/fonts`
Expected: silent success.

- [ ] **Step 3: Download Playfair Display Medium (500)**

Run:
```bash
curl -L -o /Users/randyren/Developer/randy-new-portfolio/public/fonts/PlayfairDisplay-Medium.ttf \
  "https://github.com/google/fonts/raw/main/ofl/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf"
```
Expected: file written, exit code 0. The downloaded file is a variable font; we'll instance it at weight 500 via the `weight: 500` parameter when registering with Satori. File size should be roughly 200–250 KB.

- [ ] **Step 4: Download Geist Mono Regular**

Run:
```bash
curl -L -o /Users/randyren/Developer/randy-new-portfolio/public/fonts/GeistMono-Regular.ttf \
  "https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-mono/GeistMono-Regular.ttf"
```
Expected: file written, exit code 0. Roughly 70–100 KB.

- [ ] **Step 5: Verify both files exist and are non-empty**

Run:
```bash
ls -la /Users/randyren/Developer/randy-new-portfolio/public/fonts/
```
Expected: both `PlayfairDisplay-Medium.ttf` and `GeistMono-Regular.ttf` listed, each > 50000 bytes. If either is 0 bytes or under 10 KB, the download failed (Google Fonts/GitHub may have changed URLs) — fall back to: `curl -L -o ... "https://fonts.gstatic.com/s/playfairdisplay/v37/nuFvD-vYSZviVYUb_rj3ij__anPXPzI.ttf"` for Playfair Display, and download GeistMono manually from https://vercel.com/font.

- [ ] **Step 6: Commit**

```bash
cd /Users/randyren/Developer/randy-new-portfolio
git add public/fonts/PlayfairDisplay-Medium.ttf public/fonts/GeistMono-Regular.ttf
git commit -m "feat(og): add Playfair Display and Geist Mono font assets"
```

---

## Task 2: Font loader module

**Files:**
- Create: `app/og/fonts.ts`

**Interfaces:**
- Consumes: TTF files at `public/fonts/PlayfairDisplay-Medium.ttf` and `public/fonts/GeistMono-Regular.ttf` (from Task 1).
- Produces:
  - `loadCardFonts(): Promise<Array<{ name: string; data: ArrayBuffer; style: 'normal'; weight: 400 | 500 }>>` — returns a fonts array ready to spread into `new ImageResponse(..., { fonts: ... })`.
  - Font family names: `'Playfair Display'` (weight 500) and `'Geist Mono'` (weight 400).

- [ ] **Step 1: Create the fonts module**

Create file `app/og/fonts.ts`:

```ts
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type CardFont = {
  name: string;
  data: ArrayBuffer;
  style: 'normal';
  weight: 400 | 500;
};

async function readFontBuffer(relativePath: string): Promise<ArrayBuffer> {
  const absolute = path.join(process.cwd(), 'public', 'fonts', relativePath);
  const buffer = await readFile(absolute);
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength,
  ) as ArrayBuffer;
}

export async function loadCardFonts(): Promise<CardFont[]> {
  const [playfair, geistMono] = await Promise.all([
    readFontBuffer('PlayfairDisplay-Medium.ttf'),
    readFontBuffer('GeistMono-Regular.ttf'),
  ]);

  return [
    { name: 'Playfair Display', data: playfair, style: 'normal', weight: 500 },
    { name: 'Geist Mono', data: geistMono, style: 'normal', weight: 400 },
  ];
}
```

- [ ] **Step 2: Smoke-test the loader from a one-shot Node script**

Create a throwaway file `app/og/_smoke.mjs` (just for this step):

```js
import { loadCardFonts } from './fonts.ts';
const fonts = await loadCardFonts();
console.log(fonts.map(f => ({ name: f.name, bytes: f.data.byteLength, weight: f.weight })));
```

This is a smoke test, not a unit test — we want to confirm the files actually load and the byte counts are non-trivial before depending on them downstream.

Run:
```bash
cd /Users/randyren/Developer/randy-new-portfolio
npx tsx app/og/_smoke.mjs
```

Expected output (numbers approximate):
```
[
  { name: 'Playfair Display', bytes: 218000, weight: 500 },
  { name: 'Geist Mono', bytes: 92000, weight: 400 }
]
```

If `tsx` isn't installed, use `npx -y tsx ...`. If both `bytes` values are present and over 50000, the loader works. If either is under 10000, return to Task 1.

- [ ] **Step 3: Delete the smoke script**

Run: `rm /Users/randyren/Developer/randy-new-portfolio/app/og/_smoke.mjs`

- [ ] **Step 4: Commit**

```bash
cd /Users/randyren/Developer/randy-new-portfolio
git add app/og/fonts.ts
git commit -m "feat(og): font loader for Playfair Display and Geist Mono"
```

---

## Task 3: Sprite data module

**Files:**
- Create: `app/og/sprite-data.ts`

**Interfaces:**
- Consumes: (none — pure data)
- Produces:
  - `type SpritePixel = { x: number; y: number; w: number; h: number; fill: string; opacity?: number }`
  - `export const ASTRONAUT_PIXELS: readonly SpritePixel[]` — exactly 80 entries.
  - `export const ASTRONAUT_GRID = { cols: 40, rows: 56 } as const` — logical sprite dimensions.

The pixel array is the exact data extracted from the approved mockup at `.superpowers/brainstorm/87804-1782696448/content/pixel-art-v3-wordmark.html` (variant 2, "Serif, sage period"). Coordinates are in logical sprite units (0–39 x, 0–55 y); the consumer multiplies by a scale factor to get screen pixels.

- [ ] **Step 1: Create the sprite data module**

Create file `app/og/sprite-data.ts`:

```ts
export type SpritePixel = {
  x: number;
  y: number;
  w: number;
  h: number;
  fill: string;
  opacity?: number;
};

export const ASTRONAUT_GRID = { cols: 40, rows: 56 } as const;

// Approved mockup: .superpowers/brainstorm/87804-1782696448/content/pixel-art-v3-wordmark.html
// Variant 2 — "Serif, sage period". 80 pixel rectangles. Do not reorder — later
// entries (highlights / shadows) intentionally paint over earlier ones.
export const ASTRONAUT_PIXELS: readonly SpritePixel[] = [
  // Antenna
  { x: 19, y: 0, w: 2, h: 1, fill: '#d4a89a' },
  { x: 19, y: 1, w: 2, h: 1, fill: '#e8c7b8' },
  { x: 19, y: 2, w: 1, h: 3, fill: '#a8a298' },
  { x: 20, y: 2, w: 1, h: 3, fill: '#7a766e' },

  // Helmet outer
  { x: 14, y: 5,  w: 12, h: 1,  fill: '#bfb6a8' },
  { x: 12, y: 6,  w: 16, h: 1,  fill: '#d4cfc4' },
  { x: 11, y: 7,  w: 18, h: 1,  fill: '#e4ddc7' },
  { x: 10, y: 8,  w: 20, h: 13, fill: '#f1ece3' },
  { x: 11, y: 21, w: 18, h: 1,  fill: '#e4ddc7' },
  { x: 12, y: 22, w: 16, h: 1,  fill: '#d4cfc4' },
  { x: 28, y: 8,  w: 1,  h: 13, fill: '#d4cfc4' },
  { x: 29, y: 8,  w: 1,  h: 13, fill: '#a8a298' },
  { x: 10, y: 8,  w: 1,  h: 13, fill: '#ffffff', opacity: 0.4 },
  { x: 11, y: 8,  w: 1,  h: 3,  fill: '#ffffff', opacity: 0.5 },

  // Visor
  { x: 12, y: 9,  w: 16, h: 1, fill: '#1a1c24' },
  { x: 12, y: 10, w: 16, h: 9, fill: '#3d4555' },
  { x: 12, y: 19, w: 16, h: 1, fill: '#1a1c24' },
  { x: 13, y: 11, w: 14, h: 6, fill: '#5a6478' },
  { x: 13, y: 11, w: 14, h: 1, fill: '#7a8aa0' },

  // Visor: sage horizon reflected inside
  { x: 13, y: 14, w: 14, h: 3, fill: '#c8d2b8' },
  { x: 13, y: 14, w: 14, h: 1, fill: '#a8b598' },
  { x: 13, y: 16, w: 14, h: 1, fill: '#7a8a6a' },

  // Visor: tiny blush sun + glow
  { x: 23, y: 12, w: 2, h: 2, fill: '#e8c7b8' },
  { x: 22, y: 13, w: 1, h: 1, fill: '#e8c7b8', opacity: 0.7 },
  { x: 25, y: 13, w: 1, h: 1, fill: '#e8c7b8', opacity: 0.7 },

  // Visor: highlight glints
  { x: 14, y: 11, w: 3, h: 1, fill: '#f1ece3', opacity: 0.8 },
  { x: 14, y: 12, w: 2, h: 1, fill: '#f1ece3', opacity: 0.6 },
  { x: 15, y: 13, w: 1, h: 1, fill: '#f1ece3', opacity: 0.4 },

  // Visor frame (left/right)
  { x: 12, y: 10, w: 1, h: 9, fill: '#1a1c24' },
  { x: 27, y: 10, w: 1, h: 9, fill: '#1a1c24' },

  // Ear pieces
  { x: 9,  y: 13, w: 1, h: 3, fill: '#7a766e' },
  { x: 30, y: 13, w: 1, h: 3, fill: '#7a766e' },

  // Neck
  { x: 16, y: 23, w: 8, h: 2, fill: '#a8a298' },
  { x: 16, y: 23, w: 8, h: 1, fill: '#7a766e' },

  // Suit torso
  { x: 10, y: 25, w: 20, h: 1,  fill: '#bfb6a8' },
  { x: 9,  y: 26, w: 22, h: 1,  fill: '#d4cfc4' },
  { x: 9,  y: 27, w: 22, h: 14, fill: '#f1ece3' },
  { x: 9,  y: 41, w: 22, h: 1,  fill: '#e4ddc7' },
  { x: 10, y: 27, w: 1,  h: 14, fill: '#ffffff', opacity: 0.4 },
  { x: 29, y: 27, w: 1,  h: 14, fill: '#d4cfc4' },
  { x: 30, y: 27, w: 1,  h: 14, fill: '#a8a298' },

  // Chest panel
  { x: 14, y: 30, w: 12, h: 7, fill: '#1a1c24' },
  { x: 14, y: 30, w: 12, h: 1, fill: '#2a2e3a' },
  { x: 14, y: 36, w: 12, h: 1, fill: '#0a0908' },

  // Chest indicator lights (sage, blush, dusty rose)
  { x: 16, y: 32, w: 2, h: 2, fill: '#c8d2b8' },
  { x: 16, y: 32, w: 1, h: 1, fill: '#d8e0c8' },
  { x: 19, y: 32, w: 2, h: 2, fill: '#e8c7b8' },
  { x: 19, y: 32, w: 1, h: 1, fill: '#f0d8cc' },
  { x: 22, y: 32, w: 2, h: 2, fill: '#d4a89a' },
  { x: 22, y: 32, w: 1, h: 1, fill: '#e8c7b8' },

  // Chest readout strip
  { x: 16, y: 35, w: 8, h: 1, fill: '#5a6478' },
  { x: 17, y: 35, w: 2, h: 1, fill: '#c8d2b8' },
  { x: 20, y: 35, w: 1, h: 1, fill: '#c8d2b8' },

  // Arms
  { x: 6,  y: 27, w: 3, h: 12, fill: '#e4ddc7' },
  { x: 6,  y: 27, w: 1, h: 12, fill: '#ffffff', opacity: 0.3 },
  { x: 31, y: 27, w: 3, h: 12, fill: '#e4ddc7' },
  { x: 33, y: 27, w: 1, h: 12, fill: '#a8a298' },
  { x: 6,  y: 33, w: 3, h: 1,  fill: '#bfb6a8' },
  { x: 31, y: 33, w: 3, h: 1,  fill: '#bfb6a8' },

  // Gloves
  { x: 5,  y: 39, w: 5, h: 4, fill: '#7a766e' },
  { x: 5,  y: 39, w: 5, h: 1, fill: '#a8a298' },
  { x: 6,  y: 40, w: 3, h: 2, fill: '#5a574f' },
  { x: 30, y: 39, w: 5, h: 4, fill: '#7a766e' },
  { x: 30, y: 39, w: 5, h: 1, fill: '#a8a298' },
  { x: 31, y: 40, w: 3, h: 2, fill: '#5a574f' },

  // Legs
  { x: 11, y: 42, w: 7, h: 10, fill: '#f1ece3' },
  { x: 11, y: 42, w: 1, h: 10, fill: '#ffffff', opacity: 0.4 },
  { x: 17, y: 42, w: 1, h: 10, fill: '#d4cfc4' },
  { x: 22, y: 42, w: 7, h: 10, fill: '#f1ece3' },
  { x: 22, y: 42, w: 1, h: 10, fill: '#ffffff', opacity: 0.4 },
  { x: 28, y: 42, w: 1, h: 10, fill: '#d4cfc4' },
  { x: 11, y: 46, w: 7, h: 1,  fill: '#bfb6a8' },
  { x: 22, y: 46, w: 7, h: 1,  fill: '#bfb6a8' },

  // Boots
  { x: 10, y: 52, w: 9, h: 3, fill: '#7a766e' },
  { x: 10, y: 52, w: 9, h: 1, fill: '#a8a298' },
  { x: 10, y: 55, w: 9, h: 1, fill: '#5a574f' },
  { x: 21, y: 52, w: 9, h: 3, fill: '#7a766e' },
  { x: 21, y: 52, w: 9, h: 1, fill: '#a8a298' },
  { x: 21, y: 55, w: 9, h: 1, fill: '#5a574f' },

  // Boot accents (sage)
  { x: 13, y: 53, w: 3, h: 1, fill: '#c8d2b8' },
  { x: 24, y: 53, w: 3, h: 1, fill: '#c8d2b8' },
];
```

- [ ] **Step 2: Verify the pixel count**

Run:
```bash
cd /Users/randyren/Developer/randy-new-portfolio
node -e "import('./app/og/sprite-data.ts').then(m => console.log('pixels:', m.ASTRONAUT_PIXELS.length, 'grid:', m.ASTRONAUT_GRID))" 2>/dev/null \
  || npx tsx -e "import { ASTRONAUT_PIXELS, ASTRONAUT_GRID } from './app/og/sprite-data'; console.log('pixels:', ASTRONAUT_PIXELS.length, 'grid:', ASTRONAUT_GRID);"
```

Expected:
```
pixels: 80 grid: { cols: 40, rows: 56 }
```

If the count is not 80, a paste error occurred — recount against the rectangle list in the mockup file.

- [ ] **Step 3: Commit**

```bash
cd /Users/randyren/Developer/randy-new-portfolio
git add app/og/sprite-data.ts
git commit -m "feat(og): astronaut sprite pixel data (40x56, 80 rects)"
```

---

## Task 4: Sprite component

**Files:**
- Create: `app/og/sprite.tsx`

**Interfaces:**
- Consumes: `ASTRONAUT_PIXELS`, `ASTRONAUT_GRID` from `app/og/sprite-data.ts` (Task 3).
- Produces:
  - `<Astronaut scale={number} />` — a React component rendering the sprite as a `<div>` of `40*scale × 56*scale` px containing one absolutely-positioned child `<div>` per pixel rectangle.
  - Default `scale = 8` (so 320×448 pixel footprint at default).

Why `<div>`s, not SVG: Satori (the renderer behind `ImageResponse`) supports a limited subset of SVG and treats `<rect>` styling inconsistently. `<div>` with absolute positioning and explicit `background` is the Satori-recommended approach for pixel art and lays out predictably.

- [ ] **Step 1: Create the sprite component**

Create file `app/og/sprite.tsx`:

```tsx
import { ASTRONAUT_GRID, ASTRONAUT_PIXELS } from './sprite-data';

type AstronautProps = {
  /** Pixel size of one logical sprite pixel. Default 8 → 320×448 footprint. */
  scale?: number;
};

export function Astronaut({ scale = 8 }: AstronautProps) {
  const width = ASTRONAUT_GRID.cols * scale;
  const height = ASTRONAUT_GRID.rows * scale;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        display: 'flex',
      }}
    >
      {ASTRONAUT_PIXELS.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: p.x * scale,
            top: p.y * scale,
            width: p.w * scale,
            height: p.h * scale,
            background: p.fill,
            opacity: p.opacity ?? 1,
          }}
        />
      ))}
    </div>
  );
}
```

Note: `display: 'flex'` is set on the outer `<div>` because Satori requires every container to either be `display: flex` or have exactly one child. Even though we use absolute positioning for the pixels, the parent needs an explicit display value.

- [ ] **Step 2: Commit**

```bash
cd /Users/randyren/Developer/randy-new-portfolio
git add app/og/sprite.tsx
git commit -m "feat(og): astronaut sprite component (div-grid for Satori)"
```

---

## Task 5: Card component

**Files:**
- Create: `app/og/card.tsx`

**Interfaces:**
- Consumes: `<Astronaut />` from `app/og/sprite.tsx` (Task 4).
- Produces:
  - `<OgCard />` — the full 1200×630 card JSX, ready to pass to `ImageResponse`'s first argument. No props; all content is hardcoded to spec.
  - Uses font families `'Playfair Display'` (wordmark) and `'Geist Mono'` (tag, footer) — these must be registered in the `ImageResponse` `fonts` option by the consumer.

- [ ] **Step 1: Create the card component**

Create file `app/og/card.tsx`:

```tsx
import { Astronaut } from './sprite';

const PALETTE = {
  warmBg: '#14130f',
  warmBg2: '#100f0c',
  coolBg: '#0a0908',
  coolBg2: '#131210',
  fg: '#f1ece3',
  mute: '#7a766e',
  sage: '#c8d2b8',
} as const;

export function OgCard() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: 'flex',
        background: PALETTE.warmBg,
        fontFamily: 'Geist Mono',
        color: PALETTE.fg,
      }}
    >
      {/* LEFT COLUMN — 53.5% (1.1fr of 2.1fr total) */}
      <div
        style={{
          width: 628,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '54px 64px',
          background: `linear-gradient(180deg, #16140f, ${PALETTE.warmBg2})`,
        }}
      >
        {/* Top tag */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'Geist Mono',
            fontSize: 14,
            letterSpacing: 3,
            color: PALETTE.mute,
            textTransform: 'uppercase',
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: PALETTE.sage,
            }}
          />
          <div style={{ display: 'flex' }}>RANDY REN · PORTFOLIO</div>
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            fontFamily: 'Playfair Display',
            fontWeight: 500,
            fontSize: 240,
            lineHeight: 0.9,
            letterSpacing: -14,
            color: PALETTE.fg,
          }}
        >
          <span style={{ display: 'flex' }}>Randy</span>
          <span style={{ display: 'flex', color: PALETTE.sage }}>.</span>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontFamily: 'Geist Mono',
            fontSize: 16,
            color: PALETTE.mute,
          }}
        >
          <div style={{ display: 'flex', color: PALETTE.fg }}>randyren.org</div>
          <div style={{ display: 'flex' }}>↗ enter</div>
        </div>
      </div>

      {/* RIGHT COLUMN — 47.6% */}
      <div
        style={{
          width: 572,
          height: 630,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `radial-gradient(70% 70% at 50% 50%, rgba(200,210,184,0.05), transparent 70%), linear-gradient(180deg, ${PALETTE.coolBg2}, ${PALETTE.coolBg})`,
        }}
      >
        <Astronaut scale={8} />
      </div>
    </div>
  );
}
```

Implementation notes:
- Satori requires `display: 'flex'` on every container with more than one child, OR exactly one child. Every `<div>` above has its display value set explicitly.
- `letterSpacing: -14` at fontSize 240 ≈ -0.058em, matching the mockup's `letter-spacing: -0.06em`.
- Subtle grid overlays from the mockup are omitted from the rendered card — Satori does not support `mask-image`, and a faint overlay grid that has to fade out cleanly is not worth a brittle implementation. The card reads strong without it.
- Drop shadow on the sprite (the mockup had `filter: drop-shadow(...)`) is dropped for the same reason — Satori's `filter` support is limited. The high-contrast palette carries it.

- [ ] **Step 2: Commit**

```bash
cd /Users/randyren/Developer/randy-new-portfolio
git add app/og/card.tsx
git commit -m "feat(og): card layout component (chassis, wordmark, sprite host)"
```

---

## Task 6: opengraph-image route

**Files:**
- Create: `app/opengraph-image.tsx`

**Interfaces:**
- Consumes: `<OgCard />` from `app/og/card.tsx` (Task 5), `loadCardFonts` from `app/og/fonts.ts` (Task 2).
- Produces:
  - Default export — async function returning `ImageResponse`. Next.js File Conventions wires this to `/opengraph-image.png` and auto-populates `<meta property="og:image">` with the absolute URL.
  - `export const alt: string`
  - `export const size: { width: number; height: number }`
  - `export const contentType: 'image/png'`

- [ ] **Step 1: Create the route**

Create file `app/opengraph-image.tsx`:

```tsx
import { ImageResponse } from 'next/og';
import { OgCard } from './og/card';
import { loadCardFonts } from './og/fonts';

export const alt = "Randy Ren's portfolio — pixel-art astronaut on a dark warm card.";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const fonts = await loadCardFonts();

  return new ImageResponse(<OgCard />, {
    width: size.width,
    height: size.height,
    fonts,
  });
}
```

- [ ] **Step 2: Start the dev server**

In one shell:
```bash
cd /Users/randyren/Developer/randy-new-portfolio
npm run dev
```

Wait for `✓ Ready in ...ms`. The dev server listens on port 3000 by default.

- [ ] **Step 3: Fetch the image and verify it's a real PNG**

In another shell:
```bash
curl -s -o /tmp/randyren-og.png -w "%{http_code} %{content_type}\n" http://localhost:3000/opengraph-image
file /tmp/randyren-og.png
```

Expected:
```
200 image/png
/tmp/randyren-og.png: PNG image data, 1200 x 630, 8-bit/color RGB, non-interlaced
```

If the HTTP status is 500, read the dev-server output — the most common failures are (a) `loadCardFonts` can't find a TTF (re-run Task 1), (b) Satori rejecting a layout (look for "Satori: cannot find ..." in the error), or (c) a `<div>` missing `display: 'flex'` when it has multiple children.

- [ ] **Step 4: Eyeball the output**

```bash
open /tmp/randyren-og.png
```

Compare against the approved mockup at `.superpowers/brainstorm/87804-1782696448/content/pixel-art-v3-wordmark.html` (variant 2). The card MUST show:
- Dark warm background, two columns.
- Top-left small uppercase tag with green-grey status dot.
- Centered-vertically wordmark "Randy" + sage period — must be a serif (Playfair). If it looks like a sans-serif, the font didn't load — re-check `app/og/fonts.ts`.
- Bottom-left `randyren.org` and `↗ enter` in a mono font.
- Right column with the pixel astronaut, visible chest lights (sage / blush / dusty rose), sage horizon in the visor, blush sun.

Stop the dev server (Ctrl+C).

- [ ] **Step 5: Commit**

```bash
cd /Users/randyren/Developer/randy-new-portfolio
git add app/opengraph-image.tsx
git commit -m "feat(og): opengraph-image route serving 1200x630 PNG"
```

---

## Task 7: twitter-image route

**Files:**
- Create: `app/twitter-image.tsx`

**Interfaces:**
- Consumes: nothing directly — re-exports from `app/opengraph-image.tsx` (Task 6).
- Produces: identical PNG served at `/twitter-image.png`; Next.js auto-populates `<meta name="twitter:image">`.

Why a separate file: Next's File Conventions wire `opengraph-image.tsx` to `og:image` and `twitter-image.tsx` to `twitter:image` independently. Without this file, Twitter Cards fall back to using `og:image` (which works) but Twitter-specific dimensions and alt attributes aren't set.

- [ ] **Step 1: Create the route**

Create file `app/twitter-image.tsx`:

```tsx
export { default, alt, size, contentType } from './opengraph-image';
```

That's it — a one-line re-export. Both routes serve the identical PNG with identical `alt` text.

- [ ] **Step 2: Verify the route resolves**

Start the dev server:
```bash
cd /Users/randyren/Developer/randy-new-portfolio
npm run dev
```

In another shell:
```bash
curl -s -o /tmp/randyren-twitter.png -w "%{http_code} %{content_type}\n" http://localhost:3000/twitter-image
file /tmp/randyren-twitter.png
```

Expected:
```
200 image/png
/tmp/randyren-twitter.png: PNG image data, 1200 x 630, 8-bit/color RGB, non-interlaced
```

Stop the dev server.

- [ ] **Step 3: Commit**

```bash
cd /Users/randyren/Developer/randy-new-portfolio
git add app/twitter-image.tsx
git commit -m "feat(og): twitter-image route (re-export of opengraph-image)"
```

---

## Task 8: Replace metadata in layout

**Files:**
- Modify: `app/layout.tsx:15-22`

**Interfaces:**
- Consumes: nothing — text values are hardcoded per spec.
- Produces: complete `metadata` export so Next emits `<title>`, `<meta name="description">`, all `og:*`, and all `twitter:*` tags. `opengraph-image.tsx` and `twitter-image.tsx` (Tasks 6–7) are auto-wired into `og:image` and `twitter:image` by Next as long as they exist in `app/`.

- [ ] **Step 1: Read the current layout**

Run:
```bash
cat /Users/randyren/Developer/randy-new-portfolio/app/layout.tsx
```

Expected (current state):
```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ ... });
const geistMono = Geist_Mono({ ... });

export const metadata: Metadata = {
  title: "🚀",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
};

export default function RootLayout({ ... }) { ... }
```

- [ ] **Step 2: Replace the `metadata` export**

In `app/layout.tsx`, replace this block:

```tsx
export const metadata: Metadata = {
  title: "🚀",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
};
```

with:

```tsx
export const metadata: Metadata = {
  metadataBase: new URL("https://randyren.org"),
  title: "Randy Ren — Portfolio",
  description: "Randy Ren — building agents and the interfaces around them.",
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  openGraph: {
    title: "Randy Ren — Portfolio",
    description: "Randy Ren — building agents and the interfaces around them.",
    url: "https://randyren.org",
    siteName: "Randy Ren",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Randy Ren — Portfolio",
    description: "Randy Ren — building agents and the interfaces around them.",
  },
};
```

Leave the rest of the file (`geistSans`/`geistMono` setup, `RootLayout`) untouched.

- [ ] **Step 3: Type-check**

Run:
```bash
cd /Users/randyren/Developer/randy-new-portfolio
npx tsc --noEmit
```

Expected: silent success (exit 0). If TypeScript flags `metadataBase: URL` as not assignable, ensure the `Metadata` import is still at the top of the file.

- [ ] **Step 4: Verify meta tags render in HTML**

Start the dev server:
```bash
npm run dev
```

In another shell:
```bash
curl -s http://localhost:3000 | grep -E '<(title|meta)' | head -20
```

Expected — all of these lines must be present (order may vary):
```
<title>Randy Ren — Portfolio</title>
<meta name="description" content="Randy Ren — building agents and the interfaces around them."/>
<meta property="og:title" content="Randy Ren — Portfolio"/>
<meta property="og:description" content="Randy Ren — building agents and the interfaces around them."/>
<meta property="og:url" content="https://randyren.org"/>
<meta property="og:site_name" content="Randy Ren"/>
<meta property="og:type" content="website"/>
<meta property="og:image" content="https://randyren.org/opengraph-image..."/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="Randy Ren's portfolio — pixel-art astronaut on a dark warm card."/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Randy Ren — Portfolio"/>
<meta name="twitter:description" content="Randy Ren — building agents and the interfaces around them."/>
<meta name="twitter:image" content="https://randyren.org/twitter-image..."/>
```

The `og:image` URL will include a hash query string in dev — that's expected; production URLs will be stable.

Stop the dev server.

- [ ] **Step 5: Commit**

```bash
cd /Users/randyren/Developer/randy-new-portfolio
git add app/layout.tsx
git commit -m "feat(og): full Open Graph + Twitter Card metadata"
```

---

## Task 9: Production build verification

**Files:** (none modified — verification only)

**Interfaces:**
- Consumes: all prior tasks.
- Produces: confirmation that `next build` succeeds and the OG route is bundled.

- [ ] **Step 1: Run the production build**

```bash
cd /Users/randyren/Developer/randy-new-portfolio
npm run build
```

Expected: build completes with exit 0. In the build output, look for these lines under "Route (app)":
```
○ /                       (static)
ƒ /opengraph-image        (dynamic)
ƒ /twitter-image          (dynamic)
```

`ƒ` denotes a dynamic / runtime-rendered route, which is correct for `ImageResponse`. If `/opengraph-image` shows `○` (static) instead of `ƒ`, that's also fine — it means Next pre-rendered it at build time. If it's missing entirely, the file conventions didn't pick up `app/opengraph-image.tsx` — check the filename for typos.

- [ ] **Step 2: Serve the production build and re-test the image**

```bash
npm run start
```

In another shell:
```bash
curl -s -o /tmp/randyren-og-prod.png -w "%{http_code} %{content_type}\n" http://localhost:3000/opengraph-image
file /tmp/randyren-og-prod.png
```

Expected:
```
200 image/png
/tmp/randyren-og-prod.png: PNG image data, 1200 x 630, 8-bit/color RGB, non-interlaced
```

Open it: `open /tmp/randyren-og-prod.png` — visual must match the dev render from Task 6.

Stop the production server.

- [ ] **Step 3: Commit (no changes — checkpoint only)**

If `git status` shows no changes, skip. Otherwise something leaked into the build output that should be ignored.

```bash
cd /Users/randyren/Developer/randy-new-portfolio
git status
```

Expected: `nothing to commit, working tree clean`.

---

## Task 10: Production deploy and unfurl debugger verification

**Files:** (none modified)

**Interfaces:**
- Consumes: a deployed, production version of the site at `https://randyren.org` with all of the above.
- Produces: real link-preview cards rendering correctly on the major platforms.

This task is performed against the live site after deploy. It is required because some failure modes (font path resolution under serverless, CDN caching, OG debugger refusing redirects) only surface in production.

- [ ] **Step 1: Deploy to production**

How the project is deployed is out of this plan's scope, but typical for a Vercel-linked Next.js project:

```bash
cd /Users/randyren/Developer/randy-new-portfolio
git push origin main
```

Vercel auto-deploys on push to main. Wait for the deployment to finish and the new build to be promoted to `randyren.org`. Confirm with:

```bash
curl -s -o /tmp/randyren-og-live.png -w "%{http_code} %{content_type}\n" https://randyren.org/opengraph-image
file /tmp/randyren-og-live.png
open /tmp/randyren-og-live.png
```

The live image must match the local production render from Task 9. If the live response is `200 text/html` instead of `image/png`, the deploy didn't pick up the new route — re-deploy. If the live response is `200 image/png` but the wordmark is a sans-serif, the TTF didn't ship — verify `public/fonts/PlayfairDisplay-Medium.ttf` is in the deployed artifact (check the Vercel build logs for "Tracing", which should list the font as included).

- [ ] **Step 2: Run Facebook Sharing Debugger**

Open https://developers.facebook.com/tools/debug/ — paste `https://randyren.org`, click **Scrape Again**.

Expected: image preview shows the card, title `Randy Ren — Portfolio`, description `Randy Ren — building agents and the interfaces around them.` If "Inferred Property" warnings appear for `og:image:width`/`height`, they're harmless (Next sets these via the image route, not as standalone tags).

- [ ] **Step 3: Run Twitter/X Card Validator**

Open https://cards-dev.twitter.com/validator — paste `https://randyren.org`.

Expected: card renders as `summary_large_image` with the astronaut + wordmark. (Note: Twitter has deprecated the public validator in some accounts; if the page is gated, post the URL into a draft tweet — the preview that appears in the compose UI is the card render.)

- [ ] **Step 4: Run LinkedIn Post Inspector**

Open https://www.linkedin.com/post-inspector/ — paste `https://randyren.org`, click **Inspect**.

Expected: card thumbnail and title/description match. LinkedIn aggressively caches; if it shows an old or empty preview, click **Inspect** again after a minute.

- [ ] **Step 5: Real-platform sanity check**

Paste `https://randyren.org` into:
- A note to yourself in iMessage
- A DM to yourself in Slack
- A DM to yourself in Discord

Each should unfurl with the card image, title, and description within a few seconds. Discord caches per-server, so the first paste in a given server is the authoritative render.

- [ ] **Step 6: Final commit (if any tweaks were made)**

If steps 2–5 surfaced any issues that required code changes, those are individual commits. If everything rendered first time, there's nothing to commit for this task — the deploy itself is the deliverable.

---

## Self-review

**Spec coverage:**
- "Goal" (custom 1200×630 card on randyren.org) → Tasks 5–8.
- "Non-goals" (no per-route OG, no in-page banner) → respected; no tasks add either.
- "Visual design — Canvas/Layout/Palette/Left column" → Task 5.
- "Visual design — Astronaut sprite" → Tasks 3–4.
- "Metadata content" table → Task 8.
- "Implementation approach — opengraph-image.tsx / twitter-image.tsx / layout.tsx / font asset" → Tasks 1, 2, 6, 7, 8.
- "Verification — Local route check" → Task 6 step 3, Task 9 step 2.
- "Verification — Production debugger checklist" → Task 10.
- "Risks — font loading" → Tasks 1, 2 (download + smoke test), Task 6 (visual check), Task 10 (production verify).
- "Risks — .org vs .dev" → enforced in global constraints and Task 8 + Task 5.

**Placeholder scan:** None. Every code step shows the exact code; every command shows expected output.

**Type consistency:**
- `SpritePixel.fill` (Task 3) → `p.fill` in `<Astronaut />` (Task 4). ✓
- `SpritePixel.opacity` optional (Task 3) → `p.opacity ?? 1` in `<Astronaut />` (Task 4). ✓
- `loadCardFonts(): Promise<CardFont[]>` (Task 2) → `await loadCardFonts()` consumed by `ImageResponse({ fonts: ... })` (Task 6). `CardFont` shape `{ name, data, style, weight }` matches Satori's expected `{ name, data: ArrayBuffer, style, weight }`. ✓
- Font family names: `'Playfair Display'` (Task 2) → `fontFamily: 'Playfair Display'` (Task 5). ✓
- Font family names: `'Geist Mono'` (Task 2) → `fontFamily: 'Geist Mono'` (Task 5). ✓
- `<Astronaut scale={8} />` (Task 5) calls the Task 4 signature. ✓
- Title/description string is `"Randy Ren — Portfolio"` and `"Randy Ren — building agents and the interfaces around them."` everywhere it appears (Tasks 6 alt, 8 metadata, 10 verification). ✓
