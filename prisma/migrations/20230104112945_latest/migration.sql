/*
  Warnings:

  - You are about to drop the `SkillsOnCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SkillsOnCourse" DROP CONSTRAINT "SkillsOnCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "SkillsOnCourse" DROP CONSTRAINT "SkillsOnCourse_skillId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "skills" INTEGER[];

-- DropTable
DROP TABLE "SkillsOnCourse";
