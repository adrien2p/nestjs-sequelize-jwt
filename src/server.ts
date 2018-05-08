'use strict';

import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { DispatchError } from './shared/filters/dispatch-error';
import { ApplicationModule } from './app.module';

async function bootstrap(): Promise<any> {
    const app = await NestFactory.create(ApplicationModule);
    app.useGlobalFilters(new DispatchError());
    await app.listen(3000);
}

bootstrap();
