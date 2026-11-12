import { IBM_Plex_Sans_Arabic } from 'next/font/google';
import { SITE } from '@/lib/site';
import './globals.css';

const plex = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-plex',
});

export const metadata = {
  title: {
    default: SITE.name,
    template: `%s | ${SITE.name}`,
  },
  description: 'عروض عقارية مختارة في الرياض ومكة المكرمة وجدة. تصفّح العروض وتواصل معي مباشرة عبر واتساب.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0F5C4D',
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={plex.variable}>
      <body>{children}</body>
    </html>
  );
}
