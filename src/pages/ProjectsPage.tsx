import { useEffect, useId, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { SiteFooter } from '../components/SiteFooter';
import { StarField } from '../components/StarField';
import { UpdatePanel } from '../components/UpdatePanel';
import { pageMeta } from '../config/site';
import {
  getProjectBySlug,
  isProjectSlug,
  personalProjects,
  type ProjectSlug,
} from '../data/personalProjects';

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const baseId = useId();
  const selectedParam = searchParams.get('projeto');
  const selected: ProjectSlug | null = isProjectSlug(selectedParam) ? selectedParam : null;
  const selectedProject = useMemo(() => getProjectBySlug(selected), [selected]);

  useEffect(() => {
    document.title = pageMeta.projects.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', pageMeta.projects.description);
    }
  }, []);

  const selectProject = (slug: ProjectSlug) => {
    if (selected === slug) {
      setSearchParams({}, { replace: false });
      return;
    }
    setSearchParams({ projeto: slug }, { replace: false });
  };

  return (
    <div className="page page--projects">
      <Header variant="projects" />

      <main className="projects-main">
        <section className="projects-intro section">
          <StarField density="low" />
          <div className="section__inner">
            <p className="section-heading__eyebrow">Central técnica</p>
            <h1 className="projects-intro__title">Projetos em desenvolvimento</h1>
            <p className="projects-intro__text">
              Esta página registra experimentos, progresso e atualizações dos projetos
              pessoais da Kacire. Os trabalhos podem estar em estágios diferentes —
              pesquisa, prototipagem ou documentação — e não representam produtos
              finais.
            </p>
          </div>
        </section>

        <section className="projects-selector section" aria-label="Seleção de projetos">
          <StarField density="medium" />
          <div className="section__inner">
            <div className="projects-selector__grid">
              {personalProjects.map((project) => {
                const panelId = `${baseId}-${project.id}-panel`;
                const expanded = selected === project.id;
                return (
                  <button
                    key={project.id}
                    type="button"
                    className={`project-select${expanded ? ' is-selected' : ''}`}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => selectProject(project.id)}
                  >
                    <span className="project-select__status">{project.status}</span>
                    <span className="project-select__name">{project.name}</span>
                    <span className="project-select__text">{project.shortDescription}</span>
                    <span className="project-select__hint">
                      {expanded ? 'Ocultar atualizações' : 'Ver notas de desenvolvimento'}
                    </span>
                  </button>
                );
              })}
            </div>

            {selectedProject ? (
              <UpdatePanel
                project={selectedProject}
                panelId={`${baseId}-${selectedProject.id}-panel`}
              />
            ) : (
              <p className="projects-selector__prompt" role="status">
                Selecione ARGOS ou IA Antivírus para abrir o painel de atualizações.
              </p>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
