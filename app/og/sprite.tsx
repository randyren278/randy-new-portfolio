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
