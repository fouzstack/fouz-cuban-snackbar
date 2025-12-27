import React from 'react';
import { Experience } from '../../types';
import { EXPERIENCE_COLOR_MAP } from '../../constants/navigation';
import { Button } from './Button';
import { ClockIcon } from '@heroicons/react/24/outline';

interface ExperienceCardProps {
  experience: Experience;
  theme: 'light' | 'dark';
  reducedMotion?: boolean;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  experience, 
  theme, 
  reducedMotion = false 
}) => {
  const Icon = experience.icon;
  const colorClasses = EXPERIENCE_COLOR_MAP[experience.color];

  return (
    <div className="group relative" role="article" aria-label={`Experiencia: ${experience.title}`}>
      <div 
        className={`absolute -inset-4 bg-gradient-to-r ${
          colorClasses.bg.replace('/20', '/10')
        } rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          reducedMotion ? 'transition-none' : ''
        }`}
        aria-hidden="true"
      ></div>
      
      <div className={`relative p-8 rounded-2xl backdrop-blur-sm border ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-stone-900/60 to-stone-900/30 border-stone-800/30' 
          : 'bg-gradient-to-br from-amber-50/60 to-amber-50/30 border-amber-200/30'
      }`}>
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          <div className="md:w-1/3">
            <div className={`p-4 rounded-xl bg-gradient-to-br ${
              colorClasses.bg
            } border ${colorClasses.border} w-fit mb-4`}>
              <Icon className={`h-10 w-10 ${colorClasses.text}`} />
            </div>
            
            <h3 className={`text-2xl font-bold mb-2 ${
              theme === 'dark' ? 'text-amber-100' : 'text-stone-800'
            }`}>
              {experience.title}
            </h3>
            
            <p className={`text-sm ${
              theme === 'dark' ? 'text-amber-300/80' : 'text-stone-700'
            }`}>
              {experience.description}
            </p>
          </div>
          
          <div className="md:w-2/3">
            <ul className="space-y-4">
              {experience.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <div className={`w-2 h-2 rounded-full ${colorClasses.dot} mt-2 mr-3 flex-shrink-0`} aria-hidden="true"></div>
                  <span className={theme === 'dark' ? 'text-amber-200' : 'text-stone-800'}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
            
            {experience.link && experience.linkText && (
              <div className="mt-8 pt-6 border-t border-amber-800/50 dark:border-amber-200/20">
                <Button
                  href={experience.link}
                  icon={ClockIcon}
                  aria-label={experience.linkText}
                >
                  {experience.linkText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
