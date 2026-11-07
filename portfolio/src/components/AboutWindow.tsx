import { motion } from 'framer-motion';
import { philosophy, skills, tools } from '../data';

const stagger = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.07, type: 'spring', stiffness: 260, damping: 24 },
  }),
};

export default function AboutWindow() {
  return (
    <div className="p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
        {/* Profile placeholder */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex shrink-0 flex-col items-center gap-3"
        >
          <div
            aria-label="Profile photo placeholder of Omkar Gadge"
            role="img"
            className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-gradient-to-b from-[#F1F0EC] to-[#E4E3DD] shadow-inner"
          >
            {/* Simple monogram avatar */}
            <span className="font-serif italic text-4xl text-ink/70">OG</span>
            <span className="absolute bottom-0 inset-x-0 h-8 bg-black/[0.05]" />
          </div>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/50">
            Pune, India
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div variants={stagger} initial="hidden" animate="show" custom={1} className="min-w-0">
          <h2 className="font-serif italic text-2xl leading-tight text-ink sm:text-3xl">
            Hello&mdash;I&rsquo;m Omkar Gadge.
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-ink/75">
            I&rsquo;m a UI/UX and Product Designer focused on creating meaningful digital experiences through
            research, visual design, interaction design, and thoughtful problem-solving.
          </p>
          <p className="mt-3 text-[13.5px] leading-relaxed text-ink/60">{philosophy}</p>
        </motion.div>
      </div>

      {/* Skills */}
      <motion.div variants={stagger} initial="hidden" animate="show" custom={2} className="mt-8">
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-ink/45">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="rounded-full border border-black/10 bg-[#F7F6F3] px-3 py-1.5 text-[11.5px] font-medium text-ink/80"
            >
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Tools */}
      <motion.div variants={stagger} initial="hidden" animate="show" custom={3} className="mt-6">
        <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-ink/45">Design Tools</h3>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tools.map((t) => (
            <div
              key={t}
              className="flex items-center gap-2 rounded-lg border border-black/[0.08] bg-white px-3 py-2 text-[12px] font-medium text-ink/80 shadow-[0_1px_2px_rgba(17,17,17,0.05)]"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#3E8BFF]" />
              {t}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
