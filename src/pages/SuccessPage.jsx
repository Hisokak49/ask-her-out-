import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import emailjs from '@emailjs/browser';
import photo3 from '../assets/photo3.jpg';

const EJS_PUBLIC_KEY  = 'FtM4SNiSN6GGRz81L';
const EJS_SERVICE_ID  = 'service_e6t8r3l';
const EJS_TEMPLATE_ID = 'template_mvu43n4';

const STATUS = { IDLE: 'idle', SENDING: 'sending', SENT: 'sent', ERROR: 'error' };

export default function SuccessPage({ date, time }) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const dateStr = date ? format(date, 'EEEE, MMMM d, yyyy') : '';

  useEffect(() => {
    emailjs.init(EJS_PUBLIC_KEY);
    setStatus(STATUS.SENDING);

    emailjs.send(EJS_SERVICE_ID, EJS_TEMPLATE_ID, {
      to_name:   'Amit',
      from_name: 'Vanika 💌',
      to_email:  'amityadavx245@gmail.com',
      date:      dateStr,
      time:      time,
      message:   `She said YES! 🎉\n\n📅 Date: ${dateStr}\n⏰ Time: ${time}\n\nShe's waiting — don't be late! 💖`,
    })
    .then(() => setStatus(STATUS.SENT))
    .catch(() => setStatus(STATUS.ERROR));
  }, []);

  const mailtoHref = `mailto:amityadavx245@gmail.com?subject=${encodeURIComponent(
    '💌 Vanika Said YES! Our Date is Set!'
  )}&body=${encodeURIComponent(
    `Hey Amit! 🎉\n\nShe said YES!!!\n\n📅 Date: ${dateStr}\n⏰ Time: ${time}\n\nDon't be late! 💖`
  )}`;

  return (
    <div className="success-layout">
      <motion.div
        className="success-card"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* photo3 — cat with orange flowers */}
        <motion.img
          src={photo3}
          alt="flowers for you"
          className="success-photo"
          initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="success-tag">it's official 🎉</div>

        <h2 className="success-title">
          we're going on<br />a <span>date!</span>
        </h2>

        <p className="success-detail">
          omg Vanika you actually said yes 🥹<br />
          Amit is literally going to lose his mind.
        </p>

        <div className="date-chip">
          📅 {dateStr} · ⏰ {time}
        </div>

        <p className="success-detail" style={{ fontSize: '0.82rem', opacity: 0.45, marginTop: 4 }}>
          sending him a little email right now…
        </p>

        {/* Status */}
        {status === STATUS.SENDING && (
          <div className="email-status email-status--sending">
            <span className="spinner" />
            notifying Amit…
          </div>
        )}

        {status === STATUS.SENT && (
          <motion.div
            className="email-status email-status--sent"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✓ Amit has been notified 🎊 he's probably freaking out rn
          </motion.div>
        )}

        {status === STATUS.ERROR && (
          <motion.div
            className="email-status email-status--error"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <a href={mailtoHref} style={{ color: 'inherit', textDecoration: 'underline' }}>
              tap here to tell Amit manually 📬
            </a>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
