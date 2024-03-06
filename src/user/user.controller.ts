import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Res() response: Response, @Body() postUser: CreateUserDto) {
    const { status, data } = this.userService.create(postUser);
    return response.status(status).json(data);
  }

  @Get()
  findAll(@Res() response: Response) {
    const { status, data } = this.userService.findAll();
    return response.status(status).json(data);
  }

  @Get(':id')
  findOne(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.userService.findOne(id);
    return response.status(status).json(data);
  }

  @Put(':id')
  update(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const { status, data } = this.userService.update(id, updatePasswordDto);
    return response.status(status).json(data);
  }

  @Delete(':id')
  remove(
    @Res() response: Response,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    const { status, data } = this.userService.remove(id);
    return response.status(status).json(data);
  }
}
