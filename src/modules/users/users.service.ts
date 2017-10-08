'use strict';

import { Component, Inject } from '@nestjs/common';
import { Model } from 'sequelize-typescript';
import { MessageCodeError } from '../common/lib/error/MessageCodeError';
import { IUser, IUserService } from './interfaces/index';
import { User } from './user.entity';

@Component()
export class UsersService implements IUserService {
    constructor(@Inject('UsersRepository') private readonly usersRepository: typeof Model,
                @Inject('SequelizeInstance') private readonly sequelizeInstance) { }

    public async findAll(): Promise<Array<User>> {
        return await this.usersRepository.findAll<User>();
    }

    public async findOne(options: Object): Promise<User | null> {
        return await this.usersRepository.findOne<User>(options);
    }

    public async findById(id: number): Promise<User | null> {
        return await this.usersRepository.findById<User>(id);
    }

    public async create(user: IUser): Promise<User> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.usersRepository.create<User>(user, {
                returning: true,
                transaction,
            });
        });
    }

    public async update(id: number, newValue: IUser): Promise<User | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let user = await this.usersRepository.findById<User>(id, { transaction });
            if (!user) throw new MessageCodeError('user:notFound');

            user = this._assign(user, newValue);
            return await user.save({
                returning: true,
                transaction,
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.usersRepository.destroy({
                where: { id },
                transaction,
            });
        });
    }

    /**
     * @description: Assign new value in the user found in the database.
     *
     * @param {IUser} user
     * @param {IUser} newValue
     * @return {User}
     * @private
     */
    private _assign(user: IUser, newValue: IUser): User {
        for (const key of Object.keys(user)) {
            if (user[key] !== newValue[key]) user[key] = newValue[key];
        }

        return user as User;
    }
}
