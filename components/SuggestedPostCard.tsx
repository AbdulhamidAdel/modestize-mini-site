import React from 'react';
import { Post } from '../types';
// Fix: Corrected import to be extension-less.
import { RightArrowIcon } from './Icons';

interface SuggestedPostCardProps {
  post: Post;
  onClick: () => void;
}

export const SuggestedPostCard: React.FC<SuggestedPostCardProps> = ({ post, onClick }) => {
  const { featuredMedia, title } = post;

  return (
    <div 
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row items-stretch gap-6">
        {featuredMedia && (
          <div className="flex-shrink-0 w-full sm:w-48 aspect-video overflow-hidden rounded-xl bg-gray-100 transition-shadow duration-300 group-hover:shadow-lg">
            <img
              src={featuredMedia.source_url}
              alt={featuredMedia.alt_text}
              width={featuredMedia.width}
              height={featuredMedia.height}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex-1 pane-glass p-6 rounded-xl flex flex-col items-start justify-center">
          <h4 className="text-xl font-normal tracking-tight text-gray-800 transition-colors duration-300 group-hover:text-black leading-snug">
            {title}
          </h4>
          <div className="mt-4 flex items-center text-sm font-medium text-gray-600 group-hover:text-black transition-colors duration-300">
            <span>Read Now</span>
            <RightArrowIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
};