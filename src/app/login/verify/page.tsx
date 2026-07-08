import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-zinc-900">Проверьте почту</h1>
      <p className="mt-4 text-zinc-600">
        Мы отправили ссылку для входа на ваш email. Перейдите по ней, чтобы
        войти в личный кабинет.
      </p>
      <p className="mt-2 text-sm text-zinc-500">
        В режиме разработки ссылка выводится в консоль сервера.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
      >
        На главную
      </Link>
    </div>
  );
}
