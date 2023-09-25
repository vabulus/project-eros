import {PrismaClient, User} from "@prisma/client";
import express from "express";
import {sign_access_token} from "../utils/jwt";
import { create_user, check_user_existence, login_user } from '../services/authServices';
import createError from 'http-errors';

const prisma = new PrismaClient();

export default class AuthController{
    static register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const { username, email, password } = req.body;

            const errors = await check_user_existence(username, email);
            if (errors) {
                res.status(409).json({
                    status: false,
                    errors: errors
                });
                return;
            }

            const user = await create_user(username, email, password);

            if(req.body){
                req.body.accessToken = sign_access_token(req.body);
            }

            return res.status(200).json(req.body);

        } catch (e) {
            next(createError(500, "An unknown error occurred."));
        }
    }

    static login = async (req: express.Request, res:express.Response, next :express.NextFunction)=> {
        try {
            const { email, password } = req.body;
            const user = await login_user(email, password);

            res.status(200).json({
                status: true,
                accessToken: sign_access_token(user),
                message: "Login worked!",
            });


        } catch (e) {
            next(createError(500, "An unknown error occurred."));
        }
    }

    static all = async (req: express.Request, res:express.Response, next :express.NextFunction)=> {
        try {

        } catch (e) {

        }
    }
}


module.exports = AuthController;
