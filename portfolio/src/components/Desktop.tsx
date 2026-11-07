import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import MenuBar from './MenuBar';
import Hero from './Hero';
import StickyNote from './StickyNote';
import Folder from './Folder';
import Dock from './Dock';
import WindowFrame from './Window';
import AboutWindow from './AboutWindow';
import ProjectsWindow from './ProjectsWindow';
import ExperienceWindow from './ExperienceWindow';
import ResumeWindow from './ResumeWindow';
import ContactWindow from './ContactWindow';
import { folderMeta, type FolderId } from '../data';

const FOLDER_IDS: FolderId[] = ['about', 'projects', 'experience', 'resume', 'contact'];

interface Origin {
  x: number;
  y: number;
}

type Positions = Record<FolderId, { x: number; y: number }>;

/** Compute balanced default positions around the central heading. */
function defaultPositions(w: number, h: number): Positions {
  if (w < 640) {
    // Mobile: two-column arrangement in the lower half of the screen
    const col1 = w * 0.18;
    const col2 = w * 0.58;
    const top = h * 0.46;
    const gapY = Math.min(110, h * 0.16);
    return {
      about: { x: col1, y: top },
      projects: { x: col2, y: top },
      experience: { x: col1, y: top + gapY },
      resume: { x: col2, y: top + gapY },
      contact: { x: col1, y: top + gapY * 2 },
    };
  }
  if (w < 1024) {
    // Tablet: arc above and below the headline
    return {
      about: { x: w * 0.1, y: h * 0.3 },
      projects: { x: w * 0.75, y: h * 0.26 },
      experience: { x: w * 0.14, y: h * 0.62 },
      resume: { x: w * 0.78, y: h * 0.6 },
      contact: { x: w * 0.46, y: h * 0.72 },
    };
  }
  // Desktop composition — folders orbit the central headline
  return {
    about: { x: w * 0.16, y: h * 0.3 },
    projects: { x: w * 0.78, y: h * 0.24 },
    experience: { x: w * 0.2, y: h * 0.64 },
    resume: { x: w * 0.82, y: h * 0.58 },
    contact: { x: w * 0.5, y: h * 0.74 },
  };
}

export default function Desktop() {
  const reduce = useReducedMotion();
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }));
  const [positions, setPositions] = useState<Positions>(() =>
    defaultPositions(window.innerWidth, window.innerHeight),
  );
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [origins, setOrigins] = useState<Partial<Record<FolderId, Origin>>>({});
  const [windowPos, setWindowPos] = useState<Partial<Record<FolderId, { x: number; y: number }>>>({});
  const [dimmed, setDimmed] = useState(false);

  // Track viewport size; re-layout folders only when breakpoint changes meaningfully
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setSize((prev) => {
        if (prev.w !== w || prev.h !== h) {
          setPositions((old) => {
            const next = defaultPositions(w, h);
            // Keep user-dragged positions if still on-screen, otherwise clamp/re-default on breakpoint change
            const sameBreakpoint =
              (prev.w < 640 && w < 640) || (prev.w >= 640 && prev.w < 1024 && w >= 640 && w < 1024) || (prev.w >= 1024 && w >= 1024);
            if (sameBreakpoint) {
              const out = { ...old };
              for (const id of FOLDER_IDS) {
                out[id] = {
                  x: Math.min(Math.max(old[id].x, 8), w - 90),
                  y: Math.min(Math.max(old[id].y, 40), h - 120),
                };
              }
              return out;
            }
            return next;
          });
        }
        return { w, h };
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const openFolder = useCallback(
    (id: FolderId, origin?: Origin) => {
      // Remember the folder's on-screen position as the animation origin
      const p = positions[id];
      const el = document.querySelector(`[data-folder-id="${id}"]`);
      const rect = el ? el.getBoundingClientRect() : null;
      setOrigins((o) => ({ ...o, [id]: origin ?? { x: rect?.left ?? p.x, y: rect?.top ?? p.y } }));
      setWindowPos((wp) => {
        if (wp[id]) return wp;
        // Center window, biased slightly up like macOS
        const winW = Math.min(id === 'projects' ? 680 : id === 'contact' ? 460 : 600, size.w * 0.92);
        const winH = Math.min(id === 'projects' ? 580 : 540, size.h * 0.74);
        let x = size.w / 2 - winW / 2;
        let y = size.h / 2 - winH / 2 - size.h * 0.02;
        x = Math.max(10, Math.min(x, size.w - winW - 10));
        y = Math.max(36, Math.min(y, size.h - winH - 88));
        return { ...wp, [id]: { x, y } };
      });
      setOpen((s) => new Set(s).add(id));
      setDimmed(true);
    },
    [size, positions],
  );

  const closeFolder = useCallback((id: FolderId) => {
    setOpen((s) => {
      const n = new Set(s);
      n.delete(id);
      if (n.size === 0) setDimmed(false);
      return n;
    });
  }, []);

  const showDesktop = useCallback(() => {
    setOpen(new Set());
    setDimmed(false);
  }, []);

  const moveFolder = useCallback(
    (id: FolderId, pos: { x: number; y: number }) =>
      setPositions((p) => ({ ...p, [id]: { x: p[id].x + (pos.x - p[id].x), y: p[id].y + (pos.y - p[id].y) } })),
    [],
  );

  // Keyboard shortcut: Escape closes all windows (handled per-window too)
  const content: Record<FolderId, React.ReactNode> = useMemo(
    () => ({
      about: <AboutWindow />,
      projects: <ProjectsWindow />,
      experience: <ExperienceWindow />,
      resume: <ResumeWindow />,
      contact: <ContactWindow variant="window" />,
    }),
    [],
  );

  const windowSizeClass: Record<FolderId, { w: string; h: string }> = {
    about: { w: 'w-[min(92vw,600px)]', h: 'h-[min(74vh,540px)]' },
    projects: { w: 'w-[min(94vw,680px)]', h: 'h-[min(76vh,580px)]' },
    experience: { w: 'w-[min(92vw,600px)]', h: 'h-[min(76vh,560px)]' },
    resume: { w: 'w-[min(92vw,620px)]', h: 'h-[min(78vh,580px)]' },
    contact: { w: 'w-[min(92vw,460px)]', h: 'h-[min(78vh,520px)]' },
  };

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden">
      {/* Graph-paper grid background with fade-in */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="graph-grid fixed inset-0"
      />

      <MenuBar onOpenFolder={(id) => openFolder(id)} onShowDesktop={showDesktop} />

      {/* Desktop layer */}
      <div className="fixed inset-0 pt-7">
        {/* Hero centered */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 pb-24">
          <Hero />
        </div>

        {/* Sticky note */}
        <StickyNote />

        {/* Folders */}
        {FOLDER_IDS.map((id, i) => (
          <Folder
            key={id}
            id={id}
            number={folderMeta[id].number}
            label={folderMeta[id].label}
            isOpen={open.has(id)}
            position={positions[id]}
            onMove={(pos) => moveFolder(id, pos)}
            onOpen={(rect) => openFolder(id, { x: rect.left, y: rect.top })}
            delay={0.85 + i * 0.09}
          />
        ))}
      </div>

      {/* Dim overlay while windows are open */}
      <AnimatePresence>
        {dimmed && (
          <motion.div
            key="dim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={showDesktop}
            aria-hidden="true"
            className="fixed inset-0 z-[150] bg-black/[0.18] backdrop-blur-[1px]"
          />
        )}
      </AnimatePresence>

      {/* Windows */}
      <AnimatePresence>
        {[...open].map((id) => {
          const fid = id as FolderId;
          const pos = windowPos[fid] ?? { x: size.w / 2 - 280, y: size.h / 2 - 260 };
          return (
            <WindowFrame
              key={fid}
              title={`${folderMeta[fid].number} — ${folderMeta[fid].title}`}
              origin={origins[fid]}
              position={pos}
              onMove={(p) => setWindowPos((wp) => ({ ...wp, [fid]: p }))}
              onClose={() => closeFolder(fid)}
              widthClass={windowSizeClass[fid].w}
              heightClass={windowSizeClass[fid].h}
            >
              {content[fid]}
            </WindowFrame>
          );
        })}
      </AnimatePresence>

      <Dock openFolders={open} onOpenFolder={(id) => openFolder(id)} onShowDesktop={showDesktop} />
    </main>
  );
}
