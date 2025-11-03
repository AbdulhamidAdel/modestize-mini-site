import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Editor } from './components/Editor';
import { Notification } from './components/Notification';
import { PublishModal, GeneratedCode } from './components/PublishModal';
import { useLocalStorage } from './hooks/useLocalStorage';
import { BasePost } from '../types';

const EMPTY_POST: BasePost = {
  title: 'Untitled Post',
  content: '',
  date: new Date().toISOString().slice(0, 16),
  author: { name: 'Kensho', link: '#' },
  excerpt: '',
  featuredMedia: {
    source_url: 'https://picsum.photos/seed/new-post/400/300',
    alt_text: 'Featured image',
    width: 400,
    height: 300,
  }
};

const DYNAMIC_POSTS_KEY = 'modestize_dynamic_posts';
type StoredPost = BasePost & { id: number };

const App: React.FC = () => {
  const [post, setPost] = useLocalStorage<BasePost>('postDraft', EMPTY_POST);
  const [showNotification, setShowNotification] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<GeneratedCode | null>(null);

  const handlePublish = () => {
    // --- 1. Make the post "live" by saving to localStorage ---
    const newPost: StoredPost = { 
      ...post,
      id: Date.now() // Use a timestamp for a simple unique ID
    };

    let allStoredPosts: StoredPost[] = [];
    try {
        const stored = window.localStorage.getItem(DYNAMIC_POSTS_KEY);
        allStoredPosts = stored ? JSON.parse(stored) : [];
    } catch(e) {
        console.error("Could not parse stored posts", e);
    }
    
    allStoredPosts.unshift(newPost); // Add new post to the beginning
    window.localStorage.setItem(DYNAMIC_POSTS_KEY, JSON.stringify(allStoredPosts));

    // --- 2. Generate the permanent code for the modal ---
    const slugify = (text: string): string => {
      return text.toString().toLowerCase()
        .replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-')
        .replace(/^-+/, '').replace(/-+$/, '');
    };
    const slug = slugify(post.title);
    const filename = `${slug}.post.ts`;
    const variableName = slug.split('-').map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join('') + 'Post';

    const newPostFileContent = `import { BasePost } from '../types';

// Schema.org Article metadata
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${post.title.replace(/"/g, '\\"')}",
  "datePublished": "${post.date}",
  "dateModified": "${new Date().toISOString()}",
  "author": {
    "@type": "Person",
    "name": "${post.author.name.replace(/"/g, '\\"')}",
    "url": "${post.author.link.replace(/"/g, '\\"')}"
  },
  "image": {
    "@type": "ImageObject",
    "url": "${post.featuredMedia?.source_url.replace(/"/g, '\\"')}",
    "width": "${post.featuredMedia?.width}",
    "height": "${post.featuredMedia?.height}"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Modestize",
    "logo": {
      "@type": "ImageObject",
      "url": "/modestize-mini-icon.png"
    }
  },
  "description": "${post.excerpt.replace(/"/g, '\\"')}"
};

export const post: BasePost = {
  date: '${post.date}',
  title: '${post.title.replace(/'/g, "\\'")}',
  content: \`${post.content.replace(/`/g, "\\`")}\`,
  excerpt: '${post.excerpt.replace(/'/g, "\\'")}',
  author: { name: '${post.author.name.replace(/'/g, "\\'")}', link: '${post.author.link.replace(/'/g, "\\'")}' },
  featuredMedia: { 
    source_url: '${post.featuredMedia?.source_url.replace(/'/g, "\\'")}', 
    alt_text: '${post.featuredMedia?.alt_text.replace(/'/g, "\\'")}', 
    width: ${post.featuredMedia?.width}, 
    height: ${post.featuredMedia?.height} 
  },
  // Add structured data for search engines
  schema: articleSchema
};
`;
    const importStatement = `import { post as ${variableName} } from './${slug}.post';`;

    // --- 3. Open the modal with the generated code ---
    setGeneratedCode({ filename, newPostFileContent, importStatement, variableName });
    setIsModalOpen(true);

    // After publishing, we don't clear the form automatically.
    // The user can continue editing or use "New Post".
  };
  
  const handleNewPost = () => {
    if(window.confirm("Are you sure you want to start a new post? Your current draft will be cleared.")) {
       setPost(EMPTY_POST);
    }
  }

  return (
    <div className="min-h-screen flex flex-col text-gray-800">
      <header className="flex-shrink-0 bg-white/70 backdrop-blur-lg border-b border-gray-200/80 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                 <div className="flex items-center">
                    <a href="/" className="text-xl font-normal text-gray-800 hover:text-black transition-colors duration-300">
                        Modestize Machine
                    </a>
                    <span className="ml-4 text-sm text-gray-500">Post Editor</span>
                 </div>
                 <div className="flex items-center space-x-2">
                    <button onClick={handleNewPost} className="btn-glass h-10 px-4 flex items-center rounded-full text-sm font-medium text-gray-800">
                      New Post
                    </button>
                    <a href="/" target="_blank" className="btn-glass h-10 px-4 flex items-center rounded-full text-sm font-medium text-gray-800">
                        View Blog
                    </a>
                 </div>
            </div>
        </div>
      </header>
      
      <main className="flex-1 flex" style={{ height: 'calc(100vh - 4rem)' }}>
        <div className="flex-1 flex overflow-hidden">
          <Editor post={post} setPost={setPost} />
          <Sidebar post={post} setPost={setPost} onPublish={handlePublish} />
        </div>
      </main>
      
      <Notification 
        show={showNotification} 
        message="Post published successfully!"
      />

      {generatedCode && (
        <PublishModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          code={generatedCode}
        />
      )}
    </div>
  );
};

export default App;
