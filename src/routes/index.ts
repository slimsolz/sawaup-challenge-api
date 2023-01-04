import express, { Request, Response } from "express";
import { errorResponse, successResponse } from "../helpers/responseUtil";
import skillRouter from "./skill.route";
import courseRouter from "./course.route";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  successResponse(res, 200, "online courses API");
});

router.use("/skills", skillRouter);
router.use("/courses", courseRouter);

router.all("*", (req: Request, res: Response) => {
  errorResponse(res, 404, "404 route not found.");
});

export default router;
