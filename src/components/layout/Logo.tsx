import React from 'react';



export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative w-4 h-4">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
        <div className="absolute inset-1 bg-stone-950 rounded-full"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
      </div>
      <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
        Sabores de Cuba
      </span>
    </div>
  );
};
