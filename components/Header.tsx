import React from 'react';
import { SearchIcon, TelegramIcon } from './Icons';

interface HeaderProps {
  onSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Site branding */}
          <div className="flex-shrink-0">
            <a href="/" className="block transition-transform duration-300 hover:scale-105" aria-label="Modestize Home">
              <img src="/modestize-mini-icon.png" alt="Modestize logo" className="h-10 w-auto" />
            </a>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <a
              href="#"
              className="btn-glass h-10 px-4 flex items-center rounded-full text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/80"
              aria-label="Join Our Telegram"
            >
              <TelegramIcon className="w-5 h-5 mr-2" />
              <span>Join Our Telegram</span>
            </a>
            <button
              onClick={onSearchClick}
              className="btn-glass w-10 h-10 flex items-center justify-center rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/80"
              aria-label="Search posts"
            >
              <SearchIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};