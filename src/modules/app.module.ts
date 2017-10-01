'use strict';

import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    modules: [
        UsersModule,
        AuthModule
    ]
})
export class ApplicationModule { }
