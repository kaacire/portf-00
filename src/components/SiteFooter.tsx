import { Link } from 'react-router-dom';
import { getInstagramUrl, getWhatsAppUrl, siteConfig } from '../config/site';

export function SiteFooter() {
  const year = new Date().getFullYear();
  const whatsapp = getWhatsAppUrl();
  const instagram = getInstagramUrl();

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <p className="site-footer__name">{siteConfig.brand}</p>
          <p className="site-footer__tagline">{siteConfig.tagline}</p>
        </div>

        <nav className="site-footer__nav" aria-label="Rodapé">
          <Link to="/#sobre">Sobre</Link>
          <Link to="/#servicos">Serviços</Link>
          <Link to="/#demos">Demos</Link>
          <Link to="/projetos">Projetos</Link>
          <Link to="/#contato">Contato</Link>
        </nav>

        <div className="site-footer__contact">
          {whatsapp ? (
            <a href={whatsapp} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          ) : null}
          {instagram ? (
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          ) : null}
        </div>
      </div>
      <p className="site-footer__copy">
        © {year} {siteConfig.brand}. Todos os direitos reservados.
      </p>
    </footer>
  );
}
