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

interface ResumeCardProps {
  id: string;
  title: string;
  summary: string;
  country?: string | null;
  location?: string | null;
  grade?: GradeLevel | null;
  area?: string | null;
  skills?: string | null;
  createdAt: Date;
}

export function ResumeCard({
  id,
  title,
  summary,
  country,
  location,
  grade,
  area,
  skills,
  createdAt,
}: ResumeCardProps) {
  return (
    <Link
      href={`/resumes/${id}`}
      className="group block rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium uppercase tracking-wide text-indigo-600">Резюме</p>
          <h3 className="mt-1 line-clamp-2 text-xl font-semibold leading-snug text-zinc-900 group-hover:text-indigo-700">
            {title}
          </h3>
        </div>
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-600">{summary}</p>
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
        {skills && (
          <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600">
            {skills}
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
