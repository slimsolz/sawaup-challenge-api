import { PrismaClient, Prisma } from "@prisma/client";
import { addGuestUser, findUser } from "./user.services";

const prisma = new PrismaClient({
  datasources: { db: { url: `${process.env.DATABASE_URL}&connection_limit=1` } },
});

export async function addCourse(input: any) {
  const connectQuery = input.skills.map((id: number) => {
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
      thumbnail: input.thumbnail,
      skills: {
        create: [...connectQuery],
      },
    },
  });
}

export async function getAllCourses(
  ids: string | undefined,
  page: number,
  limit: number,
  userName: string
) {
  let filter = {};
  let user;
  let includeParams: any = {
    skills: {
      select: {
        skill: true,
      },
    },
  };

  if (userName) {
    user = await findUser(userName);

    if (!user) {
      user = await addGuestUser({ name: userName });
    }

    includeParams = {
      ...includeParams,
      users: {
        where: {
          userId: user.id,
        },
      },
    };
  }

  let params: any = {
    take: limit,
    skip: limit * (page - 1),
    include: {
      ...includeParams,
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

export async function findCourseByUrl(url: string): Promise<number> {
  return await prisma.course.count({
    where: { url },
  });
}

export async function toggleCourseFavorite(name: string, courseId: number) {
  let result;
  let message = "added to favorite";
  let user = await findUser(name);

  if (!user) {
    user = await addGuestUser({ name });
  }

  if (await userAlreadyLikedCourse(user.id, courseId)) {
    result = await deleteCourseLike(user.id, courseId);
    message = "removed from favorite";
  } else {
    result = await prisma.likeOnCourse.create({
      data: {
        courseId,
        userId: user.id,
      },
    });
  }

  return { result, message };
}

async function userAlreadyLikedCourse(userId: number, courseId: number) {
  return await prisma.likeOnCourse.count({
    where: {
      userId,
      courseId,
    },
  });
}

async function deleteCourseLike(userId: number, courseId: number) {
  return await prisma.likeOnCourse.deleteMany({
    where: {
      userId,
      courseId,
    },
  });
}
