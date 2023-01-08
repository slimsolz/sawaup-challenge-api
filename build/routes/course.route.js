"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const schemas_1 = require("../utils/schemas");
const courseRouter = express_1.default.Router();
courseRouter.post("/", (0, validation_middleware_1.default)(schemas_1.CourseSchema), course_controller_1.default.addCourseHandler);
courseRouter.get("/", course_controller_1.default.getAllCoursesHandler);
courseRouter.get("/:id", course_controller_1.default.getCourseHandler);
courseRouter.delete("/:id", course_controller_1.default.removeCourseHandler);
courseRouter.post("/favorite/:id", course_controller_1.default.favoriteCourseHandler);
exports.default = courseRouter;
//# sourceMappingURL=course.route.js.map