'use strict';

import { Module } from '@nestjs/common';
import { databaseProvider } from './database.provider';

@Module({
    components: [databaseProvider],
    exports: [databaseProvider],
})
export class DatabaseModule {}
