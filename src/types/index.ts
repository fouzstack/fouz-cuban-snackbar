export type Theme = 'dark' | 'light';
export type SectionId = 'hero' | 'menu' | 'especialidades' | 'experiencia' | 'contact' | 'developer';

export interface NavItem {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

export interface MenuItem {
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
}

export interface Specialty {
  id: number;
  title: string;
  description: string;
  secret: string;
  icon: string;
}

export interface Experience {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  features: string[];
  color: 'amber' | 'emerald';
  link?: string;
  linkText?: string;
}

export interface DeveloperInfo {
  name: string;
  title: string;
  description: string;
  technologies: string[];
  projects: string;
  experience: string;
  email: string;
  portfolio: string;
  phone: string;
}

export interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  color: string;
  opacity: number;
  type: 'spice' | 'coffee' | 'steam';
}
