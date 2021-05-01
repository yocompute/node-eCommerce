import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import { IModelResult } from "../model";
import { IUser } from "../user/user.entity";
import { UserModel } from "../user/user.model";
import { cfg } from "../config";
import logger from "../logger";

const SVC_PATH = process.env.ENV === 'local' ? cfg.SVC_PATH : '';
const paths = [
    `${SVC_PATH}/auth`,
    `${SVC_PATH}/auth/login`,
    `${SVC_PATH}/auth/signup`,
];


export const AuthMiddleWare = async function(req: Request, res: Response, next: NextFunction): Promise<void>{
        let token: string = req.get("Authorization") || "";
        token = token.replace("Bearer ", "");
        const path = req.path.toLowerCase();

        for (const p of paths) {
            if (path.indexOf(p) !== -1) {
                return next();
            }
        }

        res.setHeader("Content-Type", "application/json");
        if (token) {
            try {
                const userId = jwt.verify(token, process.env.JWT_SECRET || '');
                const userModel = new UserModel({});

                if (userId) {
                    const r: IModelResult<IUser> = await userModel.findOne({ _id: userId })
                    if (r.data) {
                        next();
                    } else {
                        res.status(401).send({ error: "Authorization failed: User does not exist" });
                    }
                } else {
                    res.status(401).send({ error: "Authorization failed: Invalid token" });
                }
            } catch (error) {
                logger.error(`${error}`);
                res.status(401).send({ error: `Authorization failed: ${error}` });
            }
        } else {
            res.status(401).send({ error: "Authorization token is required." });
        }
    }
