'use strict';

import { Controller, Get, Post, Delete, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessageCodeError } from "../../lib/error/MessageCodeError";
import { IUser } from "../../models/interfaces/IUser";
import { models, sequelize } from "../../models/index";

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
        if (!id) throw new MessageCodeError('user:show:missingInformation');

        const user = await models.User.findOne({
            where: { id }
        });
        return res.status(HttpStatus.OK).json(user);
    }

    @Post('users')
    public async create(req: Request, res: Response) {
        const body: IUser = req.body;
        if (!body || (body && Object.keys(body).length === 0)) throw new MessageCodeError('user:create:missingInformation');

        await sequelize.transaction(async t => {
            await models.User.create(body, { transaction: t })
        });

        return res.status(HttpStatus.CREATED).send();
    }

    @Delete('users/:id')
    public async delete(req: Request, res: Response) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('user:delete:missingInformation');

        await sequelize.transaction(async t => {
            await models.User.destroy({
                where: { id },
                transaction: t
            });
        });

        return res.status(HttpStatus.CREATED).send();
    }
}