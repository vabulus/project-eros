import createError from 'http-errors'
import express from "express";
import {verify_access_token} from "../utils/jwt";


export const auth = async (req: express.Request, res:express.Response,next:express.NextFunction)=> {
    if(!req.headers.authorization){
        return next(createError.Unauthorized("Access token is required!"));
    }
    const access_token = req.headers.authorization.split(' ')[0];
    if (!access_token){
        return next(createError.Unauthorized("Access token is not valid!"));
    }

    try {
        verify_access_token(access_token);
        next();
    } catch (e) {
        next(createError.Unauthorized(""));
    }
}