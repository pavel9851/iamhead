import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Email from "next-auth/providers/email";
import { prisma } from "./prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET ?? "iamhead-dev-secret",
  providers: [
    Email({
      server: process.env.EMAIL_SERVER ?? {
        host: "localhost",
        port: 1025,
        auth: { user: "dev", pass: "dev" },
      },
      from: process.env.EMAIL_FROM ?? "noreply@iamhead.ru",
      sendVerificationRequest({ identifier: email, url }) {
        if (process.env.NODE_ENV === "development") {
          console.log(`\n🔗 Magic link for ${email}:\n${url}\n`);
          return;
        }

        const nodemailer = require("nodemailer");
        const transport = nodemailer.createTransport(process.env.EMAIL_SERVER);
        transport.sendMail({
          to: email,
          from: process.env.EMAIL_FROM ?? "noreply@iamhead.ru",
          subject: "Вход на iamhead.ru",
          text: `Перейдите по ссылке для входа: ${url}`,
          html: `<p>Нажмите на ссылку для входа:</p><p><a href="${url}">${url}</a></p>`,
        });
      },
    }),
  ],
  pages: {
    signIn: "/login",
    verifyRequest: "/login/verify",
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
});
