import { BasePost } from '../types';

const silenceImage = 'https://images.unsplash.com/photo-1574539602047-548bf9557352?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765';
const silenceFeatured = 'https://images.unsplash.com/photo-1574539602047-548bf9557352?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=765';

export const post: BasePost = {
  date: new Date('2025-10-18').toISOString(),
  title: 'I Definitly Know Her!',
  content: `<p>Exploring 'Ma', the Japanese concept of negative space. It's the pause in a conversation that gives it weight, the empty space in a room that makes it feel calm. It is the interval, the void, that holds potential.</p><img src="${silenceImage}" alt="Misty mountains" class="my-8 rounded-lg shadow-sm" /><p>In Western culture, we often try to fill every moment, every space. 'Ma' teaches us the power of what isn't there. It is in the silence that we can truly hear, and in the emptiness that we can truly see. This principle is fundamental to Japanese aesthetics in art, architecture, and life itself.</p>`,
  excerpt: "Exploring 'Ma', the Japanese concept of negative space. It's the pause in a conversation that gives it weight, the empty space in a room that makes it feel calm. It is the interval, the void, that holds potential.",
  author: { name: 'Ma', link: '#' },
  featuredMedia: { source_url: silenceFeatured, alt_text: 'Echoes of Silence', width: 400, height: 300 },
};
