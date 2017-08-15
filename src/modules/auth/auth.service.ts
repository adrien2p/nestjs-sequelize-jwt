'use strict';

import { Component } from '@nestjs/common';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { MessageCodeError } from '../../lib/error/MessageCodeError';
import { models } from '../../models/index';
import { IAuthService, IJwtOptions } from './interfaces/IAuthService';

@Component()
export class AuthService implements IAuthService {
    private _options: IJwtOptions = {
        algorithm: 'HS256',
        expiresIn: '2 days',
        jwtid: process.env.JWT_ID || ''
    };

    get options (): IJwtOptions {
        return this._options;
    }

    set options (value: IJwtOptions) {
        this._options.algorithm = value.algorithm;
    }

    public async sign (credentials: { email: string, password: string }): Promise<string> {
        const user = await models.User.findOne({
            where: {
                email: credentials.email,
                password: crypto.createHmac('sha256', credentials.password).digest('hex')
            }
        });
        if (!user) throw new MessageCodeError('user:notFound');

        const payload = {
            id: user.dataValues.id,
            email: user.dataValues.email
        };

        return await jwt.sign(payload, process.env.JWT_KEY || '', this._options);
    }
}
