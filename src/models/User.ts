import * as crypto from 'crypto';
import * as SequelizeStatic from 'sequelize';
import { DataTypes, Sequelize } from 'sequelize';
import { IUser, IUserInstance } from './interfaces/IUser';
import { MessageCodeError } from '../lib/error/MessageCodeError';

export default function User (sequelize: Sequelize, dataTypes: DataTypes): SequelizeStatic.Model<IUserInstance, IUser> {
    let User = sequelize.define<IUserInstance, IUser>('User', {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName: {
            type: dataTypes.CHAR(30),
            allowNull: false
        },
        lastName: {
            type: dataTypes.CHAR(30),
            allowNull: false
        },
        email: {
            type: dataTypes.CHAR(100),
            allowNull: false,
            unique: "L'adresse e-mail fourni existe déjà, veuillez en choisir une autre.",
            validate: {
                isEmail: {
                    args: true,
                    msg: "L'adresse e-mail fourni ne correspond pas à une email valid."
                },
                isUnique: async (value: string, next: Function): Promise<any> => {
                    const isExist = await User.findOne({ where: { email: value }});
                    if (isExist) {
                        const error = new MessageCodeError('user:create:emailAlreadyExist');
                        next(error);
                    }
                    next();
                }
            }
        },
        password: {
            type: dataTypes.TEXT,
            allowNull: false
        },
        birthday: {
            type: dataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true
            }
        },
        createdAt: {
            type: dataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: dataTypes.DATE,
            allowNull: true
        },
        deletedAt: {
            type: dataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'users',
        paranoid: true,
        timestamps: true,
        scopes: {},
        indexes: [],
        classMethods: {},
        instanceMethods: {},
        hooks: {
            beforeValidate (user: IUserInstance, options: any): void {
                if (!options.transaction) throw new Error('Missing transaction.');
                if (!user.getDataValue('firstName')) throw new MessageCodeError('user:create:missingFirstName');
                if (!user.getDataValue('lastName')) throw new MessageCodeError('user:create:missingLastName');
                if (!user.getDataValue('email')) throw new MessageCodeError('user:create:missingEmail');
                if (!user.getDataValue('password')) throw new MessageCodeError('user:create:missingPassword');
            },
            beforeCreate (user: IUserInstance, options: any): void {
                if (!options.transaction) throw new Error('Missing transaction.');

                user.dataValues.password = crypto.createHmac('sha256', user.dataValues.password).digest('hex');
            },
            beforeDestroy (user: IUserInstance, options: any): void {
                if (!options.transaction) throw new Error('Missing transaction.');
            }
        }
    });

    return User;
}
