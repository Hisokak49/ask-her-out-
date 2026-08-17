import { motion } from 'framer-motion';
import photo4 from '../assets/photo4.jpg';

export default function AskPage({ onYes }) {
  return (
    <div className="ask-layout">
      <motion.div
        className="ask-card"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
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

        <div className="ask-tag">a message for you 💌</div>

        <h1 className="ask-title">
          Hey <span>Vanika</span>,<br />
          wanna go on<br />a date with me?
        </h1>

        <p className="ask-sub">
          no pressure, but also… please say yes 🥺<br />
          i even brought flowers.
        </p>

        <div className="btn-group">
          <motion.button
            className="btn-yes"
            onClick={onYes}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
          >
            yes!! 🌸
          </motion.button>

          <button
            className="btn-no"
            disabled
            aria-disabled="true"
            tabIndex={-1}
          >
            no 😔
          </button>
        </div>
      </motion.div>
    </div>
  );
}
