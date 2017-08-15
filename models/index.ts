'use strict';

import * as fs from 'fs';
import * as path from 'path';
import * as SequelizeStatic from 'sequelize';
import { Sequelize } from 'sequelize';
import { databaseConfig } from '../config/dataBase';
import { IUser, IUserInstance } from './interfaces/IUser';

export interface SequelizeModels {
    User: SequelizeStatic.Model<IUserInstance, IUser>;
}

class Database {
    private _basename: string;
    private _models: SequelizeModels;
    private _sequelize: Sequelize;

    constructor () {
        this._basename = path.basename(module.filename);
        let dbConfig = databaseConfig[process.env.NODE_ENV || 'development'];

        this._sequelize = new SequelizeStatic(dbConfig.database, dbConfig.username,
            dbConfig.password, dbConfig);
        this._models = ({} as any);

        fs.readdirSync(__dirname).filter((file: string) => {
            return (file !== this._basename) && (file !== 'interfaces');
        }).forEach((file: string) => {
            let model = this._sequelize.import(path.join(__dirname, file));
            this._models[(model as any).name] = model;
        });

        Object.keys(this._models).forEach((modelName: string) => {
            if (typeof this._models[modelName].associate === 'function') {
                this._models[modelName].associate(this._models);
            }
        });
    }

    getModels () {
        return this._models;
    }

    getSequelize () {
        return this._sequelize;
    }
}

const database = new Database();
export const models = database.getModels();
export const sequelize = database.getSequelize();
