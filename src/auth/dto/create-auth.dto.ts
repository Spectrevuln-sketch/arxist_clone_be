import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { Role, UserStatus } from "src/schemas/enum/users.enum";

export class CreateAuthDto {
  @ApiProperty({
    description: 'Users Full Name',
    default: 'username'
  })
  name: string;


  @IsNotEmpty()
  @ApiProperty({
    default: 'username',
    description: 'Username Required',
    required: true
  })
  username: string;



  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'Email Required',
    format: 'email',
    required: true
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Password Requiered',
    format: 'password',
    required: true
  })
  password: string;


  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Email Required',
    enum: Object.values(Role),
    default: 'ADMIN',
    required: true
  })
  role: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    enum: Object.values(UserStatus),
    default: 'ACTIVE',
    description: `Status Required ${Object.values(UserStatus)}`,
    required: true,
  })
  status: string;

}
