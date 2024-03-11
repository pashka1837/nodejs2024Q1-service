interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

interface CreateUserDto {
  login: string;
  password: string;
}

interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

export { User, CreateUserDto, UpdatePasswordDto };
