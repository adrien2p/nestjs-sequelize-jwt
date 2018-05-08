'use strict';

import * as dotenv from 'dotenv';
import { AuthService } from '../auth.service';
import { databaseProvider } from '../../database/database.provider';
import { fakeUser } from './fixtures/fake.data';
import { Test } from '@nestjs/testing';
import { User } from '../../users/user.entity';

dotenv.config();

describe('AuthService should', () => {
    let authService: AuthService;
    let user: User;
    let sequelizeInstance: any;

    beforeAll(async () => {
        const module = await Test.createTestingModule({
            components: [
                AuthService,
                databaseProvider,
            ],
        }).compile();

        sequelizeInstance = module.get<any>(databaseProvider.provide);
        authService = module.get<AuthService>(AuthService);
    });

    beforeEach(async () => {
        await sequelizeInstance.sync();

        /* Create a new user for the test. */
        await sequelizeInstance.transaction(async t => {
            return user = await User.create<User>(fakeUser, {
                transaction: t,
                returning: true
            });
        });
    });

    it('allow to sign a new token and throw without user found', async () => {
        let error;
        try {
            await authService.sign({
                email: 'undefined@undefined.fr',
                password: 'password'
            });
        } catch (err) {
            error = err;
        }

        expect(error).not.toBeNull();
        expect(error.httpStatus).toEqual(404);
        expect(error.messageCode).toEqual('user:notFound');
        expect(error.errorMessage).toEqual('Unable to found the user with the provided information.');
        expect(error.message).toEqual('Aucun utilisateur trouvé avec les informations fourni.');
    });

    it('allow to sign a new token and return it', async () => {
        const token = await authService.sign({
            email: fakeUser.email,
            password: fakeUser.password
        });

        expect(token).not.toBeNull();
        expect(typeof token).toBe('string');
    });
});