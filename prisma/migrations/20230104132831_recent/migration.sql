-- DropForeignKey
ALTER TABLE "SkillsOnCourse" DROP CONSTRAINT "SkillsOnCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "SkillsOnCourse" DROP CONSTRAINT "SkillsOnCourse_skillId_fkey";

-- AddForeignKey
ALTER TABLE "SkillsOnCourse" ADD CONSTRAINT "SkillsOnCourse_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsOnCourse" ADD CONSTRAINT "SkillsOnCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
