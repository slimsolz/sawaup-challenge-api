"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseSchema = exports.SkillSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.SkillSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(1).max(999),
});
exports.CourseSchema = joi_1.default.object({
    name: joi_1.default.string().required().min(1).max(999),
    url: joi_1.default.string().required().min(1).max(999),
    thumbnail: joi_1.default.string().required().min(1).max(999),
    skills: joi_1.default.array().items(joi_1.default.number()).required(),
});
//# sourceMappingURL=schemas.js.map