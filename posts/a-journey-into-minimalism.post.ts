import { BasePost } from '../types';

const featuredImage = 'https://picsum.photos/seed/minimalism-journey/400/300';

export const post: BasePost = {
  date: new Date('2024-10-28T10:00:00Z').toISOString(),
  title: 'A Journey Into Minimalism',
  content: `<p>Minimalism is not about having less, it's about making room for more of what matters. It's a journey of discovering what is truly essential in our lives, both digitally and physically.</p><p>Start by decluttering one small area. A desk, a drawer, or even your computer's desktop. The clarity gained from this simple act can be profound. It creates a ripple effect, encouraging a more intentional approach to everything we own and do.</p><p>This path is not one of deprivation, but of intention. By removing the superfluous, we create space for focus, creativity, and peace. It's a quiet revolution against the culture of excess.</p>`,
  excerpt: "Minimalism is not about having less, it's about making room for more of what matters. It's a journey of discovering what is truly essential.",
  author: { name: 'Satori', link: '#' },
  featuredMedia: { source_url: featuredImage, alt_text: 'A clean, minimalist desk setup', width: 400, height: 300 },
};
