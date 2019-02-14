import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { MessageCodeError } from '../../shared/index';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Get()
    public async index(@Res() res) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post()
    public async create(@Body() body, @Res() res) {
        if (!body || (body && Object.keys(body).length === 0))
            throw new MessageCodeError('user:create:missingInformation');

        await this.usersService.create(body);
        return res.status(HttpStatus.CREATED).send();
    }

    @Get(':id')
    public async show(@Param('id') id: number, @Res() res) {
        if (!id) throw new MessageCodeError('user:show:missingId');

        const user = await this.usersService.findById(id);
        return res.status(HttpStatus.OK).json(user);
    }

    @Put(':id')
    public async update(@Body() body, @Param('id') id: number, @Res() res) {
        if (!id) throw new MessageCodeError('user:update:missingId');

        await this.usersService.update(id, body);
        return res.status(HttpStatus.OK).send();
    }

    @Delete(':id')
    public async delete(@Param('id') id: number, @Res() res) {
        if (!id) throw new MessageCodeError('user:delete:missingId');

        await this.usersService.delete(id);
        return res.status(HttpStatus.OK).send();
    }
}
