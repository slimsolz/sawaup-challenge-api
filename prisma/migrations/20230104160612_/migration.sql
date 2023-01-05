/*
  Warnings:

  - You are about to drop the `UserOnCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnCourse" DROP CONSTRAINT "UserOnCourse_courseId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnCourse" DROP CONSTRAINT "UserOnCourse_userId_fkey";

-- DropTable
DROP TABLE "UserOnCourse";

-- CreateTable
CREATE TABLE "LikeOnCourse" (
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "LikeOnCourse_pkey" PRIMARY KEY ("userId","courseId")
);

-- AddForeignKey
ALTER TABLE "LikeOnCourse" ADD CONSTRAINT "LikeOnCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeOnCourse" ADD CONSTRAINT "LikeOnCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
