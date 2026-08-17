import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function useConfetti() {
  function burst() {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { x: 0.5, y: 0.55 },
      colors: ['#ff6b9d','#ffd700','#ff8fb1','#e91e8c','#c9184a','#fff','#48c78e'],
      startVelocity: 40,
      gravity: 0.85,
      ticks: 220,
      scalar: 1.1,
    });

    // Side cannons
    setTimeout(() => {
      confetti({ particleCount: 80, angle: 60,  spread: 55, origin: { x: 0, y: 0.65 }, colors: ['#ff6b9d','#ffd700','#fff'] });
      confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 1, y: 0.65 }, colors: ['#ff6b9d','#e91e8c','#ffd700'] });
    }, 220);
  }

  return burst;
}
