import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import photo4 from '../assets/photo4.jpg';

const NO_MESSAGES = [
  "no pressure, but also… please say yes 🥺\ni even brought flowers.",
  "wait… are you sure? 🥺 think about the food!",
  "reconsidering is 100% free, Vanika 🌸",
  "wrong button bestie 💀 try the big shiny one",
  "no is disabled by official date protocol 🚫",
  "okay now you're just teasing me 😭",
  "the 'yes' button is getting bigger for a reason ✨",
  "just click yes already! 💖",
];

const NO_POPUPS = [
  "nope! 😜", "missed! 🏃‍♂️", "too slow! ⚡️", "uh oh! 🙈", "try again! 🪄", "never! 💖"
];

export default function AskPage({ onYes }) {
  const [noCount, setNoCount]     = useState(0);
  const [noPos, setNoPos]         = useState({ x: 0, y: 0 });
  const [popupText, setPopupText] = useState('');
  const [shake, setShake]         = useState(false);

  function moveNoBtn() {
    setNoCount(prev => prev + 1);

    // Random dodge position
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 140;
    setNoPos({ x: randomX, y: randomY });

    // Random popup hint text
    const txt = NO_POPUPS[Math.floor(Math.random() * NO_POPUPS.length)];
    setPopupText(txt);

    // Trigger subtle card shake
    setShake(true);
    setTimeout(() => setShake(false), 300);
  }

  // Subtitle based on attempt count
  const currentMsg = NO_MESSAGES[Math.min(noCount, NO_MESSAGES.length - 1)];

  // Scale up the Yes button as No is attempted
  const yesScale = Math.min(1 + noCount * 0.12, 1.6);

  return (
    <div className="ask-layout">
      <motion.div
        className="ask-card"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: shake ? [-1.5, 1.5, -1.5, 1.5, 0] : 0,
        }}
        exit={{ opacity: 0, y: -30, scale: 0.94 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* photo4 — cat with pink flowers */}
        <motion.img
          src={photo4}
          alt="flowers for you"
          className="ask-photo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="ask-tag">
          {noCount > 0 ? `attempt ${noCount} failed 🙈` : 'a message for you 💌'}
        </div>

        <h1 className="ask-title">
          Hey <span>Vanika</span>,<br />
          wanna go on<br />a date with me?
        </h1>

        <motion.p
          key={noCount}
          className="ask-sub"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ whiteSpace: 'pre-line', minHeight: 48 }}
        >
          {currentMsg}
        </motion.p>

        <div className="btn-group" style={{ position: 'relative', minHeight: 60 }}>
          {/* YES BUTTON — Grows bigger each time she tries to click NO */}
          <motion.button
            className="btn-yes"
            onClick={onYes}
            animate={{ scale: yesScale }}
            whileHover={{ scale: yesScale * 1.06 }}
            whileTap={{ scale: yesScale * 0.95 }}
            style={{ zIndex: 10 }}
          >
            yes!! 🌸
          </motion.button>

          {/* RUNAWAY NO BUTTON — Dodges away on hover / click / touch */}
          <motion.button
            className="btn-no"
            onMouseEnter={moveNoBtn}
            onClick={moveNoBtn}
            onTouchStart={moveNoBtn}
            animate={{
              x: noPos.x,
              y: noPos.y,
              rotate: noCount * 15,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            style={{
              opacity: Math.max(0.8 - noCount * 0.08, 0.35),
              cursor: 'pointer',
              pointerEvents: 'auto', // interactive dodge!
            }}
          >
            no 😔
          </motion.button>

          {/* Floating Dodge Popup message */}
          <AnimatePresence>
            {popupText && (
              <motion.span
                key={noCount + popupText}
                initial={{ opacity: 1, y: 0, scale: 0.8 }}
                animate={{ opacity: 0, y: -30, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                  position: 'absolute',
                  top: -20,
                  right: 20,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#f2c4b8',
                  pointerEvents: 'none',
                }}
              >
                {popupText}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
