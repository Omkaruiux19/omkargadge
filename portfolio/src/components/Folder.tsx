import { motion, useReducedMotion } from 'framer-motion';

/**
 * Classic macOS blue folder illustration (SVG).
 * Two-tone flat style with back tab and front flap.
 */
export default function FolderArt({ size = 60 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.82}
      viewBox="0 0 64 52"
      fill="none"
      aria-hidden="true"
      className="block"
    >
      {/* Back panel with tab */}
      <path
        d="M4 10a4 4 0 0 1 4-4h14.5c1.2 0 2.3.6 3 1.6l2.7 3.9c.4.6 1.1.9 1.8.9H56a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V10Z"
        fill="#3E8BFF"
      />
      {/* Inner paper hint */}
      <rect x="8" y="16" width="48" height="30" rx="3" fill="#EAF1FE" opacity="0.55" />
      {/* Front flap */}
      <path
        d="M4 18.5A3.5 3.5 0 0 1 7.5 15h49a3.5 3.5 0 0 1 3.5 3.5v24A4.5 4.5 0 0 1 55.5 47h-47A4.5 4.5 0 0 1 4 42.5v-24Z"
        fill="url(#folderGrad)"
      />
      {/* Top highlight line */}
      <path d="M4 19h56" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
      <defs>
        <linearGradient id="folderGrad" x1="4" y1="15" x2="60" y2="47" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6FB2FF" />
          <stop offset="1" stopColor="#3D87F5" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface FolderProps {
  id: string;
  number: string;
  label: string;
  isOpen: boolean;
  onOpen: (origin: DOMRect) => void;
  position: { x: number; y: number };
  onMove: (pos: { x: number; y: number }) => void;
  delay: number;
}

/**
 * Draggable desktop folder icon with label underneath.
 * Single click selects, double click opens; Enter/Space also opens (keyboard support).
 */
export default function Folder({ id, number, label, isOpen, onOpen, position, onMove, delay }: FolderProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-folder-id={id}
      drag={!reduce}
      dragMomentum={false}
      dragElastic={0.06}
      dragListener={false}
      dragConstraints={{ left: -2000, right: 2000, top: -2000, bottom: 2000 }}
      initial={reduce ? false : { opacity: 0, y: 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: delay, type: 'spring', stiffness: 260, damping: 24 }}
      whileHover={reduce ? undefined : { scale: 1.08, y: -4 }}
      style={{ position: 'absolute', left: position.x, top: position.y, touchAction: 'none' }}
      className="folder-item z-20 flex w-[72px] select-none flex-col items-center gap-1.5 focus-visible:outline-offset-4"
      role="button"
      tabIndex={0}
      aria-label={`Open folder ${number} — ${label}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const el = e.currentTarget as HTMLElement;
          onOpen(el.getBoundingClientRect());
        }
      }}
      onDoubleClick={(e) => {
        const el = e.currentTarget as HTMLElement;
        onOpen(el.getBoundingClientRect());
      }}
      onClick={(e) => {
        // Mobile-friendly: single tap opens when no hover device
        if (window.matchMedia('(pointer: coarse)').matches) {
          const el = e.currentTarget as HTMLElement;
          onOpen(el.getBoundingClientRect());
        }
      }}
    >
      <div
        className={`transition-shadow duration-200 rounded-md ${
          isOpen
            ? 'drop-shadow-[0_10px_14px_rgba(47,107,255,0.45)]'
            : 'drop-shadow-[0_6px_10px_rgba(17,17,17,0.18)]'
        }`}
      >
        <FolderArt size={58} />
      </div>
      <span className="rounded-full bg-white/75 px-2 py-[3px] text-[10.5px] font-semibold tracking-wide text-ink/85 shadow-[0_1px_2px_rgba(17,17,17,0.08)] backdrop-blur-sm">
        <span className="mr-1 text-ink/45">{number}</span>
        {label}
      </span>
    </motion.div>
  );
}
