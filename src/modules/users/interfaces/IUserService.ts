'use strict';

import { User } from '../user.entity';
import { IUser } from '../interfaces/index';

export interface IUserService {
    findAll(): Promise<Array<User>>;
    findById(id: number): Promise<User | null>;
    findOne(options: Object): Promise<User | null>;
    create(user: IUser): Promise<User>;
    update(id: number, newValue: IUser): Promise<User | null>;
    delete(id: number): Promise<void>;
}
