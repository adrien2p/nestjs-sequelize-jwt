import { Inject, Injectable } from '@nestjs/common';
import { MessageCodeError } from '../../shared/errors/message-code-error';
import { IUser, IUserService } from './interfaces/index';
import { User } from './user.entity';

@Injectable()
export class UserService implements IUserService {
    constructor(
        @Inject('UserRepository') private readonly userRepository: typeof User,
        @Inject('SequelizeInstance') private readonly sequelizeInstance
    ) {}

    public async findAll(): Promise<Array<User>> {
        return await this.userRepository.findAll<User>();
    }

    public async findOne(options: Object): Promise<User | null> {
        return await this.userRepository.findOne<User>(options);
    }

    public async findById(id: number): Promise<User | null> {
        return await this.userRepository.findById<User>(id);
    }

    public async create(user: IUser): Promise<User> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.userRepository.create<User>(user, {
                returning: true,
                transaction
            });
        });
    }

    public async update(id: number, newValue: IUser): Promise<User | null> {
        return await this.sequelizeInstance.transaction(async transaction => {
            let user = await this.userRepository.findById<User>(id, {
                transaction
            });
            if (!user) throw new MessageCodeError('user:notFound');

            user = this._assign(user, newValue);
            return await user.save({
                returning: true,
                transaction
            });
        });
    }

    public async delete(id: number): Promise<void> {
        return await this.sequelizeInstance.transaction(async transaction => {
            return await this.userRepository.destroy({
                where: { id },
                transaction
            });
        });
    }

    /**
     * @description: Assign new value in the user found in the database.
     *
     * @param {IUser} user
     * @param {IUser} newValue
     * @return {User}
     * @private
     */
    private _assign(user: IUser, newValue: IUser): User {
        for (const key of Object.keys(user)) {
            if (user[key] !== newValue[key]) user[key] = newValue[key];
        }

        return user as User;
    }
}
