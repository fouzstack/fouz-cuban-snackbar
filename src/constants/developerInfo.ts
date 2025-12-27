import { DeveloperInfo } from '../types';

export const DEVELOPER_INFO: DeveloperInfo = {
  name: 'Giovani Fouz',
  title: 'Fullstack Developer & UI/UX Designer',
  description: 'Desarrollador Fullstack con más de 3 años de experiencia en la creación de aplicaciones web, móviles y de escritorio. Especializado en tecnologías modernas como React, TypeScript, Node.js y Python. Apasionado por crear experiencias digitales intuitivas, optimizadas y accesibles que resuelvan problemas reales. Combino habilidades técnicas sólidas con un enfoque centrado en el usuario para entregar productos de alta calidad.',
  technologies: [
    'React/Vite',
    'TypeScript',
    'Node.js',
    'Python',
    'CSharp',
    'Tailwind CSS',
    'Next.js',
    'MongoDB',
    'PostgreSQL',
    'Docker',
    'AWS',
    'Git/GitHub'
  ],
  projects: 'https://github.com/gfouz',
  experience: '3+ años de experiencia profesional',
  email: 'gfouz1975@example.com',
  portfolio: 'https://github.com/gfouz',
  phone: '+1 (555) 123-4567'
};

export const DEVELOPER_SKILLS = {
  frontend: [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'Vite', level: 90 }
  ],
  backend: [
    { name: 'Node.js', level: 88 },
    { name: 'Python', level: 85 },
    { name: 'CSharp', level: 80 },
    { name: 'MongoDB', level: 85 },
    { name: 'PostgreSQL', level: 82 }
  ],
  tools: [
    { name: 'Git/GitHub', level: 95 },
    { name: 'Docker', level: 80 },
    { name: 'AWS', level: 75 },
    { name: 'Figma', level: 85 },
    { name: 'Jest', level: 80 }
  ]
};

export const DEVELOPER_PROJECTS = [
  {
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico completa con carrito de compras, pagos y panel de administración.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://github.com/gfouz/ecommerce-platform',
    featured: true
  },
  {
    title: 'Task Management App',
    description: 'Aplicación de gestión de tareas con arrastrar y soltar, etiquetas y colaboración en tiempo real.',
    technologies: ['React', 'TypeScript', 'Socket.io', 'Tailwind'],
    link: 'https://github.com/gfouz/task-manager',
    featured: true
  },
  {
    title: 'Weather Dashboard',
    description: 'Tablero meteorológico con pronósticos detallados, mapas interactivos y alertas personalizadas.',
    technologies: ['Next.js', 'TypeScript', 'Chart.js', 'OpenWeather API'],
    link: 'https://github.com/gfouz/weather-dashboard',
    featured: false
  }
];

export const DEVELOPER_CERTIFICATIONS = [
  {
    name: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: '2023',
    credentialId: 'AWS-123456'
  },
  {
    name: 'React Developer Certification',
    issuer: 'Meta',
    date: '2022',
    credentialId: 'REACT-META-789'
  },
  {
    name: 'TypeScript Mastery',
    issuer: 'Microsoft',
    date: '2022',
    credentialId: 'TS-MS-456'
  }
];
