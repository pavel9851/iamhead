import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl">
          Найди работу или сотрудника
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-600">
          iamhead.ru — платформа для рекрутеров и кандидатов. Публикуйте
          вакансии, размещайте резюме и находите друг друга.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/vacancies"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Смотреть вакансии
          </Link>
          <Link
            href="/resumes"
            className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            Смотреть резюме
          </Link>
        </div>
      </section>

      <section className="mt-20 grid gap-8 sm:grid-cols-2">
        <div className="rounded-2xl border border-zinc-200 bg-white p-8">
          <h2 className="text-xl font-semibold">Для рекрутеров</h2>
          <p className="mt-2 text-zinc-600">
            Размещайте вакансии, управляйте ими в личном кабинете. Вход через
            email без пароля.
          </p>
          <Link
            href="/register?role=recruiter"
            className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Зарегистрироваться как рекрутер →
          </Link>
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-white p-8">
          <h2 className="text-xl font-semibold">Для кандидатов</h2>
          <p className="mt-2 text-zinc-600">
            Создавайте резюме и будьте видимы для работодателей. Быстрая
            регистрация по email.
          </p>
          <Link
            href="/register?role=candidate"
            className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            Зарегистрироваться как кандидат →
          </Link>
        </div>
      </section>
    </div>
  );
}
