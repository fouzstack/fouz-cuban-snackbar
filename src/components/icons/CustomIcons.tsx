import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const CoffeeBeanIcon: React.FC<IconProps> = ({ className = 'h-6 w-6', ...props }) => (
  <svg 
    {...props}
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="12" rx="8" ry="5" strokeWidth="2" />
    <path d="M8 8c0-2 1-4 4-4s4 2 4 4" strokeWidth="1.5" />
    <path d="M16 16c0 2-1 4-4 4s-4-2-4-4" strokeWidth="1.5" />
    <ellipse cx="12" cy="12" rx="4" ry="2" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

export const CubanFlagIcon: React.FC<IconProps> = ({ className = 'h-6 w-6', ...props }) => (
  <svg 
    {...props}
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="2" />
    <path d="M3 9h18" strokeWidth="1.5" />
    <path d="M3 15h18" strokeWidth="1.5" />
    <path d="M9 3v18" strokeWidth="1.5" />
    <path d="M15 3v18" strokeWidth="1.5" />
    <polygon points="12,8 10,12 12,16 14,12" fill="currentColor" />
  </svg>
);

export const MojitoIcon: React.FC<IconProps> = ({ className = 'h-6 w-6', ...props }) => (
  <svg 
    {...props}
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
  >
    <rect x="6" y="4" width="12" height="16" rx="2" strokeWidth="2" />
    <path d="M10 8h4" strokeWidth="1.5" />
    <path d="M10 12h4" strokeWidth="1.5" />
    <path d="M8 20h8" strokeWidth="2" />
    <path d="M12 4v16" strokeWidth="1.5" strokeDasharray="2 2" />
  </svg>
);

export const MusicIcon: React.FC<IconProps> = ({ className = 'h-6 w-6', ...props }) => (
  <svg 
    {...props}
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 18V5l12-2v13" strokeWidth="2" />
    <circle cx="6" cy="18" r="3" strokeWidth="2" />
    <circle cx="18" cy="16" r="3" strokeWidth="2" />
    <path d="M12 8v4" strokeWidth="1.5" />
    <path d="M12 12h4" strokeWidth="1.5" />
  </svg>
);

export const FireIcon: React.FC<IconProps> = ({ className = 'h-6 w-6', ...props }) => (
  <svg 
    {...props}
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

export const SpiceIcon: React.FC<IconProps> = ({ className = 'h-6 w-6', ...props }) => (
  <svg 
    {...props}
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
    <path d="M8 12h8" strokeWidth="1.5" />
    <path d="M12 8v8" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

export const RumIcon: React.FC<IconProps> = ({ className = 'h-6 w-6', ...props }) => (
  <svg 
    {...props}
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="4" y="2" width="16" height="20" rx="2" strokeWidth="1.5" />
    <path d="M8 7h8" strokeWidth="1.5" />
    <path d="M8 11h8" strokeWidth="1.5" />
    <path d="M8 15h8" strokeWidth="1.5" />
    <path d="M12 2v20" strokeWidth="1" strokeDasharray="2 2" />
  </svg>
);

export const PalmTreeIcon: React.FC<IconProps> = ({ className = 'h-6 w-6', ...props }) => (
  <svg 
    {...props}
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M13 8c0-2.76-2.24-5-5-5S3 5.24 3 8h2c0-1.66 1.34-3 3-3s3 1.34 3 3H13z" />
    <path d="M13 7.14A5.82 5.82 0 0 1 16.5 6c3.04 0 5.5 2.46 5.5 5.5V12" />
    <path d="M13 8c0 2.76-2.24 5-5 5S3 10.76 3 8" />
    <path d="M8.5 6.5L5.5 8" />
    <path d="M10.5 5.5L8 8" />
    <path d="M12 4.5L10 8" />
    <path d="M15.5 7.5L13 8" />
    <path d="M17.5 8.5L16 8" />
    <path d="M20 9.5L19 8" />
    <path d="M22 7.5L20 6" />
    <path d="M3 20h18" strokeWidth="2" />
  </svg>
);

export const SalsaIcon: React.FC<IconProps> = ({ className = 'h-6 w-6', ...props }) => (
  <svg 
    {...props}
    className={className}
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
    <path d="M8 12l2 2 4-4" strokeWidth="2" />
    <path d="M16 12l-2 2-4-4" strokeWidth="2" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);
