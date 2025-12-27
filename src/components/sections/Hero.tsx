import React from 'react';
import { Button } from '../ui/Button';
import { 
  DocumentTextIcon, 
  PhoneIcon,
  ChevronDownIcon,
  ArrowTopRightOnSquareIcon, 
  CakeIcon
} from '@heroicons/react/24/outline';
import { 
  FireIcon,
  MusicIcon,
  CubanFlagIcon 
} from '../icons/CustomIcons';
import { setMetaTags } from '../../utils/seo';

interface HeroProps {
  theme: 'light' | 'dark';
  reducedMotion: boolean;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ theme, reducedMotion, onExplore }) => {
  // Configurar meta tags específicos para la página principal
  React.useEffect(() => {
    setMetaTags({
      title: 'Sabores de Cuba - Restaurante Auténtico Cubano | Inicio',
      description: 'Descubre la auténtica cocina cubana en nuestro restaurante. Tradición, sabor y música en un ambiente único que te transportará a La Habana.',
      ogTitle: 'Sabores de Cuba - La mejor experiencia culinaria cubana',
      ogDescription: 'Vive la auténtica experiencia cubana: comida tradicional, música en vivo y ambiente familiar. ¡Reserva tu mesa ahora!'
    });
  }, []);

  const renderTimeIndicator = () => (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center space-y-4">
      <div className="text-xs text-amber-400 rotate-90 whitespace-nowrap mb-20">
        HORAS DE SABOR
      </div>
      {['DESAYUNO', 'ALMUERZO', 'MERIENDA', 'CENA'].map((time) => (
        <div key={time} className="flex items-center">
          <div className="w-8 h-px bg-amber-500/30"></div>
          <span className="text-xs text-amber-400/60 ml-2">{time}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 scroll-mt-80"
      aria-label="Sección principal - Restaurante cubano"
      itemScope
      itemType="https://schema.org/Restaurant"
    >
      <meta itemProp="name" content="Sabores de Cuba" />
      <meta itemProp="description" content="Restaurante auténtico cubano con recetas tradicionales y ambiente familiar" />
      <meta itemProp="openingHours" content="Mo-Th 11:00-22:00, Fr-Su 11:00-00:00" />
      <meta itemProp="telephone" content="+15551234567" />
      
      {renderTimeIndicator()}

      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <div className='py-15'>
          
        </div>
        <div className="mb-8">
          {/* Badge de autenticidad */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 mb-6 ${
            theme === 'dark' ? '' : 'shadow-lg'
          }`}>
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2"></div>
            <span className="text-sm text-amber-600 dark:text-amber-300">Desde 1959 • Tradición Familiar</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6">
            <span 
              className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent"
              style={!reducedMotion ? {
                animation: 'culinaryGradient 3s ease infinite',
                backgroundSize: '200% auto'
              } : {}}
            >
              Sabores de Cuba
            </span>
            <br />
            <span className={theme === 'dark' ? 'text-amber-100' : 'text-stone-800'}>
              Auténtica Cocina y Café
            </span>
          </h1>
          
          <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed ${
            theme === 'dark' ? 'text-amber-200' : 'text-stone-700'
          }`} itemProp="description">
            Donde cada plato cuenta una historia, cada aroma evoca un recuerdo, 
            y cada sabor te transporta directamente a las calles de La Habana. 
            Tradición, pasión y autenticidad en cada bocado.
          </p>
          
          {/* Botones de acción principales */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="primary"
              size="lg"
              href="/menu.pdf"
              icon={DocumentTextIcon}
              external
              aria-label="Ver menú completo del restaurante cubano en PDF"
            >
              Ver Menú Completo
            </Button>
            
            <Button
              variant="primary"
              size="lg"
              href="tel:+15551234567"
              icon={PhoneIcon}
              aria-label="Reservar mesa en el restaurante cubano por teléfono"
            >
              Reservar Mesa
            </Button>
          </div>
          
          {/* Botones secundarios */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="primary"
              size="lg"
              onClick={onExplore}
              aria-label="Explorar el menú del restaurante cubano"
            >
              <span className="flex items-center">
                Explorar Menú
                <ChevronDownIcon className={`h-5 w-5 ml-2 ${
                  !reducedMotion ? 'group-hover:translate-y-1 transition-transform' : ''
                }`} />
              </span>
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => onExplore()}
              aria-label="Ver experiencias especiales del restaurante cubano"
            >
              <span className="flex items-center">
                Ver Experiencias
                <ArrowTopRightOnSquareIcon className={`h-5 w-5 ml-2 ${
                  !reducedMotion ? 'group-hover:rotate-45 transition-transform' : ''
                }`} />
              </span>
            </Button>
          </div>
        </div>
        
        {/* Íconos decorativos animados */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="relative w-40 h-40">
            <div className="absolute -top-4 left-4">
              <CakeIcon className={`h-8 w-8 text-amber-400 ${
                !reducedMotion ? 'animate-bounce' : ''
              }`} style={{ animationDelay: '0.2s' }} />
            </div>
            
            <div className="absolute top-4 right-0">
              <MusicIcon className={`h-10 w-10 text-orange-400 ${
                !reducedMotion ? 'animate-pulse' : ''
              }`} style={{ animationDuration: '2s' }} />
            </div>
            
            <div className="absolute bottom-8 left-0">
              <FireIcon className={`h-9 w-9 text-amber-500 ${
                !reducedMotion ? 'animate-pulse' : ''
              }`} style={{ animationDuration: '1.5s' }} />
            </div>
            
            <div className="absolute bottom-4 right-4">
              <CubanFlagIcon className={`h-8 w-8 text-red-500 ${
                !reducedMotion ? 'animate-pulse' : ''
              }`} style={{ animationDuration: '2.5s' }} />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full ${
                !reducedMotion ? 'animate-pulse' : ''
              }`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
