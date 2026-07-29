import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Navigation } from '@/components/shared';
import './globals.css';

const navigationSections = [
  { id: 'profile', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Portfolio',
    template: '%s | Portfolio',
  },
  description: 'Personal portfolio and resume showcasing projects and skills',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Portfolio',
    title: 'Portfolio',
    description: 'Personal portfolio and resume showcasing projects and skills',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio',
    description: 'Personal portfolio and resume showcasing projects and skills',
  },
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
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navigation sections={navigationSections} />
        {children}
      </body>
    </html>
  );
}
