'use strict';

require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DispatchError } from './modules/common/filters/DispatchError';
import { ApplicationModule } from './modules/app.module';

const instance = express();
/* Express middleware. */
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
/* End of express middleware. */

async function bootstrap (): Promise<any> {
    const app = await NestFactory.create(ApplicationModule, instance);
    /* App filters. */
    app.useGlobalFilters(new DispatchError());
    /* End of app filters. */
    await app.listen(3000);
}

bootstrap().then(() => console.log('Application is listening on port 3000.'));
