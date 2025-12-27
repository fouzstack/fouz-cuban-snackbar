import React from 'react';
import { DEVELOPER_INFO } from '../../constants/developerInfo';
import { 
  CodeBracketIcon, 
  ClockIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  CommandLineIcon,
  EnvelopeIcon 
} from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface DeveloperSectionProps {
  theme: 'light' | 'dark';
}

export const DeveloperSection: React.FC<DeveloperSectionProps> = ({ theme }) => {
  const { name, title, description, technologies, projects, experience, email, portfolio } = DEVELOPER_INFO;

  return (
    <section 
      id="developer" 
      className="relative py-24 md:py-32 px-4 sm:px-6 scroll-mt-80"
      aria-label="Acerca del desarrollador"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${
        theme === 'dark' ? 'via-blue-950/10' : 'via-blue-50/20'
      } to-stone-950`} aria-hidden="true"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
              Acerca del Desarrollador
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-base sm:text-lg ${
            theme === 'dark' ? 'text-blue-300/80' : 'text-stone-600'
          }`}>
            La mente detrás de esta experiencia digital
          </p>
        </div>
        
        <div itemScope itemType="https://schema.org/Person">
          <meta itemProp="name" content={name} />
          <meta itemProp="jobTitle" content={title} />
          <meta itemProp="description" content={description} />
          
          <Card
            theme={theme}
            className={`relative p-8 md:p-12 rounded-3xl backdrop-blur-sm border ${
              theme === 'dark' 
                ? 'bg-gradient-to-br from-gray-900/40 to-gray-900/20 border-blue-800/30' 
                : 'bg-gradient-to-br from-white/40 to-white/20 border-blue-200/30'
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
              {/* Avatar y info básica */}
              <div className="lg:w-1/3">
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" aria-hidden="true"></div>
                  <div className={`relative p-6 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border ${
                    theme === 'dark' ? 'border-blue-500/30' : 'border-blue-500/40'
                  }`}>
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <span className="text-5xl font-bold text-white">GF</span>
                    </div>
                  </div>
                </div>
                
                <h3 className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-blue-100' : 'text-stone-800'
                }`} itemProp="name">
                  {name}
                </h3>
                
                <p className={`text-lg mb-4 ${
                  theme === 'dark' ? 'text-blue-300' : 'text-blue-600'
                }`} itemProp="jobTitle">
                  {title}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center">
                    <CodeBracketIcon className="h-5 w-5 text-blue-400 mr-3" />
                    <a 
                      href={projects} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`hover:underline ${
                        theme === 'dark' ? 'text-blue-200' : 'text-stone-700'
                      }`}
                      aria-label={`Ver proyectos de ${name} en GitHub`}
                    >
                      {projects.replace('https://', '')}
                    </a>
                  </div>
                  
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-blue-400 mr-3" />
                    <span className={theme === 'dark' ? 'text-blue-200' : 'text-stone-700'}>
                      {experience}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Detalles y tecnologías */}
              <div className="lg:w-2/3">
                <div className="mb-8">
                  <h4 className={`text-xl font-semibold mb-4 ${
                    theme === 'dark' ? 'text-blue-100' : 'text-stone-800'
                  }`}>
                    Sobre Mi
                  </h4>
                  <p className={`text-lg leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-blue-200/90' : 'text-stone-700'
                  }`} itemProp="description">
                    {description}
                  </p>
                </div>
                
                <div className="mb-8">
                  <h4 className={`text-xl font-semibold mb-4 ${
                    theme === 'dark' ? 'text-blue-100' : 'text-stone-800'
                  }`}>
                    Tecnologías y Especialidades
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {technologies.map((tech, index) => (
                      <div 
                        key={index}
                        className={`px-4 py-2 rounded-full ${
                          theme === 'dark' 
                            ? 'bg-blue-900/40 border border-blue-800/50 text-blue-300' 
                            : 'bg-blue-100/60 border border-blue-200/50 text-blue-800'
                        }`}
                      >
                        <span className="text-sm font-medium">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                  <Card theme={theme} className="p-4 rounded-xl">
                    <ComputerDesktopIcon className="h-8 w-8 text-blue-500 mb-3" />
                    <h5 className={`font-semibold mb-1 ${
                      theme === 'dark' ? 'text-blue-100' : 'text-stone-800'
                    }`}>
                      Aplicaciones Web
                    </h5>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-blue-200/80' : 'text-stone-600'
                    }`}>
                      React, Vite, TypeScript, TailwindCSS
                    </p>
                  </Card>
                  
                  <Card theme={theme} className="p-4 rounded-xl">
                    <DevicePhoneMobileIcon className="h-8 w-8 text-emerald-500 mb-3" />
                    <h5 className={`font-semibold mb-1 ${
                      theme === 'dark' ? 'text-emerald-100' : 'text-stone-800'
                    }`}>
                      Aplicaciones Móviles
                    </h5>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-emerald-200/80' : 'text-stone-600'
                    }`}>
                      Android, Java, WebView
                    </p>
                  </Card>
                  
                  <Card theme={theme} className="p-4 rounded-xl">
                    <CommandLineIcon className="h-8 w-8 text-purple-500 mb-3" />
                    <h5 className={`font-semibold mb-1 ${
                      theme === 'dark' ? 'text-purple-100' : 'text-stone-800'
                    }`}>
                      Aplicaciones Desktop
                    </h5>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-purple-200/80' : 'text-stone-600'
                    }`}>
                      CSharp, Python, Node.js
                    </p>
                  </Card>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="primary"
                    href={`mailto:${email}`}
                    icon={EnvelopeIcon}
                    aria-label={`Contactar a ${name} por email`}
                  >
                    Contactar
                  </Button>
                  
                  <Button
                    variant="secondary"
                    href={portfolio}
                    aria-label={`Ver portafolio de ${name}`}
                  >
                    Ver Portafolio
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};