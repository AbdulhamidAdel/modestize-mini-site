import { BasePost } from '../types';

const urbanImage = 'https://picsum.photos/seed/urban-jungle/800/600';
const urbanFeatured = 'https://picsum.photos/seed/urban-jungle/400/300';

export const post: BasePost = {
  date: new Date('2024-10-26').toISOString(),
  title: 'Stillness in the Urban Jungle',
  content: `<p>Finding moments of peace amidst the city's relentless rhythm. It's an art of observation, of seeing the world between the frames of motion, a quiet rebellion against the noise.</p><p>The early morning light paints long shadows, and for a brief period, the world holds its breath. This is the time for clarity, for thoughts to settle like dust on a forgotten windowsill. Each day offers this small window, a chance to reconnect with the quiet core within.</p><img src="${urbanImage}" alt="Urban cityscape" class="my-8 rounded-lg shadow-sm" /><p>We build our lives around schedules and demands, but the true architecture is unseen. It is the space between events, the silence between notes, that gives life its meaning and form. Cherish these empty spaces.</p>`,
  excerpt: "Finding moments of peace amidst the city's relentless rhythm. It's an art of observation, of seeing the world between the frames of motion, a quiet rebellion against the noise.",
  author: { name: 'Kensho', link: '#' },
  featuredMedia: { source_url: urbanFeatured, alt_text: 'Stillness in the Urban Jungle', width: 400, height: 300 },
};
