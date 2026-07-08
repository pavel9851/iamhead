import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-2xl font-bold text-zinc-900">Вход</h1>
      <p className="mt-2 text-sm text-zinc-600">
        Мы отправим ссылку для входа на ваш email
      </p>
      <LoginForm />
    </div>
  );
}
