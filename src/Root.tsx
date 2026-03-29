import "./index.css";
import { Composition } from "remotion";
import {
  AdvancedMotionShowcase,
  TemplateEffectsGallery,
} from "./Composition";
import {
  ADVANCED_INTRO_DURATION,
  ADVANCED_OUTRO_DURATION,
  ADVANCED_SCENE_DURATION,
  advancedScenes,
} from "./advanced-showcase";
import {
  GALLERY_INTRO_DURATION,
  GALLERY_OUTRO_DURATION,
  GALLERY_SCENE_DURATION,
  galleryScenes,
} from "./template-effects-gallery";
import {
  CORPORATE_PROMO_DURATION,
  CorporatePromoShowcase,
  SAAS_DEMO_DURATION,
  SaasDemoShowcase,
  YOUTUBE_MOTION_DURATION,
  YouTubeMotionShowcase,
} from "./specialized-showcases";

const advancedDurationInFrames =
  ADVANCED_INTRO_DURATION +
  advancedScenes.length * ADVANCED_SCENE_DURATION +
  ADVANCED_OUTRO_DURATION;

const galleryDurationInFrames =
  GALLERY_INTRO_DURATION +
  galleryScenes.length * GALLERY_SCENE_DURATION +
  GALLERY_OUTRO_DURATION;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TemplateEffectsGallery"
        component={TemplateEffectsGallery}
        durationInFrames={galleryDurationInFrames}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="AdvancedMotionShowcase"
        component={AdvancedMotionShowcase}
        durationInFrames={advancedDurationInFrames}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="CorporatePromoShowcase"
        component={CorporatePromoShowcase}
        durationInFrames={CORPORATE_PROMO_DURATION}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="SaasDemoShowcase"
        component={SaasDemoShowcase}
        durationInFrames={SAAS_DEMO_DURATION}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="YouTubeMotionShowcase"
        component={YouTubeMotionShowcase}
        durationInFrames={YOUTUBE_MOTION_DURATION}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
