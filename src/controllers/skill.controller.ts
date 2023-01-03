import { Request, Response, NextFunction } from "express";
import { errorResponse, successResponse } from "../helpers/responseUtil";
import {
  addNewSkill,
  deleteSkill,
  getAllSkills,
  getSkill,
  skillExists,
  updateSkill,
} from "../services/skill.services";

class SkillController {
  static async addNewSkillHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (await skillExists(req.body.name)) {
        return errorResponse(res, 409, "skill already exists");
      }

      const data = await addNewSkill({ ...req.body });
      return successResponse(res, 201, "skill added successfully", data);
    } catch (error: any) {
      next(error);
    }
  }

  static async getAllSkillsHandler(
    req: Request<{}, {}, {}, { name: string | undefined }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await getAllSkills(req.query.name);
      return successResponse(res, 200, "skills retrieved", data);
    } catch (error: any) {
      next(error);
    }
  }

  static async getSkillHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params?.id, 10);
      const data = await getSkill(id);
      return successResponse(res, 200, "skill retrieved", data);
    } catch (error: any) {
      next(error);
    }
  }

  static async removeSkillHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params?.id, 10);
      if (!(await skillExists(id))) {
        return errorResponse(res, 404, "skill not found");
      }

      await deleteSkill(id);
      return successResponse(res, 204, "skill removed");
    } catch (error: any) {
      next(error);
    }
  }

  static async updateSkillHandler(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const id = parseInt(req.params?.id, 10);
      if (!(await skillExists(id))) {
        return errorResponse(res, 404, "skill not found");
      }

      const data = await updateSkill(id, req.body);
      return successResponse(res, 200, "skill updated", data);
    } catch (error: any) {
      next(error);
    }
  }
}

export default SkillController;
