import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { effectScenes, sceneDurationInFrames } from "./effects";

const INTRO_DURATION = 90;
const OUTRO_DURATION = 90;
const totalDurationInFrames =
  INTRO_DURATION + effectScenes.length * sceneDurationInFrames + OUTRO_DURATION;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={totalDurationInFrames}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
