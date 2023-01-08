"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCourseFavorite = exports.findCourseByUrl = exports.courseExists = exports.deleteCourse = exports.getCourse = exports.getAllCourses = exports.addCourse = void 0;
const client_1 = require("@prisma/client");
const user_services_1 = require("./user.services");
const prisma = new client_1.PrismaClient();
async function addCourse(input) {
    const connectQuery = input.skills.map((id) => {
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
exports.addCourse = addCourse;
async function getAllCourses(ids, page, limit, userName) {
    let filter = {};
    let user;
    let includeParams = {
        skills: {
            select: {
                skill: true,
            },
        },
    };
    if (userName) {
        user = await (0, user_services_1.findUser)(userName);
        if (!user) {
            user = await (0, user_services_1.addGuestUser)({ name: userName });
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
    let params = {
        take: limit,
        skip: limit * (page - 1),
        include: {
            ...includeParams,
        },
    };
    if (ids === null || ids === void 0 ? void 0 : ids.length) {
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
exports.getAllCourses = getAllCourses;
async function getCourse(id) {
    return await prisma.course.findFirstOrThrow({
        where: { id },
        include: { skills: true },
    });
}
exports.getCourse = getCourse;
async function deleteCourse(id) {
    return await prisma.course.delete({ where: { id } });
}
exports.deleteCourse = deleteCourse;
async function courseExists(id) {
    return await prisma.course.count({
        where: { id },
    });
}
exports.courseExists = courseExists;
async function findCourseByUrl(url) {
    return await prisma.course.count({
        where: { url },
    });
}
exports.findCourseByUrl = findCourseByUrl;
async function toggleCourseFavorite(name, courseId) {
    let result;
    let message = "added to favorite";
    let user = await (0, user_services_1.findUser)(name);
    if (!user) {
        user = await (0, user_services_1.addGuestUser)({ name });
    }
    if (await userAlreadyLikedCourse(user.id, courseId)) {
        result = await deleteCourseLike(user.id, courseId);
        message = "removed from favorite";
    }
    else {
        result = await prisma.likeOnCourse.create({
            data: {
                courseId,
                userId: user.id,
            },
        });
    }
    return { result, message };
}
exports.toggleCourseFavorite = toggleCourseFavorite;
async function userAlreadyLikedCourse(userId, courseId) {
    return await prisma.likeOnCourse.count({
        where: {
            userId,
            courseId,
        },
    });
}
async function deleteCourseLike(userId, courseId) {
    return await prisma.likeOnCourse.deleteMany({
        where: {
            userId,
            courseId,
        },
    });
}
//# sourceMappingURL=course.services.js.map