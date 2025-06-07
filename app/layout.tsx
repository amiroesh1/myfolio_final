import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import { Analytics } from '@vercel/analytics/react'; // ✅ Import Analytics

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MyFolio - Craft Your Perfect College Portfolio',
  description: 'AI-powered guidance to help students showcase their achievements.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'MyFolio - Craft Your Perfect College Portfolio',
    description: 'AI-powered guidance to help students showcase their achievements.',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'MyFolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MyFolio - Craft Your Perfect College Portfolio',
    description: 'AI-powered guidance to help students showcase their achievements.',
    images: ['/android-chrome-512x512.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navigation />
          {children}
          <Analytics /> {/* ✅ Add Analytics here */}
        </body>
      </html>
    </ClerkProvider>
  );
}
