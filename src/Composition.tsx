import { AbsoluteFill, Sequence, Series } from "remotion";
import {
  ADVANCED_INTRO_DURATION,
  ADVANCED_OUTRO_DURATION,
  ADVANCED_SCENE_DURATION,
  advancedScenes,
  AdvancedShowcaseIntro,
  AdvancedShowcaseOutro,
  AdvancedTransitionFlash,
  getAdvancedSceneComponent,
} from "./advanced-showcase";
import {
  GALLERY_INTRO_DURATION,
  GALLERY_OUTRO_DURATION,
  GALLERY_SCENE_DURATION,
  galleryScenes,
  getGallerySceneComponent,
  TemplateEffectsGalleryIntro,
  TemplateEffectsGalleryOutro,
} from "./template-effects-gallery";
import {
  WeddingMemoriesShowcase,
} from "./wedding-memories";

const TRANSITION_DURATION = 18;

export const AdvancedMotionShowcase = () => {
  const overlayStarts = advancedScenes
    .slice(0, -1)
    .map(
      (_, index) =>
        ADVANCED_INTRO_DURATION + (index + 1) * ADVANCED_SCENE_DURATION - 9,
    );

  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={ADVANCED_INTRO_DURATION} premountFor={15}>
          <AdvancedShowcaseIntro />
        </Series.Sequence>
        {advancedScenes.map((sceneName) => {
          const SceneComponent = getAdvancedSceneComponent(sceneName);
          return (
            <Series.Sequence
              key={sceneName}
              durationInFrames={ADVANCED_SCENE_DURATION}
              premountFor={15}
            >
              <SceneComponent />
            </Series.Sequence>
          );
        })}
        <Series.Sequence durationInFrames={ADVANCED_OUTRO_DURATION} premountFor={15}>
          <AdvancedShowcaseOutro />
        </Series.Sequence>
      </Series>
      {overlayStarts.map((from, index) => (
        <Sequence key={index} from={from} durationInFrames={TRANSITION_DURATION}>
          <AdvancedTransitionFlash />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export const TemplateEffectsGallery = () => {
  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={GALLERY_INTRO_DURATION} premountFor={15}>
          <TemplateEffectsGalleryIntro />
        </Series.Sequence>
        {galleryScenes.map((sceneName) => {
          const SceneComponent = getGallerySceneComponent(sceneName);
          return (
            <Series.Sequence
              key={sceneName}
              durationInFrames={GALLERY_SCENE_DURATION}
              premountFor={15}
            >
              <SceneComponent />
            </Series.Sequence>
          );
        })}
        <Series.Sequence durationInFrames={GALLERY_OUTRO_DURATION} premountFor={15}>
          <TemplateEffectsGalleryOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};

export {WeddingMemoriesShowcase};
