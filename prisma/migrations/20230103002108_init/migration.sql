-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "skillId" INTEGER NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_url_key" ON "Course"("url");

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
