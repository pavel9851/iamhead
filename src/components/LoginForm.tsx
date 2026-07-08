"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginUser, type AuthActionState } from "@/lib/actions";

const initialState: AuthActionState = { error: null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginUser, initialState);
  const error = state && typeof state === "object" && "error" in state ? state.error : null;

  return (
    <form action={formAction} className="mt-8 space-y-4">
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

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Отправляем..." : "Отправить ссылку"}
      </button>

      <p className="text-center text-sm text-zinc-600">
        Нет аккаунта?{" "}
        <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
}
