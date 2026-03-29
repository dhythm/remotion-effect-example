import React from "react";
import {
  AbsoluteFill,
  Easing,
  Freeze,
  interpolate,
  interpolateColors,
  Loop,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const palette = {
  ink: "#020617",
  slate: "#0f172a",
  panel: "#111827",
  panelSoft: "rgba(15, 23, 42, 0.78)",
  white: "#f8fafc",
  blue: "#3b82f6",
  blueDeep: "#1d4ed8",
  cyan: "#22d3ee",
  green: "#34d399",
  amber: "#f59e0b",
  pink: "#ec4899",
  violet: "#8b5cf6",
  red: "#ef4444",
};

export const ADVANCED_SCENE_DURATION = 120;
export const ADVANCED_INTRO_DURATION = 75;
export const ADVANCED_OUTRO_DURATION = 75;

const centered: React.CSSProperties = {
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

const shellBackground = (a: string, b: string): React.CSSProperties => ({
  background: `
    radial-gradient(circle at 15% 18%, ${a}44 0%, transparent 28%),
    radial-gradient(circle at 82% 24%, ${b}44 0%, transparent 28%),
    radial-gradient(circle at 50% 100%, rgba(255,255,255,0.08) 0%, transparent 24%),
    linear-gradient(135deg, ${palette.ink} 0%, ${palette.slate} 55%, #172554 100%)
  `,
});

const SceneShell: React.FC<{
  title: string;
  eyebrow: string;
  children: React.ReactNode;
  accentA?: string;
  accentB?: string;
}> = ({
  title,
  eyebrow,
  children,
  accentA = palette.blue,
  accentB = palette.cyan,
}) => {
  return (
    <AbsoluteFill style={shellBackground(accentA, accentB)}>
      <div
        style={{
          position: "absolute",
          top: 32,
          left: 36,
          padding: "9px 14px",
          borderRadius: 999,
          background: "rgba(2, 6, 23, 0.58)",
          border: "1px solid rgba(255,255,255,0.12)",
          color: "rgba(248,250,252,0.85)",
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          backdropFilter: "blur(10px)",
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 30,
          right: 36,
          color: "rgba(248,250,252,0.45)",
          fontSize: 18,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      {children}
    </AbsoluteFill>
  );
};

const GridOverlay: React.FC<{ opacity?: number }> = ({ opacity = 0.08 }) => (
  <AbsoluteFill
    style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,${opacity}) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,${opacity}) 1px, transparent 1px)
      `,
      backgroundSize: "80px 80px",
    }}
  />
);

const glowText = (color: string): React.CSSProperties => ({
  textShadow: `0 0 24px ${color}55, 0 12px 48px rgba(0,0,0,0.35)`,
});

const shapePolygon = (progress: number) => {
  const from = [
    [20, 20],
    [80, 20],
    [80, 80],
    [20, 80],
    [20, 20],
    [80, 20],
  ];
  const to = [
    [50, 8],
    [88, 30],
    [78, 78],
    [22, 78],
    [12, 30],
    [50, 8],
  ];
  return from
    .map(([fx, fy], i) => {
      const [tx, ty] = to[i];
      const x = fx + (tx - fx) * progress;
      const y = fy + (ty - fy) * progress;
      return `${x}% ${y}%`;
    })
    .join(", ");
};

export const advancedScenes = [
  "Cinematic Opener",
  "SaaS Product Demo",
  "Logo Morph System",
  "Kinetic Typography",
  "Layered Card Narrative",
  "Audio Reactive Finale",
] as const;

const CinematicOpenerScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    frame,
    fps,
    durationInFrames: 42,
    config: { damping: 13, stiffness: 110, mass: 0.9 },
  });
  const orbit = frame * 1.4;
  const headlineY = interpolate(reveal, [0, 1], [42, 0]);
  const headlineOpacity = interpolate(reveal, [0, 1], [0, 1]);
  return (
    <SceneShell
      title="Cinematic Opener"
      eyebrow="Corporate PV"
      accentA={palette.violet}
      accentB={palette.cyan}
    >
      <GridOverlay opacity={0.05} />
      <AbsoluteFill style={centered}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: 300 + i * 120,
              height: 300 + i * 120,
              borderRadius: "50%",
              border: `1px solid rgba(255,255,255,${0.18 - i * 0.03})`,
              transform: `rotate(${orbit * (i % 2 === 0 ? 1 : -1)}deg) scale(${1 + Math.sin(frame / 18 + i) * 0.02})`,
            }}
          />
        ))}
        <div
          style={{
            maxWidth: 980,
            padding: "0 80px",
            textAlign: "center",
            opacity: headlineOpacity,
            transform: `translateY(${headlineY}px)`,
          }}
        >
          <div
            style={{
              fontSize: 24,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(248,250,252,0.72)",
              marginBottom: 20,
            }}
          >
            Frame-driven motion design
          </div>
          <div
            style={{
              fontSize: 94,
              lineHeight: 0.94,
              fontWeight: 900,
              color: palette.white,
              ...glowText(palette.cyan),
            }}
          >
            Remotion can build more than preset transitions
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              marginTop: 28,
              color: "rgba(248,250,252,0.78)",
            }}
          >
            Interpolation, spring physics, staged timelines, and layered overlays
            combine into editorial-quality motion.
          </div>
        </div>
      </AbsoluteFill>
      <Freeze frame={36}>
        <Sequence from={78}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.16), transparent 18%)",
              mixBlendMode: "screen",
              opacity: clampInterpolate(frame, [78, 92], [0, 1]),
            }}
          />
        </Sequence>
      </Freeze>
    </SceneShell>
  );
};

const SaasProductDemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dashboardX = clampInterpolate(frame, [0, 24], [120, 0]);
  const dashboardOpacity = clampInterpolate(frame, [0, 18], [0, 1]);
  const modalScale = spring({
    frame: frame - 38,
    fps,
    durationInFrames: 32,
    config: { damping: 11, stiffness: 170, mass: 0.7 },
  });
  const modalY = interpolate(modalScale, [0, 1], [80, 0]);
  const cursorX = clampInterpolate(frame, [16, 50, 85], [180, 470, 760]);
  const cursorY = clampInterpolate(frame, [16, 50, 85], [540, 270, 390]);
  const chartValues = [62, 80, 74, 91, 88];
  return (
    <SceneShell
      title="SaaS Product Demo"
      eyebrow="UI Motion"
      accentA={palette.blue}
      accentB={palette.green}
    >
      <GridOverlay opacity={0.04} />
      <AbsoluteFill style={{ ...centered, padding: "100px 90px" }}>
        <div
          style={{
            width: 1120,
            height: 560,
            borderRadius: 30,
            background: "rgba(8,15,30,0.84)",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 28px 90px rgba(0,0,0,0.35)",
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            overflow: "hidden",
            transform: `translateX(${dashboardX}px)`,
            opacity: dashboardOpacity,
          }}
        >
          <div
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              padding: 28,
            }}
          >
            <div style={{ color: palette.white, fontSize: 26, fontWeight: 800 }}>
              Horizon OS
            </div>
            <div style={{ marginTop: 26, display: "grid", gap: 12 }}>
              {["Overview", "Automation", "Revenue", "Audience", "Exports"].map(
                (item, i) => (
                  <div
                    key={item}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 16,
                      background:
                        i === 1 ? "rgba(59,130,246,0.22)" : "rgba(255,255,255,0.03)",
                      color: "rgba(248,250,252,0.88)",
                      fontSize: 18,
                      fontWeight: i === 1 ? 700 : 500,
                    }}
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
          <div style={{ padding: 28, position: "relative" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[
                ["Conversion", "18.4%", palette.cyan],
                ["Pipeline", "$824k", palette.green],
                ["Latency", "42 ms", palette.amber],
              ].map(([label, value, color], i) => (
                <div
                  key={label}
                  style={{
                    borderRadius: 22,
                    padding: 22,
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    transform: `translateY(${clampInterpolate(frame, [i * 4, 22 + i * 4], [28, 0])}px)`,
                    opacity: clampInterpolate(frame, [i * 4, 18 + i * 4], [0, 1]),
                  }}
                >
                  <div style={{ color: "rgba(248,250,252,0.6)", fontSize: 15 }}>{label}</div>
                  <div
                    style={{
                      color: palette.white,
                      fontSize: 36,
                      fontWeight: 800,
                      marginTop: 10,
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      width: 42,
                      height: 4,
                      borderRadius: 999,
                      background: color,
                      marginTop: 16,
                    }}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 18,
                height: 300,
                borderRadius: 24,
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: 24,
                position: "relative",
              }}
            >
              <div style={{ color: palette.white, fontSize: 20, fontWeight: 700 }}>
                Quarterly acceleration
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 24,
                  right: 24,
                  bottom: 26,
                  height: 190,
                  display: "flex",
                  alignItems: "end",
                  gap: 18,
                }}
              >
                {chartValues.map((value, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${value * clampInterpolate(frame, [24 + i * 3, 54 + i * 3], [0, 1])}%`,
                      borderRadius: "16px 16px 6px 6px",
                      background: interpolateColors(
                        i / chartValues.length,
                        [0, 1],
                        [palette.blue, palette.cyan],
                      ),
                    }}
                  />
                ))}
              </div>
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
            <Sequence from={40}>
              <div
                style={{
                  position: "absolute",
                  right: 40,
                  bottom: 34,
                  width: 360,
                  padding: 24,
                  borderRadius: 22,
                  background: "rgba(2,6,23,0.92)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  transform: `translateY(${modalY}px) scale(${modalScale})`,
                  transformOrigin: "bottom right",
                }}
              >
                <div style={{ color: palette.white, fontSize: 26, fontWeight: 800 }}>
                  Smart automation
                </div>
                <div
                  style={{
                    color: "rgba(248,250,252,0.74)",
                    fontSize: 18,
                    lineHeight: 1.45,
                    marginTop: 10,
                  }}
                >
                  Elastic modal timing, cursor choreography, and layered counters
                  are all frame-controlled.
                </div>
              </div>
            </Sequence>
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

const LogoMorphSystemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = clampInterpolate(frame, [0, 40, 90, 119], [0, 0.25, 0.95, 1]);
  const color = interpolateColors(
    progress,
    [0, 0.5, 1],
    [palette.blue, palette.violet, palette.pink],
  );
  const rotation = clampInterpolate(frame, [0, 90], [0, 180]);
  const secondaryScale = clampInterpolate(frame, [20, 80], [0.8, 1.12]);
  return (
    <SceneShell
      title="Logo Morph System"
      eyebrow="Brand Motion"
      accentA={palette.pink}
      accentB={palette.violet}
    >
      <AbsoluteFill style={centered}>
        <div
          style={{
            width: 310,
            height: 310,
            borderRadius: 42,
            background: color,
            clipPath: `polygon(${shapePolygon(progress)})`,
            transform: `rotate(${rotation}deg) scale(${secondaryScale})`,
            boxShadow: `0 24px 80px ${color}44`,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 470,
            height: 470,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.14)",
            transform: `scale(${1 + progress * 0.1})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 150,
            width: 760,
            textAlign: "center",
            color: palette.white,
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 900, ...glowText(color) }}>
            interpolateColors + shape morphing
          </div>
          <div
            style={{
              marginTop: 16,
              color: "rgba(248,250,252,0.72)",
              fontSize: 24,
              lineHeight: 1.4,
            }}
          >
            Even without a plugin preset, frame-driven geometry can produce
            brand-style reveals.
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

const KineticTypographyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const loopDuration = 30;
  return (
    <SceneShell
      title="Kinetic Typography"
      eyebrow="YouTube Motion"
      accentA={palette.amber}
      accentB={palette.red}
    >
      <GridOverlay opacity={0.03} />
      <AbsoluteFill style={centered}>
        <Loop durationInFrames={loopDuration}>
          <div style={{ position: "relative", width: 1040, height: 420 }}>
            {["HOOK", "PACE", "PUNCH", "REPLAY"].map((word, i) => {
              const localFrame = (frame + i * 5) % loopDuration;
              const inProgress = spring({
                frame: localFrame,
                fps,
                durationInFrames: 18,
                config: { damping: 10, stiffness: 170, mass: 0.6 },
              });
              const x = interpolate(inProgress, [0, 1], [220, 0]);
              const skew = interpolate(inProgress, [0, 1], [12, 0], {
                easing: Easing.out(Easing.cubic),
              });
              return (
                <div
                  key={word}
                  style={{
                    position: "absolute",
                    left: 80 + i * 26,
                    top: 30 + i * 78,
                    color: i % 2 === 0 ? palette.white : palette.amber,
                    fontSize: 92,
                    fontWeight: 900,
                    letterSpacing: "-0.04em",
                    transform: `translateX(${x}px) skewX(${skew}deg) scale(${0.92 + inProgress * 0.08})`,
                    opacity: interpolate(inProgress, [0, 1], [0, 1]),
                    ...glowText(i % 2 === 0 ? palette.white : palette.amber),
                  }}
                >
                  {word}
                </div>
              );
            })}
          </div>
        </Loop>
      </AbsoluteFill>
    </SceneShell>
  );
};

const LayeredCardNarrativeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const cardX = (i: number) =>
    clampInterpolate(frame, [i * 6, 36 + i * 6], [180 - i * 30, 0]);
  const cardRotate = (i: number) =>
    clampInterpolate(frame, [0, 60], [i === 0 ? -8 : i === 1 ? 3 : 12, i === 0 ? -4 : i === 1 ? 1 : 6]);
  return (
    <SceneShell
      title="Layered Card Narrative"
      eyebrow="Explainer Design"
      accentA={palette.green}
      accentB={palette.blue}
    >
      <AbsoluteFill style={centered}>
        {[
          {
            title: "Signal",
            body: "Foreground headline card",
            color: palette.white,
            bg: "linear-gradient(135deg, #f8fafc, #dbeafe)",
            text: palette.ink,
          },
          {
            title: "Context",
            body: "Mid layer with supporting metric",
            color: palette.cyan,
            bg: "linear-gradient(135deg, #0f172a, #1e293b)",
            text: palette.white,
          },
          {
            title: "Depth",
            body: "Back layer for parallax read",
            color: palette.green,
            bg: "linear-gradient(135deg, #111827, #0f172a)",
            text: palette.white,
          },
        ].map((card, i) => (
          <div
            key={card.title}
            style={{
              position: "absolute",
              width: 560,
              height: 240,
              borderRadius: 28,
              background: card.bg,
              boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
              transform: `translate(${cardX(i)}px, ${i * 34}px) rotate(${cardRotate(i)}deg)`,
              padding: 28,
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                width: 48,
                height: 6,
                borderRadius: 999,
                background: card.color,
                marginBottom: 22,
              }}
            />
            <div
              style={{
                color: card.text,
                fontSize: 48,
                fontWeight: 900,
              }}
            >
              {card.title}
            </div>
            <div
              style={{
                color: card.text === palette.ink ? "rgba(2,6,23,0.72)" : "rgba(248,250,252,0.72)",
                fontSize: 24,
                marginTop: 12,
              }}
            >
              {card.body}
            </div>
          </div>
        ))}
      </AbsoluteFill>
    </SceneShell>
  );
};

const AudioReactiveFinaleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = 56;
  return (
    <SceneShell
      title="Audio Reactive Finale"
      eyebrow="Music / Podcast"
      accentA={palette.cyan}
      accentB={palette.pink}
    >
      <AbsoluteFill style={centered}>
        <div
          style={{
            position: "absolute",
            top: 150,
            textAlign: "center",
            width: "100%",
            color: palette.white,
          }}
        >
          <div style={{ fontSize: 82, fontWeight: 900, ...glowText(palette.cyan) }}>
            Audio-sync ready motion language
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 24,
              color: "rgba(248,250,252,0.72)",
            }}
          >
            Use waveform or spectrum data to drive bars, glows, captions, and cuts.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 90,
            left: 80,
            right: 80,
            height: 260,
            display: "flex",
            alignItems: "end",
            gap: 8,
          }}
        >
          {Array.from({ length: bars }).map((_, i) => {
            const wave = Math.sin(frame / 4 + i / 3) + Math.sin(frame / 9 + i / 7);
            const normalized = (wave + 2) / 4;
            const height = 38 + normalized * 220;
            const color = interpolateColors(
              i / bars,
              [0, 0.45, 1],
              [palette.blue, palette.cyan, palette.pink],
            );
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height,
                  borderRadius: 999,
                  background: color,
                  boxShadow: `0 0 24px ${color}44`,
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

const sceneMap: Record<(typeof advancedScenes)[number], React.FC> = {
  "Cinematic Opener": CinematicOpenerScene,
  "SaaS Product Demo": SaasProductDemoScene,
  "Logo Morph System": LogoMorphSystemScene,
  "Kinetic Typography": KineticTypographyScene,
  "Layered Card Narrative": LayeredCardNarrativeScene,
  "Audio Reactive Finale": AudioReactiveFinaleScene,
};

export const AdvancedShowcaseIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    frame,
    fps,
    durationInFrames: 38,
    config: { damping: 16, stiffness: 120, mass: 0.95 },
  });
  return (
    <AbsoluteFill style={shellBackground(palette.violet, palette.cyan)}>
      <GridOverlay opacity={0.04} />
      <AbsoluteFill style={{ ...centered, flexDirection: "column", textAlign: "center" }}>
        <div
          style={{
            color: "rgba(248,250,252,0.72)",
            fontSize: 24,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            marginBottom: 18,
            opacity: clampInterpolate(frame, [0, 16], [0, 1]),
          }}
        >
          Remotion advanced showcase
        </div>
        <div
          style={{
            color: palette.white,
            fontSize: 106,
            lineHeight: 0.92,
            fontWeight: 900,
            maxWidth: 1080,
            transform: `translateY(${interpolate(reveal, [0, 1], [36, 0])}px) scale(${0.96 + reveal * 0.04})`,
          }}
        >
          Beyond basic effects
        </div>
        <div
          style={{
            color: "rgba(248,250,252,0.78)",
            fontSize: 28,
            marginTop: 24,
          }}
        >
          UI motion, typography, morphing, overlays, and audio-reactive structure
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AdvancedShowcaseOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = clampInterpolate(frame, [0, 18], [0, 1]);
  return (
    <AbsoluteFill style={{ ...shellBackground(palette.green, palette.blue), opacity }}>
      <AbsoluteFill style={{ ...centered, flexDirection: "column", textAlign: "center" }}>
        <div style={{ color: palette.white, fontSize: 88, fontWeight: 900 }}>
          Code-driven motion scales further
        </div>
        <div
          style={{
            marginTop: 20,
            color: "rgba(248,250,252,0.76)",
            fontSize: 26,
            maxWidth: 900,
            lineHeight: 1.45,
          }}
        >
          Next step: add custom transitions, path morph packages, audio data, or 3D
          scenes on top of the same frame architecture.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const AdvancedTransitionFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const burst = clampInterpolate(frame, [0, 6, 15], [0, 1, 0]);
  const sweep = clampInterpolate(frame, [0, 18], [-220, 1480]);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity: burst,
      }}
    >
      <AbsoluteFill
        style={{
          background: "rgba(255,255,255,0.08)",
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -120,
          bottom: -120,
          width: 180,
          transform: `translateX(${sweep}px) skewX(-18deg)`,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.8) 50%, transparent 100%)",
          filter: "blur(10px)",
        }}
      />
    </AbsoluteFill>
  );
};

export const getAdvancedSceneComponent = (
  title: (typeof advancedScenes)[number],
) => sceneMap[title];
