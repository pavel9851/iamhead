-- CreateEnum
CREATE TYPE "GradeLevel" AS ENUM ('C_LEVEL', 'DIRECTOR', 'HEAD', 'LEAD', 'SENIOR', 'MIDDLE', 'JUNIOR');

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "area" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "grade" "GradeLevel",
ADD COLUMN     "location" TEXT;

-- AlterTable
ALTER TABLE "Vacancy" ADD COLUMN     "area" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "grade" "GradeLevel";
