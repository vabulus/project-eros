import type { NextFunction, Request, Response } from "express";
import createError from "http-errors";

import {
  check_user_existence,
  create_user,
  login_user,
} from "../services/authServices";
import {decrypt_access_token, sign_access_token, verify_access_token} from "../utils/jwt";
import {get_user_details} from "../userProfileServices";


export default class AuthController {
  static register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password } = req.body;

      const errors = await check_user_existence(username, email);
      if (errors) {
        res.status(409).json({
          status: false,
          errors: errors,
        });
        return;
      }
      await create_user(username, email, password);
      if (req.body) {
        req.body.token = sign_access_token(req.body);
      }

      return res.status(200).json(req.body);
    } catch (e) {
      next(createError(500, "An unknown error occurred."));
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await login_user(email, password);

      res.status(200).json({
        status: true,
        token: sign_access_token(user),
        message: "Login worked!",
      });
    } catch (e) {
      if (createError.isHttpError(e) && e.statusCode === 401) {
        res.status(401).json({
          status: false,
          message: "Unauthorized!",
        });
        return;
      } else {
        console.error("Caught an unexpected error:", e);
      }
    }
  };

  static all = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (e) {}
  };


  static profile = async (req: Request, res: Response, next: NextFunction) => {
    // already checked if user token is valid, through middleware

      if(req.headers.authorization){
        type UserJwtType = { username: string; email: string };

        let user_details = undefined;

        try{
          const user_jwt: UserJwtType = decrypt_access_token(req.headers.authorization) as UserJwtType;
          user_details = await get_user_details(user_jwt.username, user_jwt.email);
        }
        catch (e){
          return res.status(401).json({
            status: false,
            message: "Unauthorized"
          });
        }

        if(user_details){
          return res.status(200).json({
            status: true,
            user_details: user_details
          })
        }
      }
  }

  static logout = async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({
      status: true,
      message: 'Logged out successfully'
    });

  }
}
