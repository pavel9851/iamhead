import { RegisterForm } from "@/components/RegisterForm";

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
      <RegisterForm defaultRole={defaultRole} />
    </div>
  );
}
