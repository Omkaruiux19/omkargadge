import { motion } from 'framer-motion';
import { experiences } from '../data';

export default function ExperienceWindow() {
  return (
    <div className="p-6 sm:p-8">
      <header className="mb-7">
        <h2 className="font-serif italic text-2xl text-ink sm:text-3xl">Experience</h2>
        <p className="mt-1 text-[12.5px] text-ink/55">
          Professional work, freelance engagements and design contributions.
        </p>
      </header>

      <ol className="relative ml-1 border-l border-black/10 pl-6 sm:pl-8">
        {experiences.map((exp, i) => (
          <motion.li
            key={exp.company + exp.period}
            initial={{ opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.09, type: 'spring', stiffness: 240, damping: 24 }}
            className="relative pb-8 last:pb-2"
          >
            {/* Timeline dot */}
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-1 h-[11px] w-[11px] rounded-full border-2 border-white bg-[#3E8BFF] shadow-[0_0_0_1px_rgba(17,17,17,0.12)] sm:-left-[39px]"
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="text-[14.5px] font-semibold tracking-tight text-ink">{exp.role}</h3>
              <span className="rounded-full bg-[#F1F0EC] px-2 py-[2px] text-[10px] font-bold uppercase tracking-[0.12em] text-ink/55">
                {exp.type}
              </span>
            </div>
            <p className="mt-0.5 text-[12.5px] font-medium text-ink/60">
              {exp.company} <span className="mx-1 text-ink/30">·</span>
              <span className="tabular-nums text-ink/45">{exp.period}</span>
            </p>
            <ul className="mt-2 space-y-1.5">
              {exp.points.map((pt) => (
                <li key={pt} className="flex gap-2 text-[12.5px] leading-relaxed text-ink/70">
                  <span aria-hidden="true" className="mt-[7px] h-[3px] w-[3px] shrink-0 rounded-full bg-ink/40" />
                  {pt}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
