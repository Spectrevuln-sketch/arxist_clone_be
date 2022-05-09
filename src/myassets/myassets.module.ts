import { Module } from '@nestjs/common';
import { MyassetsService } from './myassets.service';
import { MyassetsController } from './myassets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/schemas/users.schema';
import { Commitions, CommitionsSchema } from 'src/schemas/commition.schema';
import { Assets, AssetsSchema } from 'src/schemas/assets.schema';
import { MyAssetsRepo } from './repository/myassets.repository';
import { UsersRepository } from 'src/users/repository/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema
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
  controllers: [MyassetsController],
  providers: [
    MyassetsService,
    MyAssetsRepo,
    UsersRepository
  ]
})
export class MyassetsModule { }
