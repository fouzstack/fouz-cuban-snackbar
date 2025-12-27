import { useEffect, useRef } from 'react';
import { Particle } from '../types';

export const useParticles = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  theme: 'light' | 'dark',
  reducedMotion: boolean
) => {
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const frameCountRef = useRef<number>(0);

  useEffect(() => {
    if (!canvasRef.current || reducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const spiceColors = ['#f59e0b', '#d97706', '#fbbf24', '#92400e'];
    const coffeeColors = ['#78350f', '#92400e', '#b45309'];
    const steamColors = theme === 'dark' 
      ? ['#fef3c7', '#fde68a', '#fbbf24']
      : ['#78350f', '#92400e', '#b45309'];

    // Inicializar partículas
    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = window.innerWidth < 768 ? 25 : window.innerWidth < 1024 ? 35 : 50;

      for (let i = 0; i < particleCount; i++) {
        const type = i % 10 === 0 ? 'coffee' : i % 5 === 0 ? 'steam' : 'spice';
        
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: type === 'coffee' ? (Math.random() - 0.5) * 0.5 : (Math.random() - 0.5) * 0.3,
          speedY: type === 'steam' ? -(Math.random() * 0.8 + 0.2) : (Math.random() - 0.5) * 0.3,
          size: type === 'coffee' ? Math.random() * 3 + 1 : type === 'steam' ? Math.random() * 6 + 2 : Math.random() * 2 + 0.5,
          color: type === 'coffee' 
            ? coffeeColors[Math.floor(Math.random() * coffeeColors.length)] 
            : type === 'steam' 
              ? steamColors[Math.floor(Math.random() * steamColors.length)] 
              : spiceColors[Math.floor(Math.random() * spiceColors.length)],
          opacity: type === 'steam' ? Math.random() * 0.3 + 0.1 : Math.random() * 0.8 + 0.2,
          type
        });
      }

      particlesRef.current = particles;
    };

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;

      if (deltaTime < 16) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      lastTimeRef.current = timestamp;
      frameCountRef.current++;

      // Limpiar canvas
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, theme === 'dark' ? 'rgba(28, 25, 23, 0.95)' : 'rgba(255, 251, 235, 0.95)');
      gradient.addColorStop(1, theme === 'dark' ? 'rgba(41, 37, 36, 0.95)' : 'rgba(254, 243, 199, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Actualizar y dibujar partículas
      particlesRef.current.forEach(particle => {
        // Actualizar posición
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Reiniciar cuando salen de pantalla
        if (particle.x > canvas.width || particle.x < 0 || particle.y > canvas.height || particle.y < 0) {
          particle.x = Math.random() * canvas.width;
          particle.y = particle.type === 'steam' ? canvas.height : Math.random() * canvas.height;
        }

        // Dibujar partícula
        ctx.beginPath();
        ctx.globalAlpha = particle.opacity;
        
        if (particle.type === 'steam') {
          const steamGradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size
          );
          steamGradient.addColorStop(0, `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`);
          steamGradient.addColorStop(1, `${particle.color}00`);
          
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = steamGradient;
          ctx.fill();
        } else {
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        }
        
        ctx.globalAlpha = 1;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animationRef.current = requestAnimationFrame(animate);

    // Ajustar partículas al redimensionar
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, theme, reducedMotion]);
};
