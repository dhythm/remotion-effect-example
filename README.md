# Remotion Effect Showcase

This repository contains two Remotion compositions:

- `TemplateEffectsGallery`: a gallery of all 22 effects based on the React Video Editor Remotion Templates page
- `AdvancedMotionShowcase`: an applied motion showcase focused on more advanced Remotion-style animation patterns

Reference:
[React Video Editor Remotion Templates](https://www.reactvideoeditor.com/remotion-templates)

## Compositions

### `TemplateEffectsGallery`

A continuous showcase of the 22 template-inspired effects:

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

Main files:

- `src/template-effects-gallery.tsx`
- `src/Composition.tsx`
- `src/Root.tsx`

### `AdvancedMotionShowcase`

A separate composition that demonstrates more applied Remotion motion design, including:

- cinematic opener structure
- SaaS-style dashboard motion
- logo / shape morph style animation
- kinetic typography
- layered card staging
- audio-reactive style finale

Main files:

- `src/advanced-showcase.tsx`
- `src/Composition.tsx`
- `src/Root.tsx`

## Tech Stack

- Remotion
- React
- TypeScript

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

Render a composition:

```bash
pnpm build TemplateEffectsGallery out/template-effects-gallery.mp4
```

```bash
pnpm build AdvancedMotionShowcase out/advanced-motion-showcase.mp4
```

If you prefer using the Remotion CLI directly:

```bash
npx remotion render TemplateEffectsGallery out/template-effects-gallery.mp4
npx remotion render AdvancedMotionShowcase out/advanced-motion-showcase.mp4
```

## Notes

- `TemplateEffectsGallery` is the restored 22-effect gallery composition.
- `AdvancedMotionShowcase` is intentionally separate so the original gallery is preserved.
- Some image-like scenes are implemented with local abstract backgrounds to avoid dependency on external image assets.
