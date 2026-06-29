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
