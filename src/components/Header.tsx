import Link from "next/link";
import { auth } from "@/lib/auth";
import { logoutUser } from "@/lib/actions";

export async function Header() {
  const session = await auth();

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          iamhead.ru
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/vacancies"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            Вакансии
          </Link>
          <Link
            href="/resumes"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            Резюме
          </Link>

          {session?.user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
              >
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
              <Link
                href="/login"
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
              >
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
