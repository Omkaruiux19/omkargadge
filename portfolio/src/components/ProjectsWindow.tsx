import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { projects, type Project } from '../data';

/** Editorial SVG thumbnail — no external images, so nothing can break. */
function ProjectThumb({ project }: { project: Project }) {
  const { accent, initials, title } = project;
  return (
    <div
      role="img"
      aria-label={`${title} preview`}
      className="relative flex h-32 w-full items-end overflow-hidden rounded-lg border border-black/[0.06] p-3"
      style={{ background: `linear-gradient(150deg, ${accent}18 0%, ${accent}42 100%)` }}
    >
      {/* Browser chrome motif */}
      <div className="absolute inset-x-0 top-0 flex h-6 items-center gap-1 border-b border-black/[0.06] bg-white/70 px-2">
        <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
      </div>
      <span
        className="font-serif italic text-4xl leading-none"
        style={{ color: accent, opacity: 0.9 }}
        aria-hidden="true"
      >
        {initials}
      </span>
      <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: `${accent}` }}>
        Case Study
      </span>
    </div>
  );
}

function CaseStudyOverlay({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 flex items-center justify-center bg-white/85 backdrop-blur-sm"
      role="region"
      aria-label={`${project.title} case study`}
    >
      <motion.div
        initial={{ scale: 0.94, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative mx-4 max-w-sm rounded-xl border border-black/10 bg-white p-6 shadow-[0_20px_50px_-15px_rgba(17,17,17,0.3)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close case study preview"
          className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full text-ink/50 hover:bg-black/5 hover:text-ink"
        >
          <X size={15} />
        </button>
        <p className="text-[10.5px] font-bold uppercase tracking-[0.2em]" style={{ color: project.accent }}>
          {project.category}
        </p>
        <h4 className="mt-1 font-serif italic text-2xl text-ink">{project.title}</h4>
        <p className="mt-2 text-[12.5px] leading-relaxed text-ink/70">{project.description}</p>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-[11.5px]">
          <dt className="text-ink/45">Role</dt>
          <dd className="text-ink/80">UI/UX &amp; Product Design</dd>
          <dt className="text-ink/45">Scope</dt>
          <dd className="text-ink/80">Research → Design → Handoff</dd>
          <dt className="text-ink/45">Tools</dt>
          <dd className="text-ink/80">Figma, Webflow, After Effects</dd>
        </dl>
        <p className="mt-4 rounded-md bg-[#F7F6F3] px-3 py-2 text-[11px] leading-snug text-ink/55">
          Full case-study documentation available on request — reach out via the Contact folder.
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsWindow() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="relative p-6 sm:p-8">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="font-serif italic text-2xl text-ink sm:text-3xl">Selected Work</h2>
          <p className="mt-1 text-[12.5px] text-ink/55">Six featured projects — websites and product design.</p>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/40">2021 — 2025</span>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, type: 'spring', stiffness: 260, damping: 24 }}
            whileHover={{ y: -3 }}
            className="group rounded-xl border border-black/[0.08] bg-white p-3 shadow-[0_2px_8px_rgba(17,17,17,0.04)] transition-shadow hover:shadow-[0_12px_28px_-10px_rgba(17,17,17,0.2)]"
          >
            <ProjectThumb project={p} />
            <div className="px-1 pb-1 pt-3">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="text-[14px] font-semibold tracking-tight text-ink">{p.title}</h3>
                <span className="text-[10.5px] font-medium uppercase tracking-wide text-ink/45">{p.category}</span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[12px] leading-relaxed text-ink/60">{p.description}</p>
              <button
                type="button"
                onClick={() => setActive(p)}
                className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-[#2F6BFF] transition-transform group-hover:translate-x-0.5"
                aria-label={`Open ${p.title} case study`}
              >
                View case study <ArrowUpRight size={13} />
              </button>
            </div>
          </motion.article>
        ))}
      </div>

      <AnimatePresence>
        {active && <CaseStudyOverlay project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  );
}
