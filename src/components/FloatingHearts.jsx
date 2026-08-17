import { useEffect, useRef } from 'react';

const HEARTS = ['❤️','💕','💖','💗','💓','🌹','✨','💝','🥰','💞','🌸','🦋'];

export default function FloatingHearts() {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    function spawn() {
      const el = document.createElement('span');
      el.className = 'fheart';
      el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      el.style.left = `${Math.random() * 100}vw`;
      el.style.fontSize = `${Math.random() * 20 + 10}px`;
      const dur = Math.random() * 6 + 7;
      el.style.animationDuration = `${dur}s`;
      el.style.animationDelay = '0s';
      layer.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000 + 500);
    }

    // Initial burst
    for (let i = 0; i < 6; i++) setTimeout(spawn, i * 180);

    const iv = setInterval(spawn, 950);
    return () => clearInterval(iv);
  }, []);

  return <div ref={layerRef} className="hearts-layer" />;
}
