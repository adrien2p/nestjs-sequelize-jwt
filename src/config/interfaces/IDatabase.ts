'use strict';

export interface DatabaseConfigAttributes {
    username: string;
    password: string;
    database: string;
    host: string;
    port: number;
    dialect: string;
    logging: boolean | Function;
    force: boolean;
    timezone: string;
}

export interface DatabaseConfig {
    development: DatabaseConfigAttributes;
    production: DatabaseConfigAttributes;
}
