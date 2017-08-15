'use strict';

import { Instance } from 'sequelize';

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthday?: Date;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export interface IUserInstance extends Instance<IUser> {
    dataValues: IUser;
}
