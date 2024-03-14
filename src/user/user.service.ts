import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(postUser: CreateUserDto) {
    const newUser = await this.prisma.user.create({ data: { ...postUser } });
    console.log(new UserEntity(newUser));
    return new UserEntity(newUser);
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new UserEntity(user));
  }

  async findOne(id: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: id },
      });
      return new UserEntity(user);
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, putData: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (user.password !== putData.oldPassword)
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    const updUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: putData.newPassword,
        version: user.version + 1,
      },
    });
    return new UserEntity(updUser);
  }

  async remove(id: string) {
    try {
      const del = await this.prisma.user.delete({ where: { id: id } });
      console.log(del);
    } catch (error) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
