import type { PersonalProject } from '../data/personalProjects';

interface UpdatePanelProps {
  project: PersonalProject;
  panelId: string;
}

export function UpdatePanel({ project, panelId }: UpdatePanelProps) {
  return (
    <section
      id={panelId}
      className="update-panel"
      aria-labelledby={`${panelId}-title`}
    >
      <header className="update-panel__header">
        <p className="update-panel__status">{project.status}</p>
        <h3 id={`${panelId}-title`} className="update-panel__title">
          {project.name}
        </h3>
        <p className="update-panel__description">{project.description}</p>
        {project.lastUpdate ? (
          <p className="update-panel__last">Última atualização registrada: {project.lastUpdate}</p>
        ) : (
          <p className="update-panel__last">Nenhuma data de atualização registrada ainda.</p>
        )}
      </header>

      <div className="update-panel__grid">
        <div>
          <h4>Notas de desenvolvimento</h4>
          {project.developmentNotes.length > 0 ? (
            <ul>
              {project.developmentNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          ) : (
            <p className="update-panel__empty">Sem notas publicadas.</p>
          )}
        </div>
        <div>
          <h4>Próximas etapas</h4>
          {project.nextSteps.length > 0 ? (
            <ul>
              {project.nextSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          ) : (
            <p className="update-panel__empty">Sem etapas publicadas.</p>
          )}
        </div>
      </div>

      {(project.repoUrl || project.demoUrl) && (
        <div className="update-panel__links">
          {project.repoUrl ? (
            <a
              className="btn btn--ghost"
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Repositório
            </a>
          ) : null}
          {project.demoUrl ? (
            <a
              className="btn btn--ghost"
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Demonstração
            </a>
          ) : null}
        </div>
      )}

      <div className="update-panel__updates">
        <h4>Histórico de atualizações</h4>
        {project.updates.length === 0 ? (
          <p className="update-panel__empty">Nenhuma atualização publicada ainda.</p>
        ) : (
          <ol className="update-panel__timeline">
            {project.updates.map((update) => (
              <li key={update.id}>
                <article>
                  <p className="update-panel__date">
                    <time dateTime={update.date}>{update.date}</time>
                    {update.category ? ` · ${update.category}` : ''}
                  </p>
                  <h5>{update.title}</h5>
                  <p>{update.description}</p>
                  {update.result ? <p className="update-panel__result">{update.result}</p> : null}
                  {update.images && update.images.length > 0 ? (
                    <div className="update-panel__gallery">
                      {update.images.map((image) => (
                        <figure key={image.id}>
                          <img src={image.src} alt={image.alt} loading="lazy" />
                          {image.caption ? <figcaption>{image.caption}</figcaption> : null}
                        </figure>
                      ))}
                    </div>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>

      {project.images.length > 0 ? (
        <div className="update-panel__gallery update-panel__gallery--project">
          <h4>Materiais visuais</h4>
          {project.images.map((image) => (
            <figure key={image.id}>
              <img src={image.src} alt={image.alt} loading="lazy" />
              {image.caption ? <figcaption>{image.caption}</figcaption> : null}
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}
