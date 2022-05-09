import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";
import { AssetsStatusEnum } from "src/schemas/enum/assets.enum";
import { Users } from "src/schemas/users.schema";

export class CreateMyassetDto {

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Current Have User Id'
  })
  user_id: string;

  @IsNotEmpty()
  @ApiProperty({
    required: true
  })
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: string;

  @ApiProperty({ required: true })
  path_assets: string;

  @ApiProperty({
    type: String,
    required: true,
    enum: Object.values(AssetsStatusEnum),
  })
  status: AssetsStatusEnum;




}
