import { IsNotEmpty } from 'class-validator';

export class CreateUserProfileDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  age: number;

  dob: string;
}
