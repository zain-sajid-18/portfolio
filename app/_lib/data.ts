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
  title: 'Full Stack MERN Developer',
  tagline: 'Available for MERN, AI, and real-time web projects',
  headline: 'Building Scalable Digital Experiences',
  subheading:
    'Software Engineering graduate from UCP, Lahore. Specializing in scalable REST APIs, real-time Socket.io systems, AI-integrated platforms, and cross-platform React Native apps.',
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
    label: 'Production-style portfolio projects',
  },
  {
    value: '<100ms',
    label: 'Targeted API response performance',
  },
  {
    value: '2026',
    numericValue: 2026,
    label: 'BS Software Engineering graduate',
  },
];

// ─── About Counters ──────────────────────────

export const aboutCounters: Metric[] = [
  { value: '4+', numericValue: 3, suffix: '+', label: 'Years of Learning' },
  { value: '10+', numericValue: 4, suffix: '+', label: 'Projects Built' },
  { value: '18+', numericValue: 18, suffix: '+', label: 'Technologies' },
  { value: '3.28', numericValue: 3.28, label: 'CGPA/ 4.0' },
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
    id: 'intellibid',
    title: 'IntelliBid',
    category: 'AI-Powered Online Auction Platform',
    description:
      'An end-to-end AI-driven auction platform with a real-time bidding engine, OpenAI-powered product intelligence, and comprehensive role-based access control.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80',
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
  },
  {
    id: 'realtime-chat',
    title: 'Real-Time Chat',
    category: 'Production-Grade Messaging System',
    description:
      'A full-featured messaging platform with persistent WebSocket connections, live interactions, and enterprise-grade security.',
    image:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1100&q=80',
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
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    category: 'Marketplace & Admin Analytics',
    description:
      'A full-featured e-commerce system with advanced search, order lifecycle management, and performance-optimized data access.',
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1100&q=80',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'REST APIs'],
    highlights: [
      'Product catalogue with advanced search & filtering, cart and wishlist management, order lifecycle tracking, and role-based admin analytics dashboard.',
      'Cut average API response time by 40% through compound indexing and query optimization.',
    ],
    features: [
      'Advanced search & filtering',
      'Cart & wishlist management',
      'Order lifecycle tracking',
      'Admin analytics dashboard',
      'Role-based access control',
      'Query-optimized data layer',
    ],
    challenges:
      'Reducing API response times while supporting complex search queries across large product catalogues.',
  },
  {
    id: 'rest-api',
    title: 'Scalable REST API',
    category: 'Layered Backend Architecture',
    description:
      'A production-ready modular RESTful API with enterprise patterns, comprehensive validation, and team-ready documentation.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=80',
    tags: ['Express', 'Joi', 'JWT', 'Rate Limiting', 'Postman'],
    highlights: [
      'Layered architecture (routes → controllers → services → models) with Joi input validation, centralized error handling, JWT middleware, and rate-limiting.',
      'Comprehensive Postman collection documentation for faster team onboarding and API handoff.',
    ],
    features: [
      'Layered MVC architecture',
      'Joi input validation',
      'Centralized error handling',
      'JWT middleware',
      'Rate limiting',
      'Postman documentation',
    ],
    challenges:
      'Designing a modular architecture that supports rapid team onboarding while maintaining strict validation and security standards.',
  },
];

// ─── Timeline ────────────────────────────────

export const timeline: TimelineEntry[] = [
  {
    id: 'education',
    date: 'Graduate',
    title: 'BS Software Engineering',
    subtitle: 'University of Central Punjab (UCP), Lahore',
    description:
      'CGPA 3.28 / 4.0. Relevant coursework: Data Structures & Algorithms, OOP, Database Systems, Computer Networks, Web Technologies, Software Engineering.',
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

// ─── Testimonials (placeholder architecture) ─

export const testimonials: Testimonial[] = [];

// ─── Tech Globe Icons ────────────────────────

export const techGlobeItems = [
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Express', color: '#ffffff' },
  { name: 'MongoDB', color: '#47A248' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'JavaScript', color: '#F7DF1E' },
  { name: 'Python', color: '#3776AB' },
  { name: 'Socket.io', color: '#ffffff' },
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
