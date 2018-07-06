import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { MessageCodeError } from '../../shared/index';
import { IAuthService, IJwtOptions } from './interfaces/auth-service.interface';
import { User } from '../users/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService implements IAuthService {
    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '2 days',
        jwtid: process.env.JWT_ID || ''
    };

    get options(): IJwtOptions {
        return this._options;
    }

    set options(value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

    public async sign(credentials: { email: string; password: string }): Promise<string> {
        const user = await User.findOne<User>({
            where: {
                email: credentials.email,
                password: crypto.createHmac('sha256', credentials.password).digest('hex')
            }
        });
        if (!user) throw new MessageCodeError('user:notFound');

        const payload = {
            id: user.id,
            email: user.email
        };

        return await jwt.sign(payload, process.env.JWT_KEY || '', this._options);
    }
}
