import React, { useState, useEffect } from 'react';
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const heroImage = '/hero-cuban-restaurant.jpg'; 
  // Configurar meta tags específicos para la página principal
  useEffect(() => {
    setMetaTags({
      title: 'Sabores de Cuba - Restaurante Auténtico Cubano | Inicio',
      description: 'Descubre la auténtica cocina cubana en nuestro restaurante. Tradición, sabor y música en un ambiente único que te transportará a La Habana.',
      ogTitle: 'Sabores de Cuba - La mejor experiencia culinaria cubana',
      ogDescription: 'Vive la auténtica experiencia cubana: comida tradicional, música en vivo y ambiente familiar. ¡Reserva tu mesa ahora!',
      ogImage: '/images/hero-cuban-restaurant.jpg',
      //ogImageAlt: 'Interior del restaurante Sabores de Cuba con decoración cubana'
    });
  }, []);

  // Precargar imagen
  useEffect(() => {
    const img = new Image();
    img.src = heroImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  const renderTimeIndicator = () => (
    <div className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center space-y-4">
      <div className="text-xs text-amber-400 rotate-90 whitespace-nowrap mb-20 tracking-wider font-medium">
        HORAS DE SABOR
      </div>
      {[
        { text: 'DESAYUNO', hours: '7:00 - 11:00' },
        { text: 'ALMUERZO', hours: '12:00 - 16:00' },
        { text: 'MERIENDA', hours: '16:30 - 18:30' },
        { text: 'CENA', hours: '19:00 - 23:00' }
      ].map((item) => (
        <div key={item.text} className="flex items-center group cursor-help" title={`${item.text}: ${item.hours}`}>
          <div className="w-6 lg:w-8 h-px bg-amber-500/40 group-hover:bg-amber-400 transition-colors"></div>
          <div className="flex flex-col ml-2">
            <span className="text-xs text-amber-400/70 group-hover:text-amber-300 transition-colors">{item.text}</span>
            <span className="text-[10px] text-amber-500/40 group-hover:text-amber-400/60 transition-colors">
              {item.hours}
            </span>
          </div>
        </div>
      ))}
    </div>
  );

  const renderHeroBackground = () => (
    <div className="absolute inset-0 z-0">
      {/* Imagen de fondo */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed' // Efecto parallax
        }}
      >
        {/* Imagen como elemento img para SEO y accesibilidad */}
        <img
          src={heroImage}
          alt="Interior del restaurante cubano Sabores de Cuba mostrando platos tradicionales como ropa vieja, plátanos maduros y café cubano, con decoración auténtica cubana"
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          loading="eager"
          width={1280}
          height={720}
          onLoad={() => setImageLoaded(true)}
          itemProp="image"
        />
      </div>

      {/* Overlay para mejorar legibilidad */}
      <div className={`absolute inset-0 transition-all duration-700 ${theme === 'dark'
          ? 'bg-gradient-to-t from-stone-900/95 via-stone-900/85 to-stone-900/75'
          : 'bg-gradient-to-t from-white/92 via-white/88 to-white/82'
        }`}></div>

      {/* Overlay decorativo de colores cubanos */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-transparent to-blue-500/10 mix-blend-overlay"></div>

      {/* Efecto de grano sutil */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20400%20400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noiseFilter%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.65%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url%28%23noiseFilter%29%22%2F%3E%3C%2Fsvg%3E')]"></div>
    </div>
  );

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 scroll-mt-80 overflow-hidden"
      aria-label="Sección principal del restaurante cubano Sabores de Cuba"
      itemScope
      itemType="https://schema.org/Restaurant"
    >
      {/* Meta datos para SEO */}
      <meta itemProp="name" content="Sabores de Cuba" />
      <meta itemProp="description" content="Restaurante auténtico cubano con recetas tradicionales y ambiente familiar. Especialidades: ropa vieja, lechón asado, tostones y café cubano." />
      <meta itemProp="openingHours" content="Mo-Th 07:00-23:00, Fr-Sa 07:00-00:00, Su 08:00-22:00" />
      <meta itemProp="telephone" content="+15551234567" />
      <meta itemProp="address" content="Calle Cubana 123, La Habana, Cuba" />
      <meta itemProp="servesCuisine" content="Cuban" />
      <meta itemProp="priceRange" content="$$" />

      {/* Fondo del hero */}
      {renderHeroBackground()}

      {/* Indicador de horas */}
      {renderTimeIndicator()}

      {/* Contenido principal */}
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <div className="py-16 lg:py-12">
          {/* Espacio superior responsive */}
        </div>

        <div className="mb-8 lg:mb-12 px-4">
          {/* Badge de autenticidad */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full mb-6 lg:mb-8 backdrop-blur-md transition-all duration-500 ${imageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            } ${theme === 'dark'
              ? 'bg-gradient-to-r from-amber-500/25 to-orange-500/25 border border-amber-500/50'
              : 'bg-white/95 border border-amber-500/40 shadow-xl'
            }`}>
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2"></div>
            <span className={`text-sm font-semibold tracking-wide ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'
              }`}>
              Desde 1959 • Tradición Familiar • 🏆 Auténtico
            </span>
          </div>

          {/* Título principal */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 lg:mb-8 tracking-tight">
            <span
              className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-500 bg-clip-text text-transparent block mb-2 lg:mb-4"
              style={!reducedMotion ? {
                animation: 'culinaryGradient 4s ease infinite',
                backgroundSize: '200% auto'
              } : {}}
            >
              Sabores de Cuba
            </span>
            <span className={`block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wider ${theme === 'dark' ? 'text-amber-100' : 'text-stone-900'
              }`}>
              Auténtica Cocina y Café
            </span>
          </h1>

          {/* Descripción */}
          <p className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-4xl mx-auto mb-8 lg:mb-12 leading-relaxed ${theme === 'dark'
              ? 'text-amber-100/95'
              : 'text-stone-800'
            } ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-300`}
            itemProp="description">
            Donde cada plato cuenta una historia, cada aroma evoca un recuerdo,
            y cada sabor te transporta directamente a las calles de La Habana.
          </p>

          {/* Botones de acción principales */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 lg:mb-14 ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } transition-all duration-700 delay-500`}>
            <Button
              variant="primary"
              href="/menu.pdf"
              external
              aria-label="Ver menú completo del restaurante cubano en PDF (se abre en nueva ventana)"
              className={`transform hover:scale-105 transition-transform duration-300 shadow-2xl ${theme === 'dark'
                  ? 'shadow-amber-500/25 hover:shadow-amber-500/40'
                  : 'shadow-orange-500/35 hover:shadow-orange-500/50'
                }`}
            >
              <span className="flex items-center gap-2 px-4">
                <DocumentTextIcon className="h-6 w-6" />
                Ver Menú Completo
              </span>
            </Button>

            <Button
              variant="primary"
              href="tel:+15551234567"
              aria-label="Llamar para reservar mesa en el restaurante cubano Sabores de Cuba"
              className={`transform hover:scale-105 transition-transform duration-300 shadow-2xl ${theme === 'dark'
                  ? 'shadow-orange-500/25 hover:shadow-orange-500/40'
                  : 'shadow-amber-500/35 hover:shadow-amber-500/50'
                }`}
            >
              <span className="flex items-center gap-2 px-4">
                <PhoneIcon className="h-6 w-6" />
                Reservar Mesa
              </span>
            </Button>
          </div>

          {/* Botones secundarios */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${imageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            } transition-all duration-700 delay-700`}>
            <Button
              variant="secondary"
              size="lg"
              onClick={onExplore}
              aria-label="Explorar el menú digital del restaurante cubano"
              className={`backdrop-blur-md transform hover:scale-105 transition-all duration-300 border-2 ${theme === 'dark'
                  ? 'border-amber-500/40 bg-white/15 hover:bg-white/25 text-amber-100 hover:border-amber-400'
                  : 'border-amber-500/60 bg-white/90 hover:bg-white text-stone-800 hover:border-amber-500'
                }`}
            >
              <span className="flex items-center gap-2">
                Explorar Menú Digital
                <ChevronDownIcon className={`h-5 w-5 ${!reducedMotion ? 'group-hover:translate-y-1 transition-transform duration-300' : ''
                  }`} />
              </span>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                onExplore();
                // Scroll adicional si es necesario
                setTimeout(() => {
                  const experiences = document.getElementById('experiencias');
                  experiences?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              aria-label="Ver experiencias especiales y eventos del restaurante cubano"
              className={`backdrop-blur-md transform hover:scale-105 transition-all duration-300 border-2 ${theme === 'dark'
                  ? 'border-orange-500/40 bg-white/15 hover:bg-white/25 text-amber-100 hover:border-orange-400'
                  : 'border-orange-500/60 bg-white/90 hover:bg-white text-stone-800 hover:border-orange-500'
                }`}
            >
              <span className="flex items-center gap-2">
                Experiencias Especiales
                <ArrowTopRightOnSquareIcon className={`h-5 w-5 ${!reducedMotion ? 'group-hover:rotate-45 transition-transform duration-300' : ''
                  }`} />
              </span>
            </Button>
          </div>
        </div>

        {/* Íconos decorativos animados */}
        <div className={`absolute bottom-16 lg:bottom-20 left-1/2 -translate-x-1/2 hidden md:block ${imageLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-1000 delay-1000`}>
          <div className="relative w-48 h-48">
            <div className="absolute -top-6 left-6">
              <CakeIcon className={`h-10 w-10 text-amber-400 ${!reducedMotion ? 'animate-bounce' : ''
                } ${theme === 'dark' ? 'drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'drop-shadow'}`}
                style={{ animationDelay: '0.2s' }} />
            </div>

            <div className="absolute top-6 right-4">
              <MusicIcon className={`h-12 w-12 text-orange-400 ${!reducedMotion ? 'animate-pulse' : ''
                } ${theme === 'dark' ? 'drop-shadow-[0_0_10px_rgba(251,146,60,0.5)]' : 'drop-shadow'}`}
                style={{ animationDuration: '2s' }} />
            </div>

            <div className="absolute bottom-10 left-4">
              <FireIcon className={`h-11 w-11 text-amber-500 ${!reducedMotion ? 'animate-pulse' : ''
                } ${theme === 'dark' ? 'drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'drop-shadow'}`}
                style={{ animationDuration: '1.5s' }} />
            </div>

            <div className="absolute bottom-6 right-8">
              <CubanFlagIcon className={`h-10 w-10 text-red-500 ${!reducedMotion ? 'animate-pulse' : ''
                } ${theme === 'dark' ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'drop-shadow'}`}
                style={{ animationDuration: '2.5s' }} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full ${!reducedMotion ? 'animate-pulse' : ''
                } ${theme === 'dark'
                  ? 'shadow-2xl shadow-amber-500/40 ring-2 ring-amber-400/30'
                  : 'shadow-xl ring-2 ring-amber-500/30'
                }`}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block ${imageLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-1000 delay-1200`}>
        <div className="flex flex-col items-center gap-2">
          <span className={`text-xs tracking-wider ${theme === 'dark' ? 'text-amber-400/70' : 'text-amber-600/70'
            }`}>
            DESCUBRE MÁS
          </span>
          <div className={`w-7 h-12 rounded-full border-2 ${theme === 'dark' ? 'border-amber-400/50' : 'border-amber-600/50'
            } flex justify-center`}>
            <div className={`w-1.5 h-4 rounded-full mt-2 ${theme === 'dark' ? 'bg-amber-400' : 'bg-amber-600'
              } ${!reducedMotion ? 'animate-bounce' : ''}`}></div>
          </div>
        </div>
      </div>
    </section>
  );
};


