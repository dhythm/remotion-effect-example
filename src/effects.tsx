import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const palette = {
  bg: "#020617",
  panel: "#0f172a",
  panelAlt: "#111827",
  white: "#f8fafc",
  blue: "#3b82f6",
  blueDeep: "#1d4ed8",
  cyan: "#22d3ee",
  teal: "#14b8a6",
  pink: "#ec4899",
  violet: "#8b5cf6",
  yellow: "#facc15",
  green: "#22c55e",
};

const SCENE_DURATION = 90;

const full: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const center: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const labelStyle: React.CSSProperties = {
  position: "absolute",
  top: 36,
  left: 40,
  padding: "10px 16px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(2, 6, 23, 0.7)",
  color: "rgba(248, 250, 252, 0.92)",
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  backdropFilter: "blur(12px)",
};

const backgroundGlow = (
  colorA: string,
  colorB: string,
): React.CSSProperties => ({
  background: `
    radial-gradient(circle at 20% 20%, ${colorA}55 0%, transparent 35%),
    radial-gradient(circle at 80% 25%, ${colorB}55 0%, transparent 30%),
    radial-gradient(circle at 50% 90%, rgba(255,255,255,0.08) 0%, transparent 25%),
    linear-gradient(135deg, ${palette.bg}, ${palette.panel})
  `,
});

const frameClamp = (frame: number, input: number[], output: number[]) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const SceneShell: React.FC<{
  title: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ title, style, children }) => {
  return (
    <AbsoluteFill style={{ ...backgroundGlow(palette.blue, palette.cyan), ...style }}>
      <div style={labelStyle}>{title}</div>
      {children}
    </AbsoluteFill>
  );
};

const NoiseGrid: React.FC<{ opacity?: number }> = ({ opacity = 0.08 }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)
        `,
        backgroundSize: "120px 120px",
      }}
    />
  );
};

const ScenicBackground: React.FC<{ zoom?: number; panX?: number; panY?: number }> = ({
  zoom = 1,
  panX = 0,
  panY = 0,
}) => {
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
      }}
    >
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, #082f49 0%, #0f172a 45%, #172554 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "10% 8% auto auto",
          width: 260,
          height: 260,
          borderRadius: "50%",
          background: "radial-gradient(circle, #fde68a, rgba(253, 230, 138, 0.1))",
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -120,
          left: -100,
          width: 900,
          height: 420,
          borderRadius: "50%",
          background: "linear-gradient(180deg, #1d4ed8 0%, #0f172a 80%)",
          transform: "rotate(-8deg)",
          opacity: 0.65,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -140,
          right: -140,
          width: 1000,
          height: 460,
          borderRadius: "50%",
          background: "linear-gradient(180deg, #312e81 0%, #0f172a 90%)",
          transform: "rotate(12deg)",
          opacity: 0.8,
        }}
      />
    </AbsoluteFill>
  );
};

export const effectScenes = [
  "Popping Text",
  "Circular Progress",
  "Pixel Transition",
  "Chart Animation",
  "Ken Burns",
  "Zoom Pulse",
  "Parallax Pan",
  "Bubble Pop Text",
  "Floating Text Chip",
  "Pulsing Text",
  "Liquid Wave",
  "Glitch Text",
  "Card Flip",
  "Animated Text",
  "Bounce Text",
  "Slide Text",
  "Particle Explosion",
  "Typewriter Subtitle",
  "Matrix Rain",
  "Geometric Patterns",
  "Sound Wave",
  "Animated List",
] as const;

export const sceneDurationInFrames = SCENE_DURATION;
export const totalDurationInFrames = effectScenes.length * SCENE_DURATION;

const PoppingTextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const text = "BINGO!".split("");
  const colors = [palette.cyan, palette.blue, "#93c5fd"];
  return (
    <SceneShell title="Popping Text">
      <NoiseGrid />
      <div style={{ ...full, ...center, perspective: 1000 }}>
        {text.map((char, i) => {
          const delay = i * 6;
          const lift = spring({
            frame: frame - delay,
            fps,
            from: 140,
            to: 0,
            config: { damping: 9, stiffness: 130, mass: 0.6 },
          });
          const scale = spring({
            frame: frame - delay,
            fps,
            from: 0,
            to: 1,
            config: { damping: 8, stiffness: 160, mass: 0.4 },
          });
          const rotate = Math.sin((frame - delay) / 10) * 8;
          return (
            <span
              key={char + i}
              style={{
                display: "inline-block",
                margin: "0 10px",
                fontSize: 150,
                fontWeight: 900,
                color: colors[i % colors.length],
                fontFamily: "Impact, Haettenschweiler, sans-serif",
                transform: `translateY(${lift}px) scale(${scale}) rotate(${rotate}deg) rotateY(${rotate * 1.8}deg)`,
                textShadow: `0 0 24px ${colors[i % colors.length]}88, 0 8px 30px rgba(0,0,0,0.35)`,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </SceneShell>
  );
};

const CircularProgressScene: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = frameClamp(frame, [0, SCENE_DURATION - 1], [0, 100]);
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (progress / 100) * circumference;
  return (
    <SceneShell title="Circular Progress" style={backgroundGlow("#1d4ed8", "#0ea5e9")}>
      <NoiseGrid opacity={0.05} />
      <div style={{ ...full, ...center }}>
        <div
          style={{
            position: "relative",
            width: 420,
            height: 420,
            transform: `scale(${1 + Math.sin(frame / 12) * 0.04})`,
          }}
        >
          <svg width="420" height="420" viewBox="0 0 420 420">
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={palette.cyan} />
                <stop offset="100%" stopColor={palette.blue} />
              </linearGradient>
            </defs>
            <circle
              cx="210"
              cy="210"
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="18"
            />
            <circle
              cx="210"
              cy="210"
              r={radius}
              fill="none"
              stroke="url(#progress-gradient)"
              strokeWidth="18"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-90 210 210)"
            />
            <circle
              cx="210"
              cy="90"
              r="11"
              fill={palette.cyan}
              transform={`rotate(${frame * 4} 210 210)`}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              ...center,
              flexDirection: "column",
              color: palette.white,
            }}
          >
            <div style={{ fontSize: 84, fontWeight: 900 }}>{Math.round(progress)}%</div>
            <div style={{ fontSize: 24, opacity: 0.7, letterSpacing: "0.2em" }}>LOADING</div>
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

const PixelTransitionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const size = 40;
  const cols = Math.ceil(width / size);
  const rows = Math.ceil(height / size);
  const pixels: React.ReactNode[] = [];
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const seed = y * 1000 + x;
      const delay = Math.floor(random(seed) * 55);
      if (frame < delay) continue;
      const hue = 190 + Math.floor(random(seed + 1) * 60);
      const lightness = 40 + Math.floor(random(seed + 2) * 35);
      pixels.push(
        <div
          key={`${x}-${y}`}
          style={{
            position: "absolute",
            left: x * size,
            top: y * size,
            width: size,
            height: size,
            backgroundColor: `hsl(${hue}, 85%, ${lightness}%)`,
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
          }}
        />,
      );
    }
  }
  return (
    <SceneShell title="Pixel Transition" style={{ background: "#020617" }}>
      <AbsoluteFill>{pixels}</AbsoluteFill>
      <div
        style={{
          position: "absolute",
          inset: 0,
          ...center,
          color: "rgba(255,255,255,0.75)",
          fontSize: 96,
          fontWeight: 900,
          letterSpacing: "0.2em",
          mixBlendMode: "screen",
        }}
      >
        PIXELS
      </div>
    </SceneShell>
  );
};

const ChartAnimationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const data = [
    ["Jan", 50],
    ["Feb", 80],
    ["Mar", 30],
    ["Apr", 70],
    ["May", 45],
    ["Jun", 90],
    ["Jul", 60],
    ["Aug", 75],
    ["Sep", 40],
    ["Oct", 85],
  ] as const;
  const colors = ["#4361ee", "#3a0ca3", "#7209b7", "#f72585", "#4cc9f0", "#4895ef"];
  const chartWidth = 980;
  const chartHeight = 520;
  const padding = 70;
  const barWidth = ((chartWidth - padding * 2) / data.length) * 0.7;
  return (
    <SceneShell title="Chart Animation" style={{ background: "linear-gradient(135deg, #0f172a, #111827, #1e293b)" }}>
      <div style={{ ...full, ...center }}>
        <div
          style={{
            width: chartWidth,
            height: chartHeight,
            background: "rgba(15, 23, 42, 0.85)",
            borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
            position: "relative",
            padding: 24,
          }}
        >
          <svg width={chartWidth} height={chartHeight}>
            <line
              x1={padding}
              y1={chartHeight - padding}
              x2={chartWidth - padding}
              y2={chartHeight - padding}
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="2"
            />
            {data.map(([label, value], i) => {
              const x = padding + ((chartWidth - padding * 2) / data.length) * i + barWidth * 0.15;
              const progress = frameClamp(frame, [i * 3, i * 3 + 18], [0, 1]);
              const barHeight = ((chartHeight - padding * 2) * value * progress) / 100;
              const y = chartHeight - padding - barHeight;
              return (
                <g key={label}>
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    rx={10}
                    fill={colors[i % colors.length]}
                  />
                  <text
                    x={x + barWidth / 2}
                    y={chartHeight - padding + 32}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.72)"
                    fontSize="20"
                  >
                    {label}
                  </text>
                  {progress > 0.9 ? (
                    <text
                      x={x + barWidth / 2}
                      y={y - 16}
                      textAnchor="middle"
                      fill="#fff"
                      fontSize="20"
                      fontWeight="bold"
                    >
                      {value}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
          <div
            style={{
              position: "absolute",
              top: 28,
              left: 36,
              color: palette.white,
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            Monthly Performance
          </div>
          <div
            style={{
              position: "absolute",
              top: 68,
              left: 36,
              color: "rgba(248,250,252,0.66)",
              fontSize: 20,
            }}
          >
            Data visualization for 2023
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

const KenBurnsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = frameClamp(frame, [0, SCENE_DURATION], [1, 1.22]);
  const panX = frameClamp(frame, [0, SCENE_DURATION], [0, -70]);
  const panY = frameClamp(frame, [0, SCENE_DURATION], [0, -36]);
  return (
    <SceneShell title="Ken Burns">
      <ScenicBackground zoom={zoom} panX={panX} panY={panY} />
      <AbsoluteFill
        style={{
          background: "linear-gradient(180deg, transparent 50%, rgba(2,6,23,0.45) 100%)",
        }}
      />
    </SceneShell>
  );
};

const ZoomPulseScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = 1 + Math.sin(frame / 12) * 0.04;
  return (
    <SceneShell title="Zoom Pulse" style={{ background: "#030712" }}>
      <ScenicBackground zoom={zoom} />
    </SceneShell>
  );
};

const ParallaxPanScene: React.FC = () => {
  const frame = useCurrentFrame();
  const x = frameClamp(frame, [0, SCENE_DURATION], [0, -120]);
  return (
    <SceneShell title="Parallax Pan" style={{ background: "#020617" }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: -80, transform: `translateX(${x}px) scale(1.18)` }}>
          <ScenicBackground />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 60% 30%, rgba(34,211,238,0.18), transparent 25%)",
          }}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};

const BubblePopTextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const text = "HELLO".split("");
  return (
    <SceneShell title="Bubble Pop Text">
      <NoiseGrid />
      <div style={{ ...full, ...center, gap: 16 }}>
        {text.map((char, i) => {
          const scale = spring({
            frame: frame - i * 5,
            fps,
            from: 0,
            to: 1,
            config: { damping: 8, mass: 0.35, stiffness: 120 },
          });
          return (
            <div
              key={char + i}
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                ...center,
                transform: `scale(${scale})`,
                background: `linear-gradient(135deg, ${palette.blueDeep}, ${palette.blue})`,
                border: "4px solid rgba(255,255,255,0.18)",
                color: "#fff",
                fontSize: 68,
                fontWeight: 900,
                boxShadow: "0 10px 30px rgba(59,130,246,0.35)",
              }}
            >
              {char}
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};

const FloatingTextChipScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 12, mass: 0.5 } });
  const floatY = Math.sin(frame / 15) * 18;
  const borderRotation = frame * 2;
  return (
    <SceneShell title="Floating Text Chip">
      <NoiseGrid opacity={0.04} />
      <div style={{ ...full, ...center }}>
        <div
          style={{
            position: "relative",
            padding: "34px 58px",
            borderRadius: 28,
            overflow: "hidden",
            transform: `translateY(${floatY}px) scale(${scale})`,
            boxShadow: "0 18px 60px rgba(0,0,0,0.3)",
            background: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: -3,
              background: `conic-gradient(from ${borderRotation}deg, ${palette.cyan}, ${palette.violet}, ${palette.pink}, ${palette.cyan})`,
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              background: "linear-gradient(135deg, #0f172a, #1e293b)",
              borderRadius: 24,
              padding: "28px 48px",
              color: palette.white,
              fontSize: 84,
              fontWeight: 800,
              letterSpacing: "-0.04em",
            }}
          >
            Floating
          </div>
        </div>
      </div>
    </SceneShell>
  );
};

const PulsingTextScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell title="Pulsing Text">
      <div style={{ ...full, ...center, gap: 18 }}>
        {"PULSE".split("").map((char, i) => {
          const t = ((frame - i * 5 + 120) % 30) / 30;
          const pulse = interpolate(t, [0, 0.5, 1], [1, 1.24, 1]);
          const opacity = interpolate(t, [0, 0.5, 1], [0.4, 1, 0.4]);
          return (
            <div key={char + i} style={{ position: "relative", transform: `scale(${pulse})` }}>
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  borderRadius: "50%",
                  background: "rgba(34,211,238,0.22)",
                  filter: "blur(22px)",
                  opacity,
                }}
              />
              <div style={{ position: "relative", color: "#fff", fontSize: 110, fontWeight: 800 }}>
                {char}
              </div>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};

const LiquidWaveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const points = Array.from({ length: 41 }, (_, i) => {
    const x = (i / 40) * width;
    const y = height / 2 + Math.sin(frame / 10 + i / 2.4) * 80;
    return `${x},${y}`;
  }).join(" ");
  return (
    <SceneShell title="Liquid Wave" style={{ background: "#020617" }}>
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={palette.blueDeep} />
            <stop offset="50%" stopColor={palette.cyan} />
            <stop offset="100%" stopColor={palette.violet} />
          </linearGradient>
        </defs>
        <path
          d={`M 0 ${height} L ${points} L ${width} ${height} Z`}
          fill="url(#wave-gradient)"
          style={{ filter: "blur(10px)" }}
        />
      </svg>
    </SceneShell>
  );
};

const GlitchTextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const offset = Math.sin(frame / 4) * 8;
  const jitter = Math.sin(frame / 7) * 12;
  return (
    <SceneShell title="Glitch Text" style={{ background: "#000" }}>
      <NoiseGrid opacity={0.06} />
      <div style={{ ...full, ...center, color: "#fff", fontFamily: "monospace", fontSize: 120, fontWeight: 800 }}>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", color: "cyan", transform: `translate(${offset}px, ${jitter}px)` }}>
            GLITCH
          </div>
          <div
            style={{
              position: "absolute",
              color: "magenta",
              transform: `translate(${-offset}px, ${-jitter}px)`,
            }}
          >
            GLITCH
          </div>
          <div>GLITCH</div>
        </div>
      </div>
    </SceneShell>
  );
};

const CardFlipScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame, fps, durationInFrames: SCENE_DURATION, config: { damping: 12, mass: 0.7 } });
  const rotation = interpolate(progress, [0, 1], [0, 360]);
  return (
    <SceneShell title="Card Flip">
      <div style={{ ...full, ...center, perspective: 1200 }}>
        <div
          style={{
            width: 340,
            height: 440,
            position: "relative",
            transformStyle: "preserve-3d",
            transform: `rotateY(${rotation}deg)`,
          }}
        >
          {[
            { text: "Remotion", rotate: 0 },
            { text: "Back", rotate: 180 },
          ].map((side) => (
            <div
              key={side.text}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 24,
                ...center,
                color: "#fff",
                fontSize: 58,
                fontWeight: 800,
                backfaceVisibility: "hidden",
                background: "linear-gradient(135deg, #1d4ed8, #22d3ee)",
                boxShadow: "0 20px 80px rgba(34,211,238,0.25)",
                transform: `rotateY(${side.rotate}deg)`,
              }}
            >
              {side.text}
            </div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
};

const AnimatedTextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneShell title="Animated Text">
      <div style={{ ...full, ...center }}>
        {"Hello Remotion".split("").map((char, i) => {
          const opacity = spring({ frame: frame - i * 3, fps, config: { damping: 10 } });
          const lift = spring({
            frame: frame - i * 3,
            fps,
            from: 60,
            to: 0,
            config: { damping: 12 },
          });
          const rotate = spring({
            frame: frame - i * 3,
            fps,
            from: -180,
            to: 0,
            config: { damping: 12 },
          });
          return (
            <span
              key={char + i}
              style={{
                display: "inline-block",
                color: "#fff",
                fontSize: 84,
                fontWeight: 800,
                opacity,
                transform: `translateY(${lift}px) rotate(${rotate}deg)`,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </div>
    </SceneShell>
  );
};

const BounceTextScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell title="Bounce Text">
      <div style={{ ...full, ...center, gap: 8 }}>
        {"BOUNCE".split("").map((char, i) => {
          const y = Math.abs(Math.sin((frame - i * 4) / 8)) * -90;
          return (
            <span
              key={char + i}
              style={{
                display: "inline-block",
                transform: `translateY(${y}px)`,
                color: i % 2 === 0 ? palette.yellow : "#fff",
                fontSize: 112,
                fontWeight: 900,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </SceneShell>
  );
};

const SlideTextScene: React.FC = () => {
  const frame = useCurrentFrame();
  const x = frameClamp(frame, [0, 22], [-1100, 0]);
  const sheen = frameClamp(frame, [10, 40], [-220, 420]);
  return (
    <SceneShell title="Slide Text">
      <div style={{ ...full, ...center }}>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "24px 38px",
            borderRadius: 22,
            background: "rgba(15,23,42,0.6)",
            border: "1px solid rgba(255,255,255,0.12)",
            transform: `translateX(${x}px)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -10,
              bottom: -10,
              width: 160,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
              transform: `translateX(${sheen}px) skewX(-20deg)`,
            }}
          />
          <div style={{ color: "#fff", fontSize: 100, fontWeight: 900 }}>Sliding Text!</div>
        </div>
      </div>
    </SceneShell>
  );
};

const ParticleExplosionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const particles = Array.from({ length: 96 }, (_, i) => {
    const angle = random(i) * Math.PI * 2;
    const distance = frameClamp(frame, [0, 45], [0, 320 + random(i + 1) * 180]);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    const size = 8 + random(i + 2) * 16;
    const hue = 180 + random(i + 3) * 180;
    return { x, y, size, color: `hsl(${hue}, 90%, 64%)` };
  });
  const boomOpacity = frame < 15 ? 1 : frameClamp(frame, [15, 45], [1, 0]);
  return (
    <SceneShell title="Particle Explosion">
      <div style={{ ...full, ...center }}>
        {particles.map((particle, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: particle.size,
              height: particle.size,
              borderRadius: "50%",
              background: particle.color,
              transform: `translate(${particle.x}px, ${particle.y}px)`,
              boxShadow: `0 0 16px ${particle.color}`,
            }}
          />
        ))}
        <div
          style={{
            color: "#fff",
            fontSize: 110,
            fontWeight: 900,
            opacity: boomOpacity,
            textShadow: "0 0 24px rgba(255,255,255,0.3)",
          }}
        >
          BOOM!
        </div>
      </div>
    </SceneShell>
  );
};

const TypewriterSubtitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const text = "There has never been a better time to build with Remotion.";
  const visible = Math.floor(frame / 2);
  return (
    <SceneShell title="Typewriter Subtitle">
      <div style={{ ...full, ...center, flexDirection: "column", color: "#fff" }}>
        <div style={{ fontSize: 96, fontWeight: 900, marginBottom: 22 }}>Start Building</div>
        <div
          style={{
            maxWidth: 980,
            fontSize: 42,
            lineHeight: 1.35,
            color: "rgba(248,250,252,0.86)",
            textAlign: "center",
          }}
        >
          {text.slice(0, visible)}
          <span style={{ opacity: frame % 20 < 10 ? 1 : 0, marginLeft: 4 }}>|</span>
        </div>
      </div>
    </SceneShell>
  );
};

const MatrixRainScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const columns = Math.ceil(width / 48);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return (
    <SceneShell title="Matrix Rain" style={{ background: "#000" }}>
      <AbsoluteFill style={{ overflow: "hidden" }}>
        {Array.from({ length: columns }).map((_, column) => {
          const speed = 8 + random(column) * 10;
          const offset = random(column + 100) * height;
          const y = ((frame * speed + offset) % (height + 300)) - 300;
          return (
            <div
              key={column}
              style={{
                position: "absolute",
                left: column * 48,
                top: y,
                color: "#4ade80",
                fontSize: 30,
                fontFamily: "monospace",
                opacity: 0.9,
                textShadow: "0 0 10px rgba(74,222,128,0.65)",
                lineHeight: 1.1,
              }}
            >
              {Array.from({ length: 14 }).map((__, row) => (
                <div key={row}>{chars[Math.floor(random(column * 100 + row + frame) * chars.length)]}</div>
              ))}
            </div>
          );
        })}
      </AbsoluteFill>
    </SceneShell>
  );
};

const GeometricPatternsScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <SceneShell title="Geometric Patterns">
      <div style={{ ...full, ...center }}>
        {Array.from({ length: 18 }).map((_, i) => {
          const size = 120 + i * 26;
          const rotate = frame * (i % 2 === 0 ? 1.2 : -1.5) + i * 12;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: size,
                height: size,
                border: `2px solid ${i % 3 === 0 ? palette.cyan : i % 3 === 1 ? palette.pink : palette.yellow}`,
                transform: `rotate(${rotate}deg)`,
                opacity: 0.6,
                borderRadius: i % 2 === 0 ? 16 : "50%",
              }}
            />
          );
        })}
      </div>
    </SceneShell>
  );
};

const SoundWaveScene: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = 64;
  return (
    <SceneShell title="Sound Wave">
      <div style={{ ...full, ...center, gap: 8 }}>
        {Array.from({ length: bars }).map((_, i) => {
          const normalized = (Math.sin(frame / 5 + i / 2) + Math.sin(frame / 11 + i / 5)) / 2;
          const h = 80 + ((normalized + 1) / 2) * 240;
          return (
            <div
              key={i}
              style={{
                width: 12,
                height: h,
                borderRadius: 999,
                background: i % 2 === 0 ? palette.cyan : palette.blue,
                boxShadow: "0 0 20px rgba(34,211,238,0.2)",
              }}
            />
          );
        })}
      </div>
    </SceneShell>
  );
};

const AnimatedListScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const items = [
    { name: "Item One", color: palette.blue },
    { name: "Item Two", color: "#60a5fa" },
    { name: "Item Three", color: "#93c5fd" },
  ];
  return (
    <SceneShell title="Animated List">
      <div style={{ ...full, ...center }}>
        <div style={{ width: 860 }}>
          {items.map((item, i) => {
            const slide = spring({
              frame: frame - i * 7,
              fps,
              from: -220,
              to: 0,
              config: { damping: 12, mass: 0.6 },
            });
            const opacity = spring({ frame: frame - i * 7, fps, config: { damping: 12, mass: 0.5 } });
            return (
              <div
                key={item.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 24,
                  marginBottom: 28,
                  opacity,
                  transform: `translateX(${slide}px)`,
                }}
              >
                <div
                  style={{
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    background: item.color,
                    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
                  }}
                />
                <div style={{ color: "#fff", fontSize: 64, fontWeight: 600 }}>{item.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </SceneShell>
  );
};

const sceneMap: Record<(typeof effectScenes)[number], React.FC> = {
  "Popping Text": PoppingTextScene,
  "Circular Progress": CircularProgressScene,
  "Pixel Transition": PixelTransitionScene,
  "Chart Animation": ChartAnimationScene,
  "Ken Burns": KenBurnsScene,
  "Zoom Pulse": ZoomPulseScene,
  "Parallax Pan": ParallaxPanScene,
  "Bubble Pop Text": BubblePopTextScene,
  "Floating Text Chip": FloatingTextChipScene,
  "Pulsing Text": PulsingTextScene,
  "Liquid Wave": LiquidWaveScene,
  "Glitch Text": GlitchTextScene,
  "Card Flip": CardFlipScene,
  "Animated Text": AnimatedTextScene,
  "Bounce Text": BounceTextScene,
  "Slide Text": SlideTextScene,
  "Particle Explosion": ParticleExplosionScene,
  "Typewriter Subtitle": TypewriterSubtitleScene,
  "Matrix Rain": MatrixRainScene,
  "Geometric Patterns": GeometricPatternsScene,
  "Sound Wave": SoundWaveScene,
  "Animated List": AnimatedListScene,
};

const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100, mass: 1 },
  });
  const opacity = frameClamp(frame, [0, 18, 70, 89], [0, 1, 1, 0]);
  return (
    <AbsoluteFill style={{ ...backgroundGlow(palette.blue, palette.violet), ...center, flexDirection: "column", opacity }}>
      <NoiseGrid opacity={0.05} />
      <div
        style={{
          fontSize: 36,
          color: "rgba(248,250,252,0.8)",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          marginBottom: 18,
        }}
      >
        React Video Editor Templates
      </div>
      <div
        style={{
          transform: `translateY(${40 - rise * 40}px) scale(${0.92 + rise * 0.08})`,
          color: "#fff",
          fontSize: 110,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 0.95,
          maxWidth: 1100,
        }}
      >
        All 22 Effects
      </div>
      <div
        style={{
          marginTop: 28,
          color: "rgba(248,250,252,0.72)",
          fontSize: 30,
        }}
      >
        Built in Remotion as one continuous showcase
      </div>
    </AbsoluteFill>
  );
};

const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = frameClamp(frame, [0, 14, 90], [0, 1, 1]);
  const scale = frameClamp(frame, [0, 18], [0.9, 1]);
  return (
    <AbsoluteFill style={{ ...backgroundGlow(palette.cyan, palette.pink), ...center, flexDirection: "column", opacity }}>
      <div
        style={{
          transform: `scale(${scale})`,
          color: "#fff",
          fontSize: 94,
          fontWeight: 900,
          textAlign: "center",
        }}
      >
        22 Effects Included
      </div>
      <div
        style={{
          marginTop: 22,
          color: "rgba(248,250,252,0.8)",
          fontSize: 30,
        }}
      >
        Popping Text to Animated List
      </div>
    </AbsoluteFill>
  );
};

export const AllEffectsShowcase: React.FC = () => {
  return (
    <AbsoluteFill>
      <IntroScene />
    </AbsoluteFill>
  );
};

export const getSceneComponent = (title: (typeof effectScenes)[number]) => sceneMap[title];

export const introScene = IntroScene;
export const outroScene = OutroScene;
