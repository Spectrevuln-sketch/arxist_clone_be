import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Role, UserStatus } from "src/schemas/enum/users.enum";

export class CreateCommistionDto {

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Current Have Commition User Id'
  })
  user_id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty({
    enum: Object.values(Role),
  })
  role: Role;

  @ApiProperty({
    type: String,
    enum: Object.values(UserStatus),
    default: 'ACTIVE',
    description: `Status Required ${Object.values(UserStatus)}`,
    required: true,
  })
  status: UserStatus;



}
