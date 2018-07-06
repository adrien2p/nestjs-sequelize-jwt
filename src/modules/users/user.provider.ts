import { User } from './user.entity';

export const usersProvider = {
    provide: 'UserRepository',
    useValue: User
};
