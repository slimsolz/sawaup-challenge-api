import Joi from "joi";
import { errorResponse } from "../helpers/responseUtil";
import { NextFunction, Request, Response } from "express";

export default (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (!error) return next();

    const { details } = error;
    const message = details
      .map((i) => i.message.replace(/['"]+/g, ""))
      .join(",");

    return errorResponse(res, 422, message);
  };
