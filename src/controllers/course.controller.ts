import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../helpers/responseUtil";
import {
  addCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  courseExists,
  toggleCourseFavorite,
  findCourseByUrl,
} from "../services/course.services";

class CourseController {
  static async addCourseHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (await findCourseByUrl(req.body.url)) {
        return errorResponse(res, 409, "course with url already exists");
      }

      const data = await addCourse({ ...req.body });
      return successResponse(res, 201, "course added successfully", data);
    } catch (error: any) {
      next(error);
    }
  }

  static async getAllCoursesHandler(
    req: Request<
      {},
      {},
      {},
      { user: string; ids: any | undefined; page: string; limit: string }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const page = parseInt(req.query?.page, 10) || 1;
      const limit = parseInt(req.query?.limit, 10) || 10;

      const data = await getAllCourses(
        req.query?.ids,
        page,
        limit,
        req.query?.user
      );
      return successResponse(res, 200, "courses retrieved", data);
    } catch (error: any) {
      next(error);
    }
  }

  static async getCourseHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params?.id, 10);
      const data = await getCourse(id);
      return successResponse(res, 200, "course retrieved", data);
    } catch (error: any) {
      next(error);
    }
  }

  static async removeCourseHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params?.id, 10);
      if (!(await courseExists(id))) {
        return errorResponse(res, 404, "course not found");
      }

      await deleteCourse(id);
      return successResponse(res, 204, "");
    } catch (error: any) {
      next(error);
    }
  }

  static async favoriteCourseHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const courseId = parseInt(req.params?.id, 10);
      if (!(await courseExists(courseId))) {
        return errorResponse(res, 404, "course not found");
      }

      const response = await toggleCourseFavorite(req.body?.name, courseId);
      return successResponse(res, 200, response.message, response.result);
    } catch (error: any) {
      next(error);
    }
  }
}

export default CourseController;
