import heroBg from '../assets/images/hero-bg.jpg';

/**
 * Central contact and external link configuration.
 * Mark provisional values clearly and leave unset fields empty
 * so incomplete links are not rendered as functional buttons.
 */

export const siteConfig = {
  brand: 'Kacire',
  tagline: 'Laboratório digital de desenvolvimento web e experimentação.',
  heroTitle: 'Kacire',
  heroSubtitle:
    'Desenvolvemos sites, experiências digitais e projetos experimentais com foco em clareza técnica e identidade visual.',
  heroImage: heroBg,
  personalProjectsBg: heroBg,
  locale: 'pt-BR',
  contact: {
    /** PROVISÓRIO — substituir pelo número real no formato internacional (ex.: 5511999999999) */
    whatsappNumber: '' as string,
    whatsappMessage: 'Olá! Gostaria de conversar sobre um projeto com a Kacire.',
    /** PROVISÓRIO — substituir pela URL real do perfil */
    instagramUrl: '' as string,
  },
  demos: {
    zafare: 'https://zafare-perfumaria.netlify.app/',
  },
} as const;

export function getWhatsAppUrl(): string | null {
  const number = siteConfig.contact.whatsappNumber.trim();
  if (!number) return null;
  const text = encodeURIComponent(siteConfig.contact.whatsappMessage);
  return `https://wa.me/${number}?text=${text}`;
}

export function getInstagramUrl(): string | null {
  const url = siteConfig.contact.instagramUrl.trim();
  if (!url) return null;
  return url;
}

export const pageMeta = {
  home: {
    title: 'Kacire — Desenvolvimento web e experimentação digital',
    description:
      'Kacire: laboratório digital de desenvolvimento web, criação de sites e projetos experimentais.',
  },
  projects: {
    title: 'Projetos em desenvolvimento — Kacire',
    description:
      'Acompanhe o progresso dos projetos experimentais da Kacire: ARGOS e IA Antivírus.',
  },
} as const;
