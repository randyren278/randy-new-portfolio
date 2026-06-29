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
            fontSize: 200,
            lineHeight: 0.9,
            letterSpacing: -14,
            color: PALETTE.fg,
          }}
        >
          <span style={{ display: 'flex' }}>Randy</span>
          <span
            style={{
              display: 'flex',
              color: PALETTE.sage,
              // Cancel the -14 letterSpacing on this glyph pair so the period
              // doesn't get pulled into the y's descender.
              marginLeft: 18,
            }}
          >
            .
          </span>
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
