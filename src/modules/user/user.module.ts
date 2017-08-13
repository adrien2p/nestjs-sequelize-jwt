'use strict';

import { Module } from '@nestjs/common';
import { UserController } from './User.controller';

@Module({
    controllers: [UserController],
    components: [],
    modules: [],
    exports: []
})
export class UserModule { }
