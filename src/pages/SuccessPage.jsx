import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import emailjs from '@emailjs/browser';

// ── EmailJS config ──────────────────────────────────────────
// Sign up free at https://emailjs.com and fill these in:
const EJS_PUBLIC_KEY  = 'FtM4SNiSN6GGRz81L';
const EJS_SERVICE_ID  = 'service_e6t8r3l';
const EJS_TEMPLATE_ID = 'template_mvu43n4';
// ────────────────────────────────────────────────────────────

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
      message:   `Vanika said YES! 🎉\n\n📅 Date: ${dateStr}\n⏰ Time: ${time}\n\nShe's waiting — don't be late! 💖`,
    })
    .then(() => setStatus(STATUS.SENT))
    .catch(() => setStatus(STATUS.ERROR));
  }, []);

  /* Fallback mailto link if EmailJS not configured */
  const mailtoHref = `mailto:amityadavx245@gmail.com?subject=${encodeURIComponent(
    '💌 Vanika Said YES! Our Date is Set!'
  )}&body=${encodeURIComponent(
    `Hey Amit! 🎉\n\nShe said YES!!!\n\n📅 Date: ${dateStr}\n⏰ Time: ${time}\n\nDon't be late! 💖`
  )}`;

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, scale: 0.88, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="success-emoji"
        animate={{ rotate: [0, -8, 8, -5, 5, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
      >
        🎉
      </motion.span>

      <h2 className="success-title">It's a Date! 💖</h2>

      <p className="success-detail">
        Yaaay Vanika! I'm over the moon! 🌙<br />
        Our special day is locked in:<br />
        <strong>{dateStr}</strong><br />
        at <strong>{time}</strong>
      </p>

      <p className="success-detail" style={{ marginTop: '10px', fontSize: '0.84rem', opacity: 0.55 }}>
        📧 Sending confirmation to Amit right now…
      </p>

      {/* Email status indicator */}
      {status === STATUS.SENDING && (
        <div className="email-status email-status--sending">
          <span className="spinner" />
          Sending email to Amit…
        </div>
      )}

      {status === STATUS.SENT && (
        <motion.div
          className="email-status email-status--sent"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✅ Email sent! Amit is going to freak out with happiness 🎊
        </motion.div>
      )}

      {status === STATUS.ERROR && (
        <motion.div
          className="email-status email-status--error"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📧{' '}
          <a href={mailtoHref} style={{ color: 'inherit', textDecoration: 'underline' }}>
            Click here to send the email to Amit manually
          </a>
        </motion.div>
      )}
    </motion.div>
  );
}
