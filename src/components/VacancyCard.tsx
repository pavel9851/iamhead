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
      className="block rounded-xl border border-zinc-200 bg-white p-6 transition-shadow hover:shadow-md"
    >
      <h3 className="text-lg font-semibold text-zinc-900">{title}</h3>
      <p className="mt-1 text-sm font-medium text-indigo-600">{company}</p>
      <div className="mt-3 flex flex-wrap gap-3 text-sm text-zinc-500">
        {country && <span>{country}</span>}
        {location && <span>{location}</span>}
        {grade && <span>{gradeLabels[grade]}</span>}
        {area && <span>{area}</span>}
        {salary && <span>{salary}</span>}
        <span>{new Date(createdAt).toLocaleDateString("ru-RU")}</span>
      </div>
    </Link>
  );
}
