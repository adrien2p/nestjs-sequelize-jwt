'use strict';

import * as jwt from 'jsonwebtoken';
import { Middleware, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MessageCodeError } from '../lib/error/MessageCodeError';
import { User } from '../../users/user.entity';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    public resolve() {
        return async (req: Request, res: Response, next: NextFunction) => {
            if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
                const token = (req.headers.authorization as string).split(' ')[1];
                const decoded: any = jwt.verify(token, process.env.JWT_KEY || '');
                const user = await User.findOne<User>({
                    where: {
                        id: decoded.id,
                        email: decoded.email,
                    },
                });
                if (!user) throw new MessageCodeError('request:unauthorized');
                next();
            } else {
                throw new MessageCodeError('request:unauthorized');
            }
        };
    }
}
