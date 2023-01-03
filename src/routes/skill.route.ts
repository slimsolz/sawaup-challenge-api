import express from "express";
import SkillController from "../controllers/skill.controller";
import validationMiddleware from "../middlewares/validation.middleware";
import { SkillSchema } from "../utils/schemas";

const skillRouter = express.Router();

skillRouter.post(
  "/",
  validationMiddleware(SkillSchema),
  SkillController.addNewSkillHandler
);
skillRouter.get("/", SkillController.getAllSkillsHandler);
skillRouter.get("/:id", SkillController.getSkillHandler);
skillRouter.put(
  "/:id",
  validationMiddleware(SkillSchema),
  SkillController.updateSkillHandler
);
skillRouter.delete("/:id", SkillController.removeSkillHandler);

export default skillRouter;
