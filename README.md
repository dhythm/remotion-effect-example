# Remotion Effect Showcase

This project is a Remotion video that showcases all 22 effects listed on the React Video Editor Remotion Templates page.

Reference:
[React Video Editor Remotion Templates](https://www.reactvideoeditor.com/remotion-templates)

## Overview

- Built with Remotion, React, and TypeScript
- Includes intro, 22 effect scenes, and outro
- Renders to `out/MyComp.mp4`

The composition is configured in `src/Root.tsx`, sequenced in `src/Composition.tsx`, and the individual effect scenes are implemented in `src/effects.tsx`.

## Included Effects

1. Popping Text
2. Circular Progress
3. Pixel Transition
4. Chart Animation
5. Ken Burns
6. Zoom Pulse
7. Parallax Pan
8. Bubble Pop Text
9. Floating Text Chip
10. Pulsing Text
11. Liquid Wave
12. Glitch Text
13. Card Flip
14. Animated Text
15. Bounce Text
16. Slide Text
17. Particle Explosion
18. Typewriter Subtitle
19. Matrix Rain
20. Geometric Patterns
21. Sound Wave
22. Animated List

## Commands

Install dependencies:

```bash
pnpm install
```

Start Remotion Studio:

```bash
pnpm dev
```

Run lint and type check:

```bash
pnpm lint
```

Render the video:

```bash
pnpm build
```

## Output

Rendered video path:

```text
out/MyComp.mp4
```

## Notes

- The source inspiration comes from the templates published on React Video Editor.
- Some image-based effects are adapted to local abstract backgrounds so the project can render without depending on external image assets.
