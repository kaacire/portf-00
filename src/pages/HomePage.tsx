 import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ContactActions } from '../components/ContactActions';
import { Header } from '../components/Header';
import { DemoCard, ServiceCard } from '../components/ProjectCard';
import { ProjectCarousel } from '../components/ProjectCarousel';
import { SectionHeading } from '../components/SectionHeading';
import { SiteFooter } from '../components/SiteFooter';
import { StarField } from '../components/StarField';
import { TypewriterTitle } from '../components/TypewriterTitle';
import { pageMeta, siteConfig } from '../config/site';
import { demonstrations } from '../data/demonstrations';
import { services } from '../data/services';
import { useActiveSection } from '../hooks/useActiveSection';
import { useReducedMotion } from '../hooks/useReducedMotion';

const HOME_SECTIONS = ['sobre', 'servicos', 'demos', 'projetos-pessoais', 'contato'];

export function HomePage() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();
  const activeSection = useActiveSection(HOME_SECTIONS);

  useEffect(() => {
    document.title = pageMeta.home.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute('content', pageMeta.home.description);
    }
  }, []);

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (!el) return;
    const frame = window.requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, reducedMotion]);

  return (
    <div className="page page--home">
      <Header activeSection={activeSection} variant="home" />

      <main>
        <section className="hero" aria-label="Abertura">
          <div
            className="hero__bg"
            style={{ backgroundImage: `url(${siteConfig.heroImage})` }}
            role="img"
            aria-label="Fundo visual do laboratório digital Kacire"
          />
          <div className="hero__overlay" aria-hidden="true" />
          <div className="hero__grid">
            <div className="hero__copy">
              <p className="hero__eyebrow">Laboratório digital</p>
              <TypewriterTitle
                text={siteConfig.heroTitle}
                className="hero__title"
                as="h1"
              />
              <p className="hero__subtitle">{siteConfig.heroSubtitle}</p>
            </div>
            <div className="hero__actions">
              <ContactActions size="lg" />
            </div>
          </div>
        </section>

        <section id="sobre" className="section section--sobre">
          <StarField density="medium" />
          <div className="section__inner section__inner--split">
            <SectionHeading
              eyebrow="01 — Sobre"
              title="Um espaço para construir e experimentar."
            />
            <div className="sobre__content">
              <p>
                A Kacire atua no desenvolvimento web e na criação digital, combinando
                projetos comerciais com experimentação tecnológica. Trabalhamos a
                interface como uma composição — tipografia, movimento e estrutura —
                sem transformar o site em um template genérico de agência.
              </p>
              <p>
                Cada entrega parte do escopo real do projeto: landing pages, sites
                institucionais, sistemas de agendamento e experimentos internos que
                alimentam a pesquisa visual e técnica da equipe.
              </p>
              <div className="sobre__rule" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section id="servicos" className="section section--servicos">
          <StarField density="low" />
          <div className="section__inner">
            <SectionHeading
              eyebrow="02 — Serviços"
              title="O que desenvolvemos"
              description="Três frentes principais. O detalhamento de integrações, autenticação ou pagamentos depende do escopo de cada projeto."
            />
            <ProjectCarousel
              items={services}
              label="Serviços da Kacire"
              variant="services"
              renderItem={(service, { active }) => (
                <ServiceCard service={service} active={active} />
              )}
            />
          </div>
        </section>

        <section id="demos" className="section section--demos">
          <StarField density="medium" />
          <div className="section__inner">
            <SectionHeading
              eyebrow="03 — Demonstrações"
              title="Trabalhos que podem ser visitados"
              description="Projetos desenvolvidos pela Kacire. Quando houver URL pública, o botão abre o destino em nova aba."
            />
            <ProjectCarousel
              items={demonstrations}
              label="Demonstrações da Kacire"
              variant="demos"
              renderItem={(demo, { active }) => (
                <DemoCard demo={demo} active={active} />
              )}
            />
          </div>
        </section>

        <section
          id="projetos-pessoais"
          className="section section--personal"
          style={{ ['--personal-bg' as string]: `url(${siteConfig.personalProjectsBg})` }}
        >
          <div className="section--personal__overlay" aria-hidden="true" />
          <StarField density="low" />
          <div className="section__inner section--personal__content">
            <SectionHeading
              eyebrow="04 — Experimentos"
              title="Projetos pessoais em desenvolvimento"
              description="Linhas internas de pesquisa. Menos destaque comercial, mais registro de exploração."
            />
            <div className="personal__actions">
              <Link className="btn btn--glow" to="/projetos?projeto=argos">
                ARGOS
              </Link>
              <Link className="btn btn--glow" to="/projetos?projeto=ia-antivirus">
                IA Antivírus
              </Link>
            </div>
          </div>
        </section>

        <section id="contato" className="section section--contato">
          <StarField density="medium" />
          <div className="section__inner section__inner--contato">
            <SectionHeading
              eyebrow="05 — Contato"
              title="Vamos conversar sobre o próximo projeto."
              description="Escolha o canal disponível. Sem formulários falsos — só destinos reais."
            />
            <ContactActions size="lg" />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
