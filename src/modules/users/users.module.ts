'use strict';

import { Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MiddlewaresConsumer } from '@nestjs/common/interfaces/middlewares';
import { AuthMiddleware } from '../common/index';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';

@Module({
    modules: [DatabaseModule],
    controllers: [UsersController],
    components: [
        UsersService,
        usersProvider
    ]
})
export class UsersModule {
    configure (consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(
            { path: '/users', method: RequestMethod.GET },
            { path: '/users/:id', method: RequestMethod.GET },
            { path: '/users/:id', method: RequestMethod.PUT },
            { path: '/users/:id', method: RequestMethod.DELETE }
        );
    }
}
