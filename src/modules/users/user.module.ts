'use strict';

import { Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { AuthMiddleware } from '../../shared/index';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { usersProvider } from './user.provider';

@Module({
    modules: [DatabaseModule],
    controllers: [UserController],
    components: [
        UserService,
        usersProvider,
    ],
})
export class UserModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(
            { path: '/users', method: RequestMethod.GET },
            { path: '/users/:id', method: RequestMethod.GET },
            { path: '/users/:id', method: RequestMethod.PUT },
            { path: '/users/:id', method: RequestMethod.DELETE },
        );
    }
}
