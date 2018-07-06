import * as jwt from 'jsonwebtoken';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { MessageCodeError } from '../errors/message-code-error';
import { User } from '../../modules/users/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    public resolve() {
        return async (req, res, next) => {
            if (req.headers.authorization && (req.headers.authorization as string).split(' ')[0] === 'Bearer') {
                const token = (req.headers.authorization as string).split(' ')[1];
                const decoded: any = jwt.verify(token, process.env.JWT_KEY || '');
                const user = await User.findOne<User>({
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
        };
    }
}
