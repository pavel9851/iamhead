import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { deleteVacancy } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function DashboardVacanciesPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "RECRUITER") redirect("/dashboard");

  const vacancies = await prisma.vacancy.findMany({
    where: { recruiterId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard" className="text-sm text-indigo-600 hover:text-indigo-700">
            ← Личный кабинет
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-zinc-900">Мои вакансии</h1>
        </div>
        <Link
          href="/dashboard/vacancies/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Добавить
        </Link>
      </div>

      {vacancies.length === 0 ? (
        <p className="mt-12 text-center text-zinc-500">У вас пока нет вакансий</p>
      ) : (
        <div className="mt-8 space-y-4">
          {vacancies.map((vacancy) => (
            <div
              key={vacancy.id}
              className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-6"
            >
              <div>
                <h3 className="font-semibold text-zinc-900">{vacancy.title}</h3>
                <p className="text-sm text-zinc-500">
                  {vacancy.company} ·{" "}
                  {vacancy.published ? "Опубликована" : "Скрыта"}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/vacancies/${vacancy.id}/edit`}
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50"
                >
                  Редактировать
                </Link>
                <form action={deleteVacancy.bind(null, vacancy.id)}>
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
