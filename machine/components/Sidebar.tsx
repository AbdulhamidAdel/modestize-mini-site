import React from 'react';
import { BasePost } from '../../types';

interface SidebarProps {
  post: BasePost;
  setPost: React.Dispatch<React.SetStateAction<BasePost>>;
  onPublish: () => void;
}

const InputField: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    {children}
  </div>
);

export const Sidebar: React.FC<SidebarProps> = ({ post, setPost, onPublish }) => {

  // Fix: Add 'author.name' to the union type to allow the function to handle updates to this nested property, resolving the type errors.
  const handleChange = (field: keyof BasePost | 'featuredMedia.source_url' | 'author.name', value: any) => {
    setPost(prev => {
        if (field === 'featuredMedia.source_url') {
            return {
                ...prev,
                featuredMedia: { ...prev.featuredMedia!, source_url: value }
            }
        }
        if (field === 'author.name') {
            return {
                ...prev,
                author: { ...prev.author, name: value }
            }
        }
        return { ...prev, [field]: value };
    });
  };

  return (
    <aside className="w-80 flex-shrink-0 bg-white/50 backdrop-blur-lg border-l border-gray-200/80 flex flex-col">
      <div className="p-6 overflow-y-auto flex-1">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Post Settings</h2>
        <div className="space-y-6">
          <InputField label="Publish Date & Time">
            <input
              type="datetime-local"
              value={post.date.slice(0, 16)}
              onChange={(e) => handleChange('date', new Date(e.target.value).toISOString())}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm p-2"
            />
          </InputField>
          <InputField label="Author Name">
            <input
              type="text"
              value={post.author.name}
              onChange={(e) => handleChange('author.name', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm p-2"
            />
          </InputField>
          <InputField label="Featured Image URL">
            <input
              type="text"
              value={post.featuredMedia?.source_url || ''}
              onChange={(e) => handleChange('featuredMedia.source_url', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm p-2"
            />
          </InputField>
          <InputField label="Excerpt">
             <textarea
              rows={4}
              value={post.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm p-2"
            />
          </InputField>
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">SEO</h3>
            <div className="space-y-4">
                <InputField label="Meta Description">
                    <textarea rows={3} placeholder="A short summary for search engines." className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2" />
                </InputField>
                 <InputField label="Tags (comma-separated)">
                    <input type="text" placeholder="design, tech, minimalism" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2" />
                </InputField>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-gray-200/80">
        <button
          onClick={onPublish}
          className="btn-glass w-full h-12 flex items-center justify-center rounded-full text-base font-medium text-gray-800 bg-white/40 hover:bg-white/60"
        >
          Generate Post
        </button>
      </div>
    </aside>
  );
};
