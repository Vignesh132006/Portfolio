import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Vignesh S — Software Developer & Competitive Programmer',
  description: 'CSE student at KIT Coimbatore. 1100+ problems solved. Full Stack Developer intern. Building real-world solutions.',
  keywords: ['Vignesh S', 'Software Developer', 'Competitive Programmer', 'Full Stack', 'React', 'Python', 'C++'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#060608" />
      </head>
      <body>{children}</body>
    </html>
  );
}
