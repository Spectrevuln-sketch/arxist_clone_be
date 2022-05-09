import { PartialType } from '@nestjs/swagger';
import { CreateCommistionDto } from './create-commistion.dto';

export class UpdateCommistionDto extends PartialType(CreateCommistionDto) {}
