'use strict';

import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/Users.controller';

@Module({
    controllers: [UsersController],
    components: [],
    modules: [],
    exports: []
})
export class ApplicationModule {
}
