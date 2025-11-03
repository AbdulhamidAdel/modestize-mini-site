import React, { useMemo } from 'react';
import { Post } from '../types';
// Fix: Corrected import to be extension-less.
import { RightArrowIcon } from './Icons';
import { parseBBCodeToHTML } from '../utils/contentParser';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  const { featuredMedia, author } = post;

  const parsedExcerpt = useMemo(() => {
    return parseBBCodeToHTML(post.excerpt);
  }, [post.excerpt]);

  return (
    <article className="group flex flex-col">
      {featuredMedia && (
        <div 
          onClick={onClick}
          className="cursor-pointer w-full aspect-video overflow-hidden rounded-2xl bg-gray-100 mb-6 transition-shadow duration-300 group-hover:shadow-xl"
        >
          <img
            src={featuredMedia.source_url}
            alt={featuredMedia.alt_text}
            width={featuredMedia.width}
            height={featuredMedia.height}
            className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="flex flex-col items-start">
        <p className="mb-3 text-xs text-gray-500">
          {formatDate(post.date)} &mdash; by {author.name}
        </p>
        <h2 
          onClick={onClick}
          className="cursor-pointer text-3xl md:text-4xl font-normal tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-black leading-snug"
        >
          {post.title}
        </h2>
        <div
          className="mt-4 text-base text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parsedExcerpt }}
        />
        <button
          onClick={onClick}
          className="mt-6 flex items-center text-sm font-medium text-gray-600 group-hover:text-black transition-colors duration-300"
        >
          <span>Read More</span>
          <RightArrowIcon className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </article>
  );
};