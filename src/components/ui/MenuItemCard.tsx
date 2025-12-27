import React from 'react';
import { MenuItem } from '../../types';
import { Card } from './Card';

interface MenuItemCardProps {
  item: MenuItem;
  theme: 'light' | 'dark';
  reducedMotion?: boolean;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, theme, reducedMotion = false }) => {
  const Icon = item.icon;
  
  return (
    <div className="group relative" role="article" aria-label={`Plato: ${item.title}`}>
      <div 
        className={`absolute -inset-1 bg-gradient-to-br ${item.color.from} ${item.color.to} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          reducedMotion ? 'transition-none' : ''
        }`}
        aria-hidden="true"
      ></div>
      
      <Card
        className={`relative p-6 rounded-xl border ${item.color.border} h-full`}
        reducedMotion={reducedMotion}
        tabIndex={0}
      >
        <div className={`p-3 rounded-lg bg-gradient-to-br ${
          item.color.from.replace('/20', '/10')
        } ${item.color.to.replace('/20', '/10')} w-fit mb-6 relative`}>
          <Icon className="h-8 w-8 text-amber-200" />
          <div className="absolute -top-2 -right-2 text-xs px-2 py-1 rounded-full bg-stone-900/80 text-amber-300 font-bold">
            {item.price}
          </div>
        </div>
        
        <h3 className={`text-xl font-bold mb-3 ${
          theme === 'dark' ? 'text-amber-100' : 'text-stone-800'
        }`}>
          {item.title}
        </h3>
        
        <p className={`text-sm mb-6 ${
          theme === 'dark' ? 'text-amber-200/80' : 'text-stone-700'
        }`}>
          {item.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {item.ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className={`px-3 py-1 rounded-full text-xs ${
                theme === 'dark' 
                  ? 'bg-stone-800/50 text-amber-200' 
                  : 'bg-amber-100/80 text-stone-700'
              }`}
            >
              {ingredient}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
};
