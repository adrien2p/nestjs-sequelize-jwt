'use strict';

import { User } from './user.entity';

export const usersProvider = {
    provide: 'UsersRepository',
    useValue: User,
};
