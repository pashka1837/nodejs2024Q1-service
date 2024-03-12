import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { usersDB } from 'db/users/usersDB';

@Injectable()
export class UserService {
  create(postUser: CreateUserDto) {
    const newUser = usersDB.postUser(postUser);
    delete newUser.password;
    return { status: 201, data: newUser };
  }

  findAll() {
    const users = usersDB.getUsers();
    return { status: 200, data: users };
  }

  findOne(id: string) {
    const user = { ...usersDB.getUserById(id) };
    if (!user.id) return { status: 404, data: { msg: 'User not found' } };
    delete user.password;
    return { status: 200, data: user };
  }

  update(id: string, putData: UpdatePasswordDto) {
    const user = usersDB.getUserById(id);
    if (!user) return { status: 404, data: { msg: 'User not found' } };
    const updUser = { ...usersDB.putUser(putData, user) };
    if (updUser.id) {
      delete updUser.password;
      return { status: 200, data: updUser };
    }
    return { status: 403, data: { msg: 'Wrong password' } };
  }

  remove(id: string) {
    return usersDB.deleteUser(id)
      ? { status: 204, data: { msg: 'User has been deleted' } }
      : { status: 404, data: { msg: 'User not found' } };
  }
}
