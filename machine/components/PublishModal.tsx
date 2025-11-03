import React from 'react';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { CopyIcon, CheckIcon, CloseIcon } from './Icons';

export interface GeneratedCode {
  filename: string;
  newPostFileContent: string;
  importStatement: string;
  variableName: string;
}

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: GeneratedCode;
}

const CodeBlock: React.FC<{ title: string; language: string; code: string; }> = ({ title, language, code }) => {
  const [copied, copy] = useCopyToClipboard();

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700">
        <p className="text-sm font-medium text-gray-300">{title}</p>
        <button 
            onClick={() => copy(code)}
            className="flex items-center text-sm text-gray-300 hover:text-white transition-colors"
        >
          {copied ? <CheckIcon className="w-4 h-4 mr-1 text-green-400" /> : <CopyIcon className="w-4 h-4 mr-1" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-sm text-white overflow-x-auto">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose, code }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-gray-900/50 backdrop-blur-lg flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: 'slideDownFadeIn 0.4s cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Post Generated!</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <p className="text-gray-600">
            Success! Here's a preview of your content. This is a temporary preview saved to your browser. To make it a permanent part of the website, you must create and update the project files with the code below.
          </p>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">1. Create New Post File</h3>
            <p className="text-sm text-gray-500 mb-3">
              In the <code className="text-xs bg-gray-100 p-1 rounded">/posts</code> directory, create a new file named:
            </p>
            <div className="bg-gray-100 p-2 rounded-md text-center text-sm font-mono text-gray-700 mb-4">
              {code.filename}
            </div>
            <CodeBlock 
              title={`File: /posts/${code.filename}`}
              language="typescript" 
              code={code.newPostFileContent} 
            />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">2. Update Index File</h3>
            <p className="text-sm text-gray-500 mb-3">
              Open <code className="text-xs bg-gray-100 p-1 rounded">/posts/index.ts</code> and make these two changes:
            </p>
             <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-500 mb-2">A. Add this import statement with the others:</p>
                    <CodeBlock 
                        title="Add to imports"
                        language="typescript" 
                        code={code.importStatement} 
                    />
                </div>
                <div>
                     <p className="text-sm text-gray-500 mb-2">B. Add the new post variable to the `staticBasePosts` array:</p>
                     <CodeBlock 
                        title="Add to array"
                        language="typescript" 
                        code={code.variableName} 
                    />
                </div>
             </div>
          </div>
        </div>
        
        <div className="flex-shrink-0 p-4 border-t border-gray-200 bg-gray-50/50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full h-12 flex items-center justify-center rounded-full text-base font-medium text-white bg-gray-800 hover:bg-black transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
