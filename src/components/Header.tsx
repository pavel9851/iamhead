import Link from "next/link";
import { auth } from "@/lib/auth";
import { logoutUser } from "@/lib/actions";

export async function Header() {
  let session = null;

  try {
    session = await auth();
  } catch {
    session = null;
  }

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold text-indigo-600">
            iamhead.ru
          </Link>

          <nav className="flex items-center gap-4 lg:hidden">
            <Link href="/vacancies" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              Вакансии
            </Link>
            <Link href="/resumes" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
              Резюме
            </Link>
          </nav>
        </div>

        <form
          method="get"
          className="grid gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm sm:grid-cols-[minmax(0,1fr)_auto_auto]"
        >
          <input
            name="q"
            aria-label="Поиск по каталогу"
            placeholder="Поиск по вакансиям и резюме"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
          <button
            type="submit"
            formAction="/vacancies"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            Вакансии
          </button>
          <button
            type="submit"
            formAction="/resumes"
            className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Резюме
          </button>
        </form>

        <nav className="flex flex-wrap items-center gap-4">
          <Link href="/vacancies" className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 lg:inline-flex">
            Вакансии
          </Link>
          <Link href="/resumes" className="hidden text-sm font-medium text-zinc-600 hover:text-zinc-900 lg:inline-flex">
            Резюме
          </Link>

          {session?.user ? (
            <>
              <Link href="/dashboard" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
                Личный кабинет
              </Link>
              <form action={logoutUser}>
                <button
                  type="submit"
                  className="text-sm font-medium text-zinc-500 hover:text-zinc-700"
                >
                  Выйти
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
                Войти
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
