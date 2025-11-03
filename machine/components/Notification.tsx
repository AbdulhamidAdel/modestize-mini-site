import React, { useEffect, useState } from 'react';

interface NotificationProps {
  show: boolean;
  message: string;
}

export const Notification: React.FC<NotificationProps> = ({ show, message }) => {
  const [render, setRender] = useState(show);

  useEffect(() => {
    if (show) {
      setRender(true);
    } else {
      const timer = setTimeout(() => setRender(false), 300); // Wait for fade-out
      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!render) return null;

  return (
    <div 
      className={`fixed top-20 right-6 z-[100] pane-glass p-4 rounded-xl shadow-lg transition-all duration-300 ${show ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
    >
      <p className="font-medium text-gray-800">{message}</p>
    </div>
  );
};
