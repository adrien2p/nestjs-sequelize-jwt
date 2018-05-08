'use strict';

import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { MessageCodeError } from '../../shared/index';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    public async login(@Body() body, @Res() res) {
        if (!body) throw new MessageCodeError('auth:login:missingInformation');
        if (!body.email) throw new MessageCodeError('auth:login:missingEmail');
        if (!body.password) throw new MessageCodeError('auth:login:missingPassword');

        const token = await this.authService.sign(body);
        res.status(HttpStatus.ACCEPTED).json('Bearer ' + token);
    }
}
