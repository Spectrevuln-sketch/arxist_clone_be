import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTipPendukungDto {

  @IsNotEmpty()
  @ApiProperty({
    required: true,
    description: 'Current Have User Id'
  })
  user_id: string;

  @IsNotEmpty()
  @ApiProperty()
  tip_per_unit: number;

  @IsNotEmpty()
  @ApiProperty()
  pesan: string;

  @IsNotEmpty()
  @ApiProperty()
  label: string;

  @IsNotEmpty()
  @ApiProperty()
  logo_tip_path: string;




}
