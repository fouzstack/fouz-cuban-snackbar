import React from 'react';
import { MENU_ITEMS } from '../../constants/menuItems';
import { MenuItemCard } from '../ui/MenuItemCard';
import { Button } from '../ui/Button';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface MenuSectionProps {
  theme: 'light' | 'dark';
  reducedMotion: boolean;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ theme, reducedMotion }) => {
  return (
    <section 
      id="menu" 
      className="relative py-24 md:py-32 px-4 sm:px-6 scroll-mt-80"
      aria-label="Menú del restaurante"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
              Nuestros Sabores
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${
            theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'
          }`}>
            Platos tradicionales preparados con recetas familiares de generaciones
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {MENU_ITEMS.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              theme={theme}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="secondary"
            size="lg"
            href="/menu-completo.pdf"
            icon={DocumentTextIcon}
            external
            aria-label="Ver menú completo en PDF"
          >
            Ver Menú Completo (PDF)
          </Button>
        </div>
      </div>
    </section>
  );
};