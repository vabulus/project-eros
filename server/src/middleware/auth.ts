import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import { verify_access_token } from "../utils/jwt";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return next(createError.Unauthorized("Access token is required!"));
  }
  const access_token = req.headers.authorization.split(" ")[0];
  if (!access_token) {
    return next(createError.Unauthorized("Access token is not valid!"));
  }

  try {
    verify_access_token(access_token);
    console.log("access token is valid");
  } catch (e) {
    next(createError.Unauthorized(""));
  }

  return "";
};
