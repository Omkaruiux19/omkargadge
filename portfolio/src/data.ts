export type FolderId = 'about' | 'projects' | 'experience' | 'resume' | 'contact';

export interface Project {
  title: string;
  category: string;
  description: string;
  accent: string;
  initials: string;
}

export const projects: Project[] = [
  {
    title: 'NPGO',
    category: 'Travel Website',
    description:
      'A travel platform connecting explorers with curated destinations. End-to-end UX, responsive marketing pages and a booking flow built for clarity.',
    accent: '#2F6BFF',
    initials: 'NP',
  },
  {
    title: 'Vibhog',
    category: 'Rice Brand Website',
    description:
      'Heritage meets modern retail for a premium rice brand — editorial product storytelling, packaging-inspired visuals and a direct-to-consumer shop.',
    accent: '#E8A13B',
    initials: 'VB',
  },
  {
    title: 'Royal Motors',
    category: 'Service Point Website',
    description:
      'A service-point experience for an automobile workshop: appointment booking, service tracking and a trust-first visual language.',
    accent: '#C0392B',
    initials: 'RM',
  },
  {
    title: 'Arena Animation',
    category: 'Website Redesign',
    description:
      'Reimagining a global creative-education network’s web presence — clearer course discovery, campus navigation and student outcomes.',
    accent: '#7B4DFF',
    initials: 'AA',
  },
  {
    title: 'MAAC India',
    category: 'Website Redesign',
    description:
      'A redesign of a leading media & design institute’s site: information architecture overhaul, admissions funnel and a modular component system.',
    accent: '#0FA968',
    initials: 'MA',
  },
  {
    title: 'Freeward',
    category: 'Goal-Based Investment App',
    description:
      'A mobile app that turns savings into goals — onboarding, goal-tracking dashboards and a calm, confidence-building financial UI.',
    accent: '#111111',
    initials: 'FW',
  },
];

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  type: 'Full-time' | 'Freelance' | 'Internship';
  points: string[];
}

export const experiences: ExperienceItem[] = [
  {
    role: 'UI/UX Designer',
    company: 'Freelance / Client Projects',
    period: '2023 — Present',
    type: 'Freelance',
    points: [
      'Lead designer for travel, retail and education brands — research through handoff.',
      'Built reusable design systems in Figma that cut delivery time on repeat projects.',
      'Partnered directly with developers to ship pixel-accurate, responsive interfaces.',
    ],
  },
  {
    role: 'Product Designer (Projects)',
    company: 'Freeward — Goal-Based Investment App',
    period: '2023',
    type: 'Freelance',
    points: [
      'Defined the core goal-based savings model with product stakeholders.',
      'Designed onboarding, dashboard and transaction flows for mobile.',
      'Ran usability sessions and iterated key flows before beta release.',
    ],
  },
  {
    role: 'Website Redesign Engagements',
    company: 'Arena Animation & MAAC India',
    period: '2022 — 2023',
    type: 'Freelance',
    points: [
      'Audited existing IA and rebuilt course-discovery journeys.',
      'Delivered responsive marketing sites and admissions funnels.',
      'Created component libraries for content and dev teams.',
    ],
  },
  {
    role: 'UI/UX Design Intern',
    company: 'Design Studio Collaborations',
    period: '2021 — 2022',
    type: 'Internship',
    points: [
      'Supported senior designers with wireframes, prototypes and visual polish.',
      'Contributed to client presentations and design-research synthesis.',
    ],
  },
];

export const skills = [
  'User Research',
  'Interaction Design',
  'Visual Design',
  'Design Systems',
  'Wireframing & Prototyping',
  'Usability Testing',
  'Responsive Web Design',
  'Motion Design',
];

export const tools = ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'After Effects', 'Webflow', 'Framer'];

export const philosophy =
  'Good design disappears. I start with the problem, validate with people, and finish with interfaces that feel obvious — clear hierarchy, honest typography and motion that means something.';

export const folderMeta: Record<FolderId, { label: string; number: string; title: string }> = {
  about: { label: 'About Me', number: '01', title: 'About Me' },
  projects: { label: 'Projects', number: '02', title: 'Projects' },
  experience: { label: 'Experience', number: '03', title: 'Experience' },
  resume: { label: 'Resume', number: '04', title: 'Resume' },
  contact: { label: 'Contact', number: '05', title: 'Contact' },
};
