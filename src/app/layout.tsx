import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "iamhead.ru — каталог вакансий и резюме",
  description: "Платформа для поиска работы и сотрудников",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-zinc-50 font-sans text-zinc-900">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-200 bg-white py-6 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} iamhead.ru
        </footer>
      </body>
    </html>
  );
}
