import { GradeLevel } from "@/generated/prisma/enums";

export type CatalogVacancy = {
  id: string;
  title: string;
  company: string;
  description: string;
  country?: string | null;
  location?: string | null;
  grade?: GradeLevel | null;
  area?: string | null;
  salary?: string | null;
  published: boolean;
  createdAt: Date;
};

export type CatalogResume = {
  id: string;
  title: string;
  summary: string;
  country?: string | null;
  location?: string | null;
  grade?: GradeLevel | null;
  area?: string | null;
  skills?: string | null;
  experience?: string | null;
  published: boolean;
  createdAt: Date;
};

export const fallbackVacancies: CatalogVacancy[] = [
  {
    id: "fallback-vacancy-1",
    title: "Chief Marketing Officer",
    company: "Aurora Health",
    description:
      "Ищем CMO для построения стратегии роста, управления брендом, performance и product marketing.",
    country: "Россия",
    location: "Москва",
    grade: GradeLevel.C_LEVEL,
    area: "Brand",
    salary: "от 500 000 ₽",
    published: true,
    createdAt: new Date("2026-07-01T10:00:00Z"),
  },
  {
    id: "fallback-vacancy-2",
    title: "VP of Growth Marketing",
    company: "FinPeak",
    description:
      "Лидер growth-направления для масштабирования лидогенерации, экспериментов и CAC/LTV-оптимизации.",
    country: "Россия",
    location: "Санкт-Петербург",
    grade: GradeLevel.C_LEVEL,
    area: "Growth",
    salary: "от 420 000 ₽",
    published: true,
    createdAt: new Date("2026-07-02T10:00:00Z"),
  },
  {
    id: "fallback-vacancy-3",
    title: "Head of Brand",
    company: "Mira Retail",
    description:
      "Управление брендом, коммуникациями и PR для федерального e-commerce бренда.",
    country: "Россия",
    location: "Удаленно",
    grade: GradeLevel.HEAD,
    area: "Brand",
    salary: "от 360 000 ₽",
    published: true,
    createdAt: new Date("2026-07-03T10:00:00Z"),
  },
  {
    id: "fallback-vacancy-4",
    title: "VP Product Marketing",
    company: "CloudNest",
    description:
      "Построение product marketing функции, запуск позиционирования и упаковки enterprise SaaS продуктов.",
    country: "ОАЭ",
    location: "Дубай",
    grade: GradeLevel.DIRECTOR,
    area: "Product Marketing",
    salary: "от 400 000 ₽",
    published: true,
    createdAt: new Date("2026-07-04T10:00:00Z"),
  },
  {
    id: "fallback-vacancy-5",
    title: "Chief Growth Officer",
    company: "Nova Education",
    description:
      "Growth executive для performance, retention, monetization, CRM и экспериментов на уровне воронки.",
    country: "Россия",
    location: "Казань",
    grade: GradeLevel.C_LEVEL,
    area: "Growth",
    salary: "от 450 000 ₽",
    published: true,
    createdAt: new Date("2026-07-05T10:00:00Z"),
  },
  {
    id: "fallback-vacancy-6",
    title: "Head of Demand Generation",
    company: "B2B Rocket",
    description:
      "Построение demand gen engine для SaaS: paid, content, webinar funnels, MQL quality и sales alignment.",
    country: "Россия",
    location: "Удаленно",
    grade: GradeLevel.HEAD,
    area: "Demand Generation",
    salary: "от 320 000 ₽",
    published: true,
    createdAt: new Date("2026-07-06T10:00:00Z"),
  },
];

export const fallbackResumes: CatalogResume[] = [
  {
    id: "fallback-resume-1",
    title: "Chief Marketing Officer",
    summary:
      "20+ лет в B2B и B2C маркетинге, запуск международных брендов, управление P&L и командами до 35 человек.",
    country: "Россия",
    location: "Москва",
    grade: GradeLevel.C_LEVEL,
    area: "Brand",
    skills: "Brand strategy, P&L, team leadership, GTM",
    experience:
      "Последние 6 лет — CMO в SaaS-компании, рост выручки x4 и запуск нового позиционирования.",
    published: true,
    createdAt: new Date("2026-07-01T10:00:00Z"),
  },
  {
    id: "fallback-resume-2",
    title: "VP of Growth Marketing",
    summary:
      "Специалист по growth, performance и аналитике. Снизил CAC на 28% и увеличил MQL в 2.3 раза.",
    country: "Россия",
    location: "Санкт-Петербург",
    grade: GradeLevel.C_LEVEL,
    area: "Growth",
    skills: "Growth, performance, analytics, experimentation",
    experience:
      "Руководил growth-командой из 12 человек в fintech и edtech, отвечал за funnel optimization.",
    published: true,
    createdAt: new Date("2026-07-02T10:00:00Z"),
  },
  {
    id: "fallback-resume-3",
    title: "Head of Brand & Communications",
    summary:
      "Эксперт по бренду, PR и executive comms. Выстраиваю сильную brand platform и помогаю топ-менеджменту.",
    country: "Россия",
    location: "Москва",
    grade: GradeLevel.HEAD,
    area: "Brand",
    skills: "Brand, PR, communications, storytelling",
    experience:
      "7 лет руководила коммуникациями в e-commerce, вела антикризисные кампании и бренд-ребрендинг.",
    published: true,
    createdAt: new Date("2026-07-03T10:00:00Z"),
  },
  {
    id: "fallback-resume-4",
    title: "VP Product Marketing",
    summary:
      "Опыт в SaaS и enterprise IT, позиционирование продуктов, запуск GTM и поддержка продаж.",
    country: "ОАЭ",
    location: "Дубай",
    grade: GradeLevel.DIRECTOR,
    area: "Product Marketing",
    skills: "Positioning, messaging, launches, sales enablement",
    experience:
      "Построил product marketing функцию с нуля, вывел 8 enterprise-продуктов на новые рынки.",
    published: true,
    createdAt: new Date("2026-07-04T10:00:00Z"),
  },
  {
    id: "fallback-resume-5",
    title: "Chief Growth Officer",
    summary:
      "Growth executive с фокусом на retention, monetization и data-driven эксперименты.",
    country: "Россия",
    location: "Казань",
    grade: GradeLevel.C_LEVEL,
    area: "Growth",
    skills: "Retention, monetization, CRM, LTV",
    experience:
      "В e-learning проекте увеличила выручку на 60% за год за счёт CRM и lifecycle automation.",
    published: true,
    createdAt: new Date("2026-07-05T10:00:00Z"),
  },
  {
    id: "fallback-resume-6",
    title: "Head of Demand Generation",
    summary:
      "Строю demand gen engine для SaaS и B2B. Сильный в paid media, webinar funnels и контенте.",
    country: "Россия",
    location: "Удаленно",
    grade: GradeLevel.HEAD,
    area: "Demand Generation",
    skills: "Demand gen, paid media, content marketing",
    experience:
      "Руководил генерацией спроса в международном SaaS: MQL pipeline вырос на 140%.",
    published: true,
    createdAt: new Date("2026-07-06T10:00:00Z"),
  },
];
