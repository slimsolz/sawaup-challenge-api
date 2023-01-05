-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnCourse" (
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserOnCourse_pkey" PRIMARY KEY ("userId","courseId")
);

-- AddForeignKey
ALTER TABLE "UserOnCourse" ADD CONSTRAINT "UserOnCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnCourse" ADD CONSTRAINT "UserOnCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
