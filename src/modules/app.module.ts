'use strict';

import { Module } from '@nestjs/common';
import { UserModule } from "./user/user.module";

@Module({
    controllers: [],
    components: [],
    modules: [UserModule],
    exports: []
})
export class ApplicationModule { }
