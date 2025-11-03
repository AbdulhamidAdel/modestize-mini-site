import { BasePost } from '../types';

const kintsugiImage = 'https://picsum.photos/seed/kintsugi-art/800/600';
const kintsugiFeatured = 'https://picsum.photos/seed/kintsugi-art/400/300';

export const post: BasePost = {
  date: new Date('2024-10-20').toISOString(),
  title: 'The Art of Kintsugi',
  content: `<p>The Japanese art of repairing broken pottery with gold. It teaches that breakage and repair are part of the history of an object, rather than something to disguise. Imperfection is beauty.</p><p>This philosophy can be applied to our own lives. Our scars, our mistakes, our 'broken' parts are what make us unique and resilient. To highlight them is to accept our history and to find beauty in our journey of healing and growth. We are not diminished by our flaws, but made more interesting and valuable by them.</p>[URL=${kintsugiImage}][IMG]${kintsugiImage}[/IMG][/URL]<p class="mt-4">The cracks filled with gold are a testament to survival. They tell a story of resilience. They do not hide the damage; they celebrate it.</p>`,
  excerpt: 'The Japanese art of repairing broken pottery with gold. It teaches that breakage and repair are part of the history of an object, rather than something to disguise. Imperfection is beauty.',
  author: { name: 'Wabi-Sabi', link: '#' },
  featuredMedia: { source_url: kintsugiFeatured, alt_text: 'The Art of Kintsugi', width: 400, height: 300 },
};
