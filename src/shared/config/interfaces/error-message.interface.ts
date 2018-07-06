import { HttpStatus } from '@nestjs/common';

export interface IErrorMessages {
    type: string;
    httpStatus: HttpStatus;
    errorMessage: string;
    userMessage: string;
}
