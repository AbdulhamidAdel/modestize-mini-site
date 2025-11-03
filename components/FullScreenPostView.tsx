import React, { useEffect, useRef, useCallback, useState } from 'react';
import { Post } from '../types';
// Fix: Corrected import to be extension-less.
import { CloseIcon } from './Icons';
import { SuggestedPostCard } from './SuggestedPostCard';
import { parseBBCodeToHTML } from '../utils/contentParser';

interface FullScreenPostViewProps {
  posts: Post[];
  initialPostIndex: number;
  onClose: () => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const FullScreenPostView: React.FC<FullScreenPostViewProps> = ({ posts, initialPostIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialPostIndex);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const currentPost = posts[currentIndex];
  const nextPostIndex = (currentIndex + 1) % posts.length;
  const nextPost = posts[nextPostIndex];

  // Update URL and scroll to top when the post changes
  useEffect(() => {
    // Update URL
    // Fix: Use the `link` property from the Post object instead of regenerating it. This resolves the module import error.
    const newUrl = currentPost.link;
    try {
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
    } catch (e) {
      console.warn("Could not update URL:", e);
    }
    // Scroll to top
    scrollContainerRef.current?.scrollTo(0, 0);
  }, [currentIndex, currentPost]);


  // Keyboard controls & body overflow
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
  
  const parsedContent = parseBBCodeToHTML(currentPost.content);

  return (
    <div 
      className="fixed inset-0 z-[60] bg-white flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex-shrink-0 h-16 md:h-20 flex items-center justify-end px-4 sm:px-6 relative z-10 border-b border-gray-200">
        <button
          onClick={onClose}
          className="p-2 rounded-full text-gray-600 hover:bg-gray-900/10 hover:text-gray-900 transition-colors duration-200"
          aria-label="Close post"
        >
          <CloseIcon />
        </button>
      </div>

      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <article className="py-16">
            <header className="mb-8">
              <p className="mb-3 text-sm text-gray-500">
                {formatDate(currentPost.date)} &mdash; by {currentPost.author.name}
              </p>
              <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-gray-900 leading-snug">
                {currentPost.title}
              </h1>
            </header>
            
            {currentPost.featuredMedia && (
              <div className="mb-8 aspect-video overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={currentPost.featuredMedia.source_url.replace('/400/300', '/800/600')}
                  alt={currentPost.featuredMedia.alt_text}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div
              className="prose prose-lg max-w-none text-gray-800"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          </article>

          {/* Suggested Post Section */}
          <div className="py-16 border-t border-gray-200">
             <h3 className="text-center text-sm font-medium tracking-widest text-gray-500 uppercase mb-8">
                Next Up
             </h3>
             <SuggestedPostCard 
                post={nextPost}
                onClick={() => setCurrentIndex(nextPostIndex)}
             />
          </div>
        </div>
      </div>
    </div>
  );
};
