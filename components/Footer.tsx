import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
        <div className="flex justify-center items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Modestize. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
