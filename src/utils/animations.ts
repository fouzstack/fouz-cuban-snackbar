import { RefObject } from 'react';

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  iterations?: number;
  direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse';
  fill?: 'none' | 'forwards' | 'backwards' | 'both';
}

export const createAnimation = (
  element: HTMLElement,
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options: KeyframeAnimationOptions
): Animation => {
  return element.animate(keyframes, {
    duration: 300,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    fill: 'both',
    ...options
  });
};

export const fadeIn = (element: HTMLElement, config: AnimationConfig = {}) => {
  return createAnimation(element, [
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ], {
    duration: config.duration || 500,
    delay: config.delay || 0,
    easing: config.easing || 'cubic-bezier(0.4, 0, 0.2, 1)'
  });
};

export const scaleIn = (element: HTMLElement, config: AnimationConfig = {}) => {
  return createAnimation(element, [
    { opacity: 0, transform: 'scale(0.9)' },
    { opacity: 1, transform: 'scale(1)' }
  ], {
    duration: config.duration || 400,
    delay: config.delay || 0,
    easing: config.easing || 'cubic-bezier(0.4, 0, 0.2, 1)'
  });
};

export const slideInFromLeft = (element: HTMLElement, config: AnimationConfig = {}) => {
  return createAnimation(element, [
    { opacity: 0, transform: 'translateX(-50px)' },
    { opacity: 1, transform: 'translateX(0)' }
  ], {
    duration: config.duration || 600,
    delay: config.delay || 0,
    easing: config.easing || 'cubic-bezier(0.4, 0, 0.2, 1)'
  });
};

export const slideInFromRight = (element: HTMLElement, config: AnimationConfig = {}) => {
  return createAnimation(element, [
    { opacity: 0, transform: 'translateX(50px)' },
    { opacity: 1, transform: 'translateX(0)' }
  ], {
    duration: config.duration || 600,
    delay: config.delay || 0,
    easing: config.easing || 'cubic-bezier(0.4, 0, 0.2, 1)'
  });
};

export const culinaryPulse = (element: HTMLElement, config: AnimationConfig = {}) => {
  return createAnimation(element, [
    { opacity: 0.3, transform: 'scale(1)' },
    { opacity: 0.7, transform: 'scale(1.05)' },
    { opacity: 0.3, transform: 'scale(1)' }
  ], {
    duration: config.duration || 2000,
    delay: config.delay || 0,
    iterations: config.iterations || Infinity,
    easing: config.easing || 'ease-in-out',
    direction: config.direction || 'alternate'
  });
};

export const floatAnimation = (element: HTMLElement, config: AnimationConfig = {}) => {
  return createAnimation(element, [
    { transform: 'translateY(0px)' },
    { transform: 'translateY(-10px)' },
    { transform: 'translateY(0px)' }
  ], {
    duration: config.duration || 3000,
    delay: config.delay || 0,
    iterations: config.iterations || Infinity,
    easing: config.easing || 'ease-in-out'
  });
};

export const shimmerEffect = (element: HTMLElement, config: AnimationConfig = {}) => {
  return createAnimation(element, [
    { backgroundPosition: '0% 50%' },
    { backgroundPosition: '100% 50%' },
    { backgroundPosition: '0% 50%' }
  ], {
    duration: config.duration || 3000,
    delay: config.delay || 0,
    iterations: config.iterations || Infinity,
    easing: config.easing || 'linear'
  });
};

export const spiceGlow = (element: HTMLElement, config: AnimationConfig = {}) => {
  return createAnimation(element, [
    { boxShadow: '0 0 5px rgba(245, 158, 11, 0.3)' },
    { boxShadow: '0 0 20px rgba(245, 158, 11, 0.7)' },
    { boxShadow: '0 0 5px rgba(245, 158, 11, 0.3)' }
  ], {
    duration: config.duration || 2000,
    delay: config.delay || 0,
    iterations: config.iterations || Infinity,
    easing: config.easing || 'ease-in-out',
    direction: config.direction || 'alternate'
  });
};

export const staggerChildren = (
  container: HTMLElement,
  childSelector: string,
  animationFn: (el: HTMLElement) => Animation,
  staggerDelay: number = 100
) => {
  const children = container.querySelectorAll<HTMLElement>(childSelector);
  
  children.forEach((child, index) => {
    setTimeout(() => {
      animationFn(child);
    }, index * staggerDelay);
  });
};

export const useIntersectionAnimation = (
  elementRef: RefObject<HTMLElement>,
  animationFn: (el: HTMLElement) => Animation,
  threshold: number = 0.1,
  once: boolean = true
) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && elementRef.current) {
          animationFn(elementRef.current);
          if (once) {
            observer.unobserve(entry.target);
          }
        }
      });
    },
    { threshold }
  );

  return observer;
};

export const createScrollProgress = (
  element: HTMLElement,
  start: number = 0,
  end: number = 100
) => {
  const animation = createAnimation(element, [
    { transform: `translateX(${start}%)` },
    { transform: `translateX(${end}%)` }
  ], {
    duration: 1000,
    fill: 'both'
  });

  animation.pause();
  return animation;
};

export const parallaxEffect = (
  element: HTMLElement,
  speed: number = 0.5,
  direction: 'vertical' | 'horizontal' = 'vertical'
) => {
  const updateParallax = () => {
    const scrollY = window.scrollY;
    const offset = scrollY * speed;
    
    if (direction === 'vertical') {
      element.style.transform = `translateY(${offset}px)`;
    } else {
      element.style.transform = `translateX(${offset}px)`;
    }
  };

  window.addEventListener('scroll', updateParallax);
  updateParallax();

  return () => window.removeEventListener('scroll', updateParallax);
};

export const reduceMotionCheck = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const safeAnimate = (
  element: HTMLElement,
  animationFn: (el: HTMLElement) => Animation,
  fallbackStyle: Partial<CSSStyleDeclaration> = {}
) => {
  if (reduceMotionCheck()) {
    Object.assign(element.style, fallbackStyle);
  } else {
    return animationFn(element);
  }
  return null;
};
