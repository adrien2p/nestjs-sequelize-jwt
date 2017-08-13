'use strict';

import { Controller, Get, Post, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessageCodeError } from "../lib/error/MessageCodeError";
import { IUser } from "../interfaces/model/IUser";
import { models, sequelize } from "../models/index";

@Controller()
export class UsersController {
    @Get('users')
    public async index(req: Request, res: Response) {
        const users = await models.User.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Get('users/:id')
    public async show(req: Request, res: Response) {
        const id = req.params.id;
        const user = await models.User.findOne({
            where: { id }
        });
        return res.status(HttpStatus.OK).json(user);
    }

    @Post('users')
    public async create(req: Request, res: Response) {
        const body: IUser = req.body;
        if (!body || (body && Object.keys(body).length === 0)) {
            throw new MessageCodeError('user:create:missingInformation');
        }

        await sequelize.transaction(async t => {
            await models.User.create(body, { transaction: t })
        });

        return res.status(HttpStatus.CREATED).send();
    }
}