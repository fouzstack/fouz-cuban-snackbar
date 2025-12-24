import React, { useEffect, useRef, useState, useCallback, KeyboardEvent, ReactNode } from 'react';

import CakeIcon from '@heroicons/react/24/outline/CakeIcon.js';
import ArrowTopRightOnSquareIcon from '@heroicons/react/24/outline/ArrowTopRightOnSquareIcon.js';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon.js';

import SunIcon from '@heroicons/react/24/outline/SunIcon.js';
import MoonIcon from '@heroicons/react/24/outline/MoonIcon.js';
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon.js';
import PhoneIcon from '@heroicons/react/24/outline/PhoneIcon.js';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon.js';
import XMarkIcon from '@heroicons/react/24/outline/XMarkIcon.js';
import MapPinIcon from '@heroicons/react/24/outline/MapPinIcon.js';
import ClockIcon from '@heroicons/react/24/outline/ClockIcon.js';
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon.js';
import FireIcon from '@heroicons/react/24/outline/FireIcon.js';
import CodeBracketIcon from '@heroicons/react/24/outline/CodeBracketIcon.js';
import DevicePhoneMobileIcon from '@heroicons/react/24/outline/DevicePhoneMobileIcon.js';
import ComputerDesktopIcon from '@heroicons/react/24/outline/ComputerDesktopIcon.js';
import CommandLineIcon from '@heroicons/react/24/outline/CommandLineIcon.js';
import EnvelopeIcon from '@heroicons/react/24/outline/EnvelopeIcon.js';

// Tipos TypeScript
type SectionId = 'hero' | 'menu' | 'especialidades' | 'experiencia' | 'contact' | 'developer';
type Theme = 'dark' | 'light';
type Particle = {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  color: string;
  opacity: number;
  type: 'spice' | 'coffee' | 'steam';
};
type MenuItem = {
  id: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  ingredients: string[];
  color: {
    from: string;
    to: string;
    border: string;
  };
  price: string;
};
type Specialty = {
  id: number;
  title: string;
  description: string;
  secret: string;
  icon: string;
};
type Experience = {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  features: string[];
  color: 'amber' | 'emerald';
  link?: string;
  linkText?: string;
};
type NavItem = {
  id: SectionId;
  label: string;
  icon: ReactNode;
};

// Type guard para SectionId
const isSectionId = (id: string): id is SectionId => {
  return ['hero', 'menu', 'especialidades', 'experiencia', 'contact', 'developer'].includes(id);
};

// Configuración de color para experiencias
type ExperienceColorConfig = {
  bg: string;
  border: string;
  text: string;
  dot: string;
};

const experienceColorMap: Record<'amber' | 'emerald', ExperienceColorConfig> = {
  amber: {
    bg: 'from-amber-500/20 to-orange-500/20',
    border: 'border-amber-500/30',
    text: 'text-amber-400',
    dot: 'bg-amber-500'
  },
  emerald: {
    bg: 'from-emerald-500/20 to-teal-500/20',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    dot: 'bg-emerald-500'
  }
} as const;

// Componentes SVG personalizados para iconografía culinaria
const CoffeeBeanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <ellipse cx="12" cy="12" rx="8" ry="5" strokeWidth="2" />
    <path d="M8 8c0-2 1-4 4-4s4 2 4 4" strokeWidth="1.5" />
    <path d="M16 16c0 2-1 4-4 4s-4-2-4-4" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="4" ry="2" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

const CubanFlagIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
    <path d="M3 9h18" strokeWidth="1.5" />
    <path d="M3 15h18" strokeWidth="1.5" />
    <path d="M9 3v18" strokeWidth="1.5" />
    <path d="M15 3v18" strokeWidth="1.5" />
    <polygon points="12,8 10,12 12,16 14,12" fill="currentColor" />
  </svg>
);

const MojitoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="6" y="4" width="12" height="16" rx="2" strokeWidth="2" />
    <path d="M10 8h4" strokeWidth="1.5" />
    <path d="M10 12h4" strokeWidth="1.5" />
    <path d="M8 20h8" strokeWidth="2" />
    <path d="M12 4v16" strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);



const MusicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M9 18V5l12-2v13" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="6" cy="18" r="3" strokeWidth="2" />
    <circle cx="18" cy="16" r="3" strokeWidth="2" />
    <path d="M12 8v4" strokeWidth="1.5" />
    <path d="M12 12h4" strokeWidth="1.5" />
  </svg>
);

const CubanLanding: React.FC = () => {
  // Estados
  const [activeSection, setActiveSection] = useState<SectionId>('hero');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<Theme>('dark');
  const [particleCount, setParticleCount] = useState<number>(50);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  
  // Constantes y datos
  const navItems: NavItem[] = [
    { id: 'hero', label: 'Inicio', icon: '🏠' },
    { id: 'menu', label: 'Menú', icon: '📋' },
    { id: 'especialidades', label: 'Especialidades', icon: '⭐' },
    { id: 'experiencia', label: 'Experiencia', icon: '🎭' },
    { id: 'developer', label: 'Desarrollador', icon: '👨‍💻' },
    { id: 'contact', label: 'Contacto', icon: '📞' }
  ];

  const menuItems: MenuItem[] = [
    {
      id: 1,
      icon: FireIcon,
      title: 'Ropa Vieja',
      description: 'Carne desmenuzada cocida lentamente con tomates, pimientos y especias cubanas',
      ingredients: ['Carne de res', 'Tomates', 'Pimientos', 'Cebolla', 'Ajo', 'Especias secretas'],
      color: {
        from: 'from-amber-500/20',
        to: 'to-orange-500/20',
        border: 'border-amber-500/30'
      },
      price: '$18.95'
    },
    {
      id: 2,
      icon: CoffeeBeanIcon,
      title: 'Café Cubano',
      description: 'Café espresso endulzado tradicionalmente, la esencia de la cultura cubana',
      ingredients: ['Café 100% cubano', 'Azúcar morena', 'Técnica tradicional'],
      color: {
        from: 'from-yellow-500/20',
        to: 'to-amber-900/20',
        border: 'border-yellow-500/30'
      },
      price: '$4.50'
    },
    {
      id: 3,
      icon: CakeIcon,
      title: 'Flan de Coco',
      description: 'Postre cremoso de caramelo con coco rallado y un toque de ron',
      ingredients: ['Huevos', 'Leche condensada', 'Coco rallado', 'Azúcar caramelizada', 'Ron añejo'],
      color: {
        from: 'from-amber-400/20',
        to: 'to-yellow-500/20',
        border: 'border-amber-400/30'
      },
      price: '$8.75'
    },
    {
      id: 4,
      icon: MojitoIcon,
      title: 'Mojito Clásico',
      description: 'La bebida nacional cubana: ron, hierbabuena, lima, azúcar y soda',
      ingredients: ['Ron Havana Club', 'Hierbabuena fresca', 'Lima', 'Azúcar de caña', 'Agua con gas'],
      color: {
        from: 'from-emerald-500/20',
        to: 'to-lime-500/20',
        border: 'border-emerald-500/30'
      },
      price: '$12.00'
    }
  ];

  const specialties: Specialty[] = [
    {
      id: 1,
      title: 'Sabor Auténtico',
      description: 'Recetas transmitidas por generaciones de familias cubanas',
      secret: 'Marinados de 24 horas',
      icon: '👨‍🍳'
    },
    {
      id: 2,
      title: 'Ingredientes Premium',
      description: 'Importamos directamente de Cuba los mejores productos',
      secret: 'Especias exclusivas',
      icon: '🌿'
    },
    {
      id: 3,
      title: 'Ambiente Musical',
      description: 'Música cubana en vivo todas las noches con artistas locales',
      secret: 'Son cubano auténtico',
      icon: '🎵'
    }
  ];

  const experiences: Experience[] = [
    {
      id: 1,
      title: 'Noche Cubana',
      description: 'Viernes y sábados: música en vivo, mojitos y ambiente festivo',
      icon: MusicIcon,
      features: [
        'Música en vivo 8PM-12AM',
        'Clases de salsa gratuitas',
        'Promociones especiales en cócteles',
        'Tapas tradicionales'
      ],
      color: 'amber',
      link: '/reservas',
      linkText: 'Reservar Mesa'
    },
    {
      id: 2,
      title: 'Experiencia Familiar',
      description: 'Domingos: almuerzo familiar con actividades para niños',
      icon: UserGroupIcon,
      features: [
        'Menú infantil especial',
        'Zona de juegos cubanos',
        'Postres tradicionales',
        'Precios familiares'
      ],
      color: 'emerald'
    }
  ];

  // Datos del desarrollador
  const developerInfo = {
    name: 'Giovani Fouz',
    title: 'Fullstack Developer',
    description: 'Especializado en desarrollo de aplicaciones web, móviles y desktop con tecnologías modernas. Transformo ideas en experiencias digitales optimizadas.',
    technologies: ['React/Vite', 'TypeScript', 'Node.js', 'Python', 'CSharp', 'Tailwind CSS'],
    projects: 'https://github.com/gfouz',
    experience: '3+ años de experiencia',
    email: 'gfouz1975@example.com',
    portfolio: 'https://github.com/gfouz',
    phone: '+1 (555) 123-4567'
  };

  // Detectar preferencias de reducción de movimiento
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Inicializar canvas para partículas y efectos
  useEffect(() => {
    const initCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Ajustar canvas al tamaño del viewport
      const updateCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      updateCanvasSize();
      window.addEventListener('resize', updateCanvasSize);
      
      return () => window.removeEventListener('resize', updateCanvasSize);
    };
    
    initCanvas();
  }, []);

  // Sistema de partículas y efectos
  useEffect(() => {
    if (reducedMotion || !canvasRef.current) {
      setIsLoading(false);
      return;
    }
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const particles: Particle[] = [];
    const spiceColors = ['#f59e0b', '#d97706', '#fbbf24', '#92400e'];
    const coffeeColors = ['#78350f', '#92400e', '#b45309'];
    const steamColors = ['#fef3c7', '#fde68a', '#fbbf24'];
    
    // Crear partículas de especias, café y vapor
    for (let i = 0; i < particleCount; i++) {
      const type = i % 10 === 0 ? 'coffee' : i % 5 === 0 ? 'steam' : 'spice';
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: type === 'coffee' ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 0.3,
        speedY: type === 'steam' ? -(Math.random() * 0.8 + 0.2) : (Math.random() - 0.5) * 0.3,
        size: type === 'coffee' ? Math.random() * 3 + 1 : type === 'steam' ? Math.random() * 6 + 2 : Math.random() * 2 + 0.5,
        color: type === 'coffee' ? coffeeColors[Math.floor(Math.random() * coffeeColors.length)] : 
               type === 'steam' ? steamColors[Math.floor(Math.random() * steamColors.length)] : 
               spiceColors[Math.floor(Math.random() * spiceColors.length)],
        opacity: type === 'steam' ? Math.random() * 0.3 + 0.1 : Math.random() * 0.8 + 0.2,
        type
      });
    }
    
    let frameCount = 0;
    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      
      // Limitar a 60 FPS
      if (deltaTime < 16) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastTimeRef.current = timestamp;
      frameCount++;
      
      // Fondo con gradiente culinario
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(28, 25, 23, 0.95)');
      gradient.addColorStop(1, 'rgba(41, 37, 36, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Efectos de calidez
      for (let i = 0; i < 3; i++) {
        const x = (canvas.width / 3) * (i + 0.5);
        const y = canvas.height * (Math.sin(frameCount * 0.0001 + i) * 0.1 + 0.5);
        const radius = 100 + Math.sin(frameCount * 0.0005 + i) * 20;
        
        const warmthGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        warmthGradient.addColorStop(0, `rgba(245, 158, 11, ${0.05 + Math.sin(frameCount * 0.001) * 0.02})`);
        warmthGradient.addColorStop(1, 'rgba(245, 158, 11, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = warmthGradient;
        ctx.fill();
      }
      
      // Actualizar y dibujar partículas
      particles.forEach(particle => {
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Reinicio cuando salen de pantalla
        if (particle.x > canvas.width || particle.x < 0 || particle.y > canvas.height || particle.y < 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = particle.type === 'steam' ? canvas.height : Math.random() * canvas.height;
        }
        
        // Efecto de movimiento para vapor
        if (particle.type === 'steam') {
          particle.speedX += (Math.sin(frameCount * 0.01 + particle.x) * 0.01);
        }
        
        // Efecto de parpadeo para especias
        let currentOpacity = particle.opacity;
        if (particle.type === 'spice') {
          currentOpacity = particle.opacity * (0.7 + 0.3 * Math.sin(frameCount * 0.03 + particle.x));
        }
        
        // Dibujar partícula según su tipo
        ctx.beginPath();
        
        if (particle.type === 'steam') {
          // Vapor como círculo difuminado
          const steamGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );
          steamGradient.addColorStop(0, `${particle.color}${Math.floor(currentOpacity * 255).toString(16).padStart(2, '0')}`);
          steamGradient.addColorStop(1, `${particle.color}00`);
          
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = steamGradient;
          ctx.fill();
        } else if (particle.type === 'coffee') {
          // Granos de café
          ctx.ellipse(particle.x, particle.y, particle.size, particle.size / 1.5, 0, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();
          
          // Línea en el grano
          ctx.beginPath();
          ctx.moveTo(particle.x - particle.size * 0.7, particle.y);
          ctx.lineTo(particle.x + particle.size * 0.7, particle.y);
          ctx.strokeStyle = '#92400e';
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = currentOpacity * 0.5;
          ctx.stroke();
        } else {
          // Especias como círculos
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.globalAlpha = currentOpacity;
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;
      });
      
      // Efectos especiales ocasionales
      if (frameCount % 300 === 0) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        const spiceBurstGradient = ctx.createRadialGradient(x, y, 0, x, y, 80);
        spiceBurstGradient.addColorStop(0, 'rgba(245, 158, 11, 0.4)');
        spiceBurstGradient.addColorStop(0.7, 'rgba(180, 83, 9, 0.2)');
        spiceBurstGradient.addColorStop(1, 'rgba(146, 64, 14, 0)');
        
        ctx.beginPath();
        ctx.arc(x, y, 80, 0, Math.PI * 2);
        ctx.fillStyle = spiceBurstGradient;
        ctx.fill();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Iniciar animación
    animationRef.current = requestAnimationFrame(animate);
    setIsLoading(false);
    
    // Limpiar
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [particleCount, reducedMotion, theme]);

  // Observador para secciones activas
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id && isSectionId(entry.target.id)) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Scroll suave mejorado
  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href')?.replace('#', '');
    if (!targetId || !isSectionId(targetId)) return;
    
    scrollToSection(targetId);
    
    // Cerrar menú móvil después de hacer clic
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  // Navegación programática por secciones
  const scrollToSection = useCallback((targetId: SectionId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
      
      // Actualizar URL sin recargar
      window.history.pushState({}, '', `#${targetId}`);
    }
  }, [reducedMotion]);

  // Manejar navegación por teclado
  const handleKeyDown = useCallback((
    e: KeyboardEvent<HTMLElement>, 
    callback?: () => void
  ) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback?.();
    }
  }, []);

  // Toggle tema
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  // Toggle menú móvil
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  // Ajustar número de partículas según el dispositivo
  useEffect(() => {
    const adjustParticles = () => {
      if (window.innerWidth < 768) {
        setParticleCount(25);
      } else if (window.innerWidth < 1024) {
        setParticleCount(35);
      } else {
        setParticleCount(50);
      }
    };
    
    adjustParticles();
    window.addEventListener('resize', adjustParticles);
    
    return () => window.removeEventListener('resize', adjustParticles);
  }, []);

  // Efecto para aplicar tema al body
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Cerrar menú móvil al redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Renderizar indicador de tiempo
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

  // Renderizar tarjeta de menú
  const renderMenuItemCard = (item: MenuItem) => {
    const Icon = item.icon;
    
    return (
      <div
        key={item.id}
        className="group relative"
        role="article"
        aria-label={`Plato: ${item.title}`}
      >
        <div 
          className={`absolute -inset-1 bg-gradient-to-br ${item.color.from} ${item.color.to} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${reducedMotion ? 'transition-none' : ''}`}
          aria-hidden="true"
        ></div>
        <div 
          className={`relative p-6 rounded-xl backdrop-blur-sm border ${item.color.border} h-full transition-all duration-300 ${!reducedMotion ? 'group-hover:-translate-y-2' : ''} ${theme === 'dark' ? 'bg-stone-900/30' : 'bg-amber-50/60'}`}
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(e)}
        >
          <div className={`p-3 rounded-lg bg-gradient-to-br ${item.color.from.replace('/20', '/10')} ${item.color.to.replace('/20', '/10')} w-fit mb-6 relative`}>
            <Icon className="h-8 w-8 text-amber-200" />
            <div className="absolute -top-2 -right-2 text-xs px-2 py-1 rounded-full bg-stone-900/80 text-amber-300 font-bold">
              {item.price}
            </div>
          </div>
          <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-amber-100' : 'text-stone-800'}`}>
            {item.title}
          </h3>
          <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-amber-200/80' : 'text-stone-700'}`}>
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.ingredients.map((ingredient) => (
              <span
                key={ingredient}
                className={`px-3 py-1 rounded-full text-xs ${theme === 'dark' ? 'bg-stone-800/50 text-amber-200' : 'bg-amber-100/80 text-stone-700'}`}
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Renderizar tarjeta de especialidad
  const renderSpecialtyCard = (specialty: Specialty) => (
    <div
      key={specialty.id}
      className={`relative group p-8 rounded-2xl backdrop-blur-sm border transition-all duration-300 ${theme === 'dark' 
        ? 'bg-gradient-to-br from-stone-900/40 to-stone-900/20 border-amber-800/30 hover:border-amber-500/30' 
        : 'bg-gradient-to-br from-amber-50/40 to-amber-50/20 border-amber-200/30 hover:border-amber-500/50'}`}
      role="article"
      aria-label={`Especialidad: ${specialty.title}`}
      tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handleKeyDown(e)}
    >
      <div className="text-4xl mb-6" aria-hidden="true">{specialty.icon}</div>
      <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-amber-200' : 'text-stone-800'}`}>
        {specialty.title}
      </h3>
      <p className={`mb-6 ${theme === 'dark' ? 'text-amber-300/80' : 'text-stone-700'}`}>
        {specialty.description}
      </p>
      <div className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 w-fit">
        <span className="text-sm text-amber-600 dark:text-amber-300">Secreto: {specialty.secret}</span>
      </div>
    </div>
  );

  // Renderizar experiencia
  const renderExperienceCard = (experience: Experience) => {
    const Icon = experience.icon;
    const colorClasses = experienceColorMap[experience.color];

    return (
      <div key={experience.id} className="group relative" role="article" aria-label={`Experiencia: ${experience.title}`}>
        <div 
          className={`absolute -inset-4 bg-gradient-to-r ${colorClasses.bg.replace('/20', '/10')} rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${reducedMotion ? 'transition-none' : ''}`}
          aria-hidden="true"
        ></div>
        <div className={`relative p-8 rounded-2xl backdrop-blur-sm border ${theme === 'dark' 
          ? 'bg-gradient-to-br from-stone-900/60 to-stone-900/30 border-stone-800/30' 
          : 'bg-gradient-to-br from-amber-50/60 to-amber-50/30 border-amber-200/30'}`}>
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="md:w-1/3">
              <div className={`p-4 rounded-xl bg-gradient-to-br ${colorClasses.bg} border ${colorClasses.border} w-fit mb-4`}>
                <Icon className={`h-10 w-10 ${colorClasses.text}`} />
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-amber-100' : 'text-stone-800'}`}>
                {experience.title}
              </h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-amber-300/80' : 'text-stone-700'}`}>
                {experience.description}
              </p>
            </div>
            <div className="md:w-2/3">
              <ul className="space-y-4">
                {experience.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className={`w-2 h-2 rounded-full ${colorClasses.dot} mt-2 mr-3 flex-shrink-0`} aria-hidden="true"></div>
                    <span className={theme === 'dark' ? 'text-amber-200' : 'text-stone-800'}>{feature}</span>
                  </li>
                ))}
              </ul>
              {experience.link && experience.linkText && (
                <div className="mt-8 pt-6 border-t border-amber-800/50 dark:border-amber-200/20">
                  <a
                    href={experience.link}
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-900 dark:focus:ring-offset-stone-100 text-white"
                    aria-label={experience.linkText}
                  >
                    <ClockIcon className="h-5 w-5 mr-2" />
                    {experience.linkText}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar botón de acción principal
  const renderPrimaryCTA = () => {
    const ctas = [
      {
        id: 1,
        label: 'Ver Menú Completo',
        icon: DocumentTextIcon,
        href: '/menu.pdf',
        color: 'from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700',
        external: false
      },
      {
        id: 2,
        label: 'Reservar Mesa',
        icon: PhoneIcon,
        href: 'tel:+15551234567',
        color: 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700',
        external: false
      }
    ];

    return (
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
        {ctas.map((cta) => {
          const Icon = cta.icon;
          return (
            <a
              key={cta.id}
              href={cta.href}
              target={cta.external ? '_blank' : '_self'}
              rel={cta.external ? 'noopener noreferrer' : ''}
              className="group relative px-6 py-4 sm:px-8 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 text-white w-full sm:w-auto"
              role="button"
              tabIndex={0}
              onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => handleKeyDown(e)}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${cta.color} transition-all duration-300`}></div>
              <div className={`absolute inset-0 bg-gradient-to-r ${cta.color.split(' ')[0]} ${cta.color.split(' ')[1]} opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500`}></div>
              <span className="relative flex items-center justify-center text-lg font-semibold">
                <Icon className="h-5 w-5 mr-3" />
                {cta.label}
                {cta.external && <ArrowTopRightOnSquareIcon className={`h-5 w-5 ml-2 ${!reducedMotion ? 'group-hover:rotate-45 transition-transform' : ''}`} />}
              </span>
            </a>
          );
        })}
      </div>
    );
  };

  // Configuración de Tailwind CSS para gradientes animados
  const gradientAnimationStyle = !reducedMotion ? {
    animation: 'culinaryGradient 3s ease infinite',
    backgroundSize: '200% auto'
  } : {};

  return (
    <>
      <div 
        ref={containerRef}
        className={`min-h-screen bg-gradient-to-b ${theme === 'dark' 
          ? 'from-stone-950 via-amber-950/30 to-stone-950 text-amber-50' 
          : 'from-amber-50 via-orange-50/30 to-stone-100 text-stone-900'} overflow-hidden relative font-sans`}
        role="main"
      >
        {/* Canvas para efectos culinarios */}
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none"
          aria-hidden="true"
          style={{ willChange: 'transform, opacity' }}
        />

        {/* Loading overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-stone-950/95 z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-20 h-20 mb-6">
                <div className="absolute inset-0 border-4 border-amber-500/30 rounded-full"></div>
                <div className="absolute inset-4 border-4 border-amber-500/50 rounded-full animate-spin"></div>
                <div className="absolute inset-8 border-4 border-amber-500/70 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-amber-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p className="text-amber-300 text-lg">Preparando la experiencia cubana...</p>
              <p className="text-amber-400/60 text-sm mt-2">Calentando los sabores tradicionales</p>
            </div>
          </div>
        )}

        {/* Fondo con efectos culinarios */}
        <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
          {/* Efectos de calidez */}
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br ${theme === 'dark' ? 'from-amber-900/10' : 'from-amber-200/10'} via-transparent to-transparent rounded-full blur-3xl`}></div>
          <div className={`absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tr ${theme === 'dark' ? 'from-orange-900/10' : 'from-orange-200/10'} via-transparent to-transparent rounded-full blur-3xl`}></div>
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br ${theme === 'dark' ? 'from-yellow-900/5' : 'from-yellow-200/5'} via-transparent to-transparent rounded-full blur-3xl`}></div>
          
          {/* Vapor y aromas */}
          <div className={`absolute top-20 right-40 w-64 h-64 bg-gradient-to-br ${theme === 'dark' ? 'from-amber-500/5' : 'from-amber-300/10'} to-orange-500/5 rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '4s' }}></div>
          <div className={`absolute bottom-40 left-60 w-48 h-48 bg-gradient-to-tr ${theme === 'dark' ? 'from-emerald-500/5' : 'from-emerald-300/10'} to-teal-500/5 rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
          
          {/* Patrones decorativos */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent rotate-45"></div>
            <div className="absolute bottom-1/3 right-1/3 w-40 h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent -rotate-30"></div>
          </div>
        </div>

        {/* Navegación */}
        <nav 
          role="navigation" 
          aria-label="Navegación principal"
          className={`fixed top-0 w-full z-50 px-4 sm:px-6 py-4 backdrop-blur-md border-b ${theme === 'dark' ? 'bg-stone-900/30 border-amber-500/20' : 'bg-amber-50/30 border-amber-500/30'}`}
        >
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative w-4 h-4">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-stone-950 rounded-full"></div>
                <div className="absolute inset-2 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                Sabores de Cuba
              </span>
            </div>
            
            {/* Menú desktop */}
            <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={handleSmoothScroll}
                  className={`flex items-center space-x-2 px-3 py-2 lg:px-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${theme === 'dark' ? 'focus:ring-offset-stone-900' : 'focus:ring-offset-white'} ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-400 font-semibold shadow-lg shadow-amber-500/10'
                      : theme === 'dark' ? 'hover:bg-stone-800/50 text-amber-200' : 'hover:bg-amber-100/50 text-stone-700'
                  } ${reducedMotion ? 'transition-none' : ''}`}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  <span aria-hidden="true">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Botón menú móvil */}
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 md:hidden ${theme === 'dark' ? 'focus:ring-offset-stone-900 hover:bg-stone-800/50' : 'focus:ring-offset-white hover:bg-amber-100/50'}`}
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 ${theme === 'dark' ? 'focus:ring-offset-stone-900 hover:bg-stone-800/50' : 'focus:ring-offset-white hover:bg-amber-100/50'}`}
                aria-label={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </button>
              
              <a
                href="#contact"
                onClick={handleSmoothScroll}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition-all duration-300 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-900 dark:focus:ring-offset-stone-100"
              >
                Reservar
              </a>
            </div>
          </div>

          {/* Menú móvil desplegable */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'}`}>
            <div className={`py-4 rounded-xl backdrop-blur-md border ${theme === 'dark' ? 'bg-stone-900/80 border-stone-800' : 'bg-amber-50/80 border-amber-200'}`}>
              <div className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleSmoothScroll}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeSection === item.id
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

        {/* Sección Hero */}
        <section 
          id="hero" 
          className="relative min-h-screen flex items-center justify-center px-4 sm:px-6"
          aria-label="Sección principal - Restaurante cubano"
        >
          <div className="container mx-auto max-w-6xl text-center relative z-10">
            {renderTimeIndicator()}

            <div className="mb-8">
              <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 mb-6 ${theme === 'dark' ? '' : 'shadow-lg'}`}>
                <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse mr-2"></div>
                <span className="text-sm text-amber-600 dark:text-amber-300">Desde 1959 • Tradición Familiar</span>
              </div>
              <div className='py-4'></div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6">
                <span 
                  className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent"
                  style={gradientAnimationStyle}
                >
                  Sabores de Cuba
                </span>
                <br />
                <span className={theme === 'dark' ? 'text-amber-100' : 'text-stone-800'}>Auténtica Cocina y Café</span>
              </h1>
              
              <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-stone-700'}`}>
                Donde cada plato cuenta una historia, cada aroma evoca un recuerdo, 
                y cada sabor te transporta directamente a las calles de La Habana. 
                Tradición, pasión y autenticidad en cada bocado.
              </p>
              
              {/* Botones de acción principales */}
              {renderPrimaryCTA()}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#menu"
                  onClick={handleSmoothScroll}
                  className="group relative px-6 py-4 sm:px-8 rounded-xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 text-white"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => 
                    handleKeyDown(e, () => scrollToSection('menu'))
                  }
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 group-hover:from-amber-700 group-hover:to-orange-700 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                  <span className="relative flex items-center text-lg font-semibold">
                    Explorar Menú
                    <ChevronDownIcon className={`h-5 w-5 ml-2 ${!reducedMotion ? 'group-hover:translate-y-1 transition-transform' : ''}`} />
                  </span>
                </a>
                
                <a
                  href="#experiencia"
                  onClick={handleSmoothScroll}
                  className={`group px-6 py-4 sm:px-8 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${theme === 'dark' ? 'border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/10 focus:ring-offset-stone-900' : 'border-amber-500/40 hover:border-amber-500/60 hover:bg-amber-500/10 focus:ring-offset-white'}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => 
                    handleKeyDown(e, () => scrollToSection('experiencia'))
                  }
                >
                  <span className="flex items-center text-lg font-medium">
                    Ver Experiencias
                    <ArrowTopRightOnSquareIcon className={`h-5 w-5 ml-2 ${!reducedMotion ? 'group-hover:rotate-45 transition-transform' : ''}`} />
                  </span>
                </a>
              </div>
            </div>
            
            {/* Íconos decorativos animados */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
              <div className="relative w-40 h-40">
                {/* Café */}
                <div className="absolute -top-4 left-4">
                  <CakeIcon className="h-8 w-8 text-amber-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                {/* Música */}
                <div className="absolute top-4 right-0">
                  <MusicIcon className="h-10 w-10 text-orange-400 animate-pulse" style={{ animationDuration: '2s' }} />
                </div>
                {/* Comida */}
                <div className="absolute bottom-8 left-0">
                  <FireIcon className="h-9 w-9 text-amber-500 animate-pulse" style={{ animationDuration: '1.5s' }} />
                </div>
                {/* Bandera cubana */}
                <div className="absolute bottom-4 right-4">
                  <CubanFlagIcon className="h-8 w-8 text-red-500 animate-pulse" style={{ animationDuration: '2.5s' }} />
                </div>
                {/* Centro decorativo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Menú */}
        <section 
          id="menu" 
          className="relative py-24 md:py-32 px-4 sm:px-6"
          aria-label="Menú del restaurante"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                  Nuestros Sabores
                </span>
              </h2>
              <p className={`max-w-2xl mx-auto text-base sm:text-lg ${theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'}`}>
                Platos tradicionales preparados con recetas familiares de generaciones
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {menuItems.map(renderMenuItemCard)}
            </div>
            
            <div className="text-center mt-12">
              <a
                href="/menu-completo.pdf"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-stone-700 to-stone-900 hover:from-stone-800 hover:to-stone-950 transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-900 dark:focus:ring-offset-stone-100"
                aria-label="Ver menú completo en PDF"
              >
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Ver Menú Completo (PDF)
              </a>
            </div>
          </div>
        </section>

        {/* Sección Especialidades */}
        <section 
          id="especialidades" 
          className="relative py-24 md:py-32 px-4 sm:px-6"
          aria-label="Especialidades del restaurante"
        >
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${theme === 'dark' ? 'via-amber-950/20' : 'via-amber-50/20'} to-transparent`} aria-hidden="true"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-500 to-amber-500 bg-clip-text text-transparent">
                  Lo Que Nos Hace Únicos
                </span>
              </h2>
              <p className={`max-w-2xl mx-auto text-base sm:text-lg ${theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'}`}>
                Detalles que marcan la diferencia en cada experiencia culinaria.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {specialties.map(renderSpecialtyCard)}
            </div>
          </div>
        </section>

        {/* Sección Experiencia */}
        <section 
          id="experiencia" 
          className="relative py-24 md:py-32 px-4 sm:px-6"
          aria-label="Experiencias en el restaurante"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                  Experiencias Memorables
                </span>
              </h2>
              <p className={`max-w-2xl mx-auto text-base sm:text-lg ${theme === 'dark' ? 'text-amber-300/80' : 'text-stone-600'}`}>
                Más que una comida, una experiencia cultural cubana completa.
              </p>
            </div>
            
            <div className="space-y-6 md:space-y-8">
              {experiences.map(renderExperienceCard)}
            </div>
          </div>
        </section>

        {/* Sección Acerca del Desarrollador */}
        <section 
          id="developer" 
          className="relative py-24 md:py-32 px-4 sm:px-6"
          aria-label="Acerca del desarrollador"
        >
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${theme === 'dark' ? 'via-blue-950/10' : 'via-blue-50/20'} to-stone-950`} aria-hidden="true"></div>
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Acerca del Desarrollador
                </span>
              </h2>
              <p className={`max-w-2xl mx-auto text-base sm:text-lg ${theme === 'dark' ? 'text-blue-300/80' : 'text-stone-600'}`}>
                La mente detrás de esta experiencia digital
              </p>
            </div>
            
            <div className={`relative p-8 md:p-12 rounded-3xl backdrop-blur-sm border ${theme === 'dark' 
              ? 'bg-gradient-to-br from-gray-900/40 to-gray-900/20 border-blue-800/30' 
              : 'bg-gradient-to-br from-white/40 to-white/20 border-blue-200/30'}`}>
              
              <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
                {/* Avatar y info básica */}
                <div className="lg:w-1/3">
                  <div className="relative mb-6">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl" aria-hidden="true"></div>
                    <div className={`relative p-6 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-500/40'}`}>
                      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-5xl font-bold text-white">GF</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-blue-100' : 'text-stone-800'}`}>
                    {developerInfo.name}
                  </h3>
                  <p className={`text-lg mb-4 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-600'}`}>
                    {developerInfo.title}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <CodeBracketIcon className="h-5 w-5 text-blue-400 mr-3" />
                      <span className={theme === 'dark' ? 'text-blue-200' : 'text-stone-700'}>{developerInfo.projects}</span>
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-5 w-5 text-blue-400 mr-3" />
                      <span className={theme === 'dark' ? 'text-blue-200' : 'text-stone-700'}>{developerInfo.experience}</span>
                    </div>
                  </div>
                </div>
                
                {/* Detalles y tecnologías */}
                <div className="lg:w-2/3">
                  <div className="mb-8">
                    <h4 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-blue-100' : 'text-stone-800'}`}>
                      Sobre Mi
                    </h4>
                    <p className={`text-lg leading-relaxed mb-6 ${theme === 'dark' ? 'text-blue-200/90' : 'text-stone-700'}`}>
                      {developerInfo.description}
                    </p>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-blue-100' : 'text-stone-800'}`}>
                      Tecnologías y Especialidades
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {developerInfo.technologies.map((tech, index) => (
                        <div 
                          key={index}
                          className={`px-4 py-2 rounded-full ${theme === 'dark' 
                            ? 'bg-blue-900/40 border border-blue-800/50 text-blue-300' 
                            : 'bg-blue-100/60 border border-blue-200/50 text-blue-800'}`}
                        >
                          <span className="text-sm font-medium">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div className={`p-4 rounded-xl ${theme === 'dark' 
                      ? 'bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-800/30' 
                      : 'bg-gradient-to-br from-blue-50/60 to-cyan-50/60 border border-blue-200/30'}`}>
                      <ComputerDesktopIcon className="h-8 w-8 text-blue-500 mb-3" />
                      <h5 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-blue-100' : 'text-stone-800'}`}>
                        Aplicaciones Web
                      </h5>
                      <p className={`text-sm ${theme === 'dark' ? 'text-blue-200/80' : 'text-stone-600'}`}>
                        React, Vite, TypeScript, TailwindCss
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-xl ${theme === 'dark' 
                      ? 'bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border border-emerald-800/30' 
                      : 'bg-gradient-to-br from-emerald-50/60 to-teal-50/60 border border-emerald-200/30'}`}>
                      <DevicePhoneMobileIcon className="h-8 w-8 text-emerald-500 mb-3" />
                      <h5 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-emerald-100' : 'text-stone-800'}`}>
                        Aplicaciones Móviles
                      </h5>
                      <p className={`text-sm ${theme === 'dark' ? 'text-emerald-200/80' : 'text-stone-600'}`}>
                        Android, Java, WebView
                      </p>
                    </div>
                    
                    <div className={`p-4 rounded-xl ${theme === 'dark' 
                      ? 'bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-800/30' 
                      : 'bg-gradient-to-br from-purple-50/60 to-pink-50/60 border border-purple-200/30'}`}>
                      <CommandLineIcon className="h-8 w-8 text-purple-500 mb-3" />
                      <h5 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-purple-100' : 'text-stone-800'}`}>
                        Aplicaciones Desktop
                      </h5>
                      <p className={`text-sm ${theme === 'dark' ? 'text-purple-200/80' : 'text-stone-600'}`}>
                        CSharp, Python, Node.js
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={`mailto:${developerInfo.email}`}
                      className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-stone-900 dark:focus:ring-offset-stone-100"
                      aria-label={`Contactar a ${developerInfo.name} por email`}
                    >
                      <EnvelopeIcon className="h-5 w-5 mr-2" />
                      Contactar
                    </a>
                    
                    <a
                      href={developerInfo.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 rounded-lg border border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-stone-900 dark:focus:ring-offset-stone-100"
                      aria-label={`Ver portafolio de ${developerInfo.name} - Se abrirá en una nueva pestaña`}
                    >
                      <ArrowTopRightOnSquareIcon className="h-5 w-5 mr-2" />
                      Ver Portafolio
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contacto */}
        <section 
          id="contact" 
          className="relative py-24 md:py-32 px-4 sm:px-6"
          aria-label="Contacto"
        >
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent ${theme === 'dark' ? 'via-amber-950/10' : 'via-amber-100/20'} to-stone-950`} aria-hidden="true"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8">
              <span 
                className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent"
                style={gradientAnimationStyle}
              >
                ¿Listo para el sabor cubano?
              </span>
            </h2>
            
            <p className={`text-lg sm:text-xl mb-12 leading-relaxed ${theme === 'dark' ? 'text-amber-200' : 'text-stone-700'}`}>
              Cada visita es una celebración, cada comida un viaje, cada cliente parte de nuestra familia. 
              Ven y descubre por qué somos el pedacito de Cuba que todos llevamos en el corazón.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16">
              <a
                href="tel:+15551234567"
                className={`group px-6 py-4 md:px-8 rounded-xl transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-amber-500 ${theme === 'dark' 
                  ? 'bg-gradient-to-r from-stone-900 to-stone-800 hover:from-stone-800 hover:to-stone-700 border-stone-800/50 hover:border-amber-500/30 focus:ring-offset-stone-900' 
                  : 'bg-gradient-to-r from-white to-amber-50 hover:from-amber-50 hover:to-amber-100 border-amber-200/50 hover:border-amber-500/40 focus:ring-offset-white'}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e: React.KeyboardEvent<HTMLAnchorElement>) => handleKeyDown(e)}
              >
                <span className="flex items-center text-lg font-semibold">
                  <PhoneIcon className="h-5 w-5 mr-3" />
                  Llamar para Reservar
                </span>
              </a>
              
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`group px-6 py-4 md:px-8 rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 ${theme === 'dark' 
                  ? 'border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/10 focus:ring-offset-stone-900' 
                  : 'border-amber-500/40 hover:border-amber-500/60 hover:bg-amber-500/10 focus:ring-offset-white'}`}
                aria-label="Ver ubicación en Google Maps - Se abrirá en una nueva pestaña"
              >
                <span className="flex items-center text-lg font-semibold">
                  <MapPinIcon className="h-5 w-5 mr-3" />
                  Cómo Llegar
                </span>
              </a>
            </div>
            
            {/* Horarios */}
            <div className={`mb-12 p-8 rounded-2xl backdrop-blur-sm border ${theme === 'dark' 
              ? 'bg-gradient-to-br from-stone-900/40 to-stone-900/20 border-amber-800/30' 
              : 'bg-gradient-to-br from-amber-50/40 to-amber-50/20 border-amber-200/30'}`}>
              <h3 className={`text-xl font-bold mb-6 ${theme === 'dark' ? 'text-amber-200' : 'text-stone-800'}`}>
                Horarios de Atención
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="text-center">
                  <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-amber-300' : 'text-stone-700'}`}>Lunes - Jueves</p>
                  <p className={theme === 'dark' ? 'text-amber-200/80' : 'text-stone-600'}>11:00 AM - 10:00 PM</p>
                </div>
                <div className="text-center">
                  <p className={`font-semibold mb-2 ${theme === 'dark' ? 'text-amber-300' : 'text-stone-700'}`}>Viernes - Domingo</p>
                  <p className={theme === 'dark' ? 'text-amber-200/80' : 'text-stone-600'}>11:00 AM - 12:00 AM</p>
                </div>
              </div>
            </div>
            
            <div className={`pt-8 border-t ${theme === 'dark' ? 'border-amber-800/50' : 'border-amber-200/50'}`}>
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" aria-hidden="true"></div>
                    <span className={`text-sm ${theme === 'dark' ? 'text-amber-400/80' : 'text-stone-500'}`}>
                      Tradición Cubana desde 1959
                    </span>
                  </div>
                  <p className={`text-sm ${theme === 'dark' ? 'text-amber-500/60' : 'text-stone-400'}`}>
                    Sabor auténtico • Ambiente familiar • Experiencia única
                  </p>
                </div>
                
                <div className={`text-sm ${theme === 'dark' ? 'text-amber-500/60' : 'text-stone-400'}`}>
                  <p>© {new Date().getFullYear()} Sabores de Cuba</p>
                  <p className="mt-1">Desarrollado por Giovani Fouz</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Estilos CSS para animaciones */}
      <style>
        {`
          @keyframes culinaryGradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          
          @keyframes spiceGlow {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
          
          section {
            scroll-margin-top: 80px;
          }
          
          @media (prefers-reduced-motion: reduce) {
            .animate-gradient,
            .group-hover\\:translate-y-2,
            .group-hover\\:-translate-y-2,
            .group-hover\\:rotate-45,
            .transition-all,
            .transition-opacity,
            .transition-transform,
            .animate-bounce,
            .animate-pulse,
            .animate-spin {
              animation: none !important;
              transition: none !important;
            }
          }
          
          /* Optimización para Tailwind CSS 4 */
          .backdrop-blur-sm {
            backdrop-filter: blur(4px);
          }
          
          .backdrop-blur-md {
            backdrop-filter: blur(12px);
          }
          
          .bg-clip-text {
            -webkit-background-clip: text;
            background-clip: text;
          }
          
          .will-change-transform {
            will-change: transform;
          }
        `}
      </style>
    </>
  );
};

export default CubanLanding;
