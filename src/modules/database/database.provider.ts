'use strict';

import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from '../common/index';
import { User } from '../users/user.entity';

export const databaseProvider = {
    provide: 'SequelizeInstance',
    useFactory: () => {
        let config;
        switch (process.env.NODE_ENV) {
        case 'prod':
        case 'production':
            config = databaseConfig.production;
        case 'dev':
        case 'development':
            config = databaseConfig.development;
        default:
            config = databaseConfig.development;
        }

        const sequelize = new Sequelize(config);
        sequelize.addModels([User]);
        /* await sequelize.sync(); add this if you want to sync model and DB.*/
        return sequelize;
    }
};
