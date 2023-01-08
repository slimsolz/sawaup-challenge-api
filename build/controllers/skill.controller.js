"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const responseUtil_1 = require("../helpers/responseUtil");
const skill_services_1 = require("../services/skill.services");
class SkillController {
    static async addNewSkillHandler(req, res, next) {
        try {
            if (await (0, skill_services_1.skillExists)(req.body.name)) {
                return (0, responseUtil_1.errorResponse)(res, 409, "skill already exists");
            }
            const data = await (0, skill_services_1.addNewSkill)({ ...req.body });
            return (0, responseUtil_1.successResponse)(res, 201, "skill added successfully", data);
        }
        catch (error) {
            next(error);
        }
    }
    static async getAllSkillsHandler(req, res, next) {
        try {
            const data = await (0, skill_services_1.getAllSkills)(req.query.name);
            return (0, responseUtil_1.successResponse)(res, 200, "skills retrieved", data);
        }
        catch (error) {
            next(error);
        }
    }
    static async getSkillHandler(req, res, next) {
        var _a;
        try {
            const id = parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, 10);
            const data = await (0, skill_services_1.getSkill)(id);
            return (0, responseUtil_1.successResponse)(res, 200, "skill retrieved", data);
        }
        catch (error) {
            next(error);
        }
    }
    static async removeSkillHandler(req, res, next) {
        var _a;
        try {
            const id = parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, 10);
            if (!(await (0, skill_services_1.skillExists)(id))) {
                return (0, responseUtil_1.errorResponse)(res, 404, "skill not found");
            }
            await (0, skill_services_1.deleteSkill)(id);
            return (0, responseUtil_1.successResponse)(res, 204, "");
        }
        catch (error) {
            next(error);
        }
    }
    static async updateSkillHandler(req, res, next) {
        var _a;
        try {
            const id = parseInt((_a = req.params) === null || _a === void 0 ? void 0 : _a.id, 10);
            if (!(await (0, skill_services_1.skillExists)(id))) {
                return (0, responseUtil_1.errorResponse)(res, 404, "skill not found");
            }
            const data = await (0, skill_services_1.updateSkill)(id, req.body);
            return (0, responseUtil_1.successResponse)(res, 200, "skill updated", data);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = SkillController;
//# sourceMappingURL=skill.controller.js.map