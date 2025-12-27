import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-xl backdrop-blur-sm border transition-all duration-300',
  {
    variants: {
      theme: {
        dark: 'bg-stone-900/30',
        light: 'bg-amber-50/60'
      },
      hover: {
        true: 'hover:-translate-y-2 hover:shadow-xl',
        false: ''
      }
    },
    defaultVariants: {
      theme: 'dark',
      hover: true
    }
  }
);

interface CardProps extends VariantProps<typeof cardVariants> {
  children: React.ReactNode;
  className?: string;
  reducedMotion?: boolean;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  theme,
  hover,
  reducedMotion = false,
  onClick,
  role = 'article',
  tabIndex,
  onKeyDown,
  ...props
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
    onKeyDown?.(e);
  };

  return (
    <div
      className={`${cardVariants({ theme, hover: reducedMotion ? false : hover })} ${className || ''}`}
      onClick={onClick}
      role={role}
      tabIndex={tabIndex}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {children}
    </div>
  );
};
