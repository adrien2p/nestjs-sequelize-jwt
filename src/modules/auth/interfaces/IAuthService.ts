'use strict';

export interface IAuthService {
    options: IJwtOptions;

    /**
     * @description: Sign the user, create a new token before it insert in the response header Authorization.
     * @param {email: string; password: string} credentials
     * @return {Promise<string>}
     */
    sign (credentials: { email: string, password: string }): Promise<string>;
}

export interface IJwtOptions {
    algorithm: string;
    expiresIn: number | string;
    jwtid: string;
}
