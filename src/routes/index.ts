import express, { Request, Response } from "express";
import { errorResponse, successResponse } from "../helpers/responseUtil";
import skillRouter from "./skill.route";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  successResponse(res, 200, "online courses API");
});

router.use("/skills", skillRouter);

router.all("*", (req: Request, res: Response) => {
  errorResponse(res, 404, "404 route not found.");
});

export default router;
