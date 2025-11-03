import { BasePost } from '../types';

const monoImage = 'https://picsum.photos/seed/monochrome/800/600';
const monoFeatured = 'https://picsum.photos/seed/monochrome/400/300';

export const post: BasePost = {
  date: new Date('2024-10-22').toISOString(),
  title: 'Monochrome Musings',
  content: `<p>Stripping away color reveals form, texture, and light. A monochrome world isn't a lesser world; it's a more focused one. It's about the essence of a thing, not its decoration. In black and white, you see the bones of the image, the soul of the subject.</p><img src="${monoImage}" alt="Monochrome abstract" class="my-8 rounded-lg shadow-sm" /><p>Our lives are often a riot of color, of competing signals and distractions. To intentionally view the world in monochrome is a meditative practice. It trains the eye to find beauty in simplicity, in the subtle interplay of shadow and illumination.</p>`,
  excerpt: "Stripping away color reveals form, texture, and light. A monochrome world isn't a lesser world; it's a more focused one. It's about the essence of a thing, not its decoration.",
  author: { name: 'Shibui', link: '#' },
  featuredMedia: { source_url: monoFeatured, alt_text: 'Monochrome Musings', width: 400, height: 300 },
};
