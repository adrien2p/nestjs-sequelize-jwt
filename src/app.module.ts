'use strict';

import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    modules: [
        UserModule,
        AuthModule,
    ],
})
export class ApplicationModule { }
