import { Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { MiddlewareConsumer } from '@nestjs/common/interfaces/middleware';
import { AuthMiddleware } from '../../shared/index';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { usersProvider } from './user.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, usersProvider]
})
export class UserModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: '/users', method: RequestMethod.GET },
                { path: '/users/:id', method: RequestMethod.GET },
                { path: '/users/:id', method: RequestMethod.PUT },
                { path: '/users/:id', method: RequestMethod.DELETE }
            );
    }
}
