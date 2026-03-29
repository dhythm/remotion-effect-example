import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  Series,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type MemoryPhoto = {
  title: string;
  subtitle: string;
  accent: string;
  shadow: string;
  photoSrc?: string;
};

const palette = {
  ivory: "#fff8ef",
  champagne: "#f6e7d8",
  rose: "#d79ca1",
  wine: "#7f4151",
  cocoa: "#4a2d34",
  forest: "#405955",
  sage: "#7f9b8d",
  gold: "#d8b36a",
  night: "#231822",
};

const PHOTO_WIDTH = 340;
const PHOTO_HEIGHT = 460;

export const WEDDING_MEMORY_SCENE_DURATION = 150;
export const WEDDING_MEMORY_COUNTDOWN_DURATION = 105;
export const WEDDING_MEMORY_FILM_BRIDGE_DURATION = 120;
export const WEDDING_MEMORY_INTRO_DURATION = 90;
export const WEDDING_MEMORY_OUTRO_DURATION = 90;

export const weddingMemoryMoments: MemoryPhoto[] = [
  {
    title: "Childhood Smiles",
    subtitle: "はじまりの景色",
    accent: "#f0d2bc",
    shadow: "rgba(127, 65, 81, 0.38)",
  },
  {
    title: "School Days",
    subtitle: "少しずつ広がった毎日",
    accent: "#d6c1e8",
    shadow: "rgba(66, 40, 72, 0.34)",
  },
  {
    title: "First Trip",
    subtitle: "心に残る旅の空気",
    accent: "#b8d8df",
    shadow: "rgba(30, 69, 76, 0.34)",
  },
  {
    title: "Shared Seasons",
    subtitle: "何気ない日々も特別に",
    accent: "#d7c09d",
    shadow: "rgba(89, 61, 28, 0.36)",
  },
  {
    title: "Celebration",
    subtitle: "祝福に包まれた時間",
    accent: "#efbcc0",
    shadow: "rgba(106, 39, 54, 0.34)",
  },
  {
    title: "Family",
    subtitle: "支えてくれた笑顔へ",
    accent: "#b6cab3",
    shadow: "rgba(45, 70, 48, 0.34)",
  },
];

const centered: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const clamp = (
  frame: number,
  input: readonly number[],
  output: readonly number[],
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const bgShell = (accentA: string, accentB: string): React.CSSProperties => ({
  background: `
    radial-gradient(circle at 18% 18%, ${accentA}44 0%, transparent 28%),
    radial-gradient(circle at 82% 24%, ${accentB}44 0%, transparent 32%),
    radial-gradient(circle at 50% 100%, rgba(255,255,255,0.22) 0%, transparent 24%),
    linear-gradient(135deg, ${palette.night} 0%, ${palette.cocoa} 50%, #130d12 100%)
  `,
});

const filmGrain: React.CSSProperties = {
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
  `,
  backgroundSize: "3px 3px, 3px 3px",
  mixBlendMode: "soft-light",
  opacity: 0.45,
};

const LightLeak: React.FC<{ frameShift?: number }> = ({ frameShift = 0 }) => {
  const frame = useCurrentFrame();
  const leakX = 10 + ((frame + frameShift) * 1.3) % 95;
  const opacity = 0.18 + Math.sin((frame + frameShift) / 20) * 0.04;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(circle at ${leakX}% 30%, rgba(255,220,180,${opacity}) 0%, rgba(255,220,180,0.1) 14%, transparent 36%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};

const WeddingCountdownLeader: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const countdownFrame = Math.min(2, Math.floor(frame / (fps * 0.9)));
  const number = 3 - countdownFrame;
  const localFrame = frame % Math.floor(fps * 0.9);
  const wipeAngle = interpolate(localFrame, [0, fps * 0.9], [-90, 270], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse = spring({
    frame: localFrame,
    fps,
    durationInFrames: 18,
    config: {damping: 12, stiffness: 160, mass: 0.8},
  });
  const flashOpacity = clamp(frame, [84, 92, 102, 105], [0, 0.16, 0.7, 0]);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 50%, #4b3740 0%, #1f141a 52%, #0f0a0d 100%)",
      }}
    >
      <AbsoluteFill style={filmGrain} />
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,244,229,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,244,229,0.08) 1px, transparent 1px)",
          backgroundSize: "160px 160px",
          opacity: 0.35,
        }}
      />
      <AbsoluteFill style={centered}>
        <div
          style={{
            position: "relative",
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "6px solid rgba(255,244,229,0.86)",
            boxShadow: "0 0 0 8px rgba(255,244,229,0.1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 2,
              marginLeft: -1,
              background: "rgba(255,244,229,0.38)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 2,
              marginTop: -1,
              background: "rgba(255,244,229,0.38)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 12,
              borderRadius: "50%",
              background: `conic-gradient(from ${wipeAngle}deg, rgba(255,244,229,0.62) 0deg, rgba(255,244,229,0.62) 26deg, rgba(255,244,229,0) 26deg 360deg)`,
              mixBlendMode: "screen",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 42,
              borderRadius: "50%",
              border: "2px solid rgba(255,244,229,0.28)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: palette.ivory,
              fontSize: 200,
              fontWeight: 700,
              lineHeight: 1,
              transform: `scale(${1 + pulse * 0.06})`,
              textShadow: "0 10px 24px rgba(0,0,0,0.24)",
            }}
          >
            {number}
          </div>
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: "absolute",
          left: 56,
          top: 46,
          color: "rgba(255,244,229,0.74)",
          fontSize: 28,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
        }}
      >
        Picture Start
      </div>
      <div
        style={{
          position: "absolute",
          right: 56,
          bottom: 42,
          color: "rgba(255,244,229,0.56)",
          fontSize: 24,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Wedding Memories
      </div>
      <AbsoluteFill
        style={{
          background: "rgba(255,248,239,1)",
          opacity: flashOpacity,
        }}
      />
    </AbsoluteFill>
  );
};

const MemoryPhotoSurface: React.FC<{ photo: MemoryPhoto }> = ({ photo }) => {
  if (photo.photoSrc) {
    return (
      <Img
        src={staticFile(photo.photoSrc)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `
          linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0)),
          radial-gradient(circle at 22% 20%, rgba(255,255,255,0.34) 0%, transparent 28%),
          linear-gradient(135deg, ${photo.accent} 0%, ${palette.champagne} 46%, #ffffff 100%)
        `,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 22,
          borderRadius: 26,
          border: "1px solid rgba(74,45,52,0.08)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.68) 0%, rgba(255,248,239,0.96) 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "26px 24px 24px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(74,45,52,0.6)",
          }}
        >
          Sample Photo
        </div>
        <div>
          <div
            style={{
              fontSize: 42,
              lineHeight: 1.05,
              color: palette.cocoa,
              marginBottom: 12,
              fontWeight: 700,
            }}
          >
            {photo.title}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(74,45,52,0.76)",
            }}
          >
            {photo.subtitle}
          </div>
        </div>
      </div>
    </div>
  );
};

const PhotoCard: React.FC<{
  photo: MemoryPhoto;
  index: number;
  x: number;
  y: number;
  depth: number;
  rotation: number;
}> = ({ photo, index, x, y, depth, rotation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - index * 8,
    fps,
    durationInFrames: 36,
    config: { damping: 14, stiffness: 120, mass: 0.9 },
  });
  const driftX = Math.sin(frame / 28 + index * 0.8) * (16 + depth * 10);
  const driftY = Math.cos(frame / 34 + index * 0.6) * (10 + depth * 7);
  const pullForward = Math.sin(frame / 24 + index) * 18;
  const opacity = clamp(frame, [0, 18 + index * 3, 130, 148], [0, 1, 1, 0]);
  const scale = 0.82 + depth * 0.1 + enter * 0.16;
  const blur = Math.max(0, (1 - depth) * 5);

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: PHOTO_WIDTH,
        height: PHOTO_HEIGHT,
        marginLeft: -PHOTO_WIDTH / 2,
        marginTop: -PHOTO_HEIGHT / 2,
        opacity,
        transform: `perspective(1800px) translate3d(${x + driftX}px, ${y + driftY}px, ${depth * 220 + pullForward}px) rotateZ(${rotation}deg) rotateY(${(1 - depth) * -8}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
        filter: `blur(${blur}px)`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 30,
          overflow: "hidden",
          background: palette.ivory,
          boxShadow: `0 30px 90px ${photo.shadow}, 0 10px 24px rgba(0,0,0,0.18)`,
          border: "12px solid rgba(255,248,239,0.94)",
        }}
      >
        <MemoryPhotoSurface photo={photo} />
      </div>
    </div>
  );
};

const MemoryClusterScene: React.FC<{
  photos: MemoryPhoto[];
  headline: string;
  subline: string;
  accentA: string;
  accentB: string;
}> = ({ photos, headline, subline, accentA, accentB }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const textIn = spring({
    frame,
    fps,
    durationInFrames: 42,
    config: { damping: 15, stiffness: 100, mass: 0.9 },
  });
  const textOpacity = clamp(frame, [0, 18, 126, 148], [0, 1, 1, 0]);
  const textY = interpolate(textIn, [0, 1], [40, 0]);

  const placements = [
    { x: -360, y: -90, depth: 0.45, rotation: -8 },
    { x: -110, y: 80, depth: 0.7, rotation: -4 },
    { x: 240, y: -70, depth: 0.93, rotation: 5 },
  ];

  return (
    <AbsoluteFill style={bgShell(accentA, accentB)}>
      <AbsoluteFill style={filmGrain} />
      <LightLeak />
      <LightLeak frameShift={35} />
      <div
        style={{
          position: "absolute",
          inset: 0,
          perspective: 1800,
          transformStyle: "preserve-3d",
        }}
      >
        {photos.map((photo, index) => (
          <PhotoCard key={`${photo.title}-${index}`} photo={photo} index={index} {...placements[index]} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 62,
          maxWidth: 560,
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,248,239,0.72)",
            marginBottom: 14,
          }}
        >
          Wedding Memory Film
        </div>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.04,
            color: palette.ivory,
            textShadow: "0 16px 40px rgba(0,0,0,0.24)",
            marginBottom: 14,
            fontWeight: 700,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.5,
            color: "rgba(255,248,239,0.82)",
          }}
        >
          {subline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SinglePhotoScene: React.FC<{
  photo: MemoryPhoto;
  headline: string;
  subline: string;
  accentA: string;
  accentB: string;
}> = ({photo, headline, subline, accentA, accentB}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const reveal = spring({
    frame,
    fps,
    durationInFrames: 46,
    config: {damping: 14, stiffness: 110, mass: 0.92},
  });
  const exitOpacity = clamp(frame, [0, 16, 126, 148], [0, 1, 1, 0]);
  const photoScale = interpolate(frame, [0, 149], [1.18, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const photoX = interpolate(frame, [0, 149], [-36, 22], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textY = interpolate(reveal, [0, 1], [36, 0]);

  return (
    <AbsoluteFill style={bgShell(accentA, accentB)}>
      <AbsoluteFill style={filmGrain} />
      <LightLeak />
      <div
        style={{
          position: "absolute",
          inset: 36,
          borderRadius: 34,
          overflow: "hidden",
          opacity: exitOpacity,
          boxShadow: "0 30px 90px rgba(0,0,0,0.28)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateX(${photoX}px) scale(${photoScale})`,
          }}
        >
          <MemoryPhotoSurface photo={photo} />
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(18,10,16,0.74) 0%, rgba(18,10,16,0.3) 38%, rgba(18,10,16,0.08) 62%, rgba(18,10,16,0.34) 100%)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 68,
          maxWidth: 600,
          color: palette.ivory,
          opacity: exitOpacity,
          transform: `translateY(${textY}px)`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "rgba(255,248,239,0.72)",
            marginBottom: 16,
          }}
        >
          Cinematic Memory
        </div>
        <div
          style={{
            fontSize: 78,
            lineHeight: 1.02,
            marginBottom: 18,
            fontWeight: 700,
            textShadow: "0 16px 36px rgba(0,0,0,0.26)",
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.55,
            color: "rgba(255,248,239,0.84)",
          }}
        >
          {subline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FilmFrame: React.FC<{
  photo: MemoryPhoto;
  index: number;
}> = ({photo, index}) => {
  const frame = useCurrentFrame();
  const baseX = 220 + index * 310;
  const x = interpolate(frame, [0, 149], [baseX, baseX - 380], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = Math.sin(frame / 18 + index * 0.7) * 14;
  const rotate = -2 + index * 0.8;
  const opacity = clamp(frame, [0, 8 + index * 4, 132, 149], [0, 1, 1, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: 174 + y,
        width: 280,
        height: 390,
        borderRadius: 22,
        background: "#1d171b",
        padding: 18,
        boxShadow: "0 22px 50px rgba(0,0,0,0.28)",
        opacity,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 14,
          background:
            "repeating-linear-gradient(90deg, #1d171b 0 12px, #f2dfc2 12px 20px)",
          borderRadius: "22px 22px 0 0",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 14,
          background:
            "repeating-linear-gradient(90deg, #1d171b 0 12px, #f2dfc2 12px 20px)",
          borderRadius: "0 0 22px 22px",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          borderRadius: 12,
          background: palette.ivory,
        }}
      >
        <MemoryPhotoSurface photo={photo} />
      </div>
    </div>
  );
};

const FilmStripScene: React.FC<{
  photos: MemoryPhoto[];
  headline: string;
  subline: string;
  accentA: string;
  accentB: string;
}> = ({photos, headline, subline, accentA, accentB}) => {
  const frame = useCurrentFrame();
  const titleX = interpolate(frame, [0, 24, 132, 149], [40, 0, 0, -24], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleOpacity = clamp(frame, [0, 12, 132, 149], [0, 1, 1, 0]);

  return (
    <AbsoluteFill style={bgShell(accentA, accentB)}>
      <AbsoluteFill style={filmGrain} />
      <LightLeak frameShift={15} />
      <div
        style={{
          position: "absolute",
          left: -120,
          top: 150,
          width: 1600,
          height: 430,
          borderRadius: 34,
          background:
            "linear-gradient(180deg, rgba(39,24,30,0.94), rgba(15,10,14,0.86))",
          boxShadow: "0 24px 70px rgba(0,0,0,0.28)",
          transform: "rotate(-4deg)",
        }}
      />
      {photos.map((photo, index) => (
        <FilmFrame key={`${photo.title}-${index}`} photo={photo} index={index} />
      ))}
      <div
        style={{
          position: "absolute",
          left: 72,
          bottom: 70,
          maxWidth: 570,
          color: palette.ivory,
          opacity: titleOpacity,
          transform: `translateX(${titleX}px)`,
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(255,248,239,0.72)",
            marginBottom: 15,
          }}
        >
          Film Strip Flow
        </div>
        <div
          style={{
            fontSize: 68,
            lineHeight: 1.04,
            marginBottom: 14,
            fontWeight: 700,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.52,
            color: "rgba(255,248,239,0.84)",
          }}
        >
          {subline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FilmRibbonBridgeScene: React.FC<{
  photos: MemoryPhoto[];
  headline: string;
  subline: string;
}> = ({photos, headline, subline}) => {
  const frame = useCurrentFrame();
  const textOpacity = clamp(frame, [0, 14, 104, 119], [0, 1, 1, 0]);
  const repeatedPhotos = [...photos, ...photos, ...photos];
  const makeStrip = (
    rowPhotos: MemoryPhoto[],
    top: number,
    speed: number,
    framePrefix: string,
    direction: "left" | "right",
  ) => (
    <div
      style={{
        position: "absolute",
        left: 0,
        top,
        width: "100%",
        height: 230,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          left:
            direction === "left"
              ? interpolate(frame, [0, 119], [0, -speed], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                })
              : interpolate(frame, [0, 119], [-speed, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
          top: 0,
          width: 4400,
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 8,
            background:
              "linear-gradient(180deg, rgba(19,14,17,0.98), rgba(10,8,10,0.96))",
            boxShadow: "0 18px 48px rgba(0,0,0,0.24)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: 26,
            background:
              "repeating-linear-gradient(90deg, #0f0a0d 0 18px, #f4e2bf 18px 32px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 26,
            background:
              "repeating-linear-gradient(90deg, #0f0a0d 0 18px, #f4e2bf 18px 32px)",
          }}
        />
        {rowPhotos.map((photo, index) => {
          const cardX = 24 + index * 306;
          return (
            <div
              key={`${framePrefix}-${photo.title}-${index}`}
              style={{
                position: "absolute",
                left: cardX,
                top: 28,
                width: 286,
                height: 174,
                borderRadius: 8,
                overflow: "hidden",
                background: palette.ivory,
                boxShadow: "0 10px 24px rgba(0,0,0,0.2)",
                border: "4px solid rgba(255,248,239,0.94)",
              }}
            >
              <MemoryPhotoSurface photo={photo} />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <AbsoluteFill style={bgShell(palette.gold, palette.wine)}>
      <AbsoluteFill style={filmGrain} />
      <LightLeak frameShift={24} />
      {makeStrip(repeatedPhotos, 96, 980, "top", "left")}
      {makeStrip(repeatedPhotos.slice(2), 392, 1240, "bottom", "right")}
      <div
        style={{
          position: "absolute",
          right: 72,
          bottom: 72,
          width: 520,
          color: palette.ivory,
          opacity: textOpacity,
          textAlign: "right",
          textShadow: "0 10px 30px rgba(0,0,0,0.24)",
        }}
      >
        <div
          style={{
            fontSize: 20,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "rgba(255,248,239,0.7)",
            marginBottom: 16,
          }}
        >
          Connected By Film
        </div>
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.05,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          {headline}
        </div>
        <div
          style={{
            fontSize: 28,
            lineHeight: 1.52,
            color: "rgba(255,248,239,0.84)",
          }}
        >
          {subline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const WeddingMemoriesIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    frame,
    fps,
    durationInFrames: 48,
    config: { damping: 13, stiffness: 95, mass: 0.9 },
  });
  const titleOpacity = clamp(frame, [0, 16, 70, 88], [0, 1, 1, 0]);
  const titleScale = interpolate(reveal, [0, 1], [0.92, 1]);
  const titleY = interpolate(reveal, [0, 1], [34, 0]);

  return (
    <AbsoluteFill style={bgShell(palette.rose, palette.gold)}>
      <AbsoluteFill style={filmGrain} />
      <LightLeak />
      <AbsoluteFill style={centered}>
        <div
          style={{
            width: 860,
            textAlign: "center",
            color: palette.ivory,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px) scale(${titleScale})`,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.36em",
              textTransform: "uppercase",
              color: "rgba(255,248,239,0.72)",
              marginBottom: 22,
            }}
          >
            A Story Framed In Light
          </div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.04,
              marginBottom: 22,
              textShadow: "0 18px 44px rgba(0,0,0,0.24)",
              fontWeight: 700,
            }}
          >
            これまでの景色が
            <br />
            ひとつの物語になる
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.6,
              color: "rgba(255,248,239,0.84)",
            }}
          >
            写真がゆっくりと重なり、時間の流れと想い出の深さを
            <br />
            そのまま映像に変えるためのオープニングです。
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const WeddingMemoriesOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    frame,
    fps,
    durationInFrames: 45,
    config: { damping: 12, stiffness: 105, mass: 0.88 },
  });
  const scale = interpolate(reveal, [0, 1], [0.95, 1]);
  const opacity = clamp(frame, [0, 12, 78, 90], [0, 1, 1, 0]);
  const glowSize = 380 + frame * 2.2;

  return (
    <AbsoluteFill style={bgShell(palette.sage, palette.gold)}>
      <AbsoluteFill style={filmGrain} />
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: glowSize,
          height: glowSize,
          marginLeft: -glowSize / 2,
          marginTop: -glowSize / 2,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,234,194,0.54) 0%, rgba(255,234,194,0.18) 34%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />
      <AbsoluteFill style={centered}>
        <div
          style={{
            textAlign: "center",
            opacity,
            transform: `scale(${scale})`,
            color: palette.ivory,
          }}
        >
          <div
            style={{
              fontSize: 28,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "rgba(255,248,239,0.74)",
              marginBottom: 18,
            }}
          >
            Forever Starts Here
          </div>
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.05,
              marginBottom: 18,
              fontWeight: 700,
            }}
          >
            Thank you
          </div>
          <div
            style={{
              fontSize: 30,
              lineHeight: 1.55,
              color: "rgba(255,248,239,0.84)",
            }}
          >
            本番では `weddingMemoryMoments` の `photoSrc` に
            <br />
            写真パスを入れるだけで差し替えできます。
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const WeddingTransitionFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = clamp(frame, [0, 5, 11, 17], [0, 0.55, 0.24, 0]);

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 50% 50%, rgba(255,244,229,0.86) 0%, rgba(255,244,229,0.2) 24%, transparent 62%)",
        mixBlendMode: "screen",
        opacity,
      }}
    />
  );
};

export const WeddingMemoriesShowcase: React.FC = () => {
  const flashStarts = [
    WEDDING_MEMORY_COUNTDOWN_DURATION + WEDDING_MEMORY_INTRO_DURATION - 9,
    WEDDING_MEMORY_COUNTDOWN_DURATION +
      WEDDING_MEMORY_INTRO_DURATION +
      WEDDING_MEMORY_FILM_BRIDGE_DURATION -
      9,
    WEDDING_MEMORY_COUNTDOWN_DURATION +
      WEDDING_MEMORY_INTRO_DURATION +
      WEDDING_MEMORY_FILM_BRIDGE_DURATION +
      WEDDING_MEMORY_SCENE_DURATION -
      9,
    WEDDING_MEMORY_COUNTDOWN_DURATION +
      WEDDING_MEMORY_INTRO_DURATION +
      WEDDING_MEMORY_FILM_BRIDGE_DURATION +
      WEDDING_MEMORY_SCENE_DURATION * 2 -
      9,
    WEDDING_MEMORY_COUNTDOWN_DURATION +
      WEDDING_MEMORY_INTRO_DURATION +
      WEDDING_MEMORY_FILM_BRIDGE_DURATION +
      WEDDING_MEMORY_SCENE_DURATION * 3 -
      9,
  ];

  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={WEDDING_MEMORY_COUNTDOWN_DURATION} premountFor={15}>
          <WeddingCountdownLeader />
        </Series.Sequence>
        <Series.Sequence durationInFrames={WEDDING_MEMORY_INTRO_DURATION} premountFor={15}>
          <WeddingMemoriesIntro />
        </Series.Sequence>
        <Series.Sequence
          durationInFrames={WEDDING_MEMORY_FILM_BRIDGE_DURATION}
          premountFor={15}
        >
          <FilmRibbonBridgeScene
            photos={weddingMemoryMoments.slice(0, 5)}
            headline="想い出が一本につながる"
            subline="写真の断片ではなく、同じフィルムのコマとして次の場面へ流れ込むイメージです。"
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={WEDDING_MEMORY_SCENE_DURATION} premountFor={15}>
          <SinglePhotoScene
            photo={weddingMemoryMoments[0]}
            headline="最初の一枚から"
            subline="一番静かな写真を大きく見せて、観る側の気持ちを最初に引き込む場面です。"
            accentA={palette.rose}
            accentB={palette.wine}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={WEDDING_MEMORY_SCENE_DURATION} premountFor={15}>
          <FilmStripScene
            photos={weddingMemoryMoments.slice(1, 5)}
            headline="時間が流れていく"
            subline="フィルムのように複数の写真を横へ送り、思い出の量とテンポを変えています。"
            accentA={palette.sage}
            accentB={palette.gold}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={WEDDING_MEMORY_SCENE_DURATION} premountFor={15}>
          <MemoryClusterScene
            photos={weddingMemoryMoments.slice(3, 6)}
            headline="祝福の光に変わる"
            subline="支えてくれた人たちのぬくもりまで含めて、今日の思い出へ。"
            accentA={palette.forest}
            accentB={palette.rose}
          />
        </Series.Sequence>
        <Series.Sequence durationInFrames={WEDDING_MEMORY_OUTRO_DURATION} premountFor={15}>
          <WeddingMemoriesOutro />
        </Series.Sequence>
      </Series>
      {flashStarts.map((from, index) => (
        <Sequence key={index} from={from} durationInFrames={18}>
          <WeddingTransitionFlash />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
