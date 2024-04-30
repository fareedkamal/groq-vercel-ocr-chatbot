import { Toaster } from 'react-hot-toast';
import './globals.css';
import { Figtree } from 'next/font/google';
import ReduxProvider from '@/redux/provider';

const figtree = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'TaxGPT Assignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning={true}
        className={`${figtree.className} bg-stone-800`}
      >
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
