import { GradeLevel } from "@/generated/prisma/enums";
import Link from "next/link";

type FilterValue = string | undefined;

interface CatalogFiltersProps {
  basePath: string;
  q?: FilterValue;
  country?: FilterValue;
  city?: FilterValue;
  grade?: FilterValue;
  area?: FilterValue;
  countries: string[];
  cities: string[];
  areas: string[];
}

const gradeOptions = [
  { value: "", label: "Все грейды" },
  { value: GradeLevel.C_LEVEL, label: "C-level" },
  { value: GradeLevel.DIRECTOR, label: "Director" },
  { value: GradeLevel.HEAD, label: "Head" },
  { value: GradeLevel.LEAD, label: "Lead" },
  { value: GradeLevel.SENIOR, label: "Senior" },
  { value: GradeLevel.MIDDLE, label: "Middle" },
  { value: GradeLevel.JUNIOR, label: "Junior" },
];

function optionList(items: string[], placeholder: string) {
  return [
    { value: "", label: placeholder },
    ...items.map((item) => ({ value: item, label: item })),
  ];
}

export function CatalogFilters({
  basePath,
  q,
  country,
  city,
  grade,
  area,
  countries,
  cities,
  areas,
}: CatalogFiltersProps) {
  return (
    <section className="mt-8 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <form method="get" className="grid gap-3 md:grid-cols-5">
        <div className="md:col-span-2">
          <label htmlFor="q" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-500">
            Поиск
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Название, компания, навык..."
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label htmlFor="country" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-500">
            Страна
          </label>
          <select
            id="country"
            name="country"
            defaultValue={country ?? ""}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            {optionList(countries, "Все страны").map((option) => (
              <option key={option.value || "all-country"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-500">
            Город
          </label>
          <select
            id="city"
            name="city"
            defaultValue={city ?? ""}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            {optionList(cities, "Все города").map((option) => (
              <option key={option.value || "all-city"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="grade" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-500">
            Грейд
          </label>
          <select
            id="grade"
            name="grade"
            defaultValue={grade ?? ""}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            {gradeOptions.map((option) => (
              <option key={option.value || "all-grade"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="area" className="mb-1 block text-xs font-medium uppercase tracking-wide text-zinc-500">
            Область
          </label>
          <select
            id="area"
            name="area"
            defaultValue={area ?? ""}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          >
            {optionList(areas, "Все области").map((option) => (
              <option key={option.value || "all-area"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-5 flex flex-wrap gap-3 pt-1">
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Найти
          </button>
          <Link
            href={basePath}
            className="rounded-lg border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Сбросить
          </Link>
        </div>
      </form>
    </section>
  );
}
