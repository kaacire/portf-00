export interface DemonstrationItem {
  id: string;
  name: string;
  description: string;
  technologies?: string[];
  image?: string;
  imageAlt?: string;
  url?: string;
  status?: string;
}

export const demonstrations: DemonstrationItem[] = [
  {
    id: 'landing-divulgacao',
    name: 'Landing page de divulgação',
    description:
      'Página de divulgação desenvolvida pela Kacire, com foco em apresentação visual e chamada para ação.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    status: 'Demonstração disponível sob consulta',
    // image: pendente — substituir quando a captura estiver disponível
  },
  {
    id: 'zafare-perfumaria',
    name: 'Zafare Perfumaria',
    description:
      'Mini e-commerce de perfumaria desenvolvido pela Kacire, com navegação de catálogo e experiência de compra simplificada.',
    technologies: ['React', 'JavaScript', 'CSS'],
    url: 'https://zafare-perfumaria.netlify.app/',
    status: 'Online',
    // image: pendente — substituir quando a captura estiver disponível
  },
];
