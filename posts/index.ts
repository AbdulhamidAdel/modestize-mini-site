import { BasePost } from '../types';

// Import all posts from their individual files
import { post as stillnessInTheUrbanJunglePost } from './stillness-in-the-urban-jungle.post';
import { post as theGeometryOfASingleLeafPost } from './the-geometry-of-a-single-leaf.post';
import { post as monochromeMusingsPost } from './monochrome-musings.post';
import { post as theArtOfKintsugiPost } from './the-art-of-kintsugi.post';
import { post as echoesOfSilencePost } from './echoes-of-silence.post';
import { post as rainOnShojiScreensPost } from './rain-on-shoji-screens.post';
import { post as aJourneyIntoMinimalismPost } from './a-journey-into-minimalism.post';


// Consolidate all imported posts into a single array and export it.
// The processing (sorting, adding IDs, etc.) is now handled by the data service.
export const staticBasePosts: BasePost[] = [
  stillnessInTheUrbanJunglePost,
  theGeometryOfASingleLeafPost,
  monochromeMusingsPost,
  theArtOfKintsugiPost,
  echoesOfSilencePost,
  rainOnShojiScreensPost,
  aJourneyIntoMinimalismPost,
];
