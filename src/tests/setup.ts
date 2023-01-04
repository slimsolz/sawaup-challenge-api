import { faker } from "@faker-js/faker";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const skillInput: Prisma.SkillCreateManyInput[] = [
  {
    name: faker.lorem.slug(1),
  },
  {
    name: faker.lorem.slug(1),
  },
  {
    name: faker.lorem.slug(1),
  },
  {
    name: faker.lorem.slug(1),
  },
];

beforeAll(async () => {
  await prisma.skill.createMany({
    data: skillInput,
  });
});
