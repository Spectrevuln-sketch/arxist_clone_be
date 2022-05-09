import { Module } from '@nestjs/common';
import { TipPendukungService } from './tip-pendukung.service';
import { TipPendukungController } from './tip-pendukung.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/schemas/users.schema';
import { Assets, AssetsSchema } from 'src/schemas/assets.schema';
import { Commitions, CommitionsSchema } from 'src/schemas/commition.schema';
import { Tip, TipSchema } from 'src/schemas/tip.schema';
import { TipPendukungRepository } from './repository/tip-pendukung.repository';
import { MyAssetsRepo } from 'src/myassets/repository/myassets.repository';
import { UsersRepository } from 'src/users/repository/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema
      },
      {
        name: Tip.name,
        schema: TipSchema
      },
      {
        name: Assets.name,
        schema: AssetsSchema
      },
      {
        name: Commitions.name,
        schema: CommitionsSchema
      }
    ])
  ],
  controllers: [TipPendukungController],
  providers: [
    TipPendukungService,
    TipPendukungRepository,
    MyAssetsRepo,
    UsersRepository
  ]
})
export class TipPendukungModule { }
