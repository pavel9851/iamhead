import { VacancyCard } from "@/components/VacancyCard";
import { CatalogFilters } from "@/components/CatalogFilters";
import { GradeLevel } from "@/generated/prisma/enums";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

const gradeOrder = [
  GradeLevel.C_LEVEL,
  GradeLevel.DIRECTOR,
  GradeLevel.HEAD,
  GradeLevel.LEAD,
  GradeLevel.SENIOR,
  GradeLevel.MIDDLE,
  GradeLevel.JUNIOR,
];

export default async function VacanciesPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    country?: string;
    city?: string;
    grade?: string;
    area?: string;
    sort?: string;
  }>;
}) {
  const params = (await searchParams) ?? {};
  const q = params.q?.trim();
  const country = params.country?.trim();
  const city = params.city?.trim();
  const grade = params.grade?.trim();
  const area = params.area?.trim();
  const sort = params.sort?.trim() || "newest";

  const where: Prisma.VacancyWhereInput = {
    published: true,
    ...(country ? { country } : {}),
    ...(city ? { location: city } : {}),
    ...(grade && gradeOrder.includes(grade as GradeLevel) ? { grade: grade as GradeLevel } : {}),
    ...(area ? { area } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" as const } },
            { company: { contains: q, mode: "insensitive" as const } },
            { description: { contains: q, mode: "insensitive" as const } },
            { location: { contains: q, mode: "insensitive" as const } },
            { area: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const vacancies = await prisma.vacancy.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const rank = (value: GradeLevel | null | undefined) => {
    if (!value) return 999;
    return gradeOrder.indexOf(value) === -1 ? 999 : gradeOrder.indexOf(value);
  };

  const sortList = [...vacancies].sort((a, b) => {
    if (sort === "oldest") return a.createdAt.getTime() - b.createdAt.getTime();
    if (sort === "country") return (a.country ?? "").localeCompare(b.country ?? "", "ru");
    if (sort === "city") return (a.location ?? "").localeCompare(b.location ?? "", "ru");
    if (sort === "grade") return rank(a.grade) - rank(b.grade);
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  const filterOptions = await prisma.vacancy.findMany({
    where: { published: true },
    select: { country: true, location: true, area: true },
  });

  const countries = Array.from(new Set(filterOptions.map((item) => item.country).filter(Boolean) as string[])).sort();
  const cities = Array.from(new Set(filterOptions.map((item) => item.location).filter(Boolean) as string[])).sort();
  const areas = Array.from(new Set(filterOptions.map((item) => item.area).filter(Boolean) as string[])).sort();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Вакансии</h1>
      <p className="mt-2 text-zinc-600">
        {vacancies.length}{" "}
        {vacancies.length === 1
          ? "вакансия"
          : vacancies.length < 5
            ? "вакансии"
            : "вакансий"}
      </p>

      <CatalogFilters
        basePath="/vacancies"
        q={q}
        country={country}
        city={city}
        grade={grade}
        area={area}
        sort={sort}
        countries={countries}
        cities={cities}
        areas={areas}
      />

      {sortList.length === 0 ? (
        <p className="mt-12 text-center text-zinc-500">По этим фильтрам вакансий не найдено</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortList.map((vacancy) => (
            <VacancyCard key={vacancy.id} {...vacancy} />
          ))}
        </div>
      )}
    </div>
  );
}
