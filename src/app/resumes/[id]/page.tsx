import Link from "next/link";
import { notFound } from "next/navigation";
import { fallbackResumes } from "@/lib/catalog-fallback";
import { prisma } from "@/lib/prisma";

export default async function ResumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const resume = await prisma.resume
    .findUnique({
      where: { id, published: true },
      include: { candidate: { select: { name: true, email: true } } },
    })
    .catch(() => fallbackResumes.find((item) => item.id === id && item.published) ?? null);

  if (!resume) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link href="/resumes" className="text-sm text-indigo-600 hover:text-indigo-700">
        ← Все резюме
      </Link>

      <article className="mt-6 rounded-2xl border border-zinc-200 bg-white p-8">
        <h1 className="text-3xl font-bold text-zinc-900">{resume.title}</h1>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-zinc-500">
          {resume.country && <span>{resume.country}</span>}
          {resume.location && <span>{resume.location}</span>}
          {resume.grade && <span>{resume.grade.replace("_", "-")}</span>}
          {resume.area && <span>{resume.area}</span>}
          {resume.skills && <span>{resume.skills}</span>}
          <span>{new Date(resume.createdAt).toLocaleDateString("ru-RU")}</span>
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-zinc-900">О себе</h2>
          <p className="mt-2 whitespace-pre-wrap text-zinc-700">{resume.summary}</p>
        </section>

        {resume.experience && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold text-zinc-900">Опыт работы</h2>
            <p className="mt-2 whitespace-pre-wrap text-zinc-700">{resume.experience}</p>
          </section>
        )}
      </article>
    </div>
  );
}
