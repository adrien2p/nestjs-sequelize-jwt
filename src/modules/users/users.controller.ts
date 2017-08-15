'use strict';

import { Controller, Get, Post, Put, Delete, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { MessageCodeError } from '../../lib/error/MessageCodeError';
import { models, sequelize } from '../../models/index';

@Controller()
export class UsersController {
    @Get('users')
    public async index (req: Request, res: Response) {
        const users = await models.User.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('users')
    public async create (req: Request, res: Response) {
        const body = req.body;
        if (!body || (body && Object.keys(body).length === 0)) throw new MessageCodeError('user:create:missingInformation');

        await sequelize.transaction(async t => {
            return await models.User.create(body, { transaction: t });
        });

        return res.status(HttpStatus.CREATED).send();
    }

    @Get('users/:id')
    public async show (req: Request, res: Response) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('user:show:missingId');

        const user = await models.User.findOne({
            where: { id }
        });
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('users/:id')
    public async update (req: Request, res: Response) {
        const id = req.params.id;
        const body = req.body;
        if (!id) throw new MessageCodeError('user:update:missingId');
        if (!body || (body && Object.keys(body).length === 0)) throw new MessageCodeError('user:update:missingInformation');

        await sequelize.transaction(async t => {
            const user = await models.User.findById(id, { transaction: t });
            if (!user) throw new MessageCodeError('user:notFound');

            /* Keep only the values which was modified. */
            const newValues = {};
            for (const key of Object.keys(body)) {
                if (user.getDataValue(key) !== body[key]) newValues[key] = body[key];
            }

            return await user.update(newValues, { transaction: t });
        });

        return res.status(HttpStatus.OK).send();
    }

    @Delete('users/:id')
    public async delete (req: Request, res: Response) {
        const id = req.params.id;
        if (!id) throw new MessageCodeError('user:delete:missingId');

        await
        sequelize.transaction(async t => {
            return await models.User.destroy({
                where: { id },
                transaction: t
            });
        });

        return res.status(HttpStatus.OK).send();
    }
}
