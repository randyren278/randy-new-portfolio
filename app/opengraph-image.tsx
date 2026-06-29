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
