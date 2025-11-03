import React, { useState, useRef, useEffect } from 'react';
import { BasePost } from '../../types';
import { BoldIcon, ItalicIcon, LinkIcon, CodeIcon, EyeIcon, ImageIcon } from './Icons';

interface EditorProps {
  post: BasePost;
  setPost: React.Dispatch<React.SetStateAction<BasePost>>;
}

type ViewMode = 'visual' | 'code';

export const Editor: React.FC<EditorProps> = ({ post, setPost }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('visual');
  const editorRef = useRef<HTMLDivElement>(null);
  const PLACEHOLDER = 'Start writing your story here...';
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [imageAltInput, setImageAltInput] = useState('');
  
  const handleContentChange = (content: string) => {
    setPost(prev => ({ ...prev, content }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({ ...prev, title: e.target.value }));
  };

  const handleCommand = (command: string) => {
    document.execCommand(command, false);
    if(editorRef.current) handleContentChange(editorRef.current.innerHTML);
  };
  
  const handleHeading = (level: 'h1' | 'h2' | 'h3' | 'p') => {
    const tag = level === 'p' ? '<P>' : `<${level.toUpperCase()}>`;
    document.execCommand('formatBlock', false, tag);
    if(editorRef.current) handleContentChange(editorRef.current.innerHTML);
  };

  const openImageModal = () => {
    setImageUrlInput('');
    setImageAltInput('');
    setShowImageModal(true);
  };

  const insertImageFromModal = () => {
    if (!imageUrlInput) return;
    
    // Focus the editor and ensure caret position
    if (editorRef.current) {
      editorRef.current.focus();
      
      // If no selection exists, move caret to end
      const selection = window.getSelection();
      if (!selection?.rangeCount) {
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        range.collapse(false); // collapse to end
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }

    // insert image HTML at caret (include alt text)
    const safeUrl = imageUrlInput.replace(/"/g, '%22');
    const safeAlt = (imageAltInput || '').replace(/"/g, '&quot;');
    const imgHtml = `<p><img src="${safeUrl}" alt="${safeAlt}" /></p><p><br></p>`;
    
    // Save the current content before inserting image
    const currentContent = editorRef.current?.innerHTML || '';
    
    // Insert the image HTML
    document.execCommand('insertHTML', false, imgHtml);
    
    // Wait a tick to let the DOM update
    setTimeout(() => {
      if (editorRef.current) {
        // If the content is just the image (no text), make sure we preserve it
        const newContent = editorRef.current.innerHTML;
        if (newContent.includes(safeUrl)) {
          handleContentChange(newContent);
        } else {
          // If something went wrong, restore the content and try inserting differently
          editorRef.current.innerHTML = currentContent + imgHtml;
          handleContentChange(editorRef.current.innerHTML);
        }
      }
    }, 0);
    
    setShowImageModal(false);
  };

  const cancelImageModal = () => {
    setShowImageModal(false);
  };
  
  const handleLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      document.execCommand('createLink', false, url);
      if(editorRef.current) handleContentChange(editorRef.current.innerHTML);
    }
  };
  
  // Sync contentEditable div with state and show a ghost placeholder when content is empty
  useEffect(() => {
    if (viewMode === 'visual' && editorRef.current) {
      const isEmpty = !post.content || post.content.trim() === '';
      const placeholderHtml = `<p><span style="color:#9CA3AF">${PLACEHOLDER}</span></p>`;
      const current = editorRef.current.innerHTML;
      if (isEmpty && current !== placeholderHtml) {
        editorRef.current.innerHTML = placeholderHtml;
      } else if (!isEmpty && current !== post.content) {
        editorRef.current.innerHTML = post.content;
      }
    }
  }, [post.content, viewMode]);

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto">
      <div className="max-w-3xl w-full mx-auto">
        <input
          type="text"
          value={post.title}
          onChange={handleTitleChange}
          placeholder="Post Title"
          className="w-full text-4xl font-normal tracking-tight text-gray-900 leading-snug bg-transparent border-none focus:outline-none focus:ring-0 mb-6 font-serif"
        />

        <div className="sticky top-0 z-10 bg-gray-100/80 backdrop-blur-sm -mx-2 px-2 py-2 mb-4 rounded-lg border border-gray-200/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <button onClick={() => handleCommand('bold')} className="p-2 rounded hover:bg-gray-200" aria-label="Bold"><BoldIcon /></button>
              <button onClick={() => handleCommand('italic')} className="p-2 rounded hover:bg-gray-200" aria-label="Italic"><ItalicIcon /></button>
              <button onClick={handleLink} className="p-2 rounded hover:bg-gray-200" aria-label="Link"><LinkIcon /></button>
              <select
                onChange={(e) => handleHeading(e.target.value as any)}
                defaultValue="p"
                className="ml-2 bg-transparent border border-gray-200 rounded px-2 py-1 text-sm"
                aria-label="Heading level"
              >
                <option value="p">Normal</option>
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
              </select>
              <button onClick={openImageModal} className="p-2 rounded hover:bg-gray-200" aria-label="Add image"><ImageIcon /></button>
            </div>
            <div className="flex items-center space-x-1 pane-glass p-1 rounded-full">
              <button 
                onClick={() => setViewMode('visual')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${viewMode === 'visual' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
              ><EyeIcon className="w-4 h-4 mr-1 inline-block"/> Visual</button>
              <button 
                onClick={() => setViewMode('code')}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${viewMode === 'code' ? 'bg-white shadow-sm' : 'hover:bg-white/50'}`}
              ><CodeIcon className="w-4 h-4 mr-1 inline-block"/> Code</button>
            </div>
          </div>
        </div>

        {viewMode === 'visual' ? (
          <div
            ref={editorRef}
            contentEditable
            onFocus={() => {
              if (!editorRef.current) return;
              const text = editorRef.current.textContent?.trim();
              const html = editorRef.current.innerHTML;
              
              // Clear placeholder on focus if it's the only content
              if (text === PLACEHOLDER || html.includes(`style="color:#9CA3AF">${PLACEHOLDER}`)) {
                editorRef.current.innerHTML = '<p><br></p>';
                handleContentChange('');
              }
            }}
            onBlur={() => {
              if (!editorRef.current) return;
              const text = editorRef.current.textContent?.trim();
              const html = editorRef.current.innerHTML;
              
              // Show placeholder only if truly empty
              if (text === '' || html === '' || html === '<p><br></p>') {
                editorRef.current.innerHTML = `<p><span style="color:#9CA3AF">${PLACEHOLDER}</span></p>`;
              }
            }}
            onInput={(e) => {
              const html = e.currentTarget.innerHTML;
              const text = e.currentTarget.textContent?.trim() || '';
              
              // Don't save if it's just the placeholder or empty
              if (text === PLACEHOLDER || text === '' || html.includes(`style="color:#9CA3AF">${PLACEHOLDER}`)) {
                handleContentChange('');
                return;
              }
              
              // Remove any lingering placeholder spans before saving
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = html;
              const placeholders = tempDiv.querySelectorAll('span[style*="color:#9CA3AF"]');
              placeholders.forEach(el => {
                if (el.textContent?.trim() === PLACEHOLDER) {
                  el.remove();
                }
              });
              
              handleContentChange(tempDiv.innerHTML);
            }}
            className="wysiwyg-editor prose prose-lg max-w-none text-gray-800 focus:outline-none"
            style={{ minHeight: '50vh' }}
          />
        ) : (
          <textarea
            value={post.content}
            onChange={(e) => handleContentChange(e.target.value)}
            className="w-full h-full p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm border-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{ minHeight: '50vh' }}
          />
        )}
      </div>
      {showImageModal && (
        <div style={{ position: 'fixed', left: 0, top: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div onClick={cancelImageModal} style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{ position: 'relative', background: 'white', borderRadius: 8, padding: 16, width: '100%', maxWidth: 520, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', zIndex: 10000 }}>
            <h3 className="text-lg font-medium mb-3">Insert image</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="text"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Alt text (optional)</label>
                <input
                  type="text"
                  value={imageAltInput}
                  onChange={(e) => setImageAltInput(e.target.value)}
                  placeholder="A short description"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm text-sm p-2"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={cancelImageModal}
                className="px-3 py-1 rounded text-sm font-medium text-gray-700 hover:bg-gray-50"
                aria-label="Cancel image insert"
              >
                Cancel
              </button>
              <button
                onClick={insertImageFromModal}
                className="btn-glass px-3 py-1 rounded-full text-sm font-medium"
                aria-label="Insert image"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
