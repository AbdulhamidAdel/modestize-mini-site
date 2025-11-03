import { BasePost } from '../types';

const rainImage = 'https://picsum.photos/seed/shoji-rain/400/300';

export const post: BasePost = {
  date: new Date('2024-10-15').toISOString(),
  title: 'Rain on Shoji Screens',
  content: `<p>The soft, percussive sound of rain against traditional paper screens. A sound that doesn't intrude but rather deepens the sense of peace and enclosure. A simple, transient beauty.</p><p>It's a reminder of the world outside, yet it enhances the comfort of the world within. The screen diffuses the light, turning the grey day into a soft, ambient glow. It is a moment of pure, unadulterated atmosphere, a sensory experience that costs nothing and offers everything.</p>`,
  excerpt: 'The soft, percussive sound of rain against traditional paper screens. A sound that doesn\'t intrude but rather deepens the sense of peace and enclosure. A simple, transient beauty.',
  author: { name: 'Kensho', link: '#' },
  featuredMedia: { source_url: rainImage, alt_text: 'Rain on Shoji Screens', width: 400, height: 300 },
};
