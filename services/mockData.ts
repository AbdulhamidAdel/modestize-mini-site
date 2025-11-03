import { Post, BasePost } from '../types';
import { staticBasePosts } from '../posts';

type StoredPost = BasePost & { id: number };

const DYNAMIC_POSTS_KEY = 'modestize_dynamic_posts';

const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const createPostLink = (title: string): string => `/post/${slugify(title)}`;

export const fetchPosts = (): Promise<{ posts: Post[], hasMore: boolean }> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // 1. Get dynamically "published" posts from localStorage
      let dynamicPosts: StoredPost[] = [];
      try {
        const stored = window.localStorage.getItem(DYNAMIC_POSTS_KEY);
        if (stored) {
          dynamicPosts = JSON.parse(stored);
        }
      } catch (e) {
        console.error("Failed to parse dynamic posts from localStorage", e);
      }

      // 2. Give static posts a unique, stable negative ID so they don't clash with dynamic posts
      const staticPostsWithIds: StoredPost[] = staticBasePosts.map((post, index) => ({
          ...post,
          id: -(index + 1)
      }));

      // 3. Combine dynamic and static posts
      const allPostsData: StoredPost[] = [...dynamicPosts, ...staticPostsWithIds];
      
      // 4. Sort all posts by date, descending, to show the newest first
      const sortedPosts = allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      // 5. Generate final links for all posts. They now all have IDs.
      const finalPosts: Post[] = sortedPosts.map((post) => ({
        ...post,
        link: createPostLink(post.title),
      }));

      resolve({ posts: finalPosts, hasMore: false });
    }, 500);
  });
};
