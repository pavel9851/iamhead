import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { updateResume } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function EditResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "CANDIDATE") redirect("/dashboard");

  const { id } = await params;
  const resume = await prisma.resume.findUnique({ where: { id } });
  if (!resume || resume.candidateId !== session.user.id) notFound();

  const boundUpdate = updateResume.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <Link
        href="/dashboard/resumes"
        className="text-sm text-indigo-600 hover:text-indigo-700"
      >
        ← Мои резюме
      </Link>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900">Редактировать резюме</h1>

      <form action={boundUpdate} className="mt-8 space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-700">
            Должность *
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={resume.title}
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-zinc-700">
            Навыки
          </label>
          <input
            id="skills"
            name="skills"
            defaultValue={resume.skills ?? ""}
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
              defaultValue={resume.country ?? ""}
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
              defaultValue={resume.location ?? ""}
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
              defaultValue={resume.grade ?? ""}
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
              defaultValue={resume.area ?? ""}
              className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
          </div>
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
            defaultValue={resume.summary}
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
            defaultValue={resume.experience ?? ""}
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
          />
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="published"
            defaultChecked={resume.published}
            className="rounded text-indigo-600"
          />
          <span className="text-sm text-zinc-700">Опубликовано</span>
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
