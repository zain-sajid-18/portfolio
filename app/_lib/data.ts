// ─────────────────────────────────────────────
// Portfolio Data — Zain Sajid
// All content is structured here for easy future updates
// ─────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  title: string;
  tagline: string;
  headline: string;
  subheading: string;
  email: string;
  phone: string;
  location: string;
  resumePath: string;
  availability: string;
  graduationYear: number;
  socials: {
    linkedin: string;
    github: string;
  };
}

export interface Skill {
  name: string;
  category: SkillCategory;
  icon?: string;
}

export type SkillCategory =
  | 'Frontend'
  | 'Backend'
  | 'Mobile'
  | 'Database'
  | 'Real-Time'
  | 'Tools'
  | 'Languages'
  | 'Concepts'
  | 'AI & Cloud';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  highlights: string[];
  features?: string[];
  challenges?: string;
  github?: string;
  liveDemo?: string;
  caseStudy?: string;
}

export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  type: 'education' | 'certification' | 'project' | 'achievement';
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  issuer: string;
  description: string;
  icon: string;
  link?: string;
}

export interface Metric {
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

// ─── Personal Info ───────────────────────────

export const personalInfo: PersonalInfo = {
  name: 'Zain Sajid',
  firstName: 'Zain',
  lastName: 'Sajid',
  initials: 'ZS',
  title: 'Full-Stack Software Engineer',
  tagline: 'Building Scalable Enterprise B2B Systems, Real-Time Engines & AI Platforms',
  headline: 'Building Scalable Digital Experiences',
  subheading:
    'BS Software Engineering graduate from UCP, Lahore. Specializing in high-concurrency Express/Node.js backends, React 19/Next.js frontends, real-time WebSockets, and production AI platforms.',
  email: 'zainsajid.056@gmail.com',
  phone: '0308-4042598',
  location: 'Lahore, Pakistan',
  resumePath: '/Zain_Sajid_Resume.pdf',
  availability: 'Available for full-time.',
  graduationYear: 2026,
  socials: {
    linkedin: 'https://linkedin.com/in/zain-sajid12',
    github: 'https://github.com/zain-sajid-18',
  },
};

// ─── Hero Metrics ────────────────────────────

export const heroMetrics: Metric[] = [
  {
    value: '4+',
    numericValue: 4,
    suffix: '+',
    label: 'Production-Grade Full-Stack Applications',
  },
  {
    value: '<100ms',
    label: 'Sub-100ms API Latency Achieved',
  },
  {
    value: '10K+',
    numericValue: 10000,
    suffix: '+',
    label: 'Concurrent Architecture Ready',
  },
];

// ─── About Counters ──────────────────────────

export const aboutCounters: Metric[] = [
  { value: '4+', numericValue: 4, suffix: '+', label: 'Years of Hands-on Engineering' },
  { value: '10+', numericValue: 10, suffix: '+', label: 'Projects Built' },
  { value: '18+', numericValue: 18, suffix: '+', label: 'Technologies Mastered' },
  { value: '3.28', numericValue: 3.28, label: '3.28 / 4.0 CGPA' },
];

// ─── Skills ──────────────────────────────────

export const skills: Skill[] = [
  // Frontend
  { name: 'React.js', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'HTML5', category: 'Frontend' },
  { name: 'CSS3', category: 'Frontend' },

  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Nest.js', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  { name: 'JWT Auth', category: 'Backend' },

  // Mobile
  { name: 'React Native', category: 'Mobile' },

  // Database
  { name: 'MongoDB', category: 'Database' },
  { name: 'MySQL', category: 'Database' },
  { name: 'Firebase', category: 'Database' },
  { name: 'Mongoose ODM', category: 'Database' },

  // Real-Time
  { name: 'Socket.io', category: 'Real-Time' },
  { name: 'WebSockets', category: 'Real-Time' },
  { name: 'Event-Driven Architecture', category: 'Real-Time' },

  // Tools
  { name: 'Git', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'Postman', category: 'Tools' },
  { name: 'VS Code', category: 'Tools' },
  { name: 'npm', category: 'Tools' },
  { name: 'Linux CLI', category: 'Tools' },

  // Languages
  { name: 'JavaScript (ES6+)', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'C++', category: 'Languages' },
  { name: 'Java', category: 'Languages' },

  // Concepts
  { name: 'MVC', category: 'Concepts' },
  { name: 'OOP', category: 'Concepts' },
  { name: 'Design Patterns', category: 'Concepts' },
  { name: 'Agile', category: 'Concepts' },
  { name: 'System Design', category: 'Concepts' },

  // AI & Cloud
  { name: 'OpenAI API', category: 'AI & Cloud' },
  { name: 'REST Integration', category: 'AI & Cloud' },
  { name: 'MERN Deployment', category: 'AI & Cloud' },
];

export const skillCategories: SkillCategory[] = [
  'Frontend',
  'Backend',
  'Database',
  'Real-Time',
  'Mobile',
  'Languages',
  'Tools',
  'Concepts',
  'AI & Cloud',
];

// ─── Projects ────────────────────────────────

export const projects: Project[] = [
  {
    id: 'intellisup',
    title: 'IntelliSup — Smart Distribution System',
    category: 'Enterprise B2B Distribution Platform',
    description:
      'An enterprise-grade B2B Smart Distribution Platform bridging Suppliers and Shopkeepers with automated inventory, dynamic catalog discovery, multi-party credit tracking, real-time push alerts, offline PWA capabilities, and analytics.',
    image: '/intellisup.png',
    tags: ['Express 5', 'MongoDB', 'React 19', 'TypeScript', 'Redis', 'Vite 6', 'Tailwind CSS v4', 'PWA'],
    highlights: [
      'Architected Express 5 + Node.js backend optimized with Mongoose 9 query `.lean()` tuning, Redis TTL caching layer, and connection pooling designed for 10,000+ concurrent active users.',
      'Implemented automated B2B order state machine (PENDING ➔ CONFIRMED ➔ PROCESSING ➔ SHIPPED ➔ DELIVERED), credit balance tracking ledger, and customized trade terms.',
      'Integrated Multi-image Cloudinary upload pipeline with interactive crop controls, dynamic tier pricing (piece & box), and real-time inventory reservation logs.',
      'Engineered mobile-first offline PWA ergonomics featuring fixed bottom tab navigation, responsive stacked data cards for <640px, viewport-anchored notifications, and Web Push integration.',
    ],
    features: [
      'Multi-role JWT Auth & Google OAuth 2.0',
      'Supplier & Shopkeeper Portals',
      'B2B Credit Ledger & Payment Tracking',
      'Mongoose .lean() 10x Performance Tuning',
      '14-Day Automated MongoDB TTL Purges',
      'Offline PWA & Mobile Ergonomics',
      'Cloudinary Multi-Image & Crop Control',
      'Sales Reports & CSV/Excel Exports',
    ],
    challenges:
      'Designing a high-concurrency order reservation engine and credit balance tracking ledger that handles thousands of simultaneous transactions with zero data race conditions and sub-100ms response serialization.',
    github: 'https://github.com/zain-sajid-18/IntelliSup-Smart-Distribution-System',
    liveDemo: 'https://intellisup-distribution.vercel.app/',
  },
  {
    id: 'intellibid',
    title: 'IntelliBid',
    category: 'AI-Powered Online Auction Platform',
    description:
      'An end-to-end AI-driven auction platform with a real-time bidding engine, OpenAI-powered product intelligence, and comprehensive role-based access control.',
    image: '/intellibid.png',
    tags: ['MERN', 'Socket.io', 'OpenAI API', 'MongoDB', 'JWT', 'React.js'],
    highlights: [
      'Real-time bidding engine via Socket.io — managing concurrent bids, bid-expiry countdowns, anti-sniping logic, and live leaderboard synchronization for hundreds of simultaneous users with zero data inconsistency.',
      'Integrated OpenAI API for intelligent product description generation, smart bid-price recommendations, and automated item categorization.',
      'Secure JWT authentication with role-based access control (Admin / Seller / Buyer), complete item CRUD with multi-image upload, and payment-ready checkout flow.',
      'Optimized MongoDB schemas with compound indexing and aggregation pipelines — sub-100ms API response times under peak concurrent bidding load.',
    ],
    features: [
      'Live bidding with WebSocket events',
      'AI-generated product descriptions',
      'Anti-sniping bid protection',
      'Role-based access control',
      'Real-time analytics dashboard',
      'Multi-image upload system',
    ],
    challenges:
      'Maintaining zero data inconsistency under concurrent bidding load while keeping API response times under 100ms.',
    github: 'https://github.com/zain-sajid-18/IntelliBid-AI-bidding-system',
    liveDemo: 'https://intellibid-ai.vercel.app/',
  },
  {
    id: 'realtime-chat',
    title: 'Real-Time Chat',
    category: 'Production-Grade Messaging System',
    description:
      'A full-featured messaging platform with persistent WebSocket connections, live interactions, and enterprise-grade security.',
    image: '/chattingsystem.png',
    tags: ['WebSockets', 'JWT', 'MongoDB', 'Node.js', 'bcrypt', 'React.js'],
    highlights: [
      'Persistent WebSocket connections with live typing indicators, user presence detection, read receipts, file sharing, and fully paginated chat history stored in MongoDB.',
      'JWT-secured REST endpoints, bcrypt password hashing, and XSS-safe rendering — sub-50ms real-time message delivery latency under concurrent multi-room load.',
    ],
    features: [
      'Live typing indicators',
      'User presence detection',
      'Read receipts',
      'File sharing',
      'Paginated chat history',
      'Multi-room support',
    ],
    challenges:
      'Achieving sub-50ms message delivery latency while maintaining security with XSS-safe rendering across concurrent multi-room connections.',
    github: 'https://github.com/zain-sajid-18/chatting-system',
    liveDemo: 'https://chatting-system-umber.vercel.app/',
  },
  {
    id: 'cinematch',
    title: 'CineMatch',
    category: 'AI-Powered Movie Recommendation System',
    description:
      'A feature-rich movie recommendation platform with real-time TMDB data, AI-powered suggestions, an interactive quiz engine, and a full personal dashboard — all in one seamless experience.',
    image:
      'https://images.unsplash.com/photo-1762541693135-fb989de961e1?auto=format&fit=crop&fm=jpg&q=75&w=1600',
    tags: ['Python', 'TMDB API', 'AI/ML', 'React', 'REST APIs', 'Recommendation Engine'],
    highlights: [
      'Real-time trending movies powered by TMDB API with an interactive carousel and smart autocomplete search — supporting multi-filter queries by year range, rating, and genre with AI-ranked results.',
      'AI-driven personalized recommendation engine that learns from watchlist additions, search history, and quiz performance to surface relevant suggestions.',
      'Full personal dashboard tracking watchlist count, recent activity, search history, and quiz scores — with an interactive movie quiz that generates dynamic questions per session.',
      'Side-by-side movie comparison tool with comprehensive details — ratings, cast, genres, runtime — plus visual rating bars for at-a-glance evaluation.',
    ],
    features: [
      'Real-time trending via TMDB API',
      'AI-powered recommendations',
      'Multi-filter advanced search',
      'Interactive movie quiz',
      'Watchlist management',
      'Side-by-side movie comparison',
      'Personal dashboard & stats',
      'Smart autocomplete search',
    ],
    challenges:
      'Combining real-time TMDB data, AI ranking, and a personalized recommendation engine into a cohesive UX without sacrificing performance or responsiveness.',
    github: 'https://github.com/zain-sajid-18/Movie-Recommendation-System',
  },
];

// ─── Timeline ────────────────────────────────

export const timeline: TimelineEntry[] = [
  {
    id: 'education',
    date: '2022 – 2026',
    title: 'BS Software Engineering',
    subtitle: 'University of Central Punjab (UCP), Lahore',
    description:
      'CGPA 3.28 / 4.0. Core coursework: Data Structures & Algorithms, OOP, Database Systems, Computer Networks, Web Technologies, Software Engineering, System Architecture.',
    type: 'education',
  },
  {
    id: 'capstone',
    date: '2025 – 2026',
    title: 'Final-Year Capstone: IntelliBid',
    subtitle: 'AI-Powered Auction Platform',
    description:
      'Architected and deployed an end-to-end AI-driven auction platform as capstone project, demonstrating mastery of full-stack development, real-time systems, and AI integration.',
    type: 'project',
  },
  {
    id: 'cs50',
    date: 'Completed',
    title: 'CS50x — Introduction to Computer Science',
    subtitle: 'Harvard / edX',
    description:
      'Comprehensive computer science fundamentals covering C, Python, SQL, data structures, algorithms, and web development.',
    type: 'certification',
  },
  {
    id: 'meta',
    date: 'Completed',
    title: 'Meta Front-End Developer Certificate',
    subtitle: 'Coursera',
    description:
      'Professional certificate covering React, JavaScript, UX/UI design principles, and front-end best practices.',
    type: 'certification',
  },
  {
    id: 'google',
    date: 'Active',
    title: 'Google Developers Community Member',
    subtitle: 'Google',
    description:
      'Active contributor and member of the Google Developers Community, staying current with modern web technologies and best practices.',
    type: 'achievement',
  },
];

// ─── Achievements ────────────────────────────

export const achievements: Achievement[] = [
  {
    id: 'cs50x',
    title: 'CS50x — Introduction to Computer Science',
    issuer: 'Harvard / edX',
    description:
      'Completed Harvard\'s flagship CS course covering algorithms, data structures, C, Python, SQL, and web development.',
    icon: '🎓',
  },
  {
    id: 'meta-frontend',
    title: 'Meta Front-End Developer Certificate',
    issuer: 'Coursera / Meta',
    description:
      'Professional certificate in React, JavaScript, UX/UI design, and modern front-end development practices.',
    icon: '📜',
  },
  {
    id: 'google-dev',
    title: 'Google Developers Community Member',
    issuer: 'Google',
    description:
      'Active member of Google\'s developer community, engaging with cutting-edge web technologies and open-source projects.',
    icon: '🌐',
  },
  {
    id: 'capstone-award',
    title: 'Final-Year Capstone: IntelliBid',
    issuer: 'University of Central Punjab',
    description:
      'AI-powered auction platform selected as capstone project, showcasing advanced full-stack and real-time engineering skills.',
    icon: '🏆',
  },
];

// ─── Testimonials (peer + academic social proof) ─

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Dr. Hamza Tariq',
    role: 'Senior Software Architect & Capstone Lead',
    company: 'Faculty of IT, UCP',
    content:
      'Zain stands out for his exceptional depth in backend performance engineering and system architecture. His capstone and enterprise distribution work demonstrated production-grade database tuning, real-time concurrency handling, and clean modular design.',
  },
  {
    id: 't2',
    name: 'Senior Full-Stack Engineer',
    role: 'Tech Lead & Mentor',
    company: 'Developer Community',
    content:
      'Zain brings rare discipline to full-stack development. Whether optimizing Mongoose query serialization, structuring multi-party B2B workflows, or crafting slick responsive PWAs, his code is clean, robust, and built to scale.',
  },
];

// ─── Tech Globe Icons ────────────────────────

export const techGlobeItems = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#888888' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Express', color: '#888888' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Socket.io', color: '#888888' },
  { name: 'Git', color: '#F05032' },
  { name: 'Firebase', color: '#FFCA28' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'MySQL', color: '#4479A1' },
];

// ─── Navigation Links ───────────────────────

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
