import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';
import './App.css';

import ParticleBackground from './components/ParticleBackground';
import FloatingHearts     from './components/FloatingHearts';
import useConfetti        from './components/useConfetti';
import AskPage            from './pages/AskPage';
import CalendarPage       from './pages/CalendarPage';
import SuccessPage        from './pages/SuccessPage';

const SCREEN = { ASK: 'ask', CALENDAR: 'calendar', SUCCESS: 'success' };

const screenWrap = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  padding: '20px',
};

export default function App() {
  const [screen, setScreen]       = useState(SCREEN.ASK);
  const [confirmedDate, setDate]  = useState(null);
  const [confirmedTime, setTime]  = useState(null);
  const burst = useConfetti();

  function handleYes() {
    burst();
    setScreen(SCREEN.CALENDAR);
  }

  function handleConfirm(date, time) {
    setDate(date);
    setTime(time);
    burst();
    setTimeout(burst, 500);
    setScreen(SCREEN.SUCCESS);
  }

  return (
    <>
      {/* Layer 0: Particle canvas */}
      <ParticleBackground />

      {/* Layer 1: Floating hearts */}
      <FloatingHearts />

      {/* Layer 2: Page content */}
      <div style={{ position: 'relative', zIndex: 10, minHeight: '100vh' }}>
        <AnimatePresence mode="wait">
          {screen === SCREEN.ASK && (
            <motion.div key="ask" style={screenWrap}>
              <AskPage onYes={handleYes} />
            </motion.div>
          )}

          {screen === SCREEN.CALENDAR && (
            <motion.div key="cal" style={{ ...screenWrap, overflowY: 'auto', alignItems: 'flex-start', paddingTop: 40 }}>
              <CalendarPage onConfirm={handleConfirm} />
            </motion.div>
          )}

          {screen === SCREEN.SUCCESS && (
            <motion.div key="success" style={screenWrap}>
              <SuccessPage date={confirmedDate} time={confirmedTime} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
