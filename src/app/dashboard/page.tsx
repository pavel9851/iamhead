import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const isRecruiter = session.user.role === "RECRUITER";
  const [vacancyCount, resumeCount, recentVacancies, recentResumes] = await Promise.all([
    prisma.vacancy.count({
      where: isRecruiter ? { recruiterId: session.user.id } : { published: true },
    }),
    prisma.resume.count({
      where: isRecruiter ? { published: true } : { candidateId: session.user.id },
    }),
    prisma.vacancy.findMany({
      where: isRecruiter ? { recruiterId: session.user.id } : { published: true },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, title: true, company: true, published: true, createdAt: true },
    }),
    prisma.resume.findMany({
      where: isRecruiter ? { published: true } : { candidateId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: { id: true, title: true, published: true, createdAt: true },
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Личный кабинет</h1>
      <p className="mt-2 text-zinc-600">
        {session.user.email} ·{" "}
        {isRecruiter ? "Рекрутер" : "Кандидат"}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm text-zinc-500">Всего вакансий</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{vacancyCount}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm text-zinc-500">Всего резюме</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{resumeCount}</p>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-6">
          <p className="text-sm text-zinc-500">Роль</p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">
            {isRecruiter ? "Recruiter" : "Candidate"}
          </p>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {isRecruiter ? (
          <>
            <section className="rounded-2xl border border-zinc-200 bg-white p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Мои вакансии</h2>
                <Link href="/dashboard/vacancies" className="text-sm text-indigo-600 hover:text-indigo-700">
                  Все →
                </Link>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Просмотр, редактирование и удаление вакансий
              </p>
              <Link
                href="/dashboard/vacancies/new"
                className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Добавить вакансию
              </Link>

              <div className="mt-6 space-y-3">
                {recentVacancies.map((vacancy) => (
                  <div
                    key={vacancy.id}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-zinc-900">{vacancy.title}</p>
                      <p className="text-sm text-zinc-500">{vacancy.company}</p>
                    </div>
                    <span className="text-xs text-zinc-500">
                      {vacancy.published ? "Опубликована" : "Скрыта"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-zinc-200 bg-white p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Поиск кандидатов</h2>
                <Link href="/resumes" className="text-sm text-indigo-600 hover:text-indigo-700">
                  Каталог →
                </Link>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Быстрый доступ к открытому каталогу резюме и C-level профилям.
              </p>
              <div className="mt-6 space-y-3">
                {recentResumes.map((resume) => (
                  <div key={resume.id} className="rounded-xl border border-zinc-200 px-4 py-3">
                    <p className="font-medium text-zinc-900">{resume.title}</p>
                    <p className="text-sm text-zinc-500">
                      {resume.published ? "Опубликовано" : "Скрыто"}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            <section className="rounded-2xl border border-zinc-200 bg-white p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Мои резюме</h2>
                <Link href="/dashboard/resumes" className="text-sm text-indigo-600 hover:text-indigo-700">
                  Все →
                </Link>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Просмотр, редактирование и удаление резюме
              </p>
              <Link
                href="/dashboard/resumes/new"
                className="mt-5 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Добавить резюме
              </Link>

              <div className="mt-6 space-y-3">
                {recentResumes.map((resume) => (
                  <div
                    key={resume.id}
                    className="flex items-center justify-between rounded-xl border border-zinc-200 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-zinc-900">{resume.title}</p>
                      <p className="text-sm text-zinc-500">
                        {resume.published ? "Опубликовано" : "Скрыто"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-zinc-200 bg-white p-8">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Подходящие вакансии</h2>
                <Link href="/vacancies" className="text-sm text-indigo-600 hover:text-indigo-700">
                  Каталог →
                </Link>
              </div>
              <p className="mt-2 text-sm text-zinc-600">
                Быстрый доступ к открытому каталогу вакансий и C-level ролям.
              </p>
              <div className="mt-6 space-y-3">
                {recentVacancies.map((vacancy) => (
                  <div key={vacancy.id} className="rounded-xl border border-zinc-200 px-4 py-3">
                    <p className="font-medium text-zinc-900">{vacancy.title}</p>
                    <p className="text-sm text-zinc-500">{vacancy.company}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
