'use strict';

import { Module, RequestMethod } from '@nestjs/common';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { UsersController } from './users.controller';

@Module({
    controllers: [UsersController],
    components: [],
    modules: [],
    exports: []
})
export class UsersModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(
            { path: '/users', method: RequestMethod.GET },
            { path: '/users/:id', method: RequestMethod.GET },
            { path: '/users/:id', method: RequestMethod.PUT },
            { path: '/users/:id', method: RequestMethod.DELETE }
        );
    }
}
