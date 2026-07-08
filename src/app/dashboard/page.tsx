import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const isRecruiter = session.user.role === "RECRUITER";

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-zinc-900">Личный кабинет</h1>
      <p className="mt-2 text-zinc-600">
        {session.user.email} ·{" "}
        {isRecruiter ? "Рекрутер" : "Кандидат"}
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {isRecruiter ? (
          <>
            <Link
              href="/dashboard/vacancies"
              className="rounded-2xl border border-zinc-200 bg-white p-8 transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">Мои вакансии</h2>
              <p className="mt-2 text-sm text-zinc-600">
                Просмотр, редактирование и удаление вакансий
              </p>
            </Link>
            <Link
              href="/dashboard/vacancies/new"
              className="rounded-2xl border border-indigo-200 bg-indigo-50 p-8 transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-indigo-700">Добавить вакансию</h2>
              <p className="mt-2 text-sm text-indigo-600">
                Опубликовать новую вакансию
              </p>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard/resumes"
              className="rounded-2xl border border-zinc-200 bg-white p-8 transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold">Мои резюме</h2>
              <p className="mt-2 text-sm text-zinc-600">
                Просмотр, редактирование и удаление резюме
              </p>
            </Link>
            <Link
              href="/dashboard/resumes/new"
              className="rounded-2xl border border-indigo-200 bg-indigo-50 p-8 transition-shadow hover:shadow-md"
            >
              <h2 className="text-xl font-semibold text-indigo-700">Добавить резюме</h2>
              <p className="mt-2 text-sm text-indigo-600">
                Опубликовать новое резюме
              </p>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
