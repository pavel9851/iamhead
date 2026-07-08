import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { createResume } from "@/lib/actions";

export default async function NewResumePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "CANDIDATE") redirect("/dashboard");

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/dashboard/resumes"
        className="text-sm text-indigo-600 hover:text-indigo-700"
      >
        ← Мои резюме
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">Новое резюме</h1>

      <form action={createResume} className="mt-8 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
            Должность *
          </label>
          <input
            id="title"
            name="title"
            required
            placeholder="Frontend-разработчик"
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
              placeholder="Marketing, Growth, Brand..."
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-zinc-700">
            Навыки
          </label>
          <input
            id="skills"
            name="skills"
            placeholder="React, TypeScript, Node.js"
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-zinc-700">
            О себе *
          </label>
          <textarea
            id="summary"
            name="summary"
            required
            rows={4}
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-zinc-700">
            Опыт работы
          </label>
          <textarea
            id="experience"
            name="experience"
            rows={6}
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
