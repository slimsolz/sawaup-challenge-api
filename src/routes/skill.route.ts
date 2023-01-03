import express from "express";
import SkillController from "../controllers/skill.controller";

const skillRouter = express.Router();

skillRouter.post("/", SkillController.addNewSkillHandler);
skillRouter.get("/", SkillController.getAllSkillsHandler);
skillRouter.get("/:id", SkillController.getSkillHandler);
skillRouter.put("/:id", SkillController.updateSkillHandler);
skillRouter.delete("/:id", SkillController.removeSkillHandler);

export default skillRouter;
