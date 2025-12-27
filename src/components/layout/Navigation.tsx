import React  from 'react';
import { NAV_ITEMS } from '../../constants/navigation';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/Button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface NavigationProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  theme,
  onThemeToggle,
  isMobileMenuOpen,
  onMobileMenuToggle,
  activeSection,
  onNavigate
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <nav 
      role="navigation" 
      aria-label="Navegación principal"
      className={`fixed top-0 w-full z-50 px-4 sm:px-6 py-4 backdrop-blur-md border-b ${
        theme === 'dark' 
          ? 'bg-stone-900/30 border-amber-500/20' 
          : 'bg-amber-50/30 border-amber-500/30'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Logo  />
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`flex items-center space-x-2 px-3 py-2 lg:px-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                theme === 'dark' ? 'focus:ring-offset-stone-900' : 'focus:ring-offset-white'
              } ${
                activeSection === item.id
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 font-semibold shadow-lg shadow-amber-500/10'
                  : theme === 'dark' ? 'hover:bg-stone-800/50 text-amber-200' : 'hover:bg-amber-100/50 text-stone-700'
              }`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          ))}
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMobileMenuToggle}
            className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 md:hidden ${
              theme === 'dark' ? 'focus:ring-offset-stone-900 hover:bg-stone-800/50' : 'focus:ring-offset-white hover:bg-amber-100/50'
            }`}
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
          
          <ThemeToggle theme={theme} onToggle={onThemeToggle} />
          
          <Button
            onClick={() => onNavigate('contact')}
            aria-label="Reservar mesa en el restaurante"
          >
            Reservar
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${
        isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
      }`}>
        <div className={`py-4 rounded-xl backdrop-blur-md border ${
          theme === 'dark' 
            ? 'bg-stone-900/80 border-stone-800' 
            : 'bg-amber-50/80 border-amber-200'
        }`}>
          <div className="flex flex-col space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 font-semibold'
                    : theme === 'dark' ? 'hover:bg-stone-800/50 text-amber-200' : 'hover:bg-amber-100/50 text-stone-700'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

