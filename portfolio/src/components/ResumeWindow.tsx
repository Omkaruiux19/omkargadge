import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';

/** Builds a clean, printable HTML résumé document and triggers download. */
function buildResumeHtml(): string {
  return `<!doctype html><html><head><meta charset="utf-8"><title>Omkar Gadge — Resume</title>
<style>
  *{box-sizing:border-box} body{font-family:'Helvetica Neue',Arial,sans-serif;color:#111;background:#fff;max-width:780px;margin:32px auto;padding:40px;line-height:1.5}
  h1{font-size:34px;margin:0;letter-spacing:-0.5px} .sub{font-size:14px;color:#555;margin:4px 0 24px}
  h2{font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;border-bottom:1px solid #ddd;padding-bottom:6px;margin:26px 0 12px}
  .row{display:flex;justify-content:space-between;gap:16px} .role{font-weight:600;font-size:14px} .co{color:#444;font-size:13px}
  ul{margin:6px 0 0;padding-left:18px} li{font-size:12.5px;color:#333;margin-bottom:4px}
  .chips span{display:inline-block;border:1px solid #ddd;border-radius:999px;padding:3px 10px;font-size:11.5px;margin:0 6px 6px 0;color:#333}
  @media print{body{margin:0}}
</style></head><body>
<h1>Omkar Gadge</h1>
<p class="sub">UI/UX Designer &amp; Product Designer · Portfolio: this desktop experience</p>
<h2>Profile</h2>
<p style="font-size:13px;color:#333">UI/UX and Product Designer focused on creating meaningful digital experiences through research, visual design, interaction design, and thoughtful problem-solving.</p>
<h2>Selected Projects</h2>
<div class="row"><span class="role">NPGO — Travel Website</span><span class="co">End-to-end UX &amp; responsive design</span></div>
<div class="row"><span class="role">Vibhog — Rice Brand Website</span><span class="co">Brand &amp; e-commerce experience</span></div>
<div class="row"><span class="role">Royal Motors — Service Point Website</span><span class="co">Booking &amp; service tracking flows</span></div>
<div class="row"><span class="role">Arena Animation — Website Redesign</span><span class="co">IA &amp; course discovery</span></div>
<div class="row"><span class="role">MAAC India — Website Redesign</span><span class="co">Admissions funnel &amp; components</span></div>
<div class="row"><span class="role">Freeward — Goal-Based Investment App</span><span class="co">Mobile product design</span></div>
<h2>Skills</h2>
<div class="chips">
<span>User Research</span><span>Interaction Design</span><span>Visual Design</span><span>Design Systems</span><span>Wireframing &amp; Prototyping</span><span>Usability Testing</span><span>Responsive Web Design</span><span>Motion Design</span>
</div>
<h2>Tools</h2>
<div class="chips"><span>Figma</span><span>Adobe XD</span><span>Photoshop</span><span>Illustrator</span><span>After Effects</span><span>Webflow</span><span>Framer</span></div>
<h2>Education &amp; Certifications</h2>
<p style="font-size:12.5px;color:#444">Diploma in Graphic Design &amp; UI/UX — design specialization (details available on request).</p>
</body></html>`;
}

export default function ResumeWindow() {
  const download = () => {
    const blob = new Blob([buildResumeHtml()], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Omkar-Gadge-Resume.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

  const printPdf = () => {
    const w = window.open('', '_blank', 'width=860,height=1000');
    if (!w) return;
    w.document.write(buildResumeHtml());
    w.document.close();
    w.focus();
    setTimeout(() => w.print(), 400);
  };

  return (
    <div className="p-6 sm:p-8">
      <header className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="font-serif italic text-2xl text-ink sm:text-3xl">Resume</h2>
          <p className="mt-1 text-[12.5px] text-ink/55">Preview below — download or print to PDF.</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={printPdf}
            className="inline-flex items-center gap-1.5 rounded-lg border border-black/10 bg-white px-3 py-2 text-[12px] font-semibold text-ink/75 transition hover:bg-[#F4F3F0]"
          >
            <FileText size={13} /> Print PDF
          </button>
          <button
            type="button"
            onClick={download}
            className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3.5 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:bg-black/85 active:scale-[0.98]"
          >
            <Download size={13} /> Download
          </button>
        </div>
      </header>

      {/* Paper preview */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 26 }}
        className="mx-auto max-w-[560px] rounded-md border border-black/[0.08] bg-white p-6 shadow-[0_16px_40px_-16px_rgba(17,17,17,0.25)] sm:p-8"
      >
        <h3 className="text-[26px] font-bold tracking-tight text-ink">Omkar Gadge</h3>
        <p className="text-[12.5px] text-ink/55">UI/UX Designer &amp; Product Designer</p>

        <Section title="Profile">
          <p className="text-[12px] leading-relaxed text-ink/70">
            Focused on creating meaningful digital experiences through research, visual design, interaction design,
            and thoughtful problem-solving.
          </p>
        </Section>
        <Section title="Selected Projects">
          <ul className="space-y-1 text-[12px] text-ink/70">
            {[
              ['NPGO', 'Travel Website'],
              ['Vibhog', 'Rice Brand Website'],
              ['Royal Motors', 'Service Point Website'],
              ['Arena Animation', 'Website Redesign'],
              ['MAAC India', 'Website Redesign'],
              ['Freeward', 'Goal-Based Investment App'],
            ].map(([t, c]) => (
              <li key={t} className="flex justify-between gap-3">
                <span className="font-semibold text-ink/80">{t}</span>
                <span className="text-ink/50">{c}</span>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Skills & Tools">
          <p className="text-[12px] leading-relaxed text-ink/70">
            User Research · Interaction Design · Visual Design · Design Systems · Prototyping · Usability Testing ·
            Motion Design — Figma, Adobe XD, Photoshop, Illustrator, After Effects, Webflow, Framer.
          </p>
        </Section>
        <p className="mt-5 border-t border-dashed border-black/15 pt-3 text-[10.5px] uppercase tracking-[0.14em] text-ink/40">
          Full document downloads with the button above
        </p>
      </motion.div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-5">
      <h4 className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ink/45">{title}</h4>
      {children}
    </section>
  );
}
