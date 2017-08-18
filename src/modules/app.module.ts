'use strict';

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    controllers: [],
    components: [],
    modules: [
        UsersModule,
        AuthModule
    ],
    exports: []
})
export class ApplicationModule { }
