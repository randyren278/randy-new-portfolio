# Link-Preview Banner (OG Image) — Design

**Status:** Approved (2026-06-28)
**Owner:** Randy Ren
**Codebase:** `randy-new-portfolio` (Next.js 15, App Router, React 19)

## Goal

When someone pastes `randyren.org` into iMessage, Slack, Twitter/X, Discord, LinkedIn, Facebook, or Telegram, the URL should unfurl into a custom-designed 1200×630 rich card instead of a plain link. The card is the first impression of the portfolio for everyone who arrives via a shared link.

This is the same mechanism Stripe / Linear / Vercel / Resend use: Open Graph and Twitter Card meta tags in the document `<head>`, pointing to a single image.

## Non-goals

- No per-route OG images. The whole site shares one card.
- No dynamic content in the card (no per-recipient names, no query-param variants).
- No in-page welcome banner for arriving visitors. That was considered and explicitly cut.
- No redesign of the rest of the site.

## Visual design (locked)

**Canvas:** 1200×630, 14px corner radius is mockup-only — the exported PNG is a flat rectangle.

**Layout:** two-column grid, `1.1fr 1fr`. Left column holds the wordmark and metadata; right column holds the pixel-art sprite on its own stage.

**Palette** (pulled from Awwwards SOTY references — Lusion v3, Noomo, Opal Tadpole, Lando Norris):

| Role             | Hex        | Notes                              |
| ---------------- | ---------- | ---------------------------------- |
| Background warm  | `#14130f`  | Left column base; not pure black   |
| Background cool  | `#0a0908`  | Right column base                  |
| Foreground       | `#f1ece3`  | Bone — primary text & sprite light |
| Muted foreground | `#7a766e`  | Tag and footer mono text           |
| Sage accent      | `#c8d2b8`  | Wordmark period, status dot        |
| Blush            | `#e8c7b8`  | Sprite accent (chest light, sun)   |
| Dusty rose       | `#d4a89a`  | Sprite accent                      |
| Soft navy        | `#5a6478`  | Sprite visor mid-tone              |
| Taupe            | `#bfb6a8`  | Sprite shadow tone                 |

**Left column, top to bottom:**

1. Small uppercase mono tag: `● RANDY REN · PORTFOLIO` (sage status dot, taupe text, letter-spaced 0.22em, ~13px at 1200w).
2. Wordmark `Randy.` — serif (Times New Roman / PT Serif stack), weight 500, letter-spacing -0.06em, line-height 0.9, color bone. The trailing period is sage `#c8d2b8`. Font size scales with card width (`17cqw` in mockup → ~204px at 1200w).
3. Mono footer row: `randyren.org` left (bone) and `↗ enter` right (taupe), ~14px.

Subtle 32px×32px grid overlay on the left column at ~3% opacity, faded to transparent at the bottom 5%.

**Right column:** astronaut sprite, centered, 70% column width (~360px max). Background is a soft radial sage glow at ~5% opacity over a vertical near-black gradient, with a 24px×24px decorative grid masked to a center vignette at ~2% opacity. Drop shadow `0 6px 20px rgba(0,0,0,0.4)`.

**Astronaut sprite:** 40×56 logical pixels rendered with `shape-rendering: crispEdges`. Key features:
- Bone helmet outer (`#f1ece3`) with 4-tone shading ramp (highlight on left, mid, shadow, deep shadow on right).
- Visor: dark frame (`#1a1c24`) around a soft navy interior (`#3d4555` → `#5a6478`), with a small sage horizon reflected inside (`#c8d2b8` band over `#7a8a6a` ground line, blush sun `#e8c7b8`).
- Suit body: bone with the same 4-tone ramp.
- Chest panel: dark with three pastel indicator lights — sage, blush, dusty rose — and a thin readout strip.
- Arms, gloves, legs, boots in matching bone/taupe/warm-grey ramp. Boot accent strip is sage.
- Tiny dusty-rose antenna tip.

Full sprite SVG is preserved in the approved mockup at `.superpowers/brainstorm/87804-1782696448/content/pixel-art-v3-wordmark.html` (variant 2 — "Serif, sage period"). The implementation phase will translate this SVG-of-`<rect>`s into JSX-of-`<div>`s for Next.js `ImageResponse`.

## Metadata content

| Tag                            | Value                                                                |
| ------------------------------ | -------------------------------------------------------------------- |
| `<title>`                      | `Randy Ren — Portfolio`                                              |
| `description`                  | `Randy Ren — building agents and the interfaces around them.`        |
| `og:title`                     | same as `<title>`                                                    |
| `og:description`               | same as `description`                                                |
| `og:url`                       | `https://randyren.org`                                               |
| `og:site_name`                 | `Randy Ren`                                                          |
| `og:type`                      | `website`                                                            |
| `og:image`                     | derived from `/opengraph-image` route (Next handles the absolute URL) |
| `og:image:width`               | `1200`                                                               |
| `og:image:height`              | `630`                                                                |
| `og:image:alt`                 | `Randy Ren's portfolio — pixel-art astronaut on a dark warm card.`   |
| `twitter:card`                 | `summary_large_image`                                                |
| `twitter:title`                | same as `<title>`                                                    |
| `twitter:description`          | same as `description`                                                |
| `twitter:image`                | same as `og:image`                                                   |

The current `app/layout.tsx` only sets `title: "🚀"` and an icon. This needs to be replaced with a full `Metadata` object.

## Implementation approach

**Strategy:** Next.js App Router file-based OG image conventions, no third-party libraries.

Two new files, one modified file:

### 1. New file: `app/opengraph-image.tsx`

A file at `app/opengraph-image.tsx` that exports:
- `alt` — string used for `og:image:alt`
- `size` — `{ width: 1200, height: 630 }`
- `contentType` — `'image/png'`
- Default async function returning a Next.js `ImageResponse` that renders the card JSX.

The JSX renders the approved design using inline styles (since `ImageResponse` uses a subset of CSS — no container queries, no external stylesheets, no `cqw`; everything switches back to absolute px values calibrated to the 1200×630 canvas).

The astronaut sprite renders as a grid of absolutely-positioned `<div>`s with explicit `top/left/width/height/background` — not SVG — because `ImageResponse` (Satori under the hood) handles `<div>` reliably and SVG support is more limited. Each "pixel" of the 40×56 sprite becomes one `<div>` at scale (8px per logical pixel → 320×448 final sprite footprint on the card).

Fonts: Next.js's `ImageResponse` requires fonts to be loaded explicitly (Google Fonts won't auto-fetch). Approach:
- Use the same Geist font already loaded in the rest of the app, fetched at build time from `next/font/google` as a `.ttf`/`.woff` Buffer passed to `ImageResponse({ fonts: [...] })`.
- For the serif wordmark, ship **Playfair Display, weight 500** as a TTF the same way (its high-contrast strokes match the editorial mockup; PT Serif is a flatter, more transitional cut and was rejected). A serif is essential — `Times New Roman` will not be available in the rendering environment, so a CSS fallback alone would silently substitute system sans.
- For the mono tag/footer, JetBrains Mono or use a system mono CSS stack — Satori has reasonable fallback behavior for monospace.

The file is recompiled by Next on demand; the generated PNG is cached by the Vercel CDN.

### 2. New file: `app/twitter-image.tsx`

Re-exports the same default function from `opengraph-image.tsx` with the same `alt` / `size` / `contentType`. Next.js wires this to `<meta name="twitter:image">` automatically. (Identical image, but Next requires the separate file convention to populate the Twitter-specific meta.)

### 3. Modified: `app/layout.tsx`

Replace the existing `metadata` object with a complete one:

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://randyren.org'),
  title: 'Randy Ren — Portfolio',
  description: 'Randy Ren — building agents and the interfaces around them.',
  icons: { /* unchanged */ },
  openGraph: {
    title: 'Randy Ren — Portfolio',
    description: 'Randy Ren — building agents and the interfaces around them.',
    url: 'https://randyren.org',
    siteName: 'Randy Ren',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Randy Ren — Portfolio',
    description: 'Randy Ren — building agents and the interfaces around them.',
  },
};
```

Note: `openGraph.images` and `twitter.images` are populated automatically by Next when `opengraph-image.tsx` / `twitter-image.tsx` exist. `metadataBase` is required so the auto-generated `og:image` URL is absolute, not relative.

The existing `🚀` emoji title is replaced. The icon entry is preserved.

## File-by-file changes

| File                              | Change   | Purpose                                      |
| --------------------------------- | -------- | -------------------------------------------- |
| `app/layout.tsx`                  | Modified | Replace `metadata` with full OG/Twitter set  |
| `app/opengraph-image.tsx`         | New      | Renders the 1200×630 PNG via `ImageResponse` |
| `app/twitter-image.tsx`           | New      | Re-export for Twitter Card auto-wiring       |
| `public/fonts/PlayfairDisplay-Medium.ttf` | New      | Serif wordmark; loaded as Buffer in OG route |

`InteractivePortfolio.tsx` and the rest of the site are not touched.

## Verification

**Local:** `npm run dev`, open `http://localhost:3000/opengraph-image` directly in a browser — should render the PNG. Compare visually against the approved mockup at `.superpowers/brainstorm/87804-1782696448/content/pixel-art-v3-wordmark.html` variant 2.

**Production:** After deploy, paste `https://randyren.org` into the following debuggers:
- Facebook Sharing Debugger (`developers.facebook.com/tools/debug/`)
- Twitter/X Card Validator (`cards-dev.twitter.com/validator`)
- LinkedIn Post Inspector (`linkedin.com/post-inspector`)
- iMessage / Slack / Discord — paste into a real DM to yourself.

Each should show the card with title, description, and image. Cached previews on these platforms can be slow to update; force a re-scrape using each debugger.

## Risks and tradeoffs

- **Font loading:** `ImageResponse` font handling is the most common failure mode. The chosen serif (Playfair / PT Serif) must be loaded as a Buffer at request time, or the wordmark silently falls back to a system sans and the entire design feel is lost. The implementation must verify the rendered PNG before declaring done.
- **Pixel-art at small thumbnail sizes:** Some platforms (Slack mobile, Twitter timeline) render the card at very small sizes. The 40×56 sprite is detailed enough to survive, but the chest-light row is the first thing to mush together at thumbnail. Acceptable.
- **`.org` vs `.dev` mismatch:** Footer in the mockup said `randyren.dev`. Implementation must use `randyren.org` everywhere — in the card footer text, in `metadataBase`, and in `og:url`.
- **One-card-for-everything:** Every shared link gets the same card. Future per-route variants (e.g., `/castle` showing a castle sprite) are out of scope but the file structure leaves the door open — `app/castle/opengraph-image.tsx` would just work.

## Out of scope (parked)

- Animated/motion OG cards (Telegram supports MP4, others don't — not worth the asymmetry).
- Programmatic per-share-context cards (e.g., from-LinkedIn variants).
- Updating favicon / app icon to match the new visual language.
- The "🚀" emoji as the browser-tab title — replaced cleanly, but if there's later sentiment to keep it as an Easter egg, that's a separate decision.
