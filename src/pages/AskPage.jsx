import { motion } from 'framer-motion';

/* Cute bear SVG built inline – warm pink, sparkly eyes, heart on chest */
function BearSVG() {
  return (
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="bear-svg">
      <defs>
        <radialGradient id="headG" cx="38%" cy="32%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <radialGradient id="earG" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#ff8fb1" />
          <stop offset="100%" stopColor="#c9184a" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ears */}
      <circle cx="26" cy="29" r="17" fill="#c9184a" />
      <circle cx="26" cy="29" r="10" fill="url(#earG)" />
      <circle cx="94" cy="29" r="17" fill="#c9184a" />
      <circle cx="94" cy="29" r="10" fill="url(#earG)" />

      {/* Head */}
      <circle cx="60" cy="60" r="40" fill="#e91e8c" />
      <circle cx="60" cy="60" r="40" fill="url(#headG)" />

      {/* Eyes white */}
      <circle cx="46" cy="51" r="7"   fill="#fff" />
      <circle cx="74" cy="51" r="7"   fill="#fff" />
      {/* Pupils */}
      <circle cx="47.5" cy="52" r="4" fill="#1a0a2e" />
      <circle cx="75.5" cy="52" r="4" fill="#1a0a2e" />
      {/* Sparkle in eyes */}
      <circle cx="49.5" cy="50" r="1.4" fill="#fff" />
      <circle cx="77.5" cy="50" r="1.4" fill="#fff" />

      {/* Cheeks blush */}
      <ellipse cx="35"  cy="65" rx="9" ry="6" fill="rgba(255,200,220,0.35)" />
      <ellipse cx="85"  cy="65" rx="9" ry="6" fill="rgba(255,200,220,0.35)" />

      {/* Nose */}
      <ellipse cx="60" cy="65" rx="6" ry="4" fill="#1a0a2e" />
      {/* Smile */}
      <path d="M51 73 Q60 84 69 73" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />

      {/* Heart on chest */}
      <path
        d="M55 82 C55 78 49 75 49 80.5 C49 86 55 90 60 94 C65 90 71 86 71 80.5 C71 75 65 78 65 82 C65 78 60 76 55 82Z"
        fill="rgba(255,255,255,0.92)"
        filter="url(#glow)"
      />
    </svg>
  );
}

export default function AskPage({ onYes }) {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -30 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Bear + orbit */}
      <div className="bear-wrap">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <BearSVG />
        </motion.div>

        <div className="orbit-ring" aria-hidden="true">
          <span className="orbit-item">❤️</span>
          <span className="orbit-item">💕</span>
          <span className="orbit-item">✨</span>
          <span className="orbit-item">🌹</span>
        </div>
      </div>

      <h1 className="ask-title">Hey Vanika! 💌</h1>

      <p className="ask-sub">
        Every moment I spend with you feels like a dream...<br />
        So I thought, why not make it official? 🌹<br />
        <strong>Will you go on a date with me?</strong><br />
        <span style={{ fontSize: '0.85rem', opacity: 0.55 }}>
          ( I promise it'll be the best day ever ✨ )
        </span>
      </p>

      <div className="btn-group">
        <motion.button
          className="btn-yes"
          onClick={onYes}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
        >
          💖 Yes, absolutely!
        </motion.button>

        <button
          className="btn-no"
          disabled
          aria-disabled="true"
          tabIndex={-1}
          title="This option is unavailable 😉"
        >
          😔 No…
        </button>
      </div>
    </motion.div>
  );
}
