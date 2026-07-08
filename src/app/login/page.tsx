import Link from "next/link";
import { loginUser } from "@/lib/actions";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-zinc-900">Вход</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Мы отправим ссылку для входа на ваш email
      </p>

      <form action={loginUser} className="mt-8 space-y-4">
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
          Отправить ссылку
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-600">
        Нет аккаунта?{" "}
        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
          Зарегистрироваться
        </Link>
      </p>
    </div>
  );
}
