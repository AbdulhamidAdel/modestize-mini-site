import { Post } from '../types';
import { urbanImage, leafImage, monoImage, kintsugiImage, silenceImage, rainImage } from '../assets/images';


// Helper to generate a URL-friendly slug from a string
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

export const createPostLink = (title: string): string => `/post/${slugify(title)}`;

// Define base posts with a partial type that omits generated fields
type BasePost = Omit<Post, 'id' | 'link'>;

export const basePosts: BasePost[] = [
  {
    date: new Date('2024-10-26').toISOString(),
    title: 'Stillness in the Urban Jungle',
    content: `<p>Finding moments of peace amidst the city's relentless rhythm. It's an art of observation, of seeing the world between the frames of motion, a quiet rebellion against the noise.</p><p>The early morning light paints long shadows, and for a brief period, the world holds its breath. This is the time for clarity, for thoughts to settle like dust on a forgotten windowsill. Each day offers this small window, a chance to reconnect with the quiet core within.</p><img src="${urbanImage}" alt="Urban cityscape" class="my-8 rounded-lg shadow-sm" /><p>We build our lives around schedules and demands, but the true architecture is unseen. It is the space between events, the silence between notes, that gives life its meaning and form. Cherish these empty spaces.</p>`,
    excerpt: "Finding moments of peace amidst the city's relentless rhythm. It's an art of observation, of seeing the world between the frames of motion, a quiet rebellion against the noise.",
    author: { name: 'Kensho', link: '#' },
    featuredMedia: { source_url: urbanImage, alt_text: 'Stillness in the Urban Jungle', width: 400, height: 300 },
  },
  {
    date: new Date('2024-10-24').toISOString(),
    title: 'The Geometry of a Single Leaf',
    content: `<p>Contemplate the intricate patterns of nature, a universe contained within a single leaf. Its veins are rivers, its edges a coastline against the vast sky of the palm of your hand. It is a masterpiece of design, perfected over eons, asking for nothing but a moment of your attention.</p><p>We often seek complexity in grand schemes, but it's readily available in the smallest of things. The fractal patterns, the subtle shifts in color—all are a testament to an underlying order that is both chaotic and beautiful. Holding a leaf is holding a piece of the world's history.</p>[URL=${leafImage}][IMG]${leafImage}[/IMG][/URL]<p class="mt-4">This small thumbnail, a glimpse into a larger world, is a reminder. Click to see the full detail, the full story. The forum syntax is a nod to older, simpler times on the web, where content was shared in communities with their own unique language.</p>`,
    excerpt: 'Contemplate the intricate patterns of nature, a universe contained within a single leaf. Its veins are rivers, its edges a coastline against the vast sky of the palm of your hand.',
    author: { name: 'Yugen', link: '#' },
    featuredMedia: { source_url: leafImage, alt_text: 'The Geometry of a Single Leaf', width: 400, height: 300 },
  },
  {
    date: new Date('2024-10-22').toISOString(),
    title: 'Monochrome Musings',
    content: `<p>Stripping away color reveals form, texture, and light. A monochrome world isn't a lesser world; it's a more focused one. It's about the essence of a thing, not its decoration. In black and white, you see the bones of the image, the soul of the subject.</p><img src="${monoImage}" alt="Monochrome abstract" class="my-8 rounded-lg shadow-sm" /><p>Our lives are often a riot of color, of competing signals and distractions. To intentionally view the world in monochrome is a meditative practice. It trains the eye to find beauty in simplicity, in the subtle interplay of shadow and illumination.</p>`,
    excerpt: "Stripping away color reveals form, texture, and light. A monochrome world isn't a lesser world; it's a more focused one. It's about the essence of a thing, not its decoration.",
    author: { name: 'Shibui', link: '#' },
    featuredMedia: { source_url: monoImage, alt_text: 'Monochrome Musings', width: 400, height: 300 },
  },
  {
    date: new Date('2024-10-20').toISOString(),
    title: 'The Art of Kintsugi',
    content: `<p>The Japanese art of repairing broken pottery with gold. It teaches that breakage and repair are part of the history of an object, rather than something to disguise. Imperfection is beauty.</p><p>This philosophy can be applied to our own lives. Our scars, our mistakes, our 'broken' parts are what make us unique and resilient. To highlight them is to accept our history and to find beauty in our journey of healing and growth. We are not diminished by our flaws, but made more interesting and valuable by them.</p>[URL=${kintsugiImage}][IMG]${kintsugiImage}[/IMG][/URL]<p class="mt-4">The cracks filled with gold are a testament to survival. They tell a story of resilience. They do not hide the damage; they celebrate it.</p>`,
    excerpt: 'The Japanese art of repairing broken pottery with gold. It teaches that breakage and repair are part of the history of an object, rather than something to disguise. Imperfection is beauty.',
    author: { name: 'Wabi-Sabi', link: '#' },
    featuredMedia: { source_url: kintsugiImage, alt_text: 'The Art of Kintsugi', width: 400, height: 300 },
  },
  {
    date: new Date('2024-10-18').toISOString(),
    title: 'Echoes of Silence',
    content: `<p>Exploring 'Ma', the Japanese concept of negative space. It's the pause in a conversation that gives it weight, the empty space in a room that makes it feel calm. It is the interval, the void, that holds potential.</p><img src="${silenceImage}" alt="Misty mountains" class="my-8 rounded-lg shadow-sm" /><p>In Western culture, we often try to fill every moment, every space. 'Ma' teaches us the power of what isn't there. It is in the silence that we can truly hear, and in the emptiness that we can truly see. This principle is fundamental to Japanese aesthetics in art, architecture, and life itself.</p>`,
    excerpt: "Exploring 'Ma', the Japanese concept of negative space. It's the pause in a conversation that gives it weight, the empty space in a room that makes it feel calm. It is the interval, the void, that holds potential.",
    author: { name: 'Ma', link: '#' },
    featuredMedia: { source_url: silenceImage, alt_text: 'Echoes of Silence', width: 400, height: 300 },
  },
  {
    date: new Date('2024-10-15').toISOString(),
    title: 'Rain on Shoji Screens',
    content: `<p>The soft, percussive sound of rain against traditional paper screens. A sound that doesn't intrude but rather deepens the sense of peace and enclosure. A simple, transient beauty.</p><p>It's a reminder of the world outside, yet it enhances the comfort of the world within. The screen diffuses the light, turning the grey day into a soft, ambient glow. It is a moment of pure, unadulterated atmosphere, a sensory experience that costs nothing and offers everything.</p>`,
    excerpt: 'The soft, percussive sound of rain against traditional paper screens. A sound that doesn\'t intrude but rather deepens the sense of peace and enclosure. A simple, transient beauty.',
    author: { name: 'Kensho', link: '#' },
    featuredMedia: { source_url: rainImage, alt_text: 'Rain on Shoji Screens', width: 400, height: 300 },
  },
];
