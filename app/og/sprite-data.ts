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
