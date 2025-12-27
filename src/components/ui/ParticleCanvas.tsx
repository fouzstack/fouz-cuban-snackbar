import React, { useRef, useEffect } from 'react';
import { useParticles } from '../../hooks/useParticles';

interface ParticleCanvasProps {
  theme: 'light' | 'dark';
  reducedMotion: boolean;
}

export const ParticleCanvas: React.FC<ParticleCanvasProps> = ({ theme, reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
     //@ts-expect-error
  useParticles(canvasRef, theme, reducedMotion);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => window.removeEventListener('resize', updateCanvasSize);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" aria-hidden="true">
      {/* Canvas para partículas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{ willChange: 'transform, opacity' }}
      />
      
      {/* Efectos de fondo estáticos */}
      <div className="absolute inset-0">
        <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br ${
          theme === 'dark' ? 'from-amber-900/10' : 'from-amber-200/10'
        } via-transparent to-transparent rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tr ${
          theme === 'dark' ? 'from-orange-900/10' : 'from-orange-200/10'
        } via-transparent to-transparent rounded-full blur-3xl`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br ${
          theme === 'dark' ? 'from-yellow-900/5' : 'from-yellow-200/5'
        } via-transparent to-transparent rounded-full blur-3xl`}></div>
      </div>
    </div>
  );
};
