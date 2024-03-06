import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  oldPassword: string; // previous password
  newPassword: string; // new password
}
