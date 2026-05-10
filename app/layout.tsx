import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'Myanmar Digital Library',
  description: 'Myanmar Digital Library is a curated collection of articles and books, designed to provide a seamless reading experience. Explore our library and discover your next read today!',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="flex flex-col min-h-screen">
        <div className="flex-1">
          {children}
        </div>
        
        {/* Sticky Status Bar */}
        <footer className="h-8 bg-gray-900 text-gray-500 text-[10px] px-6 flex items-center justify-between z-50">
          <div className="flex space-x-4 items-center">
            <span className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span>System Live</span>
            </span>
            <span>● Fully Static MDX Environment</span>
            <span>● မြန်မာ Digital Library v2.0</span>
          </div>
          <div className="hidden sm:flex space-x-4">
            <span>Local Sync: Complete</span>
            <span>Last Cached: 12:45 PM</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
