import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { getLoveLogTemplateFromDB } from "../services/lovelogServices";

export default class LoveLogController {
  static getLoveLogTemplate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const loveLogTemplate = await getLoveLogTemplateFromDB(1);

      return res.status(200).json(loveLogTemplate);
    } catch (e) {
      next(createError(500, "An unknown error occurred."));
    }
  };

  static getLoveLog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.status(200).json("");
    } catch (e) {
      next(createError(500, "An unknown error occurred."));
    }
  };

  static createLoveLog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.status(200).json("");
    } catch (e) {
      next(createError(500, "An unknown error occurred."));
    }
  };
}
