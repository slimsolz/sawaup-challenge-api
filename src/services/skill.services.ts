import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function addNewSkill(input: Prisma.SkillCreateInput) {
  return await prisma.skill.create({
    data: { ...input },
  });
}

export async function getAllSkills(name: string | undefined) {
  let filter = {};

  if (name) {
    filter = { where: { name } };
  }

  return await prisma.skill.findMany(filter);
}

export async function getSkill(id: number) {
  return await prisma.skill.findFirstOrThrow({ where: { id } });
}

export async function deleteSkill(id: number) {
  return await prisma.skill.delete({ where: { id } });
}

export async function updateSkill(id: number, input: Prisma.SkillUpdateInput) {
  return await prisma.skill.update({ where: { id }, data: { ...input } });
}

export async function skillExists(input: string | number): Promise<number> {
  let filter = {};

  if (typeof input === "number") {
    filter = { id: input };
  } else if (typeof input === "string") {
    filter = { name: input };
  }

  return await prisma.skill.count({
    where: filter,
  });
}
