'use strict';

import { Controller, Post, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessageCodeError } from "../../lib/error/MessageCodeError";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    public async login(req: Request, res: Response) {
        const body = req.body;
        if (!body || (body && Object.keys(body).length === 0)) throw new MessageCodeError('auth:login:missingInformation');

        const token = await this.authService.sign(body);
        res.status(HttpStatus.ACCEPTED).json('Bearer ' + token);
    }
}