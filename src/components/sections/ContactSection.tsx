import React from 'react';
import { Button } from '../ui/Button';
import { 
  PhoneIcon, 
  MapPinIcon, 
  ClockIcon,
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import { generateStructuredData } from '../../utils/seo';

interface ContactSectionProps {
  theme: 'light' | 'dark';
  reducedMotion: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme, reducedMotion }) => {
  const structuredData = generateStructuredData();

  return (
    <>
      {/* JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section 
        id="contact" 
        className="relative py-24 md:py-32 px-4 sm:px-6 scroll-mt-80"
        aria-label="Contacto e información del restaurante"
        itemScope
        itemType="https://schema.org/Restaurant"
      >
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${
          theme === 'dark' ? 'via-amber-950/10' : 'via-amber-100/20'
        } to-stone-950`} aria-hidden="true"></div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
            <span 
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent"
              style={!reducedMotion ? {
                animation: 'culinaryGradient 3s ease infinite',
                backgroundSize: '200% auto'
              } : {}}
            >
              ¿Listo para el sabor cubano?
            </span>
          </h2>
          
          <p className={`text-lg sm:text-xl mb-12 leading-relaxed ${
            theme === 'dark' ? 'text-amber-200' : 'text-stone-700'
          }`} itemProp="description">
            Cada visita es una celebración, cada comida un viaje, cada cliente parte de nuestra familia. 
            Ven y descubre por qué somos el pedacito de Cuba que todos llevamos en el corazón.
          </p>
          
          {/* Información de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className={`p-6 rounded-xl backdrop-blur-sm border ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-stone-900/40 to-stone-900/20 border-amber-800/30' 
                : 'bg-gradient-to-br from-amber-50/40 to-amber-50/20 border-amber-200/30'
            }`}>
              <PhoneIcon className={`h-8 w-8 mx-auto mb-4 ${
                theme === 'dark' ? 'text-amber-400' : 'text-amber-500'
              }`} />
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-amber-200' : 'text-stone-800'
              }`}>
                Teléfono
              </h3>
              <p className={theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'}>
                <a href="tel:+15551234567" className="hover:underline" itemProp="telephone">
                  +1 (555) 123-4567
                </a>
              </p>
            </div>
            
            <div className={`p-6 rounded-xl backdrop-blur-sm border ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-stone-900/40 to-stone-900/20 border-amber-800/30' 
                : 'bg-gradient-to-br from-amber-50/40 to-amber-50/20 border-amber-200/30'
            }`}>
              <MapPinIcon className={`h-8 w-8 mx-auto mb-4 ${
                theme === 'dark' ? 'text-amber-400' : 'text-amber-500'
              }`} />
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-amber-200' : 'text-stone-800'
              }`}>
                Ubicación
              </h3>
              <p className={theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'}>
                <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <span itemProp="streetAddress">Calle Cubana 123</span>,{' '}
                  <span itemProp="addressLocality">Ciudad</span>
                </span>
              </p>
            </div>
            
            <div className={`p-6 rounded-xl backdrop-blur-sm border ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-stone-900/40 to-stone-900/20 border-amber-800/30' 
                : 'bg-gradient-to-br from-amber-50/40 to-amber-50/20 border-amber-200/30'
            }`}>
              <EnvelopeIcon className={`h-8 w-8 mx-auto mb-4 ${
                theme === 'dark' ? 'text-amber-400' : 'text-amber-500'
              }`} />
              <h3 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-amber-200' : 'text-stone-800'
              }`}>
                Email
              </h3>
              <p className={theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'}>
                <a href="mailto:reservas@saboresdecuba.com" className="hover:underline">
                  reservas@saboresdecuba.com
                </a>
              </p>
            </div>
          </div>
          
          {/* Botones de acción */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
            <Button
              variant="primary"
              size="lg"
              href="tel:+15551234567"
              icon={PhoneIcon}
              aria-label="Llamar para reservar mesa"
            >
              Llamar para Reservar
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              href="https://maps.google.com"
              icon={MapPinIcon}
              external
              aria-label="Ver ubicación en Google Maps"
            >
              Cómo Llegar
            </Button>
          </div>
          
          {/* Horarios */}
          <div className={`mb-12 p-8 rounded-2xl backdrop-blur-sm border ${
            theme === 'dark' 
              ? 'bg-gradient-to-br from-stone-900/40 to-stone-900/20 border-amber-800/30' 
              : 'bg-gradient-to-br from-amber-50/40 to-amber-50/20 border-amber-200/30'
          }`}>
            <h3 className={`text-xl font-bold mb-6 flex items-center justify-center ${
              theme === 'dark' ? 'text-amber-200' : 'text-stone-800'
            }`}>
              <ClockIcon className="h-5 w-5 mr-2" />
              Horarios de Atención
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" itemProp="openingHoursSpecification" itemScope itemType="https://schema.org/OpeningHoursSpecification">
              <div className="text-center">
                <meta itemProp="dayOfWeek" content="Monday Tuesday Wednesday Thursday" />
                <meta itemProp="opens" content="11:00" />
                <meta itemProp="closes" content="22:00" />
                <p className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-amber-300' : 'text-stone-700'
                }`}>
                  Lunes - Jueves
                </p>
                <p className={theme === 'dark' ? 'text-amber-200/80' : 'text-stone-600'}>
                  11:00 AM - 10:00 PM
                </p>
              </div>
              <div className="text-center">
                <meta itemProp="dayOfWeek" content="Friday Saturday Sunday" />
                <meta itemProp="opens" content="11:00" />
                <meta itemProp="closes" content="00:00" />
                <p className={`font-semibold mb-2 ${
                  theme === 'dark' ? 'text-amber-300' : 'text-stone-700'
                }`}>
                  Viernes - Domingo
                </p>
                <p className={theme === 'dark' ? 'text-amber-200/80' : 'text-stone-600'}>
                  11:00 AM - 12:00 AM
                </p>
              </div>
            </div>
          </div>
          
          {/* Mapa de ubicación (placeholder) */}
          <div className="mb-16">
            <h3 className={`text-xl font-bold mb-6 ${
              theme === 'dark' ? 'text-amber-200' : 'text-stone-800'
            }`}>
              Encuéntranos
            </h3>
            <div className={`h-64 rounded-xl overflow-hidden border ${
              theme === 'dark' ? 'border-amber-800/30' : 'border-amber-200/30'
            }`}>
              <div className={`w-full h-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-stone-800/50' : 'bg-amber-100/50'
              }`}>
                <MapPinIcon className={`h-12 w-12 ${
                  theme === 'dark' ? 'text-amber-400' : 'text-amber-500'
                }`} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};