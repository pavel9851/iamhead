import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { GradeLevel, PrismaClient, UserRole } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  }),
});

const recruiters = [
  {
    email: "recruiter1@iamhead.test",
    name: "Анна Морозова",
    vacancy: {
      title: "Chief Marketing Officer",
      company: "Aurora Health",
      country: "Россия",
      location: "Москва",
      grade: GradeLevel.C_LEVEL,
      area: "Brand",
      salary: "от 500 000 ₽",
      description:
        "Ищем CMO для построения стратегии роста, управления брендом, performance и product marketing. Ответственность за P&L, go-to-market и команду из 20+ человек.",
    },
  },
  {
    email: "recruiter2@iamhead.test",
    name: "Илья Серов",
    vacancy: {
      title: "VP of Growth Marketing",
      company: "FinPeak",
      country: "Россия",
      location: "Санкт-Петербург",
      grade: GradeLevel.C_LEVEL,
      area: "Growth",
      salary: "от 420 000 ₽",
      description:
        "Нужен лидер growth-направления для масштабирования лидогенерации, экспериментов и CAC/LTV-оптимизации в B2B fintech.",
    },
  },
  {
    email: "recruiter3@iamhead.test",
    name: "Екатерина Лебедева",
    vacancy: {
      title: "Head of Brand",
      company: "Mira Retail",
      country: "Россия",
      location: "Удаленно",
      grade: GradeLevel.HEAD,
      area: "Brand",
      salary: "от 360 000 ₽",
      description:
        "Управление брендом, коммуникациями и PR для федерального e-commerce бренда. Нужен сильный storyteller и системный лидер.",
    },
  },
  {
    email: "recruiter4@iamhead.test",
    name: "Дмитрий Волков",
    vacancy: {
      title: "VP Product Marketing",
      company: "CloudNest",
      country: "ОАЭ",
      location: "Дубай",
      grade: GradeLevel.DIRECTOR,
      area: "Product Marketing",
      salary: "от 400 000 ₽",
      description:
        "Построение product marketing функции, запуск позиционирования и упаковки enterprise SaaS продуктов для международного рынка.",
    },
  },
  {
    email: "recruiter5@iamhead.test",
    name: "Мария Громова",
    vacancy: {
      title: "Chief Growth Officer",
      company: "Nova Education",
      country: "Россия",
      location: "Казань",
      grade: GradeLevel.C_LEVEL,
      area: "Growth",
      salary: "от 450 000 ₽",
      description:
        "Роль для сильного growth executive: performance, retention, monetization, CRM и эксперименты на уровне всей воронки.",
    },
  },
  {
    email: "recruiter6@iamhead.test",
    name: "Павел Зорин",
    vacancy: {
      title: "Head of Demand Generation",
      company: "B2B Rocket",
      country: "Россия",
      location: "Удаленно",
      grade: GradeLevel.HEAD,
      area: "Demand Generation",
      salary: "от 320 000 ₽",
      description:
        "Построение demand gen engine для SaaS: paid, content, webinar funnels, MQL quality и sales alignment.",
    },
  },
  {
    email: "recruiter7@iamhead.test",
    name: "Ольга Ким",
    vacancy: {
      title: "Chief Communications Officer",
      company: "SkyLine Mobility",
      country: "Россия",
      location: "Москва",
      grade: GradeLevel.C_LEVEL,
      area: "Communications",
      salary: "от 390 000 ₽",
      description:
        "Нужен CCO для работы с репутацией, media relations, crisis comms и executive communications.",
    },
  },
  {
    email: "recruiter8@iamhead.test",
    name: "Никита Фомин",
    vacancy: {
      title: "Marketing Director, Enterprise",
      company: "Atlas Security",
      country: "Россия",
      location: "Санкт-Петербург",
      grade: GradeLevel.DIRECTOR,
      area: "Enterprise Marketing",
      salary: "от 370 000 ₽",
      description:
        "Запуск маркетинга для enterprise cybersecurity продукта, координация events, ABM и partner marketing.",
    },
  },
  {
    email: "recruiter9@iamhead.test",
    name: "Светлана Орлова",
    vacancy: {
      title: "Chief Brand Officer",
      company: "Luna Beauty",
      country: "Россия",
      location: "Москва",
      grade: GradeLevel.C_LEVEL,
      area: "Brand",
      salary: "от 430 000 ₽",
      description:
        "Формирование brand platform, контент-стратегии и коммуникаций для премиального consumer бренда.",
    },
  },
  {
    email: "recruiter10@iamhead.test",
    name: "Роман Беляев",
    vacancy: {
      title: "VP Marketing Operations",
      company: "Pulse Analytics",
      country: "Россия",
      location: "Удаленно",
      grade: GradeLevel.DIRECTOR,
      area: "Marketing Operations",
      salary: "от 340 000 ₽",
      description:
        "Ищем лидера маркетинговых операций для сквозной аналитики, автоматизации процессов и управления martech stack.",
    },
  },
];

const candidates = [
  {
    email: "candidate1@iamhead.test",
    name: "Алина Кузнецова",
    resume: {
      title: "Chief Marketing Officer",
      summary:
        "20+ лет в B2B и B2C маркетинге, запуск международных брендов, управление P&L и кросс-функциональными командами до 35 человек.",
      country: "Россия",
      location: "Москва",
      grade: GradeLevel.C_LEVEL,
      area: "Brand",
      skills: "Brand strategy, P&L, team leadership, GTM",
      experience:
        "Последние 6 лет — CMO в SaaS-компании, рост выручки x4, запуск нового позиционирования и построение маркетинга как функции роста.",
    },
  },
  {
    email: "candidate2@iamhead.test",
    name: "Сергей Павлов",
    resume: {
      title: "VP of Growth Marketing",
      summary:
        "Специалист по growth, performance и аналитике. Построил систему экспериментов, снизил CAC на 28% и увеличил MQL в 2.3 раза.",
      country: "Россия",
      location: "Санкт-Петербург",
      grade: GradeLevel.C_LEVEL,
      area: "Growth",
      skills: "Growth, performance, analytics, experimentation",
      experience:
        "Руководил growth-командой из 12 человек в fintech и edtech, отвечал за funnel optimization и lifecycle marketing.",
    },
  },
  {
    email: "candidate3@iamhead.test",
    name: "Марина Федорова",
    resume: {
      title: "Head of Brand & Communications",
      summary:
        "Эксперт по бренду, PR и executive comms. Выстраиваю сильную brand platform и помогаю топ-менеджменту говорить с рынком.",
      country: "Россия",
      location: "Москва",
      grade: GradeLevel.HEAD,
      area: "Brand",
      skills: "Brand, PR, communications, storytelling",
      experience:
        "7 лет руководила коммуникациями в e-commerce, вела антикризисные кампании и бренд-ребрендинг федерального уровня.",
    },
  },
  {
    email: "candidate4@iamhead.test",
    name: "Игорь Новиков",
    resume: {
      title: "VP Product Marketing",
      summary:
        "Опыт в SaaS и enterprise IT, позиционирование продуктов, запуск GTM и поддержка продаж через продуктовый маркетинг.",
      country: "ОАЭ",
      location: "Дубай",
      grade: GradeLevel.DIRECTOR,
      area: "Product Marketing",
      skills: "Positioning, messaging, launches, sales enablement",
      experience:
        "Построил product marketing функцию с нуля, вывел 8 enterprise-продуктов на новые рынки и помог sales team закрывать крупные сделки.",
    },
  },
  {
    email: "candidate5@iamhead.test",
    name: "Елена Белова",
    resume: {
      title: "Chief Growth Officer",
      summary:
        "Growth executive с сильным фокусом на retention, monetization и data-driven эксперименты. Люблю сложные воронки и быстрые тесты.",
      country: "Россия",
      location: "Казань",
      grade: GradeLevel.C_LEVEL,
      area: "Growth",
      skills: "Retention, monetization, CRM, LTV",
      experience:
        "В e-learning проекте увеличила выручку на 60% за год за счёт CRM, lifecycle automation и paywall strategy.",
    },
  },
  {
    email: "candidate6@iamhead.test",
    name: "Тимур Ахметов",
    resume: {
      title: "Head of Demand Generation",
      summary:
        "Строю demand gen engine для SaaS и B2B. Сильный в paid media, webinar funnels и контенте для лидогенерации.",
      country: "Россия",
      location: "Удаленно",
      grade: GradeLevel.HEAD,
      area: "Demand Generation",
      skills: "Demand gen, paid media, content marketing",
      experience:
        "Руководил генерацией спроса в международном SaaS: MQL pipeline вырос на 140%, улучшил качество лидов для sales.",
    },
  },
  {
    email: "candidate7@iamhead.test",
    name: "Оксана Литвинова",
    resume: {
      title: "Chief Communications Officer",
      summary:
        "Антикризисные коммуникации, media relations и публичные выступления для C-level. Умею собирать стратегию и исполнять её руками команды.",
      country: "Россия",
      location: "Москва",
      grade: GradeLevel.C_LEVEL,
      area: "Communications",
      skills: "Crisis comms, media relations, exec comms",
      experience:
        "10 лет в корпоративных коммуникациях, руководила PR-направлением в крупном tech-холдинге и транспортной компании.",
    },
  },
  {
    email: "candidate8@iamhead.test",
    name: "Владислав Мельников",
    resume: {
      title: "Marketing Director, Enterprise",
      summary:
        "Опыт в enterprise cybersecurity и сложных B2B продажах. Запускаю ABM, events и partner marketing.",
      country: "Россия",
      location: "Санкт-Петербург",
      grade: GradeLevel.DIRECTOR,
      area: "Enterprise Marketing",
      skills: "ABM, events, partner marketing, enterprise",
      experience:
        "Строил маркетинг для cybersec в России и MENA, запускал мероприятия и партнерские каналы для длинного цикла продаж.",
    },
  },
  {
    email: "candidate9@iamhead.test",
    name: "Дарья Соколова",
    resume: {
      title: "Chief Brand Officer",
      summary:
        "Формирую сильные consumer brand platforms, креативные кампании и tone of voice для премиального сегмента.",
      country: "Россия",
      location: "Москва",
      grade: GradeLevel.C_LEVEL,
      area: "Brand",
      skills: "Brand platform, creative campaigns, tone of voice",
      experience:
        "В beauty-бренде вывела коммуникации на новый уровень, увеличила brand awareness и создала единый креативный стандарт.",
    },
  },
  {
    email: "candidate10@iamhead.test",
    name: "Антон Крылов",
    resume: {
      title: "VP Marketing Operations",
      summary:
        "Маркетинговые операции, аналитика и martech stack. Выстраиваю процессы, дашборды и автоматизацию для роста эффективности.",
      country: "Россия",
      location: "Удаленно",
      grade: GradeLevel.DIRECTOR,
      area: "Marketing Operations",
      skills: "Marketing ops, martech, analytics, automation",
      experience:
        "Оптимизировал маркетинговую инфраструктуру в fintech и снижал time-to-report с 3 дней до 2 часов.",
    },
  },
];

async function main() {
  await prisma.resume.deleteMany({
    where: { candidate: { email: { endsWith: "@iamhead.test" } } },
  });
  await prisma.vacancy.deleteMany({
    where: { recruiter: { email: { endsWith: "@iamhead.test" } } },
  });
  await prisma.user.deleteMany({
    where: { email: { endsWith: "@iamhead.test" } },
  });

  for (const recruiter of recruiters) {
    const user = await prisma.user.create({
      data: {
        email: recruiter.email,
        name: recruiter.name,
        role: UserRole.RECRUITER,
      },
    });

    await prisma.vacancy.create({
      data: {
        title: recruiter.vacancy.title,
        description: recruiter.vacancy.description,
        company: recruiter.vacancy.company,
        country: recruiter.vacancy.country,
        location: recruiter.vacancy.location,
        grade: recruiter.vacancy.grade,
        area: recruiter.vacancy.area,
        salary: recruiter.vacancy.salary,
        recruiterId: user.id,
      },
    });
  }

  for (const candidate of candidates) {
    const user = await prisma.user.create({
      data: {
        email: candidate.email,
        name: candidate.name,
        role: UserRole.CANDIDATE,
      },
    });

    await prisma.resume.create({
      data: {
        title: candidate.resume.title,
        summary: candidate.resume.summary,
        country: candidate.resume.country,
        location: candidate.resume.location,
        grade: candidate.resume.grade,
        area: candidate.resume.area,
        skills: candidate.resume.skills,
        experience: candidate.resume.experience,
        candidateId: user.id,
      },
    });
  }

  console.log(`Seeded ${recruiters.length} vacancies and ${candidates.length} resumes.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
