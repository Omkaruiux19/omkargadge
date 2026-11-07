import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Linkedin, Github, Mail } from 'lucide-react';

/**
 * NOTE: No personal contact details are invented. Email is left as a clearly-labelled
 * placeholder and social links point to the platform search/profile entry points until
 * real URLs are provided. Replace the constants below with verified links when available.
 */
export const CONTACT = {
  emailPlaceholder: 'your-email@example.com', // ← replace with Omkar's real email
  linkedin: 'https://www.linkedin.com',
  behance: 'https://www.behance.net',
  github: 'https://github.com',
};

/** Minimal Behance "B" mark — lucide has no Behance icon. */
export function BehanceMark({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8.2 10.9c.9 0 1.6-.2 2.1-.7.5-.5.8-1.2.8-2.1 0-.5-.1-.9-.3-1.3-.2-.4-.5-.7-.9-.9-.4-.2-.8-.4-1.3-.5-.5-.1-1-.1-1.6-.1H2v10.6h5.1c.6 0 1.2-.1 1.7-.2.5-.2 1-.4 1.4-.8.4-.3.7-.8.9-1.3.2-.6.3-1.2.3-1.9 0-.9-.2-1.6-.6-2.1-.4-.5-1-.9-1.6-1zm-4-3.4h2.6c.3 0 .5 0 .8.1.2.1.4.2.6.3.2.1.3.3.3.5.1.2.1.4.1.6 0 .5-.1.8-.4 1.1-.3.2-.6.4-1.1.4H4.2V7.5zm4.6 6.8c-.3.3-.7.4-1.2.4H4.2v-3h3.5c.5 0 .9.1 1.2.4.3.3.5.7.5 1.1 0 .4-.2.8-.6 1.1zM18.5 15c-.4.4-1 .6-1.7.6-.5 0-.9-.1-1.3-.3-.4-.2-.7-.5-.9-.9-.2-.4-.4-.8-.4-1.3s.1-.9.3-1.3c.2-.4.5-.7.9-1 .4-.2.8-.4 1.3-.4.7 0 1.3.2 1.8.7.4.4.7 1.1.8 1.9h-4.9c0-.5.2-.9.5-1.2.3-.3.7-.4 1.1-.4.4 0 .7.1 1 .4.2.2.4.6.4 1h2.4c0-.5-.1-1-.3-1.4-.2-.5-.4-.9-.8-1.2-.3-.4-.7-.7-1.2-.9-.5-.2-1-.3-1.6-.3-.9 0-1.7.2-2.3.6-.7.4-1.2 1-1.5 1.7-.4.7-.6 1.5-.6 2.4 0 .9.2 1.7.6 2.4.4.7.9 1.2 1.6 1.6.7.4 1.5.6 2.4.6 1 0 1.8-.2 2.5-.7.6-.5 1.1-1.2 1.4-2.1h-2.2c-.1.4-.3.8-.7 1.1zm-3.3-7.6h4.9V6.1h-4.9z" />
    </svg>
  );
}

interface ContactWindowProps {
  /** Compact variant used inside the desktop folder window */
  variant?: 'window' | 'popup';
}

function LinkRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-black/[0.07] bg-white px-3.5 py-2.5 transition hover:border-black/15 hover:bg-[#FAFAF8]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#F1F0EC] text-ink/70 transition group-hover:bg-ink group-hover:text-white">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-ink/45">{label}</span>
        <span className="block truncate text-[12.5px] font-medium text-ink/80">{value}</span>
      </span>
    </a>
  );
}

export default function ContactWindow({ variant = 'window' }: ContactWindowProps) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.emailPlaceholder);
    } catch {
      // Fallback for older browsers / non-secure contexts
      const ta = document.createElement('textarea');
      ta.value = CONTACT.emailPlaceholder;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={`p-6 sm:p-8 ${variant === 'popup' ? 'text-center' : ''}`}>
      {variant === 'popup' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className="mx-auto mb-5 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-gradient-to-b from-[#F1F0EC] to-[#E4E3DD]"
          role="img"
          aria-label="Portrait placeholder of Omkar Gadge"
        >
          <span className="font-serif italic text-2xl text-ink/70">OG</span>
        </motion.div>
      )}

      <h2 className={`font-serif italic leading-tight text-ink ${variant === 'popup' ? 'text-[26px]' : 'text-2xl sm:text-3xl'}`}>
        Let&rsquo;s create something great.
      </h2>
      <p className={`mt-2 text-[13px] text-ink/60 ${variant === 'popup' ? 'mx-auto max-w-xs' : ''}`}>
        Have a project in mind? Let&rsquo;s connect and make it happen.
      </p>

      <div className={`${variant === 'popup' ? 'mx-auto mt-6 max-w-sm space-y-2.5' : 'mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2'}`}>
        <LinkRow
          icon={<Mail size={15} />}
          label="Email"
          value={CONTACT.emailPlaceholder}
          href={`mailto:${CONTACT.emailPlaceholder}`}
        />
        <LinkRow icon={<Linkedin size={15} />} label="LinkedIn" value="/in/omkargadge" href={CONTACT.linkedin} />
        <LinkRow icon={<BehanceMark />} label="Behance" value="/omkargadge" href={CONTACT.behance} />
        <LinkRow icon={<Github size={15} />} label="GitHub" value="/omkargadge" href={CONTACT.github} />
      </div>

      <button
        type="button"
        onClick={copyEmail}
        className={`mt-5 inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2.5 text-[12px] font-semibold text-white transition hover:bg-black/85 active:scale-[0.98] ${
          variant === 'popup' ? '' : ''
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="ok"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="inline-flex items-center gap-2"
            >
              <Check size={13} /> Copied email
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="inline-flex items-center gap-2"
            >
              <Copy size={13} /> Copy email address
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <p className="mt-4 text-[10.5px] leading-relaxed text-ink/40">
        Open to freelance projects and full-time product design roles.
      </p>
    </div>
  );
}

/** Behance "B" mark is exported above (BehanceMark). */
