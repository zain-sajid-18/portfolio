import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/app/_components/providers/theme-provider';
import { CustomCursor } from '@/app/_components/ui/custom-cursor';
import { personalInfo } from '@/app/_lib/data';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '600'],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zainsajid.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personalInfo.name} | Full Stack MERN Developer Portfolio`,
    template: `%s | ${personalInfo.name}`,
  },
  description:
    'Explore the portfolio of Zain Sajid, a Full Stack MERN developer specializing in scalable REST APIs, real-time Socket.io communication, AI-integrated platforms, and React Native mobile development.',
  keywords: [
    'Zain Sajid',
    'Full Stack MERN Developer',
    'Software Engineer',
    'React Developer',
    'Node.js Developer',
    'Socket.io Developer',
    'AI Web Integration',
    'Portfolio',
    'UCP Lahore',
  ],
  authors: [{ name: personalInfo.name, url: personalInfo.socials.linkedin }],
  creator: personalInfo.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: `${personalInfo.name} Portfolio`,
    title: `${personalInfo.name} | Full Stack MERN Developer`,
    description: personalInfo.subheading,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${personalInfo.name} | Full Stack MERN Developer`,
    description: personalInfo.subheading,
    creator: '@zainsajid',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#08090b' },
    { media: '(prefers-color-scheme: light)', color: '#f8f9fc' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  jobTitle: personalInfo.title,
  email: personalInfo.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lahore',
    addressCountry: 'PK',
  },
  url: siteUrl,
  sameAs: [personalInfo.socials.linkedin, personalInfo.socials.github],
  knowsAbout: [
    'React',
    'Node.js',
    'MongoDB',
    'Socket.io',
    'TypeScript',
    'REST APIs',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t)}else if(window.matchMedia('(prefers-color-scheme:light)').matches){document.documentElement.setAttribute('data-theme','light')}}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
