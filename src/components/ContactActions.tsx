import { getInstagramUrl, getWhatsAppUrl } from '../config/site';

interface ContactActionsProps {
  className?: string;
  size?: 'md' | 'lg';
  showLabels?: boolean;
}

export function ContactActions({
  className = '',
  size = 'md',
  showLabels = true,
}: ContactActionsProps) {
  const whatsapp = getWhatsAppUrl();
  const instagram = getInstagramUrl();

  if (!whatsapp && !instagram) {
    return (
      <p className={`contact-actions contact-actions--pending ${className}`.trim()} role="status">
        Canais de contato em configuração. Atualize WhatsApp e Instagram em{' '}
        <code>src/config/site.ts</code>.
      </p>
    );
  }

  return (
    <div className={`contact-actions contact-actions--${size} ${className}`.trim()}>
      {whatsapp ? (
        <a
          className="btn btn--glow btn--whatsapp"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
        >
          {showLabels ? 'WhatsApp' : 'Abrir WhatsApp'}
        </a>
      ) : null}
      {instagram ? (
        <a
          className="btn btn--glow btn--instagram"
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          {showLabels ? 'Instagram' : 'Abrir Instagram'}
        </a>
      ) : null}
    </div>
  );
}
