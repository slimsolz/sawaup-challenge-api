import express from "express";
import CourseController from "../controllers/course.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { CourseSchema } from "../utils/schemas";

const courseRouter = express.Router();

courseRouter.post(
  "/",
  validationMiddleware(CourseSchema),
  CourseController.addCourseHandler
);
courseRouter.get("/", CourseController.getAllCoursesHandler);
courseRouter.get("/:id", CourseController.getCourseHandler);
courseRouter.delete("/:id", CourseController.removeCourseHandler);

export default courseRouter;
