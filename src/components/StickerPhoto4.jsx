import { motion } from 'framer-motion';
import photo4 from '../assets/photo4.jpg';

export default function StickerPhoto4() {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.08}
      whileDrag={{ scale: 1.08, rotate: 0, zIndex: 100, cursor: 'grabbing' }}
      style={{
        position: 'fixed',
        bottom: 32,
        right: 24,
        zIndex: 50,
        cursor: 'grab',
        userSelect: 'none',
        touchAction: 'none',
      }}
      initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: -12 }}
      transition={{ delay: 0.8, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Tape strip at top */}
      <div style={{
        position: 'absolute',
        top: -10,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 44,
        height: 18,
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(4px)',
        borderRadius: 3,
        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        zIndex: 2,
      }} />

      {/* Sticker frame */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: '#fff',
          borderRadius: 14,
          padding: 6,
          boxShadow:
            '0 6px 24px rgba(0,0,0,0.28), 0 2px 6px rgba(0,0,0,0.18)',
          lineHeight: 0,
        }}
      >
        <img
          src={photo4}
          alt="sticker"
          draggable={false}
          style={{
            width: 90,
            height: 90,
            objectFit: 'cover',
            objectPosition: 'center top',
            borderRadius: 10,
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </motion.div>

      {/* Drag hint tooltip — fades after 3s */}
      <motion.div
        initial={{ opacity: 0.8 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: -22,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.62rem',
          color: 'rgba(255,255,255,0.5)',
          whiteSpace: 'nowrap',
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '0.5px',
        }}
      >
        drag me 🐾
      </motion.div>
    </motion.div>
  );
}
