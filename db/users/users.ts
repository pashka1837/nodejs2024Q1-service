import { CreateUserDto, UpdatePasswordDto, User } from './user.interface';
import { createHash, randomUUID } from 'crypto';

class UsersDB {
  private usersMap = new Map<string, User>();
  // private foundUser: User | null;

  getUsers() {
    return [...this.usersMap.values()].map((user) => {
      delete user.password;
      return user;
    });
  }

  getUserById(id: string) {
    const returnUser = this.usersMap.get(id);
    if (!returnUser) return null;
    return returnUser;
  }

  postUser(postUser: CreateUserDto) {
    const time = Date.now();
    const newUser: User = {
      id: randomUUID(),
      login: postUser.login,
      password: createHash('sha256').update(postUser.password).digest('hex'),
      version: 0,
      createdAt: time,
      updatedAt: time,
    };
    this.usersMap.set(newUser.id, newUser);
    return { ...newUser };
  }

  putUser(putData: UpdatePasswordDto, foundUser: User) {
    if (
      foundUser.password !==
      createHash('sha256').update(putData.oldPassword).digest('hex')
    ) {
      return null;
    }
    const time = Date.now();
    foundUser.password = createHash('sha256')
      .update(putData.newPassword)
      .digest('hex');
    foundUser.version += 1;
    foundUser.updatedAt = time;
    this.usersMap.set(foundUser.id, foundUser);
    return foundUser;
  }

  deleteUser(id: string) {
    this.usersMap.delete(id);
  }
}

export const usersDB = new UsersDB();
