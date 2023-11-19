import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import {createLoveLog, getAllLovelogs, getLovelog, getLoveLogTemplateFromDB} from "../services/lovelogServices";

export default class LoveLogController {
  static getLoveLogTemplate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const requestedLoveLogTemplate = req.params.id;
      const loveLogTemplate = await getLoveLogTemplateFromDB(Number(requestedLoveLogTemplate));

      return res.status(200).json(loveLogTemplate);
    } catch (e) {
      // next(createError(500, "An unknown error occurred."));
      console.log(e);
    }
  };
  static getAllLoveLogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await getAllLovelogs(req);
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
      await getLovelog(req);
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
      await createLoveLog(req);
    } catch (e) {
      console.log(e);
    }
  };

  static deleteLoveLog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.status(200).json("");
    } catch (e) {
      next(createError(500, "An unknown error occurred."));
    }
  }

  static updateLoveLog = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.status(200).json("");
    } catch (e) {
      next(createError(500, "An unknown error occurred."));
    }
  }
}
