import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginAuthDto {

  @ApiProperty({
    default: 'username',
    description: 'Username Required',
  })
  username: string;


  @ApiProperty({
    description: 'Email Required',
    format: 'email',
  })
  email: string;


  @IsNotEmpty()
  @ApiProperty({
    description: 'Password Requiered',
    format: 'password',
    required: true
  })
  password: string;


}
