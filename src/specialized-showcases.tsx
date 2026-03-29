import React from "react";
import {
  AbsoluteFill,
  Easing,
  Loop,
  interpolate,
  interpolateColors,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const palette = {
  ink: "#020617",
  slate: "#0f172a",
  white: "#f8fafc",
  blue: "#3b82f6",
  cyan: "#22d3ee",
  emerald: "#10b981",
  amber: "#f59e0b",
  pink: "#ec4899",
  violet: "#8b5cf6",
  red: "#ef4444",
};

export const CORPORATE_PROMO_DURATION = 180;
export const SAAS_DEMO_DURATION = 210;
export const YOUTUBE_MOTION_DURATION = 180;

const center: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const clampInterpolate = (
  frame: number,
  input: readonly number[],
  output: readonly number[],
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const stageBackground = (a: string, b: string): React.CSSProperties => ({
  background: `
    radial-gradient(circle at 14% 18%, ${a}44 0%, transparent 30%),
    radial-gradient(circle at 84% 22%, ${b}44 0%, transparent 28%),
    linear-gradient(135deg, ${palette.ink} 0%, ${palette.slate} 60%, #172554 100%)
  `,
});

const chromeLabel = (label: string) => (
  <div
    style={{
      position: "absolute",
      top: 28,
      left: 32,
      padding: "10px 14px",
      borderRadius: 999,
      background: "rgba(2,6,23,0.58)",
      border: "1px solid rgba(255,255,255,0.12)",
      color: "rgba(248,250,252,0.82)",
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
    }}
  >
    {label}
  </div>
);

export const CorporatePromoShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const hero = spring({
    frame,
    fps,
    durationInFrames: 40,
    config: { damping: 16, stiffness: 110, mass: 1 },
  });
  const beamSweep = clampInterpolate(frame, [18, 86], [-260, 1320]);
  const ringRotate = frame * 1.6;
  const metricRise = spring({
    frame: frame - 68,
    fps,
    durationInFrames: 26,
    config: { damping: 11, stiffness: 150, mass: 0.8 },
  });
  return (
    <AbsoluteFill style={stageBackground(palette.violet, palette.cyan)}>
      {chromeLabel("Corporate Promo")}
      <AbsoluteFill style={center}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 260 + i * 120,
              height: 260 + i * 120,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,${0.16 - i * 0.02})`,
              transform: `rotate(${ringRotate * (i % 2 === 0 ? 1 : -1)}deg) scale(${1 + Math.sin(frame / 20 + i) * 0.02})`,
            }}
          />
        ))}
        <div
          style={{
            maxWidth: 980,
            textAlign: "center",
            transform: `translateY(${interpolate(hero, [0, 1], [42, 0])}px)`,
            opacity: interpolate(hero, [0, 1], [0, 1]),
          }}
        >
          <div
            style={{
              color: "rgba(248,250,252,0.76)",
              fontSize: 22,
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            Trust / Scale / Precision
          </div>
          <div
            style={{
              color: palette.white,
              fontSize: 98,
              lineHeight: 0.92,
              fontWeight: 900,
              textShadow: "0 0 28px rgba(34,211,238,0.28)",
            }}
          >
            Premium motion for corporate storytelling
          </div>
          <div
            style={{
              color: "rgba(248,250,252,0.76)",
              fontSize: 26,
              lineHeight: 1.45,
              marginTop: 24,
            }}
          >
            Large-type reveals, cinematic rings, metric cards, and editorial light
            sweeps create a sharper brand-film tone.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: -140,
            bottom: -140,
            width: 180,
            transform: `translateX(${beamSweep}px) skewX(-18deg)`,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.78), transparent)",
            filter: "blur(12px)",
            opacity: clampInterpolate(frame, [16, 28, 92], [0, 1, 0]),
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 58,
            left: 80,
            right: 80,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 18,
          }}
        >
          {[
            ["Global Rollout", "48 Regions"],
            ["Brand Lift", "+27% Recall"],
            ["Delivery", "Frame-accurate"],
          ].map(([title, value], i) => (
            <div
              key={title}
              style={{
                padding: 24,
                borderRadius: 24,
                background: "rgba(15,23,42,0.72)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 24px 64px rgba(0,0,0,0.22)",
                transform: `translateY(${interpolate(metricRise, [0, 1], [38 + i * 12, 0])}px)`,
                opacity: interpolate(metricRise, [0, 1], [0, 1]),
              }}
            >
              <div style={{ color: "rgba(248,250,252,0.62)", fontSize: 16 }}>{title}</div>
              <div
                style={{
                  color: palette.white,
                  fontSize: 34,
                  fontWeight: 800,
                  marginTop: 10,
                }}
              >
                  {value}
              </div>
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const SaasDemoShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const shell = spring({
    frame,
    fps,
    durationInFrames: 32,
    config: { damping: 14, stiffness: 140, mass: 0.8 },
  });
  const cursorX = clampInterpolate(frame, [18, 54, 104, 148], [180, 420, 820, 640]);
  const cursorY = clampInterpolate(frame, [18, 54, 104, 148], [560, 250, 290, 470]);
  const modal = spring({
    frame: frame - 108,
    fps,
    durationInFrames: 28,
    config: { damping: 11, stiffness: 170, mass: 0.7 },
  });
  const trend = [42, 58, 71, 69, 84, 92];
  return (
    <AbsoluteFill style={stageBackground(palette.blue, palette.emerald)}>
      {chromeLabel("SaaS Demo")}
      <AbsoluteFill style={{ ...center, padding: "74px 76px" }}>
        <div
          style={{
            width: 1130,
            height: 580,
            borderRadius: 30,
            overflow: "hidden",
            background: "rgba(8,15,30,0.88)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 28px 90px rgba(0,0,0,0.34)",
            transform: `translateY(${interpolate(shell, [0, 1], [34, 0])}px) scale(${0.96 + shell * 0.04})`,
            opacity: interpolate(shell, [0, 1], [0, 1]),
            display: "grid",
            gridTemplateColumns: "260px 1fr",
          }}
        >
          <div
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              padding: 26,
            }}
          >
            <div style={{ color: palette.white, fontSize: 26, fontWeight: 800 }}>PulseStack</div>
            <div style={{ marginTop: 24, display: "grid", gap: 10 }}>
              {["Overview", "Funnels", "Automation", "Segments", "Exports"].map(
                (item, i) => (
                  <div
                    key={item}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 16,
                      background:
                        i === 2 ? "rgba(16,185,129,0.18)" : "rgba(255,255,255,0.03)",
                      color: "rgba(248,250,252,0.9)",
                      fontSize: 18,
                      fontWeight: i === 2 ? 700 : 500,
                    }}
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
          <div style={{ position: "relative", padding: 24 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
              }}
            >
              {[
                ["MRR", "$182k"],
                ["Trials", "3,842"],
                ["CAC", "$61"],
                ["Win Rate", "28.1%"],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  style={{
                    padding: 18,
                    borderRadius: 20,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transform: `translateY(${clampInterpolate(frame, [i * 4, 20 + i * 4], [24, 0])}px)`,
                    opacity: clampInterpolate(frame, [i * 4, 18 + i * 4], [0, 1]),
                  }}
                >
                  <div style={{ color: "rgba(248,250,252,0.58)", fontSize: 14 }}>{label}</div>
                  <div style={{ color: palette.white, fontSize: 30, fontWeight: 800, marginTop: 10 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 16,
                height: 324,
                borderRadius: 24,
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: 24,
                position: "relative",
              }}
            >
              <div style={{ color: palette.white, fontSize: 20, fontWeight: 700 }}>
                Pipeline acceleration
              </div>
              <svg
                width="100%"
                height="250"
                viewBox="0 0 760 250"
                style={{ position: "absolute", left: 18, right: 18, bottom: 18 }}
              >
                <defs>
                  <linearGradient id="saas-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={palette.cyan} />
                    <stop offset="100%" stopColor={palette.emerald} />
                  </linearGradient>
                </defs>
                <polyline
                  fill="none"
                  stroke="url(#saas-line)"
                  strokeWidth="8"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  points={trend
                    .map((v, i) => `${i * 130 + 30},${220 - v * 2}`)
                    .join(" ")}
                  style={{
                    strokeDasharray: 1000,
                    strokeDashoffset: 1000 - 1000 * clampInterpolate(frame, [30, 92], [0, 1]),
                  }}
                />
                {trend.map((v, i) => (
                  <circle
                    key={i}
                    cx={i * 130 + 30}
                    cy={220 - v * 2}
                    r={8}
                    fill={palette.white}
                    opacity={clampInterpolate(frame, [38 + i * 6, 48 + i * 6], [0, 1])}
                  />
                ))}
              </svg>
            </div>
            <div
              style={{
                position: "absolute",
                left: cursorX,
                top: cursorY,
                width: 0,
                height: 0,
                borderLeft: "18px solid #fff",
                borderTop: "12px solid transparent",
                borderBottom: "12px solid transparent",
                transform: "rotate(-12deg)",
                filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.38))",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 32,
                bottom: 30,
                width: 340,
                padding: 22,
                borderRadius: 22,
                background: "rgba(2,6,23,0.92)",
                border: "1px solid rgba(255,255,255,0.1)",
                transform: `translateY(${interpolate(modal, [0, 1], [64, 0])}px) scale(${modal})`,
                transformOrigin: "bottom right",
              }}
            >
              <div style={{ color: palette.white, fontSize: 24, fontWeight: 800 }}>
                Autopilot active
              </div>
              <div
                style={{
                  color: "rgba(248,250,252,0.72)",
                  fontSize: 17,
                  lineHeight: 1.45,
                  marginTop: 10,
                }}
              >
                Cursor pathing, chart drawing, staged counters, and elastic modal
                timing make the demo feel more product-marketing ready.
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const YouTubeMotionShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopDuration = 30;
  const burst = spring({
    frame,
    fps,
    durationInFrames: 24,
    config: { damping: 9, stiffness: 190, mass: 0.5 },
  });
  return (
    <AbsoluteFill style={stageBackground(palette.red, palette.amber)}>
      {chromeLabel("YouTube Motion")}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />
      <AbsoluteFill style={{ ...center, flexDirection: "column" }}>
        <div
          style={{
            transform: `scale(${0.92 + burst * 0.08})`,
            opacity: interpolate(burst, [0, 1], [0, 1]),
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 122,
              lineHeight: 0.9,
              fontWeight: 900,
              color: palette.white,
              textShadow: "0 0 26px rgba(245,158,11,0.3)",
            }}
          >
            WATCH
          </div>
          <div
            style={{
              fontSize: 122,
              lineHeight: 0.9,
              fontWeight: 900,
              color: palette.amber,
              marginTop: -6,
            }}
          >
            THIS
          </div>
        </div>
        <Loop durationInFrames={loopDuration}>
          <div style={{ position: "relative", width: 1040, height: 360, marginTop: 18 }}>
            {["FAST", "LOUD", "CLEAR", "SHARE"].map((word, i) => {
              const localFrame = (frame + i * 6) % loopDuration;
              const progress = spring({
                frame: localFrame,
                fps,
                durationInFrames: 18,
                config: { damping: 10, stiffness: 170, mass: 0.6 },
              });
              const x = interpolate(progress, [0, 1], [260, 0], {
                easing: Easing.out(Easing.back(1.8)),
              });
              const scale = 0.88 + progress * 0.12;
              return (
                <div
                  key={word}
                  style={{
                    position: "absolute",
                    left: 80 + i * 34,
                    top: 28 + i * 68,
                    color: i % 2 === 0 ? palette.white : palette.pink,
                    fontSize: 86,
                    fontWeight: 900,
                    letterSpacing: "-0.05em",
                    transform: `translateX(${x}px) scale(${scale}) skewX(${interpolate(progress, [0, 1], [14, 0])}deg)`,
                    opacity: interpolate(progress, [0, 1], [0, 1]),
                  }}
                >
                  {word}
                </div>
              );
            })}
          </div>
        </Loop>
        <div
          style={{
            position: "absolute",
            bottom: 84,
            left: 84,
            right: 84,
            display: "flex",
            gap: 12,
            alignItems: "end",
            height: 180,
          }}
        >
          {Array.from({ length: 48 }).map((_, i) => {
            const value = (Math.sin(frame / 4 + i / 2) + Math.sin(frame / 9 + i / 6) + 2) / 4;
            const height = 28 + value * 150;
            const color = interpolateColors(
              i / 48,
              [0, 0.5, 1],
              [palette.red, palette.amber, palette.pink],
            );
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height,
                  borderRadius: 999,
                  background: color,
                  boxShadow: `0 0 22px ${color}44`,
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
