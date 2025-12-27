import React from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

interface FooterProps {
  theme: 'light' | 'dark';
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`py-8 px-4 sm:px-6 border-t ${theme === 'dark'
          ? 'border-amber-800/50 bg-stone-950/50'
          : 'border-amber-200/50 bg-amber-50/50'
        }`}
      role="contentinfo"
      aria-label="Pie de página"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Horarios */}
          <div className="text-center md:text-left">
            <h3 className={`text-lg font-bold mb-4 flex items-center justify-center md:justify-start ${theme === 'dark' ? 'text-amber-200' : 'text-stone-800'
              }`}>
              <ClockIcon className="h-5 w-5 mr-2" />
              Horarios
            </h3>
            <div className="space-y-2">
              <p className={theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'}>
                <span className="font-semibold">Lunes - Jueves:</span> 11:00 AM - 10:00 PM
              </p>
              <p className={theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'}>
                <span className="font-semibold">Viernes - Domingo:</span> 11:00 AM - 12:00 AM
              </p>
            </div>
          </div>

          {/* Contacto Rápido */}
          <div className="text-center">
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-amber-200' : 'text-stone-800'
              }`}>
              Contacto Rápido
            </h3>
            <div className="space-y-3">
              <Button
                href="tel:+15551234567"
                className="w-full md:w-auto"
                aria-label="Llamar al restaurante"
              >
                +1 (555) 123-4567
              </Button>
              <Button
                href="mailto:reservas@saboresdecuba.com"
                className="w-full md:w-auto"
                aria-label="Enviar email al restaurante"
              >
                reservas@saboresdecuba.com
              </Button>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="text-center md:text-right">
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-amber-200' : 'text-stone-800'
              }`}>
              Síguenos
            </h3>
            <div className="flex justify-center md:justify-end space-x-4">
              {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                <a
                  key={social}
                  href={`https://${social.toLowerCase()}.com/saboresdecuba`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${theme === 'dark'
                      ? 'bg-stone-800/50 hover:bg-stone-700/50 text-amber-300'
                      : 'bg-amber-100/50 hover:bg-amber-200/50 text-stone-700'
                    }`}
                  aria-label={`Seguir en ${social}`}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Línea divisoria y copyright */}
        <div className={`pt-8 border-t ${theme === 'dark' ? 'border-amber-800/50' : 'border-amber-200/50'
          }`}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-left">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" aria-hidden="true"></div>
                <span className={`text-sm ${theme === 'dark' ? 'text-amber-400/80' : 'text-stone-500'
                  }`}>
                  Tradición Cubana desde 1959
                </span>
              </div>
              <p className={`text-sm ${theme === 'dark' ? 'text-amber-500/60' : 'text-stone-400'
                }`}>
                Sabor auténtico • Ambiente familiar • Experiencia única
              </p>
            </div>

            <div className={`text-sm text-center md:text-right ${theme === 'dark' ? 'text-amber-500/60' : 'text-stone-400'
              }`}>
              <p>© {currentYear} Sabores de Cuba. Todos los derechos reservados.</p>
              <p className="mt-1">Desarrollado por Giovani Fouz</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
