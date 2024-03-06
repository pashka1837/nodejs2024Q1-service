import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { usersDB } from 'db/users/users';

@Injectable()
export class UserService {
  create(postUser: CreateUserDto) {
    if (
      !postUser.login ||
      typeof postUser.login !== 'string' ||
      !postUser.password ||
      typeof postUser.password !== 'string'
    )
      return { status: 400, data: { msg: 'Doesn`t contain required fields' } };
    const newUser = usersDB.postUser(postUser);
    delete newUser.password;
    return { status: 201, data: { user: newUser } };
  }

  findAll() {
    const users = usersDB.getUsers();
    return { status: 200, data: { users: users } };
  }

  findOne(id: string) {
    const user = { ...usersDB.getUserById(id) };
    if (!user) return { status: 404, data: { msg: 'User not found' } };
    delete user.password;
    return { status: 200, data: { user: user } };
  }

  update(id: string, putData: UpdatePasswordDto) {
    const user = usersDB.getUserById(id);
    if (!user) return { status: 404, data: { msg: 'User not found' } };
    const updUser = { ...usersDB.putUser(putData, user) };
    if (updUser.id) {
      delete updUser.password;
      return { status: 200, data: { user: updUser } };
    }
    return { status: 403, data: { msg: 'Wrong password' } };
  }

  remove(id: string) {
    const user = usersDB.getUserById(id);
    if (!user) return { status: 404, data: { msg: 'User not found' } };
    usersDB.deleteUser(id);
    return { status: 204, data: { msg: 'User has been deleted' } };
  }
}
