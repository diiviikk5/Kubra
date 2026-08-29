import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';

export const metadata: Metadata = {
  title: 'Kubra — The Open Commerce Superlayer for Bharat',
  description: 'Unifying multi-seller retail, YatriSetu multimodal transit, and 60-second dispute settlements across India\'s open digital network.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-[#fafafa] antialiased min-h-screen selection:bg-zinc-700 selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
