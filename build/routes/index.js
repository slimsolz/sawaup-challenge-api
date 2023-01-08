"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const responseUtil_1 = require("../helpers/responseUtil");
const skill_route_1 = __importDefault(require("./skill.route"));
const course_route_1 = __importDefault(require("./course.route"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    (0, responseUtil_1.successResponse)(res, 200, "online courses API");
});
router.use("/skills", skill_route_1.default);
router.use("/courses", course_route_1.default);
router.all("*", (req, res) => {
    (0, responseUtil_1.errorResponse)(res, 404, "404 route not found.");
});
exports.default = router;
//# sourceMappingURL=index.js.map