"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseUtil_1 = require("../helpers/responseUtil");
const course_services_1 = require("../services/course.services");
class CourseController {
    static async addCourseHandler(req, res, next) {
        try {
            if (await (0, course_services_1.findCourseByUrl)(req.body.url)) {
                return (0, responseUtil_1.errorResponse)(res, 409, "course with url already exists");
            }
            const data = await (0, course_services_1.addCourse)({ ...req.body });
            return (0, responseUtil_1.successResponse)(res, 201, "course added successfully", data);
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllCoursesHandler(req, res, next) {
        var _a, _b, _c, _d;
        try {
            const page = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.page, 10) || 1;
            const limit = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit, 10) || 10;
            const data = await (0, course_services_1.getAllCourses)((_c = req.query) === null || _c === void 0 ? void 0 : _c.ids, page, limit, (_d = req.query) === null || _d === void 0 ? void 0 : _d.user);
            return (0, responseUtil_1.successResponse)(res, 200, "courses retrieved", data);
        }
        catch (error) {
            next(error);
        }
    }
    static async getCourseHandler(req, res, next) {
        var _a;
        try {
            const id = parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, 10);
            const data = await (0, course_services_1.getCourse)(id);
            return (0, responseUtil_1.successResponse)(res, 200, "course retrieved", data);
        }
        catch (error) {
            next(error);
        }
    }
    static async removeCourseHandler(req, res, next) {
        var _a;
        try {
            const id = parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, 10);
            if (!(await (0, course_services_1.courseExists)(id))) {
                return (0, responseUtil_1.errorResponse)(res, 404, "course not found");
            }
            await (0, course_services_1.deleteCourse)(id);
            return (0, responseUtil_1.successResponse)(res, 204, "");
        }
        catch (error) {
            next(error);
        }
    }
    static async favoriteCourseHandler(req, res, next) {
        var _a, _b;
        try {
            const courseId = parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, 10);
            if (!(await (0, course_services_1.courseExists)(courseId))) {
                return (0, responseUtil_1.errorResponse)(res, 404, "course not found");
            }
            const response = await (0, course_services_1.toggleCourseFavorite)((_b = req.body) === null || _b === void 0 ? void 0 : _b.name, courseId);
            return (0, responseUtil_1.successResponse)(res, 200, response.message, response.result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = CourseController;
//# sourceMappingURL=course.controller.js.map