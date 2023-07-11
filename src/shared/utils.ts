import { HttpException, HttpStatus } from '@nestjs/common';

export const validateFields = (dto: any): void => {
    for (const field in dto) {
        if (!dto[field]) {
            throw new HttpException("Missing fields", HttpStatus.BAD_REQUEST);
        }
    }
};
