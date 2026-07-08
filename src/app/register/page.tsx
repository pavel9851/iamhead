import Link from "next/link";
import { registerUser } from "@/lib/actions";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role: roleParam } = await searchParams;
  const defaultRole = roleParam === "recruiter" ? "RECRUITER" : "CANDIDATE";

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-zinc-900">Регистрация</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Выберите роль и укажите email — мы отправим ссылку для входа
      </p>

      <form action={registerUser} className="mt-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-zinc-700">Я хочу</label>
          <div className="mt-2 space-y-2">
            <label className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50">
              <input
                type="radio"
                name="role"
                value="RECRUITER"
                defaultChecked={defaultRole === "RECRUITER"}
                className="text-indigo-600"
              />
              <div>
                <span className="text-sm font-medium">Искать сотрудников</span>
                <p className="text-xs text-zinc-500">Рекрутер — публикация вакансий</p>
              </div>
            </label>
            <label className="flex items-center gap-3 rounded-lg border border-zinc-200 p-3 hover:bg-zinc-50">
              <input
                type="radio"
                name="role"
                value="CANDIDATE"
                defaultChecked={defaultRole === "CANDIDATE"}
                className="text-indigo-600"
              />
              <div>
                <span className="text-sm font-medium">Искать работу</span>
                <p className="text-xs text-zinc-500">Кандидат — публикация резюме</p>
              </div>
            </label>
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Зарегистрироваться
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">
          Войти
        </Link>
      </p>
    </div>
  );
}
