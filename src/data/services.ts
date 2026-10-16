export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  applications: string[];
  benefits: string[];
  ctaLabel?: string;
}

export const services: ServiceItem[] = [
  {
    id: 'landing-pages',
    name: 'Landing pages',
    description:
      'Páginas focadas em uma mensagem clara, com hierarquia visual forte e conversão orientada ao objetivo do projeto.',
    applications: [
      'Campanhas e lançamentos',
      'Divulgação de produtos ou serviços',
      'Páginas de captura de interesse',
    ],
    benefits: [
      'Mensagem direta sem ruído',
      'Layout responsivo e legível',
      'Estrutura preparada para evolução do conteúdo',
    ],
    ctaLabel: 'Solicitar orçamento',
  },
  {
    id: 'institutional',
    name: 'Sites institucionais',
    description:
      'Presença digital estruturada para apresentar a empresa, serviços e canais de contato com identidade própria.',
    applications: [
      'Empresas e estúdios',
      'Portfólios corporativos',
      'Páginas institucionais com seções claras',
    ],
    benefits: [
      'Navegação organizada',
      'Conteúdo editável e escalável',
      'Base sólida para futuras seções',
    ],
    ctaLabel: 'Solicitar orçamento',
  },
  {
    id: 'scheduling',
    name: 'Sistemas de agendamento',
    description:
      'Fluxos digitais para organização de horários e reservas, adaptados ao escopo definido em cada projeto.',
    applications: [
      'Agendamento de atendimentos',
      'Reservas de serviços',
      'Gestão simples de disponibilidade',
    ],
    benefits: [
      'Redução de troca manual de mensagens',
      'Interface clara para quem agenda',
      'Escopo definido conforme a necessidade real',
    ],
    ctaLabel: 'Solicitar orçamento',
  },
];
