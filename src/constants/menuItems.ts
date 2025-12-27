import { MenuItem } from '../types';
import { 
  FireIcon, 
  CakeIcon 
} from '@heroicons/react/24/outline';
import { 
  CoffeeBeanIcon, 
  MojitoIcon 
} from '../components/icons/CustomIcons';

export const MENU_ITEMS: MenuItem[] = [
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
