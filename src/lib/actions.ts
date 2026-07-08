"use server";

import { GradeLevel, UserRole } from "@/generated/prisma/client";
import { auth, signIn, signOut } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function parseGrade(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return null;
  return Object.values(GradeLevel).includes(value as GradeLevel)
    ? (value as GradeLevel)
    : null;
}

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const role = formData.get("role") as UserRole;

  if (!email || !role) {
    throw new Error("Заполните все поля");
  }

  if (role !== "RECRUITER" && role !== "CANDIDATE") {
    throw new Error("Неверная роль");
  }

  await prisma.user.upsert({
    where: { email },
    create: { email, role },
    update: { role },
  });

  await signIn("email", { email, redirectTo: "/dashboard" });
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    throw new Error("Введите email");
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Пользователь не найден. Сначала зарегистрируйтесь.");
  }

  await signIn("email", { email, redirectTo: "/dashboard" });
}

export async function logoutUser() {
  await signOut({ redirectTo: "/" });
}

export async function createVacancy(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "RECRUITER") {
    throw new Error("Доступ запрещён");
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const company = formData.get("company") as string;
  const country = (formData.get("country") as string) || null;
  const location = (formData.get("location") as string) || null;
  const grade = parseGrade(formData.get("grade"));
  const area = (formData.get("area") as string) || null;
  const salary = (formData.get("salary") as string) || null;

  if (!title || !description || !company) {
    throw new Error("Заполните обязательные поля");
  }

  await prisma.vacancy.create({
    data: {
      title,
      description,
      company,
      country,
      location,
      grade,
      area,
      salary,
      recruiterId: session.user.id,
    },
  });

  revalidatePath("/vacancies");
  revalidatePath("/dashboard/vacancies");
  redirect("/dashboard/vacancies");
}

export async function updateVacancy(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "RECRUITER") {
    throw new Error("Доступ запрещён");
  }

  const vacancy = await prisma.vacancy.findUnique({ where: { id } });
  if (!vacancy || vacancy.recruiterId !== session.user.id) {
    throw new Error("Вакансия не найдена");
  }

  await prisma.vacancy.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      company: formData.get("company") as string,
      country: (formData.get("country") as string) || null,
      location: (formData.get("location") as string) || null,
      grade: parseGrade(formData.get("grade")),
      area: (formData.get("area") as string) || null,
      salary: (formData.get("salary") as string) || null,
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/vacancies");
  revalidatePath("/dashboard/vacancies");
  redirect("/dashboard/vacancies");
}

export async function deleteVacancy(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "RECRUITER") {
    throw new Error("Доступ запрещён");
  }

  const vacancy = await prisma.vacancy.findUnique({ where: { id } });
  if (!vacancy || vacancy.recruiterId !== session.user.id) {
    throw new Error("Вакансия не найдена");
  }

  await prisma.vacancy.delete({ where: { id } });
  revalidatePath("/vacancies");
  revalidatePath("/dashboard/vacancies");
}

export async function createResume(formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "CANDIDATE") {
    throw new Error("Доступ запрещён");
  }

  const title = formData.get("title") as string;
  const summary = formData.get("summary") as string;
  const country = (formData.get("country") as string) || null;
  const location = (formData.get("location") as string) || null;
  const grade = parseGrade(formData.get("grade"));
  const area = (formData.get("area") as string) || null;
  const skills = (formData.get("skills") as string) || null;
  const experience = (formData.get("experience") as string) || null;

  if (!title || !summary) {
    throw new Error("Заполните обязательные поля");
  }

  await prisma.resume.create({
    data: {
      title,
      summary,
      country,
      location,
      grade,
      area,
      skills,
      experience,
      candidateId: session.user.id,
    },
  });

  revalidatePath("/resumes");
  revalidatePath("/dashboard/resumes");
  redirect("/dashboard/resumes");
}

export async function updateResume(id: string, formData: FormData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "CANDIDATE") {
    throw new Error("Доступ запрещён");
  }

  const resume = await prisma.resume.findUnique({ where: { id } });
  if (!resume || resume.candidateId !== session.user.id) {
    throw new Error("Резюме не найдено");
  }

  await prisma.resume.update({
    where: { id },
    data: {
      title: formData.get("title") as string,
      summary: formData.get("summary") as string,
      country: (formData.get("country") as string) || null,
      location: (formData.get("location") as string) || null,
      grade: parseGrade(formData.get("grade")),
      area: (formData.get("area") as string) || null,
      skills: (formData.get("skills") as string) || null,
      experience: (formData.get("experience") as string) || null,
      published: formData.get("published") === "on",
    },
  });

  revalidatePath("/resumes");
  revalidatePath("/dashboard/resumes");
  redirect("/dashboard/resumes");
}

export async function deleteResume(id: string) {
  const session = await auth();
  if (!session?.user || session.user.role !== "CANDIDATE") {
    throw new Error("Доступ запрещён");
  }

  const resume = await prisma.resume.findUnique({ where: { id } });
  if (!resume || resume.candidateId !== session.user.id) {
    throw new Error("Резюме не найдено");
  }

  await prisma.resume.delete({ where: { id } });
  revalidatePath("/resumes");
  revalidatePath("/dashboard/resumes");
}
