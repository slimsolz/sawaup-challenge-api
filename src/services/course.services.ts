import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function addCourse(input: any) {
  const connectQuery = input.skills?.map((id: number) => {
    return {
      skill: {
        connect: {
          id,
        },
      },
    };
  });

  return await prisma.course.create({
    data: {
      name: input.name,
      url: input.url,
      skills: {
        create: [...connectQuery],
      },
    },
  });
}

export async function getAllCourses(
  ids: string | undefined,
  page: number,
  limit: number
) {
  let filter = {};
  let params: any = {
    take: limit,
    skip: limit * (page - 1),
    include: {
      skills: true,
    },
  };

  if (ids?.length) {
    ids = JSON.parse(ids);
    filter = {
      where: {
        skills: {
          some: {
            skillId: {
              in: ids,
            },
          },
        },
      },
    };
  }

  const courses = await prisma.course.findMany({ ...params, ...filter });
  const totalCount = await prisma.course.count(filter);
  const totalPage = Math.ceil(totalCount / limit);

  return {
    courses,
    pageDetails: {
      perPage: limit,
      page: page,
      totalPage,
      totalCount,
    },
  };
}

export async function getCourse(id: number) {
  return await prisma.course.findFirstOrThrow({
    where: { id },
    include: { skills: true },
  });
}

export async function deleteCourse(id: number) {
  return await prisma.course.delete({ where: { id } });
}

export async function courseExists(id: number): Promise<number> {
  return await prisma.course.count({
    where: { id },
  });
}
