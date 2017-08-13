'use strict';

import { Middleware, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken';
import { MessageCodeError } from "../lib/error/MessageCodeError";
import { models } from "../models/index";

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    resolve() {
        return async function (req: Request, res: Response, next: NextFunction) {
            if (req.headers.authorization && (<string>req.headers.authorization).split(' ')[0] === 'Bearer') {
                let token = (<string>req.headers.authorization).split(' ')[1];
                const decoded: any = await jwt.verify(token, process.env.JWT_KEY);
                const user = await models.User.findOne({
                    where: {
                        id: decoded.id,
                        email: decoded.email
                    }
                });
                if (!user) throw new MessageCodeError('request:unauthorized');
                next();
            } else {
                throw new MessageCodeError('request:unauthorized');
            }
        }
    }
}