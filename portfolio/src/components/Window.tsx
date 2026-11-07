import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useDragControls, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface WindowFrameProps {
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** Where the folder icon was, for open animation origin */
  origin?: { x: number; y: number } | null;
  position: { x: number; y: number };
  onMove: (pos: { x: number; y: number }) => void;
  widthClass?: string;
  heightClass?: string;
}

/**
 * Reusable macOS-style application window: traffic lights, draggable by title bar,
 * minimize/maximize/close, spring open animation from folder origin.
 */
export default function WindowFrame({
  title,
  onClose,
  children,
  origin,
  position,
  onMove,
  widthClass = 'w-[min(92vw,640px)]',
  heightClass = 'h-[min(72vh,560px)]',
}: WindowFrameProps) {
  const reduce = useReducedMotion();
  const controls = useDragControls();
  const ref = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Escape closes the window
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Focus the window when opened (accessibility)
  useEffect(() => {
    ref.current?.focus();
  }, []);

  const clampToViewport = (x: number, y: number) => {
    const el = ref.current;
    if (!el) return { x, y };
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    return {
      x: Math.max(-w + 120, Math.min(window.innerWidth - 80, x)),
      y: Math.max(30, Math.min(window.innerHeight - h - 20, y)),
    };
  };

  const win = createPortal(
    <motion.div
      ref={ref}
      role="dialog"
      aria-label={title}
      tabIndex={-1}
      drag={!reduce}
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      dragElastic={0.02}
      onDragStart={() => {
        dragOffset.current = { x: 0, y: 0 };
      }}
      onDrag={(_, info) => {
        dragOffset.current = { x: info.offset.x, y: info.offset.y };
      }}
      onDragEnd={() => {
        const next = clampToViewport(position.x + dragOffset.current.x, position.y + dragOffset.current.y);
        onMove(next);
      }}
      initial={
        reduce
          ? { opacity: 0 }
          : {
              opacity: 0,
              scale: 0.3,
              x: origin ? origin.x - position.x : 0,
              y: origin ? origin.y - position.y : 0,
            }
      }
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: 12 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      style={{ position: 'fixed', left: position.x, top: position.y, transformOrigin: 'top left' }}
      className={`z-[200] ${widthClass} ${heightClass} flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_30px_70px_-20px_rgba(17,17,17,0.35),0_8px_20px_rgba(17,17,17,0.12)] outline-none`}
    >
      {/* Title bar */}
      <div
        className="flex h-10 shrink-0 cursor-grab items-center justify-between border-b border-black/[0.07] bg-[#FBFBFA] px-3 active:cursor-grabbing"
        onPointerDown={(e) => controls.start(e)}
      >
        <div className="group flex items-center gap-2">
          <button
            type="button"
            aria-label={`Close ${title}`}
            onClick={onClose}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-[#FF5F57] ring-inset ring-black/10 transition-transform group-hover:scale-110"
          >
            <span className="text-[7px] font-bold leading-none text-black/50 opacity-0 group-hover:opacity-100">×</span>
          </button>
          <TrafficLight color="#FEBC2E" label={`Minimize ${title}`} />
          <TrafficLight color="#28C840" label={`Maximize ${title}`} />
        </div>
        <span className="pointer-events-none select-none text-[12px] font-semibold tracking-tight text-ink/70">
          {title}
        </span>
        <span className="w-[52px]" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="window-scroll min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
    </motion.div>,
    document.body,
  );

  return win;
}

function TrafficLight({ color, label }: { color: string; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={(e) => e.stopPropagation()}
      style={{ background: color }}
      className="h-3 w-3 rounded-full ring-inset ring-black/10 transition-transform hover:scale-110"
    />
  );
}
