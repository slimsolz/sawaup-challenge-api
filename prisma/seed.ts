import { courses, coursesSkills, skills } from "../src/utils/seedData";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.skillsOnCourse.deleteMany();
    console.log("[SEED] Successfully deleted skillsCourse records");

    await prisma.skill.deleteMany();
    console.log("[SEED] Successfully deleted skills records");

    await prisma.course.deleteMany();
    console.log("[SEED] Successfully deleted skills records");

    await prisma.skill.createMany({ data: skills });
    console.log("[SEED] Successfully created skills records");

    await prisma.course.createMany({ data: courses });
    console.log("[SEED] Successfully created courses records");

    await prisma.skillsOnCourse.createMany({ data: coursesSkills });
    console.log("[SEED] Successfully created courses skills records");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
load();
