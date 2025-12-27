import React from 'react';

interface LoadingOverlayProps {
  theme: 'light' | 'dark';
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ theme }) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${
      theme === 'dark' ? 'bg-stone-950/95' : 'bg-white/95'
    }`}>
      <div className="text-center">
        <div className="relative w-20 h-20 mb-6 mx-auto">
          <div className={`absolute inset-0 border-4 rounded-full ${
            theme === 'dark' ? 'border-amber-500/30' : 'border-amber-500/20'
          }`}></div>
          <div className={`absolute inset-4 border-4 rounded-full animate-spin ${
            theme === 'dark' ? 'border-amber-500/50' : 'border-amber-500/40'
          }`}></div>
          <div className={`absolute inset-8 border-4 rounded-full animate-spin ${
            theme === 'dark' ? 'border-amber-500/70' : 'border-amber-500/60'
          }`} style={{ animationDirection: 'reverse' }}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-4 h-4 rounded-full animate-pulse ${
              theme === 'dark' ? 'bg-amber-500' : 'bg-amber-400'
            }`}></div>
          </div>
        </div>
        <p className={`text-lg font-medium mb-2 ${
          theme === 'dark' ? 'text-amber-300' : 'text-amber-600'
        }`}>
          Preparando la experiencia cubana...
        </p>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-amber-400/60' : 'text-amber-500/60'
        }`}>
          Calentando los sabores tradicionales
        </p>
      </div>
    </div>
  );
};
