import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: { url: `${process.env.DATABASE_URL}?connection_limit=1` },
  },
});

export async function addGuestUser(input: Prisma.UserCreateInput) {
  return await prisma.user.create({
    data: { ...input },
  });
}

export async function findUser(name: string) {
  return await prisma.user.findFirst({
    where: { name },
  });
}

export async function deleteUser(id: number) {
  return await prisma.user.delete({ where: { id } });
}
