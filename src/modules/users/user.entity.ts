'use strict';

import * as crypto from 'crypto';
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BeforeValidate,
    BeforeCreate,
} from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';
import { MessageCodeError } from '../common/lib/error/MessageCodeError';

const tableOptions: IDefineOptions = { timestamp: true, tableName: 'users' } as IDefineOptions;

@Table(tableOptions)
export class User extends Model<User> {
    @Column({
        type: DataType.NUMERIC,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
    })
    public id: number;

    @Column({
        type: DataType.CHAR(30),
        allowNull: false,
    })
    public firstName: string;

    @Column({
        type: DataType.CHAR(30),
        allowNull: false,
    })
    public lastName: string;

    @Column({
        type: DataType.CHAR(100),
        allowNull: false,
        validate: {
            isEmail: true,
            isUnique: async (value: string, next: Function): Promise<any> => {
                const isExist = await User.findOne({ where: { email: value }});
                if (isExist) {
                    const error = new MessageCodeError('user:create:emailAlreadyExist');
                    next(error);
                }
                next();
            },
        },
    })
    public email: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    public password: string;

    @Column({ type: DataType.DATE })
    public birthday: Date;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @DeletedAt
    public deletedAt: Date;

    @BeforeValidate
    public static validateData(user: User, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');
        if (!user.firstName) throw new MessageCodeError('user:create:missingFirstName');
        if (!user.lastName) throw new MessageCodeError('user:create:missingLastName');
        if (!user.email) throw new MessageCodeError('user:create:missingEmail');
        if (!user.password) throw new MessageCodeError('user:create:missingPassword');
    }

    @BeforeCreate
    public static async hashPassword(user: User, options: any) {
        if (!options.transaction) throw new Error('Missing transaction.');

        user.password = crypto.createHmac('sha256', user.password).digest('hex');
    }
}
