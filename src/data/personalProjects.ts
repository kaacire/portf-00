export type ProjectSlug = 'argos' | 'ia-antivirus';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectUpdate {
  id: string;
  date: string;
  title: string;
  description: string;
  category?: string;
  images?: ProjectImage[];
  result?: string;
}

export interface PersonalProject {
  id: ProjectSlug;
  name: string;
  shortDescription: string;
  description: string;
  status: string;
  lastUpdate?: string;
  nextSteps: string[];
  developmentNotes: string[];
  coverImage?: string;
  coverAlt?: string;
  repoUrl?: string;
  demoUrl?: string;
  updates: ProjectUpdate[];
  images: ProjectImage[];
}

export const personalProjects: PersonalProject[] = [
  {
    id: 'argos',
    name: 'ARGOS',
    shortDescription:
      'Projeto experimental interno com foco em exploração visual, mapas e protótipos de interface.',
    description:
      'ARGOS é um experimento da Kacire em estágio de pesquisa e prototipagem. A página registra progresso visual, ideias de interface e materiais de desenvolvimento — não um produto final.',
    status: 'Em exploração',
    nextSteps: [
      'Organizar capturas e mapas do protótipo',
      'Documentar decisões de interface',
      'Registrar próximas iterações de layout',
    ],
    developmentNotes: [
      'O projeto permanece em fase experimental.',
      'Materiais visuais serão adicionados conforme o desenvolvimento avançar.',
    ],
    updates: [],
    images: [],
  },
  {
    id: 'ia-antivirus',
    name: 'IA Antivírus',
    shortDescription:
      'Linha de experimentação sobre interfaces e fluxos relacionados a análise assistida — ainda em pesquisa.',
    description:
      'IA Antivírus é um experimento interno da Kacire. Esta página documenta ideias de interface, diagramas e registros de desenvolvimento. Não se trata de um produto funcional nem de uma solução pronta para proteção real de dispositivos.',
    status: 'Em pesquisa',
    nextSteps: [
      'Registrar esboços de interface',
      'Organizar diagramas de fluxo experimentais',
      'Manter notas de desenvolvimento sem afirmações de capacidade',
    ],
    developmentNotes: [
      'Nenhuma métrica de precisão ou resultado de detecção foi validado publicamente.',
      'O material aqui é documental e experimental.',
    ],
    updates: [],
    images: [],
  },
];

export function getProjectBySlug(slug: string | null): PersonalProject | undefined {
  if (!slug) return undefined;
  return personalProjects.find((project) => project.id === slug);
}

export function isProjectSlug(value: string | null): value is ProjectSlug {
  return value === 'argos' || value === 'ia-antivirus';
}
