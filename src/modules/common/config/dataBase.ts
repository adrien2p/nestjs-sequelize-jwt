'use strict';

import * as path from 'path';
import { DatabaseConfig } from './interfaces/IDatabase';
import { Sequelize } from 'sequelize-typescript';

export const databaseConfig: DatabaseConfig = {
    development: {
        username: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
        force: true,
        timezone: '+02:00',
        modelPaths: [
            path.resolve(__dirname, '../models')
        ]
    },
    production: {
        username: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: false,
        force: true,
        timezone: '+02:00',
        modelPaths: [
            path.resolve(__dirname, '../models')
        ]
    },
    test: {
        username: process.env.DB_USER || '',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || '',
        host: process.env.DB_HOST || '127.0.0.1',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres',
        logging: true,
        force: true,
        timezone: '+02:00',
        modelPaths: [
            path.resolve(__dirname, '../models')
        ]
    }
};

const config = !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ?
    databaseConfig.development :
    databaseConfig.production;
export const sequelize: Sequelize = new Sequelize(config);