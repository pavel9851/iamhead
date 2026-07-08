This is a [Next.js](https://nextjs.org) project for iamhead.ru, a job and resume marketplace.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result if the dev server falls back to port 3001.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Yandex Cloud

Recommended deployment setup:

1. Create a **Managed PostgreSQL** cluster in Yandex Cloud.
2. Deploy the Next.js app to **Yandex Cloud App Platform** or **Serverless Containers**.
3. Set environment variables in Yandex Cloud:

```env
DATABASE_URL=...
AUTH_SECRET=...
AUTH_URL=https://iamhead.ru
EMAIL_SERVER=...
EMAIL_FROM=noreply@iamhead.ru
```

4. Run Prisma migrations against the Yandex Cloud database.
5. Attach the `iamhead.ru` domain in Yandex Cloud DNS.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
