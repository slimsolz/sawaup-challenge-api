/*
  Warnings:

  - You are about to drop the column `skills` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "skills";

-- CreateTable
CREATE TABLE "SkillsOnCourse" (
    "skillId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "SkillsOnCourse_pkey" PRIMARY KEY ("skillId","courseId")
);

-- AddForeignKey
ALTER TABLE "SkillsOnCourse" ADD CONSTRAINT "SkillsOnCourse_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnCourse" ADD CONSTRAINT "SkillsOnCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
