'use strict';

require('dotenv').config();

import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DispatchError } from './filters/DispatchError';
import { ApplicationModule } from './modules/app.module';

const instance = express();
/* Express middleware. */
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
/* End of express middleware. */

NestFactory.create(ApplicationModule, instance).then(app => {
    /* App filters. */
    app.useGlobalFilters(new DispatchError());
    /* End of app filters. */
    app.listen(3000, () => console.log('Application is listening on port 3000.'));
});
