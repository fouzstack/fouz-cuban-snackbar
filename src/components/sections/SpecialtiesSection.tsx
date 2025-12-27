import React from 'react';
import { SPECIALTIES } from '../../constants/specialties';
import { Card } from '../ui/Card';

interface SpecialtiesSectionProps {
  theme: 'light' | 'dark';
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({ theme }) => {
  return (
    <section 
      id="especialidades" 
      className="relative py-24 md:py-32 px-4 sm:px-6 scroll-mt-80"
      aria-label="Especialidades del restaurante"
    >
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${
        theme === 'dark' ? 'via-amber-950/20' : 'via-amber-50/20'
      } to-transparent`} aria-hidden="true"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">
              Lo Que Nos Hace Únicos
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${
            theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'
          }`}>
            Detalles que marcan la diferencia en cada experiencia culinaria.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SPECIALTIES.map((specialty) => (
            <Card
              key={specialty.id}
              theme={theme}
              className={`relative group p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-stone-900/40 to-stone-900/20 border-amber-800/30 hover:border-amber-500/30' 
                  : 'bg-gradient-to-br from-amber-50/40 to-amber-50/20 border-amber-200/30 hover:border-amber-500/50'
              }`}
              tabIndex={0}
            >
              <div className="text-4xl mb-6" aria-hidden="true">
                {specialty.icon}
              </div>
              
              <h3 className={`text-xl font-bold mb-4 ${
                theme === 'dark' ? 'text-amber-200' : 'text-stone-800'
              }`}>
                {specialty.title}
              </h3>
              
              <p className={`mb-6 ${
                theme === 'dark' ? 'text-amber-300/80' : 'text-stone-700'
              }`}>
                {specialty.description}
              </p>
              
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 w-fit">
                <span className="text-sm text-amber-600 dark:text-amber-300">
                  Secreto: {specialty.secret}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};