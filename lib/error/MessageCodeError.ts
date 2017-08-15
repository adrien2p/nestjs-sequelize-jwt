'use strict';

import { errorMessagesConfig } from '../../config/errorMessages';
import { IErrorMessages } from '../../config/interfaces/IErrorMessages';

export class MessageCodeError extends Error {
    public messageCode: string;
    public httpStatus: number;
    public errorMessage: string;

    constructor (messageCode: string) {
        super();

        const errorMessageConfig = this.getMessageFromMessageCode(messageCode);
        if (!errorMessageConfig) throw new Error('Unable to find message code error.');

        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.httpStatus = errorMessageConfig.httpStatus;
        this.messageCode = messageCode;
        this.errorMessage = errorMessageConfig.errorMessage;
        this.message = errorMessageConfig.userMessage;
    }

    /**
     * @description: Find the error config by the given message code.
     * @param {string} messageCode
     * @return {IErrorMessages}
     */
    private getMessageFromMessageCode (messageCode: string): IErrorMessages {
        let errorMessageConfig: IErrorMessages | undefined;
        Object.keys(errorMessagesConfig).some(key => {
            if (key === messageCode) {
                errorMessageConfig = errorMessagesConfig[key];
                return true;
            }
            return false;
        });

        if (!errorMessageConfig) throw new Error('Unable to find the given message code error.');
        return errorMessageConfig;
    }
}
