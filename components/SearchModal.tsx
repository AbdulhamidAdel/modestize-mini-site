import React, { useEffect, useRef } from 'react';
// Fix: Corrected import to be extension-less.
import { CloseIcon, SearchIcon } from './Icons';
import { Post } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  results: Post[];
  onResultClick: (index: number) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, searchQuery, setSearchQuery, results, onResultClick }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const showResults = searchQuery.length > 0;

  return (
    <div
      className="fixed inset-0 z-[70] bg-gray-50/50 backdrop-blur-2xl flex items-start justify-center p-4 sm:p-6 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-2xl pt-20"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideDownFadeIn 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
            <SearchIcon className="h-6 w-6 text-gray-600" />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-16 bg-white/40 rounded-full border border-white/50 shadow-inner text-xl font-light text-gray-900 placeholder-gray-500 pl-16 pr-36 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/80 focus:bg-white/60"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <button className="btn-glass h-12 px-6 flex items-center rounded-full text-base font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/80">
              Search
            </button>
          </div>
        </div>

        {showResults && (
          <div className="mt-4 max-h-[60vh] overflow-y-auto rounded-2xl bg-white/60 backdrop-blur-sm border border-white/50 shadow-lg">
            {results.length > 0 ? (
              <ul className="divide-y divide-gray-200/50">
                {results.map((post, index) => (
                  <li key={post.id}>
                    <button
                      onClick={() => onResultClick(index)}
                      className="w-full text-left p-4 hover:bg-gray-900/5 transition-colors duration-200"
                    >
                      <h3 className="font-medium text-gray-900">{post.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No results found.
              </div>
            )}
          </div>
        )}
      </div>

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-black/10 hover:text-gray-700 transition-all duration-200"
        aria-label="Close search"
      >
        <CloseIcon />
      </button>
    </div>
  );
};