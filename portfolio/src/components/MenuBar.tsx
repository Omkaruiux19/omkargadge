import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, BatteryMedium, Search, Apple } from 'lucide-react';
import type { FolderId } from '../data';

interface MenuBarProps {
  onOpenFolder: (id: FolderId) => void;
  onShowDesktop: () => void;
}

function Clock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10_000);
    return () => clearInterval(t);
  }, []);

  const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    <span className="tabular-nums tracking-tight">
      {date} {time}
    </span>
  );
}

export default function MenuBar({ onOpenFolder, onShowDesktop }: MenuBarProps) {
  const itemCls =
    'px-2.5 py-[3px] rounded-md hover:bg-black/[0.06] transition-colors duration-150 cursor-default select-none';

  return (
    <motion.header
      initial={{ y: -34, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, type: 'spring', stiffness: 240, damping: 28 }}
      className="fixed inset-x-0 top-0 z-[100] h-7 backdrop-blur-md bg-white/60 border-b border-black/[0.07] text-[12px] font-medium text-ink/90"
      role="menubar"
      aria-label="Desktop menu bar"
    >
      <div className="mx-auto flex h-full max-w-screen-2xl items-center justify-between px-2 sm:px-3">
        {/* Left section */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={onShowDesktop}
            aria-label="Portfolio — show desktop"
            className={`${itemCls} flex items-center`}
          >
            <Apple size={13} strokeWidth={1.6} />
          </button>
          <nav className="flex items-center gap-0.5" aria-label="Main menu">
            <button type="button" onClick={onShowDesktop} className={`${itemCls} hidden md:inline`}>
              Omkar Gadge&rsquo;s Portfolio
            </button>
            <button type="button" onClick={onShowDesktop} className={`${itemCls} md:hidden`}>
              Portfolio
            </button>
            <span className="mx-1 h-3.5 w-px bg-black/10" aria-hidden="true" />
            <button type="button" onClick={() => onOpenFolder('contact')} className={itemCls}>
              Contact
            </button>
            <button type="button" onClick={() => onOpenFolder('resume')} className={itemCls}>
              Resume
            </button>
          </nav>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1">
          <Wifi size={13} strokeWidth={1.8} className="opacity-80" aria-label="Wi-Fi connected" />
          <BatteryMedium size={15} strokeWidth={1.6} className="opacity-80" aria-label="Battery" />
          <Search size={13} strokeWidth={1.8} className="opacity-80" aria-label="Search" />
          <span className="mx-1 hidden h-3.5 w-px bg-black/10 sm:block" aria-hidden="true" />
          <Clock />
        </div>
      </div>
    </motion.header>
  );
}
