import { BasePost } from '../types';

// Schema.org Article metadata
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Fine. It's Good.",
  "datePublished": "2025-11-03T02:33",
  "dateModified": "2025-11-03T03:37:05.060Z",
  "author": {
    "@type": "Person",
    "name": "Kensho",
    "url": "#"
  },
  "image": {
    "@type": "ImageObject",
    "url": "https://images.unsplash.com/photo-1574539602047-548bf9557352?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1665",
    "width": "400",
    "height": "300"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Modestize",
    "logo": {
      "@type": "ImageObject",
      "url": "/modestize-mini-icon.png"
    }
  },
  "description": "obama"
};

export const post: BasePost = {
  date: '2025-11-03T02:33',
  title: 'Fine. It\'s Good.',
  content: `<div>she replied to my comment before...</div><div><br></div><div><br></div><p><br></p><p><img src="https://images.unsplash.com/photo-1574539602047-548bf9557352?ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&amp;auto=format&amp;fit=crop&amp;q=80&amp;w=1665" alt=""></p>
  <p><br></p>`,
  excerpt: 'obama',
  author: { name: 'Kensho', link: '#' },
  featuredMedia: { 
    source_url: 'https://images.unsplash.com/photo-1574539602047-548bf9557352?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1665', 
    alt_text: 'Featured image', 
    width: 400, 
    height: 300 
  },
  // Add structured data for search engines
  schema: articleSchema
};
