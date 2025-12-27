import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white',
        secondary: 'border border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/10 text-amber-600 dark:text-amber-300',
        ghost: 'hover:bg-stone-800/50 dark:hover:bg-amber-100/50'
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  'aria-label'?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  className,
  onClick,
  href,
  external = false,
  'aria-label': ariaLabel,
  type = 'button',
  disabled = false,
  icon: Icon,
  ...props
}) => {
  const Element = href ? 'a' : 'button';
  const elementProps = href 
    ? { href, target: external ? '_blank' : '_self', rel: external ? 'noopener noreferrer' : undefined }
    : { type, onClick, disabled };

  return (
    <Element
      className={`${buttonVariants({ variant, size })} ${className || ''}`}
      aria-label={ariaLabel}
      {...elementProps}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5 mr-2" />}
      {children}
    </Element>
  );
};
