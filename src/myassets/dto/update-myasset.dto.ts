import { PartialType } from '@nestjs/swagger';
import { CreateMyassetDto } from './create-myasset.dto';

export class UpdateMyassetDto extends PartialType(CreateMyassetDto) {}
