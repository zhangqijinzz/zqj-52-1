import type { ReactNode } from 'react';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
  showBack?: boolean;
  title?: string;
}

export default function Layout({ children, showBack, title }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar showBack={showBack} title={title} />
      <main className="flex-1 page-enter">
        {children}
      </main>
      <footer className="py-8 text-center text-brown-400 text-sm border-t border-brown-100/50">
        <p>用爱记录，让故事流传</p>
      </footer>
    </div>
  );
}
