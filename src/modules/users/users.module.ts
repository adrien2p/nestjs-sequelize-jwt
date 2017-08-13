'use strict';

import { Module } from '@nestjs/common';
import { MiddlewaresConsumer } from "@nestjs/common/interfaces/middlewares";
import { AuthMiddleware } from "../../middlewares/auth.middleware";
import { UsersController } from './Users.controller';

@Module({
    controllers: [UsersController],
    components: [],
    modules: [],
    exports: []
})
export class UsersModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware).forRoutes(UsersController);
    }
}
