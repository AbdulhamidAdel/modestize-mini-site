import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PostCard } from './components/PostCard';
import { FullScreenPostView } from './components/FullScreenPostView';
import { SearchModal } from './components/SearchModal';
import { fetchPosts } from './services/mockData';
import { Post } from './types';
import { useDebounce } from './hooks/useDebounce';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activePostIndex, setActivePostIndex] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { posts: fetchedPosts } = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  // Handle routing on initial load
  useEffect(() => {
    if (isLoading || posts.length === 0) {
      return;
    }

    const path = window.location.pathname;
    if (path.startsWith('/post/')) {
      const postIndex = posts.findIndex(p => p.link === path);
      if (postIndex !== -1) {
        setActivePostIndex(postIndex);
      }
    }
  }, [posts, isLoading]);

  const searchResults = useMemo(() => {
    if (!debouncedSearchQuery) return [];
    const query = debouncedSearchQuery.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    );
  }, [debouncedSearchQuery, posts]);
  
  const handlePostClick = (index: number) => {
    setActivePostIndex(index);
  };

  const handleClosePost = () => {
    setActivePostIndex(null);
    // Reset URL to base
    try {
      window.history.replaceState({ ...window.history.state, as: '/', url: '/' }, '', '/');
    } catch (e) {
      console.warn("Could not reset URL:", e);
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };
  
  const handleSearchResultClick = (index: number) => {
    // Find the original index of the post from the search results
    const originalPostIndex = posts.findIndex(p => p.id === searchResults[index].id);
    if (originalPostIndex !== -1) {
      setActivePostIndex(originalPostIndex);
      handleCloseSearch();
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header onSearchClick={handleSearchClick} />

      <main className="pt-24 md:pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-normal tracking-tight text-gray-900">
              Musings on Simplicity
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              A collection of thoughts on design, technology, and life.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-10">Loading posts...</div>
          ) : (
            <div className="space-y-16">
              {posts.map((post, index) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  onClick={() => handlePostClick(index)} 
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />

      <SearchModal 
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        results={searchResults}
        onResultClick={handleSearchResultClick}
      />
      
      {activePostIndex !== null && (
        <FullScreenPostView
          posts={posts}
          initialPostIndex={activePostIndex}
          onClose={handleClosePost}
        />
      )}
    </div>
  );
};

export default App;