import createError from "http-errors";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

import { SECRET_KEY } from "../config";

export function sign_access_token(payload: any) {
  try {
    if (SECRET_KEY) {
      return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
    }
  } catch {
    throw createError.InternalServerError("Internal server error");
  }
}

export function verify_access_token(access_token: string) {
  if (!SECRET_KEY) {
    throw createError.InternalServerError("Internal server error");
  }

  if (!access_token) {
    throw createError.Unauthorized("Token not provided");
  }

  jwt.verify(access_token, SECRET_KEY, (err: any, decoded: any) => {
    if (err) {
      return createError.Unauthorized("Invalid token");
    }
    return access_token;
  });
}
export function decrypt_access_token(access_token: string){
  return jwt_decode(access_token);
}
