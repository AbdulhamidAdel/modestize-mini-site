// A simplified, standalone data structure for a blog post.
export interface Post {
  id: number;
  date: string; // ISO 8601 format date string
  link: string;
  title: string;
  content: string;
  excerpt: string;
  author: {
    name: string;
    link: string;
  };
  featuredMedia?: {
    source_url: string;
    alt_text: string;
    width: number;
    height: number;
  };
}

// A partial type for defining post content before ID and link are generated.
export type BasePost = Omit<Post, 'id' | 'link'>;
