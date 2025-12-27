import { NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Inicio', icon: '🏠' },
  { id: 'menu', label: 'Menú', icon: '📋' },
  { id: 'especialidades', label: 'Especialidades', icon: '⭐' },
  { id: 'experiencia', label: 'Experiencia', icon: '🎭' },
  { id: 'developer', label: 'Desarrollador', icon: '👨‍💻' },
  { id: 'contact', label: 'Contacto', icon: '📞' }
];

export const EXPERIENCE_COLOR_MAP = {
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
