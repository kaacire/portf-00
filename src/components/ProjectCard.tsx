import type { DemonstrationItem } from '../data/demonstrations';
import type { ServiceItem } from '../data/services';
import { getWhatsAppUrl } from '../config/site';

interface ServiceCardProps {
  service: ServiceItem;
  active: boolean;
}

export function ServiceCard({ service, active }: ServiceCardProps) {
  const whatsapp = getWhatsAppUrl();

  return (
    <article className={`project-card project-card--service${active ? ' is-active' : ''}`}>
      <p className="project-card__eyebrow">Serviço</p>
      <h3 className="project-card__title">{service.name}</h3>
      <p className="project-card__text">{service.description}</p>

      <div className="project-card__columns">
        <div>
          <h4 className="project-card__subtitle">Aplicações</h4>
          <ul>
            {service.applications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="project-card__subtitle">Benefícios</h4>
          <ul>
            {service.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {service.ctaLabel && whatsapp ? (
        <a
          className="btn btn--glow"
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={active ? 0 : -1}
        >
          {service.ctaLabel}
        </a>
      ) : service.ctaLabel ? (
        <a className="btn btn--glow" href="/#contato" tabIndex={active ? 0 : -1}>
          {service.ctaLabel}
        </a>
      ) : null}
    </article>
  );
}

interface DemoCardProps {
  demo: DemonstrationItem;
  active: boolean;
}

export function DemoCard({ demo, active }: DemoCardProps) {
  return (
    <article className={`project-card project-card--demo${active ? ' is-active' : ''}`}>
      <div className="project-card__media">
        {demo.image ? (
          <img src={demo.image} alt={demo.imageAlt ?? demo.name} loading="lazy" />
        ) : (
          <div className="project-card__placeholder" aria-hidden="true">
            <span>{demo.name}</span>
          </div>
        )}
      </div>
      <div className="project-card__body">
        <div className="project-card__meta">
          {demo.status ? <span className="project-card__status">{demo.status}</span> : null}
        </div>
        <h3 className="project-card__title">{demo.name}</h3>
        <p className="project-card__text">{demo.description}</p>
        {demo.technologies && demo.technologies.length > 0 ? (
          <ul className="project-card__tags">
            {demo.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        ) : null}
        {demo.url ? (
          <a
            className="btn btn--glow"
            href={demo.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={active ? 0 : -1}
          >
            Ver demonstração
          </a>
        ) : null}
      </div>
    </article>
  );
}
