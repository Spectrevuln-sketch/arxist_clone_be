import { Module } from '@nestjs/common';
import { CommistionService } from './commistion.service';
import { CommistionController } from './commistion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UserSchema } from 'src/schemas/users.schema';
import { Commitions, CommitionsSchema } from 'src/schemas/commition.schema';
import { CommitionsRepository } from './repository/commition.repository';
import { UsersRepository } from 'src/users/repository/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema
      },
      {
        name: Commitions.name,
        schema: CommitionsSchema
      }
    ])
  ],
  controllers: [CommistionController],
  providers: [
    CommistionService,
    CommitionsRepository,
    UsersRepository
  ]
})
export class CommistionModule { }
