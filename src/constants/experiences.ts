import { MusicIcon } from '../components/icons/CustomIcons';
import { Experience } from '../types';
import { 
  UserGroupIcon 
} from '@heroicons/react/24/outline';

export const EXPERIENCES: Experience[] = [
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
