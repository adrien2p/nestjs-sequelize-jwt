'use strict';

import { DatabaseConfig } from "../interfaces/config/IDatabase";

export const databaseConfig: DatabaseConfig = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        logging: false,
        force: true,
        timezone: "+02:00"
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: 'postgres',
        logging: false,
        force: true,
        timezone: "+02:00"
    }
};