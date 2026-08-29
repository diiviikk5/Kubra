import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ONDC BharatOS - The Citizen Superlayer for India\'s Open Network',
  description: 'Built for Build What Moves India. Rethinking ONDC Retail, Transit, and Dispute Resolution into a unified citizen experience.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen selection:bg-blue-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
