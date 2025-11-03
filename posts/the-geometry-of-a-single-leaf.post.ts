import { BasePost } from '../types';

const leafImage = 'https://picsum.photos/seed/leaf-geometry/800/600';
const leafFeatured = 'https://picsum.photos/seed/leaf-geometry/400/300';

export const post: BasePost = {
  date: new Date('2024-10-24').toISOString(),
  title: 'The Geometry of a Single Leaf',
  content: `<p>Contemplate the intricate patterns of nature, a universe contained within a single leaf. Its veins are rivers, its edges a coastline against the vast sky of the palm of your hand. It is a masterpiece of design, perfected over eons, asking for nothing but a moment of your attention.</p><p>We often seek complexity in grand schemes, but it's readily available in the smallest of things. The fractal patterns, the subtle shifts in color—all are a testament to an underlying order that is both chaotic and beautiful. Holding a leaf is holding a piece of the world's history.</p>[URL=${leafImage}][IMG]${leafImage}[/IMG][/URL]<p class="mt-4">This small thumbnail, a glimpse into a larger world, is a reminder. Click to see the full detail, the full story. The forum syntax is a nod to older, simpler times on the web, where content was shared in communities with their own unique language.</p>`,
  excerpt: 'Contemplate the intricate patterns of nature, a universe contained within a single leaf. Its veins are rivers, its edges a coastline against the vast sky of the palm of your hand.',
  author: { name: 'Yugen', link: '#' },
  featuredMedia: { source_url: leafFeatured, alt_text: 'The Geometry of a Single Leaf', width: 400, height: 300 },
};
