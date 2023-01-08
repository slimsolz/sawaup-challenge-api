"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skill_controller_1 = __importDefault(require("../controllers/skill.controller"));
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const schemas_1 = require("../utils/schemas");
const skillRouter = express_1.default.Router();
skillRouter.post("/", (0, validation_middleware_1.default)(schemas_1.SkillSchema), skill_controller_1.default.addNewSkillHandler);
skillRouter.get("/", skill_controller_1.default.getAllSkillsHandler);
skillRouter.get("/:id", skill_controller_1.default.getSkillHandler);
skillRouter.put("/:id", (0, validation_middleware_1.default)(schemas_1.SkillSchema), skill_controller_1.default.updateSkillHandler);
skillRouter.delete("/:id", skill_controller_1.default.removeSkillHandler);
exports.default = skillRouter;
//# sourceMappingURL=skill.route.js.map