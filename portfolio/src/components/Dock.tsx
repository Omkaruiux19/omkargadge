import { useLayoutEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FolderOpen, UserRound, Briefcase, FileText, Mail, Linkedin, Github } from 'lucide-react';
import { BehanceMark } from './ContactWindow';
import type { FolderId } from '../data';

const MAX_SCALE = 1.5; // peak magnification
const RADIUS = 90; // influence radius in px

interface TileDef {
  key: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  folder?: FolderId;
}

/** A single dock tile with spring-based macOS magnification. */
function DockTile({
  def,
  mouseX,
  active,
  onActivate,
}: {
  def: TileDef;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  active?: boolean;
  onActivate?: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const centerX = useMotionValue(9999);
  // Recompute tile center whenever the dock layout changes (e.g. magnification of neighbours)
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      centerX.set(rect.left + rect.width / 2);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('scroll', update, true);
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', update, true);
    };
  }, [centerX]);
  const dist = useTransform(mouseX, (val) => Math.abs(val - centerX.get()));
  const rawScale = useTransform(dist, (d) =>
    d > RADIUS
      ? 1
      : 1 + (MAX_SCALE - 1) * Math.pow(Math.cos((Math.min(d, RADIUS) / RADIUS) * (Math.PI / 2)), 1.6),
  );
  const scale = useSpring(rawScale, { stiffness: 400, damping: 30, mass: 0.5 });
  const lift = useTransform(scale, (s) => -(s - 1) * 14);

  const Comp: React.ElementType = def.href ? 'a' : 'button';

  return (
    <div ref={wrapRef} className="group relative flex shrink-0 flex-col items-center">
      <motion.div style={{ scale, y: lift }} className="origin-bottom">
        <Comp
          {...(def.href
            ? { href: def.href, target: '_blank', rel: 'noopener noreferrer' }
            : { type: 'button', onClick: onActivate })}
          aria-label={def.label}
          className={`flex h-[42px] w-[42px] items-center justify-center rounded-[12px] border transition-colors duration-150 sm:h-[46px] sm:w-[46px] ${
            active
              ? 'border-black/10 bg-white text-ink shadow-[0_4px_10px_rgba(17,17,17,0.14)]'
              : 'border-black/[0.06] bg-white/70 text-ink/75 hover:border-black/10 hover:bg-white hover:text-ink'
          }`}
        >
          {def.icon}
        </Comp>
      </motion.div>
      {/* tooltip */}
      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-ink/85 px-2 py-1 text-[10.5px] font-medium text-white opacity-0 shadow-lg backdrop-blur transition-opacity duration-150 group-hover:opacity-100">
        {def.label}
      </span>
      {/* running indicator */}
      <span
        aria-hidden="true"
        className={`mt-[3px] h-[3px] w-[3px] rounded-full transition-opacity duration-200 ${
          active ? 'bg-ink/70 opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}

function FinderIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" fill="#DCEBFF" stroke="#3E8BFF" strokeWidth="1.2" />
      <path d="M12 3v18" stroke="#3E8BFF" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="8" cy="9.5" r="1.1" fill="#1D4ED8" />
      <path d="M6.6 15c1.2 1.4 3 2.2 5.4 2.2" stroke="#1D4ED8" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M17.4 15c-1.2 1.4-3 2.2-5.4 2.2" stroke="#1D4ED8" strokeWidth="1.3" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

interface DockProps {
  openFolders: Set<string>;
  onOpenFolder: (id: FolderId) => void;
  onShowDesktop: () => void;
}

export default function Dock({ openFolders, onOpenFolder, onShowDesktop }: DockProps) {
  const mouseX = useMotionValue(-9999);

  const folders: TileDef[] = [
    { key: 'about', label: 'About Me', icon: <UserRound size={20} strokeWidth={1.8} />, folder: 'about' },
    { key: 'projects', label: 'Projects', icon: <Briefcase size={20} strokeWidth={1.8} />, folder: 'projects' },
    { key: 'experience', label: 'Experience', icon: <FolderOpen size={20} strokeWidth={1.8} />, folder: 'experience' },
    { key: 'resume', label: 'Resume', icon: <FileText size={20} strokeWidth={1.8} />, folder: 'resume' },
    { key: 'contact', label: 'Contact', icon: <Mail size={20} strokeWidth={1.8} />, folder: 'contact' },
  ];

  const socials: TileDef[] = [
    { key: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com', icon: <Linkedin size={20} strokeWidth={1.8} /> },
    { key: 'behance', label: 'Behance', href: 'https://www.behance.net', icon: <BehanceMark size={20} /> },
    { key: 'github', label: 'GitHub', href: 'https://github.com', icon: <Github size={20} strokeWidth={1.8} /> },
  ];

  return (
    <motion.nav
      aria-label="Application dock"
      initial={{ y: 96, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.05, type: 'spring', stiffness: 220, damping: 26 }}
      className="fixed inset-x-0 bottom-2 z-[90] flex justify-center px-2 sm:bottom-3"
    >
      <div
        data-dock
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(-9999)}
        className="flex max-w-full items-end gap-1 overflow-x-auto rounded-[20px] border border-white/60 bg-white/55 px-2 py-2 shadow-[0_18px_40px_-12px_rgba(17,17,17,0.28)] backdrop-blur-xl sm:gap-2 sm:overflow-visible sm:px-3"
      >
        <DockTile
          def={{ key: 'finder', label: 'Portfolio — show desktop', icon: <FinderIcon /> }}
          mouseX={mouseX}
          active={openFolders.size === 0}
          onActivate={onShowDesktop}
        />
        <span aria-hidden="true" className="mx-0.5 mb-3 h-8 w-px shrink-0 self-center bg-black/10" />
        {folders.map((t) => (
          <DockTile
            key={t.key}
            def={t}
            mouseX={mouseX}
            active={openFolders.has(t.key)}
            onActivate={() => t.folder && onOpenFolder(t.folder)}
          />
        ))}
        <span aria-hidden="true" className="mx-0.5 mb-3 h-8 w-px shrink-0 self-center bg-black/10" />
        {socials.map((t) => (
          <DockTile key={t.key} def={t} mouseX={mouseX} />
        ))}
      </div>
    </motion.nav>
  );
}
