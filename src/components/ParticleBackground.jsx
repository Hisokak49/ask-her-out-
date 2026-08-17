import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;
    let particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function makeParticle() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.2 + 0.4,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.55 + 0.08,
        hue: Math.random() * 60 + 290,
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: 140 }, makeParticle);
    }

    function draw() {
      // Deep dark background gradient
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#0d0618');
      bg.addColorStop(0.45, '#130b22');
      bg.addColorStop(1, '#0a0414');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Rosy blob left
      const b1 = ctx.createRadialGradient(W * 0.18, H * 0.28, 0, W * 0.18, H * 0.28, W * 0.38);
      b1.addColorStop(0, 'rgba(201,24,74,0.16)');
      b1.addColorStop(1, 'transparent');
      ctx.fillStyle = b1;
      ctx.fillRect(0, 0, W, H);

      // Purple blob right
      const b2 = ctx.createRadialGradient(W * 0.82, H * 0.72, 0, W * 0.82, H * 0.72, W * 0.32);
      b2.addColorStop(0, 'rgba(123,45,139,0.18)');
      b2.addColorStop(1, 'transparent');
      ctx.fillStyle = b2;
      ctx.fillRect(0, 0, W, H);

      // Gold shimmer center-top
      const b3 = ctx.createRadialGradient(W * 0.5, 0, 0, W * 0.5, 0, W * 0.3);
      b3.addColorStop(0, 'rgba(255,107,157,0.08)');
      b3.addColorStop(1, 'transparent');
      ctx.fillStyle = b3;
      ctx.fillRect(0, 0, W, H);

      // Particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,78%,${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      }

      animId = requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="bg-canvas"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
