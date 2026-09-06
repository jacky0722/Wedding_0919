import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  type: 'crimson-petal' | 'white-petal' | 'gold-star';
}

export const AnimeBackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollYRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize particles
    const particleCount = 42;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: i % 3 === 0 ? 'white-petal' : i % 3 === 1 ? 'crimson-petal' : 'gold-star',
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Subtle dynamic geometric background lines (Anime.js signature style)
      ctx.save();
      ctx.lineWidth = 1;
      const scrollOffset = scrollYRef.current * 0.15;

      // Draw subtle rotating concentric arcs with red & gold aesthetic
      const centerX = width * 0.85;
      const centerY = height * 0.35 + Math.sin(time * 0.5) * 20;
      
      for (let r = 80; r <= 320; r += 60) {
        ctx.beginPath();
        const startAngle = time * (r % 120 === 0 ? 0.3 : -0.2) + (scrollOffset * 0.01);
        ctx.arc(centerX, centerY, r, startAngle, startAngle + Math.PI * 1.2);
        ctx.strokeStyle = `rgba(148, 27, 38, ${0.03 + (r / 9000)})`;
        ctx.setLineDash([8, 14]);
        ctx.stroke();
      }

      // Draw opposite geometric quadrant with gold accent
      const leftCenterX = width * 0.12;
      const leftCenterY = height * 0.75 - Math.cos(time * 0.4) * 25;
      for (let r = 100; r <= 280; r += 70) {
        ctx.beginPath();
        const startAngle = -time * 0.25 - (scrollOffset * 0.008);
        ctx.arc(leftCenterX, leftCenterY, r, startAngle, startAngle + Math.PI * 0.9);
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.06)';
        ctx.setLineDash([4, 16]);
        ctx.stroke();
      }
      ctx.restore();

      // Render Floating particles with soft interactive mouse repel/attract
      for (const p of particles) {
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.y * 0.01) * 0.3;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        if (p.type === 'white-petal') {
          // Pure white wedding blossom petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 2.8, p.size * 1.5, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.9})`;
          ctx.shadowBlur = 4;
          ctx.shadowColor = 'rgba(148, 27, 38, 0.15)';
          ctx.fill();
        } else if (p.type === 'crimson-petal') {
          // Oriental wedding crimson petal
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * 2.5, p.size * 1.3, 0, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 27, 38, ${p.opacity * 0.65})`;
          ctx.shadowBlur = 3;
          ctx.shadowColor = 'rgba(148, 27, 38, 0.3)';
          ctx.fill();
        } else {
          // Golden sparkle star
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 2);
          ctx.lineTo(p.size * 0.6, 0);
          ctx.lineTo(0, p.size * 2);
          ctx.lineTo(-p.size * 0.6, 0);
          ctx.closePath();
          ctx.fillStyle = `rgba(197, 160, 89, ${p.opacity * 0.8})`;
          ctx.shadowBlur = 5;
          ctx.shadowColor = 'rgba(197, 160, 89, 0.4)';
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="anime-background-canvas"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
