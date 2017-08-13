'use strict';

import { Module } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { AuthController } from "./Auth.controller";

@Module({
    controllers: [AuthController],
    components: [AuthService],
    modules: [],
    exports: []
})
export class AuthModule { }
