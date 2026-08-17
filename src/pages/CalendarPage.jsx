import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, getDaysInMonth, getDay, startOfMonth, isBefore, isToday, isSameDay } from 'date-fns';

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];
const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];
const TIME_SLOTS = [
  '10:00 AM','11:00 AM','12:00 PM','1:00 PM',
  '3:00 PM','5:00 PM','7:00 PM','8:00 PM','Evening 🌙'
];

export default function CalendarPage({ onConfirm }) {
  const now = new Date();
  const [viewYear, setViewYear]   = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selDate, setSelDate]     = useState(null);
  const [selTime, setSelTime]     = useState(null);

  const currentYear = now.getFullYear();

  // Navigation limits: can't go before current month, can't go past Dec of current year
  const canPrev = !(viewYear === now.getFullYear() && viewMonth === now.getMonth());
  const canNext = !(viewMonth === 11 && viewYear === currentYear);

  function changeMonth(dir) {
    let m = viewMonth + dir;
    let y = viewYear;
    if (m < 0)  { m = 11; y--; }
    if (m > 11) { m = 0;  y++; }
    // clamp
    if (y > currentYear || (y === currentYear && m > 11)) { m = 11; y = currentYear; }
    if (y < now.getFullYear() || (y === now.getFullYear() && m < now.getMonth())) {
      m = now.getMonth(); y = now.getFullYear();
    }
    setViewYear(y); setViewMonth(m);
  }

  const days = useMemo(() => {
    const firstDow = getDay(startOfMonth(new Date(viewYear, viewMonth, 1)));
    const total    = getDaysInMonth(new Date(viewYear, viewMonth));
    const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const cells = [];
    for (let i = 0; i < firstDow; i++) cells.push({ empty: true, key: `e-${i}` });
    for (let d = 1; d <= total; d++) {
      const date = new Date(viewYear, viewMonth, d);
      const past = isBefore(date, todayMid);
      cells.push({
        d, date, key: `d-${d}`,
        today:    isToday(date),
        past,
        selected: selDate && isSameDay(date, selDate),
      });
    }
    return cells;
  }, [viewYear, viewMonth, selDate]);

  const isReady = selDate && selTime;

  function handleConfirm() {
    if (!isReady) return;
    onConfirm(selDate, selTime);
  }

  return (
    <motion.div
      className="card cal-card"
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -30 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="cal-title">Pick Our Day 📅</h2>
      <p className="cal-sub">Choose when you're free — I'll make it unforgettable 🌸</p>

      {/* Month navigation */}
      <div className="cal-nav">
        <button className="cal-nav-btn" onClick={() => changeMonth(-1)} disabled={!canPrev}>‹</button>
        <span className="cal-month-label">{MONTHS[viewMonth]} {viewYear}</span>
        <button className="cal-nav-btn" onClick={() => changeMonth(1)} disabled={!canNext}>›</button>
      </div>

      {/* Weekday headers */}
      <div className="cal-weekdays">
        {WEEKDAYS.map(d => <span key={d} className="cal-weekday">{d}</span>)}
      </div>

      {/* Days grid */}
      <div className="cal-grid">
        {days.map(cell => {
          if (cell.empty) return <div key={cell.key} className="cal-day cal-day--empty" />;

          let cls = 'cal-day';
          if (cell.past)     cls += ' cal-day--past cal-day--disabled';
          else if (cell.today)    cls += ' cal-day--today';
          if (cell.selected) cls += ' cal-day--selected';

          return (
            <motion.button
              key={cell.key}
              className={cls}
              onClick={() => !cell.past && setSelDate(cell.date)}
              whileHover={!cell.past ? { scale: 1.15 } : {}}
              whileTap={!cell.past ? { scale: 0.95 } : {}}
            >
              {cell.d}
            </motion.button>
          );
        })}
      </div>

      {/* Selected date badge */}
      <AnimatePresence>
        {selDate && (
          <motion.div
            className="selected-badge"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
          >
            📅 {format(selDate, 'EEEE, MMMM d, yyyy')}
            {selTime && <span>· ⏰ {selTime}</span>}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time picker */}
      <div className="time-section">
        <p className="time-label">⏰ Pick a Time</p>
        <div className="time-slots">
          {TIME_SLOTS.map(t => (
            <motion.button
              key={t}
              className={`time-slot${selTime === t ? ' time-slot--selected' : ''}`}
              onClick={() => setSelTime(t)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
            >
              {t}
            </motion.button>
          ))}
        </div>
      </div>

      <motion.button
        className="btn-confirm"
        onClick={handleConfirm}
        disabled={!isReady}
        whileHover={isReady ? { scale: 1.02 } : {}}
        whileTap={isReady ? { scale: 0.97 } : {}}
      >
        💌 Lock in Our Date!
      </motion.button>
    </motion.div>
  );
}
