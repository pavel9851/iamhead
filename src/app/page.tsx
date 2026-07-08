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
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:grid-cols-2">
          <form action="/vacancies" method="get" className="space-y-3 text-left">
            <label htmlFor="home-vacancy-search" className="block text-sm font-medium text-zinc-700">
              Поиск вакансий
            </label>
            <input
              id="home-vacancy-search"
              name="q"
              placeholder="Должность, компания, город..."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
            <button className="w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
              Найти вакансии
            </button>
          </form>
          <form action="/resumes" method="get" className="space-y-3 text-left">
            <label htmlFor="home-resume-search" className="block text-sm font-medium text-zinc-700">
              Поиск резюме
            </label>
            <input
              id="home-resume-search"
              name="q"
              placeholder="Навык, должность, город..."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm"
            />
            <button className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50">
              Найти резюме
            </button>
          </form>
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

      <section className="mt-20 grid gap-4 sm:grid-cols-3">
        {[
          { title: "Вакансии", text: "Каталог для рекрутеров и hiring teams." },
          { title: "Резюме", text: "Публичные профили кандидатов и C-level специалистов." },
          { title: "Личный кабинет", text: "Размещение, редактирование и управление объявлениями." },
        ].map((item) => (
          <div key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-zinc-900">{item.title}</h3>
            <p className="mt-2 text-sm text-zinc-600">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
