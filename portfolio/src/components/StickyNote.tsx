import { useState } from 'react';
import { motion, useReducedMotion, type PanInfo } from 'framer-motion';

const TODO_ITEMS = [
  'Design meaningful digital experiences',
  'Explore new design trends',
  'Create something memorable',
  'Build better products',
  'Keep learning and experimenting',
];

/**
 * Yellow macOS-style sticky note. Draggable, tilts on hover,
 * shadow deepens while dragging, closable with a small × button.
 */
export default function StickyNote() {
  const reduce = useReducedMotion();
  const [closed, setClosed] = useState(false);
  const [dragging, setDragging] = useState(false);

  if (closed) return null;

  return (
    <motion.div
      role="note"
      aria-label="To do sticky note"
      drag={!reduce ? true : undefined}
      dragMomentum={false}
      dragElastic={0.08}
      onDragStart={() => setDragging(true)}
      onDragEnd={(_: MouseEvent | TouchEvent | PointerEvent, _info: PanInfo) => setDragging(false)}
      initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: dragging ? 2.5 : -3 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: 0.4, type: 'spring', stiffness: 260, damping: 22 }}
      whileHover={reduce ? undefined : { rotate: -1.5, scale: 1.02 }}
      className={`folder-item absolute left-[4%] top-14 z-20 w-[190px] rounded-[3px] bg-note p-4 sm:w-[210px] ${
        dragging
          ? 'shadow-[0_22px_44px_-12px_rgba(17,17,17,0.35)]'
          : 'shadow-[0_10px_24px_-8px_rgba(17,17,17,0.22)]'
      }`}
      style={{ transformOrigin: 'center' }}
    >
      {/* Torn-paper top edge accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[6px] bg-black/[0.045]" />

      <button
        type="button"
        aria-label="Close sticky note"
        onClick={() => setClosed(true)}
        className="absolute right-1.5 top-1 flex h-5 w-5 items-center justify-center rounded-full text-[13px] leading-none text-black/40 opacity-0 transition-opacity duration-200 hover:bg-black/10 hover:text-black/70 focus-visible:opacity-100 group-hover:opacity-100 [.folder-item:hover_&]:opacity-100"
      >
        ×
      </button>

      <p className="mb-2 text-[11px] font-bold tracking-[0.14em] text-black/80">TO DO:</p>
      <ul className="space-y-[7px]">
        {TODO_ITEMS.map((item) => (
          <li key={item} className="flex items-start gap-2 text-[11.5px] leading-snug text-black/75">
            <span
              aria-hidden="true"
              className="mt-[3px] inline-block h-[9px] w-[9px] shrink-0 rounded-[2px] border border-black/40"
            />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
