import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { deleteResume } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function DashboardResumesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "CANDIDATE") redirect("/dashboard");

  const resumes = await prisma.resume.findMany({
    where: { candidateId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-700">
            ← Личный кабинет
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900">Мои резюме</h1>
        </div>
        <Link
          href="/dashboard/resumes/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Добавить
        </Link>
      </div>

      {resumes.length === 0 ? (
        <p className="mt-12 text-center text-zinc-500">У вас пока нет резюме</p>
      ) : (
        <div className="mt-8 space-y-4">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-6"
            >
              <div>
                <h3 className="font-semibold text-zinc-900">{resume.title}</h3>
                <p className="text-sm text-zinc-500">
                  {resume.published ? "Опубликовано" : "Скрыто"}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/resumes/${resume.id}/edit`}
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50"
                >
                  Редактировать
                </Link>
                <form action={deleteResume.bind(null, resume.id)}>
                  <button
                    type="submit"
                    className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    Удалить
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
