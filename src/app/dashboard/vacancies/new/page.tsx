import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { createVacancy } from "@/lib/actions";

export default async function NewVacancyPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "RECRUITER") redirect("/dashboard");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/dashboard/vacancies"
        className="text-sm text-indigo-600 hover:text-indigo-700"
      >
        ← Мои вакансии
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">Новая вакансия</h1>

      <form action={createVacancy} className="mt-8 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
            Название *
          </label>
          <input
            id="title"
            name="title"
            required
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-zinc-700">
            Компания *
          </label>
          <input
            id="company"
            name="company"
            required
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-zinc-700">
              Страна
            </label>
            <input
              id="country"
              name="country"
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-zinc-700">
              Город
            </label>
            <input
              id="location"
              name="location"
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="grade" className="block text-sm font-medium text-zinc-700">
              Грейд
            </label>
            <select
              id="grade"
              name="grade"
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
              defaultValue=""
            >
              <option value="">Не указан</option>
              <option value="C_LEVEL">C-level</option>
              <option value="DIRECTOR">Director</option>
              <option value="HEAD">Head</option>
              <option value="LEAD">Lead</option>
              <option value="SENIOR">Senior</option>
              <option value="MIDDLE">Middle</option>
              <option value="JUNIOR">Junior</option>
            </select>
          </div>
          <div>
            <label htmlFor="area" className="block text-sm font-medium text-zinc-700">
              Область
            </label>
            <input
              id="area"
              name="area"
              placeholder="Performance, Brand, Growth..."
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
            <label htmlFor="salary" className="block text-sm font-medium text-zinc-700">
              Зарплата
            </label>
            <input
              id="salary"
              name="salary"
              placeholder="от 150 000 ₽"
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-700">
            Описание *
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={8}
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Опубликовать
        </button>
      </form>
    </div>
  );
}
