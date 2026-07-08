import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { updateVacancy } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function EditVacancyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "RECRUITER") redirect("/dashboard");

  const { id } = await params;
  const vacancy = await prisma.vacancy.findUnique({ where: { id } });
  if (!vacancy || vacancy.recruiterId !== session.user.id) notFound();

  const boundUpdate = updateVacancy.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/dashboard/vacancies"
        className="text-sm text-indigo-600 hover:text-indigo-700"
      >
        ← Мои вакансии
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">Редактировать вакансию</h1>

      <form action={boundUpdate} className="mt-8 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
            Название *
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={vacancy.title}
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
            defaultValue={vacancy.company}
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
              defaultValue={vacancy.country ?? ""}
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
              defaultValue={vacancy.location ?? ""}
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
              defaultValue={vacancy.grade ?? ""}
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
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
              defaultValue={vacancy.area ?? ""}
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
              defaultValue={vacancy.salary ?? ""}
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
            defaultValue={vacancy.description}
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            defaultChecked={vacancy.published}
            className="rounded text-indigo-600"
          />
          <span className="text-sm text-zinc-700">Опубликована</span>
        </label>
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Сохранить
        </button>
      </form>
    </div>
  );
}
