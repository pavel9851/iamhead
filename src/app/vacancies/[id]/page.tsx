import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function VacancyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vacancy = await prisma.vacancy.findUnique({
    where: { id, published: true },
    include: { recruiter: { select: { name: true, email: true } } },
  });

  if (!vacancy) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/vacancies" className="text-sm text-indigo-600 hover:text-indigo-700">
        ← Все вакансии
      </Link>

      <article className="mt-6 rounded-2xl border border-zinc-200 bg-white p-8">
        <h1 className="text-3xl font-bold text-zinc-900">{vacancy.title}</h1>
        <p className="mt-2 text-lg font-medium text-indigo-600">{vacancy.company}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
          {vacancy.country && <span>{vacancy.country}</span>}
          {vacancy.location && <span>{vacancy.location}</span>}
          {vacancy.grade && <span>{vacancy.grade.replace("_", "-")}</span>}
          {vacancy.area && <span>{vacancy.area}</span>}
          {vacancy.salary && <span>{vacancy.salary}</span>}
          <span>{new Date(vacancy.createdAt).toLocaleDateString("ru-RU")}</span>
        </div>

        <div className="mt-8 whitespace-pre-wrap text-zinc-700">{vacancy.description}</div>
      </article>
    </div>
  );
}
