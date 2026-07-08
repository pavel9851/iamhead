import { ResumeCard } from "@/components/ResumeCard";
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

export default async function ResumesPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string;
    country?: string;
    city?: string;
    grade?: string;
    area?: string;
  }>;
}) {
  const params = (await searchParams) ?? {};
  const q = params.q?.trim();
  const country = params.country?.trim();
  const city = params.city?.trim();
  const grade = params.grade?.trim();
  const area = params.area?.trim();

  const where: Prisma.ResumeWhereInput = {
    published: true,
    ...(country ? { country } : {}),
    ...(city ? { location: city } : {}),
    ...(grade && gradeOrder.includes(grade as GradeLevel) ? { grade: grade as GradeLevel } : {}),
    ...(area ? { area } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" as const } },
            { summary: { contains: q, mode: "insensitive" as const } },
            { skills: { contains: q, mode: "insensitive" as const } },
            { experience: { contains: q, mode: "insensitive" as const } },
            { location: { contains: q, mode: "insensitive" as const } },
            { area: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const resumes = await prisma.resume.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const filterOptions = await prisma.resume.findMany({
    where: { published: true },
    select: { country: true, location: true, area: true },
  });

  const countries = Array.from(new Set(filterOptions.map((item) => item.country).filter(Boolean) as string[])).sort();
  const cities = Array.from(new Set(filterOptions.map((item) => item.location).filter(Boolean) as string[])).sort();
  const areas = Array.from(new Set(filterOptions.map((item) => item.area).filter(Boolean) as string[])).sort();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Резюме</h1>
      <p className="mt-2 text-zinc-600">
        {resumes.length}{" "}
        {resumes.length === 1 ? "резюме" : resumes.length < 5 ? "резюме" : "резюме"}
      </p>

      <CatalogFilters
        basePath="/resumes"
        q={q}
        country={country}
        city={city}
        grade={grade}
        area={area}
        countries={countries}
        cities={cities}
        areas={areas}
      />

      {resumes.length === 0 ? (
        <p className="mt-12 text-center text-zinc-500">По этим фильтрам резюме не найдено</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((resume) => (
            <ResumeCard key={resume.id} {...resume} />
          ))}
        </div>
      )}
    </div>
  );
}
