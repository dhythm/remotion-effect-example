import { AbsoluteFill, Series } from "remotion";
import {
  effectScenes,
  getSceneComponent,
  introScene,
  outroScene,
  sceneDurationInFrames,
} from "./effects";

const INTRO_DURATION = 90;
const OUTRO_DURATION = 90;

export const MyComposition = () => {
  const Intro = introScene;
  const Outro = outroScene;

  return (
    <AbsoluteFill>
      <Series>
        <Series.Sequence durationInFrames={INTRO_DURATION} premountFor={15}>
          <Intro />
        </Series.Sequence>
        {effectScenes.map((sceneName) => {
          const SceneComponent = getSceneComponent(sceneName);
          return (
            <Series.Sequence
              key={sceneName}
              durationInFrames={sceneDurationInFrames}
              premountFor={15}
            >
              <SceneComponent />
            </Series.Sequence>
          );
        })}
        <Series.Sequence durationInFrames={OUTRO_DURATION} premountFor={15}>
          <Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
