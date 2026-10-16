import { useEffect, useState } from 'react';
import { Navigation } from './Navigation';

interface HeaderProps {
  activeSection?: string;
  variant?: 'home' | 'projects';
}

export function Header({ activeSection = '', variant = 'home' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', mobileOpen);
    return () => document.body.classList.remove('nav-open');
  }, [mobileOpen]);

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="site-header__inner">
        <Navigation
          activeSection={activeSection}
          variant={variant}
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen((open) => !open)}
          onNavigate={() => setMobileOpen(false)}
        />
      </div>
    </header>
  );
}
