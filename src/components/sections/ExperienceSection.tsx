import React from 'react';
import { EXPERIENCES } from '../../constants/experiences';
import { ExperienceCard } from '../ui/ExperienceCard';

interface ExperienceSectionProps {
  theme: 'light' | 'dark';
  reducedMotion: boolean;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ 
  theme, 
  reducedMotion 
}) => {
  return (
    <section 
      id="experiencia" 
      className="relative py-24 md:py-32 px-4 sm:px-6 scroll-mt-80"
      aria-label="Experiencias en el restaurante"
      itemScope
      itemType="https://schema.org/Event"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Experiencias Memorables
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${
            theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'
          }`}>
            Más que una comida, una experiencia cultural cubana completa.
          </p>
        </div>
        
        <div className="space-y-6 md:space-y-8">
          {EXPERIENCES.map((experience) => (
            <div key={experience.id} itemScope itemType="https://schema.org/Event">
              <meta itemProp="name" content={experience.title} />
              <meta itemProp="description" content={experience.description} />
              
              <ExperienceCard
                experience={experience}
                theme={theme}
                reducedMotion={reducedMotion}
              />
            </div>
          ))}
        </div>
        
        {/* Call to Action adicional */}
        <div className={`mt-16 text-center p-8 rounded-2xl backdrop-blur-sm border ${
          theme === 'dark' 
            ? 'bg-gradient-to-br from-stone-900/40 to-stone-900/20 border-amber-800/30' 
            : 'bg-gradient-to-br from-amber-50/40 to-amber-50/20 border-amber-200/30'
        }`}>
          <h3 className={`text-xl font-bold mb-4 ${
            theme === 'dark' ? 'text-amber-200' : 'text-stone-800'
          }`}>
            ¿Buscas una experiencia personalizada?
          </h3>
          <p className={`mb-6 max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'
          }`}>
            Organizamos eventos privados, cenas de empresa y celebraciones especiales 
            con menús personalizados y música en vivo.
          </p>
          <a
            href="mailto:eventos@saboresdecuba.com"
            className={`inline-flex items-center px-6 py-3 rounded-lg border transition-all duration-300 ${
              theme === 'dark'
                ? 'border-emerald-500/30 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400'
                : 'border-emerald-500/40 hover:border-emerald-500/60 hover:bg-emerald-500/10 text-emerald-600'
            }`}
            aria-label="Solicitar información para eventos privados"
          >
            Solicitar Información para Eventos
          </a>
        </div>
      </div>
    </section>
  );
};
