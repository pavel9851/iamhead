import Link from "next/link";
import { GradeLevel } from "@/generated/prisma/enums";

const gradeLabels: Record<GradeLevel, string> = {
  C_LEVEL: "C-level",
  DIRECTOR: "Director",
  HEAD: "Head",
  LEAD: "Lead",
  SENIOR: "Senior",
  MIDDLE: "Middle",
  JUNIOR: "Junior",
};

interface VacancyCardProps {
  id: string;
  title: string;
  company: string;
  country?: string | null;
  location?: string | null;
  grade?: GradeLevel | null;
  area?: string | null;
  salary?: string | null;
  createdAt: Date;
}

export function VacancyCard({
  id,
  title,
  company,
  country,
  location,
  grade,
  area,
  salary,
  createdAt,
}: VacancyCardProps) {
  return (
    <Link
      href={`/vacancies/${id}`}
      className="group block rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">{company}</p>
          <h3 className="mt-1 line-clamp-2 text-xl font-semibold leading-snug text-zinc-900 group-hover:text-indigo-700">
            {title}
          </h3>
        </div>
        {salary && (
          <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
            {salary}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {country && (
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
            {country}
          </span>
        )}
        {location && (
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
            {location}
          </span>
        )}
        {grade && (
          <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            {gradeLabels[grade]}
          </span>
        )}
        {area && (
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
            {area}
          </span>
        )}
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 text-sm text-zinc-500">
        <span>{new Date(createdAt).toLocaleDateString("ru-RU")}</span>
        <span className="font-medium text-zinc-700 group-hover:text-zinc-900">Открыть →</span>
      </div>
    </Link>
  );
}
