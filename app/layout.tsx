import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from '@/app/_components/providers/theme-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Zain Sajid | Full Stack MERN Developer Portfolio',
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
  authors: [{ name: 'Zain Sajid' }],
  creator: 'Zain Sajid',
};

export const viewport: Viewport = {
  themeColor: '#08090b',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

