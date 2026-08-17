import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';
import './App.css';

import PhotoBackground from './components/ParticleBackground';
import FloatingHearts  from './components/FloatingHearts';
import StickerPhoto4   from './components/StickerPhoto4';
import useConfetti     from './components/useConfetti';
import AskPage         from './pages/AskPage';
import CalendarPage    from './pages/CalendarPage';
import SuccessPage     from './pages/SuccessPage';

const SCREEN = { ASK: 'ask', CALENDAR: 'calendar', SUCCESS: 'success' };

export default function App() {
  const [screen, setScreen]      = useState(SCREEN.ASK);
  const [confirmedDate, setDate] = useState(null);
  const [confirmedTime, setTime] = useState(null);
  const burst = useConfetti();

  function handleYes() {
    burst();
    setScreen(SCREEN.CALENDAR);
  }

  function handleConfirm(date, time) {
    setDate(date);
    setTime(time);
    burst();
    setTimeout(burst, 450);
    setScreen(SCREEN.SUCCESS);
  }

  return (
    <>
      <PhotoBackground />
      <FloatingHearts />
      <StickerPhoto4 />

      <AnimatePresence mode="wait">
        {screen === SCREEN.ASK && (
          <AskPage key="ask" onYes={handleYes} />
        )}
        {screen === SCREEN.CALENDAR && (
          <CalendarPage key="cal" onConfirm={handleConfirm} />
        )}
        {screen === SCREEN.SUCCESS && (
          <SuccessPage key="success" date={confirmedDate} time={confirmedTime} />
        )}
      </AnimatePresence>
    </>
  );
}
