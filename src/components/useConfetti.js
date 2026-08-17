import confetti from 'canvas-confetti';

export default function useConfetti() {
  function burst() {
    confetti({
      particleCount: 160,
      spread: 80,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#f2c4b8','#e8a0a0','#fff','#fde8dc','#c0534a','#f5ede0'],
      startVelocity: 38,
      gravity: 0.9,
      ticks: 200,
      scalar: 1.05,
    });
    setTimeout(() => {
      confetti({ particleCount: 60, angle: 60,  spread: 50, origin: { x: 0, y: 0.7 }, colors: ['#f2c4b8','#fff','#e8a0a0'] });
      confetti({ particleCount: 60, angle: 120, spread: 50, origin: { x: 1, y: 0.7 }, colors: ['#f2c4b8','#fde8dc','#c0534a'] });
    }, 200);
  }
  return burst;
}
