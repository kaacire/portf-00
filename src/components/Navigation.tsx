import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getWhatsAppUrl, siteConfig } from '../config/site';
import { useReducedMotion } from '../hooks/useReducedMotion';

export type NavSectionId = 'sobre' | 'servicos' | 'demos' | 'contato';

interface NavigationProps {
  activeSection?: string;
  variant?: 'home' | 'projects';
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onNavigate?: () => void;
}

const SECTION_LINKS: { id: NavSectionId; label: string }[] = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'demos', label: 'Demos' },
];

function scrollToSection(id: string, smooth: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
}

export function Navigation({
  activeSection = '',
  variant = 'home',
  mobileOpen,
  onToggleMobile,
  onNavigate,
}: NavigationProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const whatsapp = getWhatsAppUrl();

  const goToHomeSection = (id: NavSectionId) => {
    onNavigate?.();
    if (location.pathname === '/') {
      scrollToSection(id, !reducedMotion);
      return;
    }
    navigate(`/#${id}`);
  };

  const handleContact = () => {
    onNavigate?.();
    if (whatsapp) {
      window.open(whatsapp, '_blank', 'noopener,noreferrer');
      return;
    }
    if (location.pathname === '/') {
      scrollToSection('contato', !reducedMotion);
    } else {
      navigate('/#contato');
    }
  };

  return (
    <nav className="site-nav" aria-label="Principal">
      <Link
        to="/"
        className="site-nav__brand"
        onClick={() => onNavigate?.()}
      >
        {siteConfig.brand}
      </Link>

      <button
        type="button"
        className="site-nav__menu-toggle"
        aria-expanded={mobileOpen}
        aria-controls="site-nav-panel"
        onClick={onToggleMobile}
      >
        <span className="visually-hidden">{mobileOpen ? 'Fechar menu' : 'Abrir menu'}</span>
        <span aria-hidden="true">{mobileOpen ? '✕' : '☰'}</span>
      </button>

      <div
        id="site-nav-panel"
        className={`site-nav__panel${mobileOpen ? ' is-open' : ''}`}
      >
        <ul className="site-nav__links">
          {SECTION_LINKS.map((link) => {
            const isActive = variant === 'home' && activeSection === link.id;
            return (
              <li key={link.id}>
                <button
                  type="button"
                  className={`site-nav__link${isActive ? ' is-active' : ''}`}
                  onClick={() => goToHomeSection(link.id)}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
          <li>
            <Link
              to="/projetos"
              className={`site-nav__link${variant === 'projects' ? ' is-active' : ''}`}
              onClick={() => onNavigate?.()}
            >
              Projetos
            </Link>
          </li>
          <li>
            <button
              type="button"
              className={`site-nav__link${variant === 'home' && activeSection === 'contato' ? ' is-active' : ''}`}
              onClick={handleContact}
            >
              Contato
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
