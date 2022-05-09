import { PartialType } from '@nestjs/swagger';
import { CreateTipPendukungDto } from './create-tip-pendukung.dto';

export class UpdateTipPendukungDto extends PartialType(CreateTipPendukungDto) {}
