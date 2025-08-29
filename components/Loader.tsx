import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Applying your new look...",
  "Styling with smart technology...",
  "Almost ready for your debut...",
  "Polishing the pixels...",
  "Just a moment, fashion waits for no one..."
];

export const Loader: React.FC = () => {
    const [message, setMessage] = useState(loadingMessages[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)]);
        }, 3000);

        return () => clearInterval(intervalId);
    }, []);

  return (
    <div className="absolute inset-0 bg-[var(--bg-secondary)]/80 backdrop-blur-sm flex flex-col justify-center items-center z-50 rounded-2xl transition-colors duration-300">
      <div className="w-16 h-16 border-4 border-t-4 border-[var(--border-secondary)] border-t-[var(--accent-primary)] rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold text-[var(--text-primary)] text-center px-4">{message}</p>
    </div>
  );
};